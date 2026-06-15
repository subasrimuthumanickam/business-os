import express, { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import db from './config/db.js'; 
import CustomerRoutes from './routes/customer.routes.js';
import AuthRoutes from './routes/authRoutes.js'; 

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// Middleware
app.use(cors());
app.use(express.json());

// Routes Router Prefix Registration
app.use('/api/customers', CustomerRoutes);
app.use('/api/auth', AuthRoutes); 

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
  
  if (!company_name || !email || !password || !admin_name) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

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

    const companyId = await new Promise<number>((resolve, reject) => {
      db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
        [company_name, subdomain], 
        function(this: any, err: any) {
          if (err) return reject(err);
          const id = this?.lastID ?? 0;
          resolve(id);
        });
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🎯 CRITICAL FIX: Capture the generated autoincrement ID for users
    const newUserId = await new Promise<number>((resolve, reject) => {
      db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
        [companyId, email, hashedPassword, admin_name, 1],
        function(this: any, err: any) {
          if (err) return reject(err);
          const id = this?.lastID ?? 0;
          resolve(id);
        });
    });

    // 🎯 FIX: Passing the actual auto-incremented numerical id, NOT email string
    const token = jwt.sign(
      { userId: newUserId, companyId: companyId, roleId: 1, email: email },
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
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
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
    
    // 🎯 Standard Payload layout: userId holds numeric user ID
    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, roleId: user.role_id },
      company: { id: user.company_id, name: user.company_name, subdomain: user.subdomain },
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
  if (!token) return res.status(401).json({ error: 'No token provided' });

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
  if (!email) return res.status(400).json({ error: 'Email is required' });

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
      message: 'Password reset token generated.',
      resetToken
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ============= RESET PASSWORD API =============
app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Reset token and new password are required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (decoded.purpose !== 'password-reset' || !decoded.email) {
      return res.status(401).json({ error: 'Invalid reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await new Promise<number>((resolve, reject) => {
      db.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, decoded.email], function (this: any, err: any) {
        if (err) return reject(err);
        resolve(this?.changes || 0);
      });
    });

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// ============= ENABLE 2FA =============
app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const targetId = decoded.userId; 
    
    const secret = speakeasy.generateSecret({ name: `BusinessOS:${decoded.email || targetId}` });
    if(!secret.otpauth_url) return res.status(500).json({ error: 'QR URI generation error' });

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    await new Promise<void>((resolve, reject) => {
      db.run(`INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
        [targetId, secret.base32], function(err: any) {
          if (err) return reject(err);
          resolve();
        });
    });
    
    return res.json({ success: true, secret: secret.base32, qrCode: qrCodeDataUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to setup 2FA' });
  }
});

// ============= VERIFY & CONFIRM 2FA =============
app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  if (!token || !code) return res.status(400).json({ error: 'Missing parameters' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const targetId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret FROM two_fa WHERE user_id = ?', [targetId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    if (!twoFA) return res.status(400).json({ error: '2FA not setup' });
    
    const verified = speakeasy.totp.verify({
      secret: twoFA.secret, encoding: 'base32', token: code, window: 1
    });
    
    if (verified) {
      await new Promise<void>((resolve, reject) => {
        db.run(`UPDATE two_fa SET enabled = 1 WHERE user_id = ?`, [targetId], function(err: any) {
          if (err) return reject(err);
          resolve();
        });
      });
      return res.json({ success: true, message: '2FA enabled' });
    } else {
      return res.status(400).json({ error: 'Invalid 2FA code' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Verification failed' });
  }
});

// ============= DISABLE 2FA =============
app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  if (!token || !code) return res.status(400).json({ error: 'Token and code required' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const targetId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [targetId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    if (!twoFA || !twoFA.enabled) return res.status(400).json({ error: '2FA is not enabled' });
    
    const verified = speakeasy.totp.verify({
      secret: twoFA.secret, encoding: 'base32', token: code, window: 1
    });
    
    if (verified) {
      await new Promise<void>((resolve, reject) => {
        db.run(`UPDATE two_fa SET enabled = 0 WHERE user_id = ?`, [targetId], function(err: any) {
          if (err) return reject(err);
          resolve();
        });
      });
      return res.json({ success: true, message: '2FA disabled successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to disable 2FA' });
  }
});

// ============= CHECK 2FA STATUS =============
app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const targetId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve) => {
      db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [targetId], (err: any, row: any) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
    
    return res.json({ enabled: twoFA ? twoFA.enabled === 1 : false });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});