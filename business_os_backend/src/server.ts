import express, { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import db from './config/db.js'; // Points correctly to your MySQL configuration wrapper
import CustomerRoutes from './routes/customer.routes.js';
import AuthRoutes from './routes/authRoutes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import reportRoutes from './routes/report.routes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import stockMovementRoutes from './routes/stockMovement.routes.js';

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// Middleware
app.use(cors());
app.use(express.json());

// 2. REGISTER THE CUSTOMER ROUTE WITH PREFIX BASE PATH
app.use('/api/customers', CustomerRoutes);
app.use('/api/auth', AuthRoutes); // Assuming auth routes are also in customer.routes.js
app.use('/api/invoices', invoiceRoutes); // Register invoice routes
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock-movements', stockMovementRoutes);

// Interfaces for incoming requests
interface RegisterBody {
  company_name?: string; 
  admin_name?: string;   
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
  twoFACode?: string;
}

interface ResetPasswordBody {
  token?: string;
  newPassword?: string;
}

interface JWTPayload {
  userId: string | number;
  companyId: number;
  roleId: number;
  email?: string;
  purpose?: string;
}

// ============= REGISTER API =============
app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
  const { company_name, admin_name, email, password } = req.body;
console.log("data",req.body)
  // Basic validation
  if (!company_name || !email || !password || !admin_name) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    // Create subdomain from company name (e.g., "My Company" -> "mycompany")
    const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check if company exists using db.get
    const existingCompany = await new Promise<any>((resolve) => {
      db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });

    if (existingCompany) {
      return res.status(400).json({ error: 'Company already exists' });
    }

    const existingUser = await new Promise<any>((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Insert company - Handled correctly for MySQL wrappers returning execution results
    const companyId = await new Promise<number>((resolve, reject) => {
      db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
        [company_name, subdomain], 
        function(this: any, err: any) {
          if (err) return reject(err);
          // For sqlite3 this.lastID, for some MySQL wrappers there may be an
          // insertId on the result but those wrappers pass only (err) in the
          // callback signature here. Use this.lastID which is available on
          // the statement context for sqlite3. If undefined, resolve with 0.
          const id = this?.lastID ?? 0;
          resolve(id);
        });
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with standard Role ID 1 (Admin)
    await new Promise<void>((resolve, reject) => {
      db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
        [companyId, email, hashedPassword, admin_name, 1],
        function(err: any) {
          if (err) return reject(err);
          resolve();
        });
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: email, companyId: companyId, roleId: 1 },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ 
      success: true, 
      token, 
      company: { id: companyId, name: company_name, subdomain } 
    });

  } catch (error: any) {
    console.error(error);
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(500).json({ error: 'Foreign key constraint fails. Ensure Role ID 1 exists in the roles table.' });
    }
    return res.status(500).json({ error: 'Server error during registration' });
  }
});

// ============= LOGIN WITH 2FA VERIFICATION =============
app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
  const { email, password, twoFACode } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    // Find user with company
    const user = await new Promise<any>((resolve) => {
      db.get(`
        SELECT users.*, companies.company_name, companies.subdomain 
        FROM users 
        JOIN companies ON users.company_id = companies.id 
        WHERE users.email = ?
      `, [email], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check if 2FA is enabled
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    // If 2FA is enabled, verify the code
    if (twoFA && twoFA.enabled === 1) {
      if (!twoFACode) {
        return res.status(401).json({ 
          error: '2FA required',
          requires2FA: true,
          userId: user.id
        });
      }
      
      const verified = speakeasy.totp.verify({
        secret: twoFA.secret,
        encoding: 'base32',
        token: twoFACode,
        window: 1
      });
      
      if (!verified) {
        return res.status(401).json({ error: 'Invalid 2FA code' });
      }
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.role_id
      },
      company: {
        id: user.company_id,
        name: user.company_name,
        subdomain: user.subdomain
      },
      twoFAEnabled: twoFA && twoFA.enabled === 1
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ============= VERIFY TOKEN API =============
app.get('/api/verify', (req: Request, res: Response): any => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// ============= FORGOT PASSWORD API =============
app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await new Promise<any>((resolve) => {
      db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });

    if (!user) {
      return res.json({
        success: true,
        message: 'If this email exists, a reset token has been generated for the next step.'
      });
    }

    const resetToken = jwt.sign(
      { email: user.email, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    return res.json({
      success: true,
      message: 'Password reset token generated. Enter your new password below.',
      resetToken
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ============= RESET PASSWORD API =============
app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Reset token and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    if (decoded.purpose !== 'password-reset' || !decoded.email) {
      return res.status(401).json({ error: 'Invalid reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await new Promise<number>((resolve, reject) => {
      db.run(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, decoded.email],
        function (this: any, err: any) {
          if (err) return reject(err);
          const changes = this?.changes || 0;
          resolve(changes);
        }
      );
    });

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid or expired reset token' });
  }
});

// ============= ENABLE 2FA - Generate Secret & QR =============
app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const secret = speakeasy.generateSecret({
      name: `BusinessOS:${decoded.email || userId}`
    });
    
    if(!secret.otpauth_url) {
      return res.status(500).json({ error: 'Could not generate QR Code URI' });
    }

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
    await new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
         ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
        [userId, secret.base32],
        function(err: any) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    
    return res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeDataUrl,
      otpauth_url: secret.otpauth_url
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to setup 2FA' });
  }
});

// ============= VERIFY & CONFIRM 2FA =============
app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  
  if (!token || !code) {
    return res.status(400).json({ error: 'Token and code required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    if (!twoFA) {
      return res.status(400).json({ error: '2FA not setup' });
    }
    
    const verified = speakeasy.totp.verify({
      secret: twoFA.secret,
      encoding: 'base32',
      token: code,
      window: 1
    });
    
    if (verified) {
      await new Promise<void>((resolve, reject) => {
        db.run(
          `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
          [userId],
          function(err: any) {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      
      return res.json({ success: true, message: '2FA enabled successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid verification code' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

// ============= DISABLE 2FA =============
app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  
  if (!token || !code) {
    return res.status(400).json({ error: 'Token and code required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    if (!twoFA || !twoFA.enabled) {
      return res.status(400).json({ error: '2FA is not enabled' });
    }
    
    const verified = speakeasy.totp.verify({
      secret: twoFA.secret,
      encoding: 'base32',
      token: code,
      window: 1
    });
    
    if (verified) {
      await new Promise<void>((resolve, reject) => {
        db.run(
          `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
          [userId],
          function(err: any) {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      
      return res.json({ success: true, message: '2FA disabled successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid verification code' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to disable 2FA' });
  }
});

// ============= CHECK 2FA STATUS =============
app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    return res.json({ 
      enabled: twoFA ? twoFA.enabled === 1 : false 
    });
    
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});