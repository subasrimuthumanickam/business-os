// // // // // import express, { type Request, type Response } from 'express';
// // // // // import bcrypt from 'bcryptjs';
// // // // // import jwt from 'jsonwebtoken';
// // // // // import cors from 'cors';
// // // // // import speakeasy from 'speakeasy';
// // // // // import QRCode from 'qrcode';
// // // // // import db from './config/db.js'; // Points correctly to your MySQL configuration wrapper
// // // // // import CustomerRoutes from './routes/customer.routes.js';
// // // // // import AuthRoutes from './routes/authRoutes.js';
// // // // // import invoiceRoutes from './routes/invoice.routes.js';
// // // // // import reportRoutes from './routes/report.routes.js';
// // // // // import paymentRoutes from './routes/paymentRoutes.js';
// // // // // import categoryRoutes from './routes/category.routes.js';
// // // // // import productRoutes from './routes/product.routes.js';
// // // // // import stockMovementRoutes from './routes/stockMovement.routes.js';
// // // // // import estimateRoutes from "./routes/estimate.routes.js";
// // // // // import projectRoutes from './routes/project.routes.js';
// // // // // import taxRateRoutes from './routes/taxRate.routes.js';
// // // // // import priceListRoutes from './routes/priceList.routes.js';
// // // // // import employeeRoutes from './routes/employee.routes.js';
// // // // // import attendanceRoutes from './routes/attendance.routes.js';
// // // // // import leaveRoutes from "./routes/leave.routes.js";

// // // // // import taskRoutes from './routes/task.routes.js';

// // // // // import expenseRoutes from './routes/expense.routes.js';
// // // // // import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
// // // // // import vendorRoutes from './routes/vendor.routes.js';


// // // // // const app = express();
// // // // // const PORT = 5000;
// // // // // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// // // // // // Middleware
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // 2. REGISTER THE CUSTOMER ROUTE WITH PREFIX BASE PATH
// // // // // app.use('/api/customers', CustomerRoutes);
// // // // // app.use('/api/auth', AuthRoutes); // Assuming auth routes are also in customer.routes.js
// // // // // app.use('/api/invoices', invoiceRoutes); // Register invoice routes
// // // // // app.use('/api/reports', reportRoutes);
// // // // // app.use('/api/payments', paymentRoutes);
// // // // // app.use('/api/categories', categoryRoutes);
// // // // // app.use('/api/products', productRoutes);
// // // // // app.use('/api/stock-movements', stockMovementRoutes);
// // // // // app.use("/api/estimates", estimateRoutes);
// // // // // app.use('/api/projects', projectRoutes);
// // // // // app.use('/api/tax-rates', taxRateRoutes);
// // // // // app.use('/api/price-lists', priceListRoutes);
// // // // // app.use("/api/hrms/employees", employeeRoutes);
// // // // // app.use("/api/hrms/attendance", attendanceRoutes);
// // // // // app.use("/api/leaves", leaveRoutes);
// // // // // // app.use('/api/tasks', taskRoutes);
// // // // // app.use('/api', expenseRoutes);
// // // // // app.use('/api/vendors', vendorRoutes);
// // // // // app.use('/api/purchase-orders', purchaseOrderRoutes);


// // // // // // Interfaces for incoming requests
// // // // // interface RegisterBody {
// // // // //   company_name?: string; 
// // // // //   admin_name?: string;   
// // // // //   email?: string;
// // // // //   password?: string;
// // // // // }

// // // // // interface LoginBody {
// // // // //   email?: string;
// // // // //   password?: string;
// // // // //   twoFACode?: string;
// // // // // }

// // // // // interface ResetPasswordBody {
// // // // //   token?: string;
// // // // //   newPassword?: string;
// // // // // }

// // // // // interface JWTPayload {
// // // // //   userId: string | number;
// // // // //   companyId: number;
// // // // //   roleId: number;
// // // // //   email?: string;
// // // // //   purpose?: string;
// // // // // }

// // // // // // ============= REGISTER API =============
// // // // // app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
// // // // //   const { company_name, admin_name, email, password } = req.body;
// // // // // console.log("data",req.body)
// // // // //   // Basic validation
// // // // //   if (!company_name || !email || !password || !admin_name) {
// // // // //     return res.status(400).json({ error: 'All fields required' });
// // // // //   }

// // // // //   try {
// // // // //     // Create subdomain from company name (e.g., "My Company" -> "mycompany")
// // // // //     const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

// // // // //     // Check if company exists using db.get
// // // // //     const existingCompany = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });

// // // // //     if (existingCompany) {
// // // // //       return res.status(400).json({ error: 'Company already exists' });
// // // // //     }

// // // // //     const existingUser = await new Promise<any>((resolve, reject) => {
// // // // //       db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // // // //         if (err) return reject(err);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });

// // // // //     if (existingUser) {
// // // // //       return res.status(400).json({ error: 'Email already registered' });
// // // // //     }

// // // // //     // Insert company - Handled correctly for MySQL wrappers returning execution results
// // // // //     const companyId = await new Promise<number>((resolve, reject) => {
// // // // //       db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
// // // // //         [company_name, subdomain], 
// // // // //         function(this: any, err: any) {
// // // // //           if (err) return reject(err);
// // // // //           // For sqlite3 this.lastID, for some MySQL wrappers there may be an
// // // // //           // insertId on the result but those wrappers pass only (err) in the
// // // // //           // callback signature here. Use this.lastID which is available on
// // // // //           // the statement context for sqlite3. If undefined, resolve with 0.
// // // // //           const id = this?.lastID ?? 0;
// // // // //           resolve(id);
// // // // //         });
// // // // //     });

// // // // //     // Hash password
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     // Create user with standard Role ID 1 (Admin)
// // // // //     await new Promise<void>((resolve, reject) => {
// // // // //       db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
// // // // //         [companyId, email, hashedPassword, admin_name, 1],
// // // // //         function(err: any) {
// // // // //           if (err) return reject(err);
// // // // //           resolve();
// // // // //         });
// // // // //     });

// // // // //     // Create JWT token
// // // // //     const token = jwt.sign(
// // // // //       { userId: email, companyId: companyId, roleId: 1 },
// // // // //       JWT_SECRET,
// // // // //       { expiresIn: '7d' }
// // // // //     );

// // // // //     return res.json({ 
// // // // //       success: true, 
// // // // //       token, 
// // // // //       company: { id: companyId, name: company_name, subdomain } 
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error(error);
// // // // //     if (error?.code === 'ER_DUP_ENTRY') {
// // // // //       return res.status(400).json({ error: 'Email already registered' });
// // // // //     }
// // // // //     if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
// // // // //       return res.status(500).json({ error: 'Foreign key constraint fails. Ensure Role ID 1 exists in the roles table.' });
// // // // //     }
// // // // //     return res.status(500).json({ error: 'Server error during registration' });
// // // // //   }
// // // // // });

// // // // // // ============= LOGIN WITH 2FA VERIFICATION =============
// // // // // app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
// // // // //   const { email, password, twoFACode } = req.body;
  
// // // // //   if (!email || !password) {
// // // // //     return res.status(400).json({ error: 'Email and password required' });
// // // // //   }
  
// // // // //   try {
// // // // //     // Find user with company
// // // // //     const user = await new Promise<any>((resolve) => {
// // // // //       db.get(`
// // // // //         SELECT users.*, companies.company_name, companies.subdomain 
// // // // //         FROM users 
// // // // //         JOIN companies ON users.company_id = companies.id 
// // // // //         WHERE users.email = ?
// // // // //       `, [email], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     if (!user) {
// // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // //     }
    
// // // // //     // Check password
// // // // //     const validPassword = await bcrypt.compare(password, user.password);
// // // // //     if (!validPassword) {
// // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // //     }
    
// // // // //     // Check if 2FA is enabled
// // // // //     const twoFA = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     // If 2FA is enabled, verify the code
// // // // //     if (twoFA && twoFA.enabled === 1) {
// // // // //       if (!twoFACode) {
// // // // //         return res.status(401).json({ 
// // // // //           error: '2FA required',
// // // // //           requires2FA: true,
// // // // //           userId: user.id
// // // // //         });
// // // // //       }
      
// // // // //       const verified = speakeasy.totp.verify({
// // // // //         secret: twoFA.secret,
// // // // //         encoding: 'base32',
// // // // //         token: twoFACode,
// // // // //         window: 1
// // // // //       });
      
// // // // //       if (!verified) {
// // // // //         return res.status(401).json({ error: 'Invalid 2FA code' });
// // // // //       }
// // // // //     }
    
// // // // //     // Create token
// // // // //     const token = jwt.sign(
// // // // //       { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
// // // // //       JWT_SECRET,
// // // // //       { expiresIn: '7d' }
// // // // //     );
    
// // // // //     return res.json({
// // // // //       success: true,
// // // // //       token,
// // // // //       user: {
// // // // //         id: user.id,
// // // // //         name: user.name,
// // // // //         email: user.email,
// // // // //         roleId: user.role_id
// // // // //       },
// // // // //       company: {
// // // // //         id: user.company_id,
// // // // //         name: user.company_name,
// // // // //         subdomain: user.subdomain
// // // // //       },
// // // // //       twoFAEnabled: twoFA && twoFA.enabled === 1
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(500).json({ error: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // ============= VERIFY TOKEN API =============
// // // // // app.get('/api/verify', (req: Request, res: Response): any => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];

// // // // //   if (!token) {
// // // // //     return res.status(401).json({ error: 'No token provided' });
// // // // //   }

// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // //     return res.json({ valid: true, user: decoded });
// // // // //   } catch (error) {
// // // // //     return res.status(401).json({ error: 'Invalid token' });
// // // // //   }
// // // // // });

// // // // // // ============= FORGOT PASSWORD API =============
// // // // // app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
// // // // //   const { email } = req.body;

// // // // //   if (!email) {
// // // // //     return res.status(400).json({ error: 'Email is required' });
// // // // //   }

// // // // //   try {
// // // // //     const user = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });

// // // // //     if (!user) {
// // // // //       return res.json({
// // // // //         success: true,
// // // // //         message: 'If this email exists, a reset token has been generated for the next step.'
// // // // //       });
// // // // //     }

// // // // //     const resetToken = jwt.sign(
// // // // //       { email: user.email, purpose: 'password-reset' },
// // // // //       JWT_SECRET,
// // // // //       { expiresIn: '15m' }
// // // // //     );

// // // // //     return res.json({
// // // // //       success: true,
// // // // //       message: 'Password reset token generated. Enter your new password below.',
// // // // //       resetToken
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(500).json({ error: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // ============= RESET PASSWORD API =============
// // // // // app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
// // // // //   const { token, newPassword } = req.body;

// // // // //   if (!token || !newPassword) {
// // // // //     return res.status(400).json({ error: 'Reset token and new password are required' });
// // // // //   }

// // // // //   if (newPassword.length < 6) {
// // // // //     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
// // // // //   }

// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

// // // // //     if (decoded.purpose !== 'password-reset' || !decoded.email) {
// // // // //       return res.status(401).json({ error: 'Invalid reset token' });
// // // // //     }

// // // // //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// // // // //     await new Promise<number>((resolve, reject) => {
// // // // //       db.run(
// // // // //         'UPDATE users SET password = ? WHERE email = ?',
// // // // //         [hashedPassword, decoded.email],
// // // // //         function (this: any, err: any) {
// // // // //           if (err) return reject(err);
// // // // //           const changes = this?.changes || 0;
// // // // //           resolve(changes);
// // // // //         }
// // // // //       );
// // // // //     });

// // // // //     return res.json({ success: true, message: 'Password updated successfully' });
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(401).json({ error: 'Invalid or expired reset token' });
// // // // //   }
// // // // // });

// // // // // // ============= ENABLE 2FA - Generate Secret & QR =============
// // // // // app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // // // //   if (!token) {
// // // // //     return res.status(401).json({ error: 'Unauthorized' });
// // // // //   }
  
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // // //     const userId = decoded.userId;
    
// // // // //     const secret = speakeasy.generateSecret({
// // // // //       name: `BusinessOS:${decoded.email || userId}`
// // // // //     });
    
// // // // //     if(!secret.otpauth_url) {
// // // // //       return res.status(500).json({ error: 'Could not generate QR Code URI' });
// // // // //     }

// // // // //     const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
// // // // //     await new Promise<void>((resolve, reject) => {
// // // // //       db.run(
// // // // //         `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
// // // // //          ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
// // // // //         [userId, secret.base32],
// // // // //         function(err: any) {
// // // // //           if (err) return reject(err);
// // // // //           resolve();
// // // // //         }
// // // // //       );
// // // // //     });
    
// // // // //     return res.json({
// // // // //       success: true,
// // // // //       secret: secret.base32,
// // // // //       qrCode: qrCodeDataUrl,
// // // // //       otpauth_url: secret.otpauth_url
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(500).json({ error: 'Failed to setup 2FA' });
// // // // //   }
// // // // // });

// // // // // // ============= VERIFY & CONFIRM 2FA =============
// // // // // app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];
// // // // //   const { code } = req.body;
  
// // // // //   if (!token || !code) {
// // // // //     return res.status(400).json({ error: 'Token and code required' });
// // // // //   }
  
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // // //     const userId = decoded.userId;
    
// // // // //     const twoFA = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     if (!twoFA) {
// // // // //       return res.status(400).json({ error: '2FA not setup' });
// // // // //     }
    
// // // // //     const verified = speakeasy.totp.verify({
// // // // //       secret: twoFA.secret,
// // // // //       encoding: 'base32',
// // // // //       token: code,
// // // // //       window: 1
// // // // //     });
    
// // // // //     if (verified) {
// // // // //       await new Promise<void>((resolve, reject) => {
// // // // //         db.run(
// // // // //           `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
// // // // //           [userId],
// // // // //           function(err: any) {
// // // // //             if (err) return reject(err);
// // // // //             resolve();
// // // // //           }
// // // // //         );
// // // // //       });
      
// // // // //       return res.json({ success: true, message: '2FA enabled successfully' });
// // // // //     } else {
// // // // //       return res.status(400).json({ error: 'Invalid verification code' });
// // // // //     }
    
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(500).json({ error: 'Verification failed' });
// // // // //   }
// // // // // });

// // // // // // ============= DISABLE 2FA =============
// // // // // app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];
// // // // //   const { code } = req.body;
  
// // // // //   if (!token || !code) {
// // // // //     return res.status(400).json({ error: 'Token and code required' });
// // // // //   }
  
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // // //     const userId = decoded.userId;
    
// // // // //     const twoFA = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     if (!twoFA || !twoFA.enabled) {
// // // // //       return res.status(400).json({ error: '2FA is not enabled' });
// // // // //     }
    
// // // // //     const verified = speakeasy.totp.verify({
// // // // //       secret: twoFA.secret,
// // // // //       encoding: 'base32',
// // // // //       token: code,
// // // // //       window: 1
// // // // //     });
    
// // // // //     if (verified) {
// // // // //       await new Promise<void>((resolve, reject) => {
// // // // //         db.run(
// // // // //           `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
// // // // //           [userId],
// // // // //           function(err: any) {
// // // // //             if (err) return reject(err);
// // // // //             resolve();
// // // // //           }
// // // // //         );
// // // // //       });
      
// // // // //       return res.json({ success: true, message: '2FA disabled successfully' });
// // // // //     } else {
// // // // //       return res.status(400).json({ error: 'Invalid verification code' });
// // // // //     }
    
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return res.status(500).json({ error: 'Failed to disable 2FA' });
// // // // //   }
// // // // // });

// // // // // // ============= CHECK 2FA STATUS =============
// // // // // app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // // // //   if (!token) {
// // // // //     return res.status(401).json({ error: 'Unauthorized' });
// // // // //   }
  
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // // //     const userId = decoded.userId;
    
// // // // //     const twoFA = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     return res.json({ 
// // // // //       enabled: twoFA ? twoFA.enabled === 1 : false 
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     return res.status(401).json({ error: 'Invalid token' });
// // // // //   }
// // // // // });

// // // // // app.listen(PORT, () => {
// // // // //   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// // // // // });
// // // // import express, { type Request, type Response } from 'express';
// // // // import bcrypt from 'bcryptjs';
// // // // import jwt from 'jsonwebtoken';
// // // // import cors from 'cors';
// // // // import speakeasy from 'speakeasy';
// // // // import QRCode from 'qrcode';
// // // // import db from './config/db.js'; // Points correctly to your MySQL configuration wrapper
// // // // import CustomerRoutes from './routes/customer.routes.js';
// // // // import AuthRoutes from './routes/authRoutes.js';
// // // // import invoiceRoutes from './routes/invoice.routes.js';
// // // // import reportRoutes from './routes/report.routes.js';
// // // // import paymentRoutes from './routes/paymentRoutes.js';
// // // // import categoryRoutes from './routes/category.routes.js';
// // // // import productRoutes from './routes/product.routes.js';
// // // // import stockMovementRoutes from './routes/stockMovement.routes.js';
// // // // import estimateRoutes from "./routes/estimate.routes.js";
// // // // import projectRoutes from './routes/project.routes.js';
// // // // import taxRateRoutes from './routes/taxRate.routes.js';
// // // // import priceListRoutes from './routes/priceList.routes.js';
// // // // import employeeRoutes from './routes/employee.routes.js';
// // // // import attendanceRoutes from './routes/attendance.routes.js';
// // // // import leaveRoutes from "./routes/leave.routes.js";

// // // // // ✅ UNCOMMENTED - Task routes
// // // // import taskRoutes from './routes/task.routes.js';

// // // // import expenseRoutes from './routes/expense.routes.js';
// // // // import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
// // // // import vendorRoutes from './routes/vendor.routes.js';

// // // // // ✅ IMPORT EMAIL SERVICE
// // // // import { sendReworkRequestEmail } from './services/emailService.js';

// // // // const app = express();
// // // // const PORT = 5000;
// // // // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// // // // // Middleware
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Register routes
// // // // app.use('/api/customers', CustomerRoutes);
// // // // app.use('/api/auth', AuthRoutes);
// // // // app.use('/api/invoices', invoiceRoutes);
// // // // app.use('/api/reports', reportRoutes);
// // // // app.use('/api/payments', paymentRoutes);
// // // // app.use('/api/categories', categoryRoutes);
// // // // app.use('/api/products', productRoutes);
// // // // app.use('/api/stock-movements', stockMovementRoutes);
// // // // app.use("/api/estimates", estimateRoutes);
// // // // app.use('/api/projects', projectRoutes);
// // // // app.use('/api/tax-rates', taxRateRoutes);
// // // // app.use('/api/price-lists', priceListRoutes);
// // // // app.use("/api/hrms/employees", employeeRoutes);
// // // // app.use("/api/hrms/attendance", attendanceRoutes);
// // // // app.use("/api/leaves", leaveRoutes);

// // // // // ✅ UNCOMMENTED - Task routes
// // // // app.use('/api/tasks', taskRoutes);

// // // // app.use('/api', expenseRoutes);
// // // // app.use('/api/vendors', vendorRoutes);
// // // // app.use('/api/purchase-orders', purchaseOrderRoutes);

// // // // // ============= REWORK EMAIL ENDPOINT =============
// // // // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // // // //   try {
// // // // //     const { to, developerName, taskTitle, reworkNotes, testerName } = req.body;

// // // // //     console.log('📧 Sending rework email to:', to);
// // // // //     console.log('📝 Task:', taskTitle);

// // // // //     if (!to || !developerName || !taskTitle || !reworkNotes) {
// // // // //       return res.status(400).json({ 
// // // // //         success: false, 
// // // // //         message: 'Missing required fields' 
// // // // //       });
// // // // //     }

// // // // //     const result = await sendReworkRequestEmail(
// // // // //       to,
// // // // //       developerName,
// // // // //       taskTitle,
// // // // //       reworkNotes,
// // // // //       testerName || 'Tester'
// // // // //     );

// // // // //     if (result) {
// // // // //       console.log('✅ Email sent successfully');
// // // // //       return res.json({ 
// // // // //         success: true, 
// // // // //         message: 'Email sent successfully' 
// // // // //       });
// // // // //     } else {
// // // // //       return res.status(500).json({ 
// // // // //         success: false, 
// // // // //         message: 'Failed to send email' 
// // // // //       });
// // // // //     }
// // // // //   } catch (error: any) {
// // // // //     console.error('Error sending rework email:', error);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       message: error.message || 'Failed to send email' 
// // // // //     });
// // // // //   }
// // // // // });
// // // // // ============= REWORK EMAIL ENDPOINT =============
// // // // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // // // //   try {
// // // // //     const { to, developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // // // //     console.log('📧 Sending rework email from:', testerEmail);
// // // // //     console.log('📧 Sending rework email to:', to);
// // // // //     console.log('📝 Task:', taskTitle);

// // // // //     if (!to || !developerName || !taskTitle || !reworkNotes) {
// // // // //       return res.status(400).json({ 
// // // // //         success: false, 
// // // // //         message: 'Missing required fields' 
// // // // //       });
// // // // //     }

// // // // //     // ✅ Pass testerEmail as the "from" address
// // // // //     const result = await sendReworkRequestEmail(
// // // // //       to,
// // // // //       developerName,
// // // // //       taskTitle,
// // // // //       reworkNotes,
// // // // //       testerName || 'Tester',
// // // // //       testerEmail  // ✅ Pass tester email to email service
// // // // //     );

// // // // //     if (result) {
// // // // //       console.log('✅ Email sent successfully');
// // // // //       return res.json({ 
// // // // //         success: true, 
// // // // //         message: 'Email sent successfully' 
// // // // //       });
// // // // //     } else {
// // // // //       return res.status(500).json({ 
// // // // //         success: false, 
// // // // //         message: 'Failed to send email' 
// // // // //       });
// // // // //     }
// // // // //   } catch (error: any) {
// // // // //     console.error('Error sending rework email:', error);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       message: error.message || 'Failed to send email' 
// // // // //     });
// // // // //   }
// // // // // });
// // // // // ============= REWORK EMAIL ENDPOINT =============
// // // // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // // // //   try {
// // // // //     const { to, developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // // // //     console.log('📧 Tester Email (SMTP User):', testerEmail);
// // // // //     console.log('📧 Developer Email (To):', to);
// // // // //     console.log('📝 Task:', taskTitle);

// // // // //     if (!to || !developerName || !taskTitle || !reworkNotes || !testerEmail) {
// // // // //       return res.status(400).json({ 
// // // // //         success: false, 
// // // // //         message: 'Missing required fields' 
// // // // //       });
// // // // //     }

// // // // //     // ✅ Pass testerEmail as the SMTP user and from address
// // // // //     const result = await sendReworkRequestEmail(
// // // // //       to,                    // Developer email (to)
// // // // //       developerName,
// // // // //       taskTitle,
// // // // //       reworkNotes,
// // // // //       testerName || 'Tester',
// // // // //       testerEmail            // Tester email (from & SMTP user)
// // // // //     );

// // // // //     if (result) {
// // // // //       console.log('✅ Email sent successfully');
// // // // //       return res.json({ 
// // // // //         success: true, 
// // // // //         message: 'Email sent successfully' 
// // // // //       });
// // // // //     } else {
// // // // //       return res.status(500).json({ 
// // // // //         success: false, 
// // // // //         message: 'Failed to send email' 
// // // // //       });
// // // // //     }
// // // // //   } catch (error: any) {
// // // // //     console.error('Error sending rework email:', error);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       message: error.message || 'Failed to send email' 
// // // // //     });
// // // // //   }
// // // // // });
// // // // // ============= REWORK EMAIL ENDPOINT - COMPLETELY DYNAMIC =============
// // // // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // // // //   try {
// // // // //     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // // // //     console.log('📧 Looking up developer by name:', developerName);
// // // // //     console.log('📧 Tester (From):', testerEmail);

// // // // //     // ✅ Step 1: Validate required fields
// // // // //     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
// // // // //       return res.status(400).json({ 
// // // // //         success: false, 
// // // // //         message: 'Missing required fields' 
// // // // //       });
// // // // //     }

// // // // //     // ✅ Step 2: Fetch developer's email from database by name (EXACT MATCH)
// // // // //     const developer = await new Promise<any>((resolve, reject) => {
// // // // //       db.get(
// // // // //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// // // // //         [developerName.trim()],
// // // // //         (err: any, row: any) => {
// // // // //           if (err) {
// // // // //             console.error('Database error:', err);
// // // // //             return reject(err);
// // // // //           }
// // // // //           resolve(row);
// // // // //         }
// // // // //       );
// // // // //     });

// // // // //     // ✅ Step 3: Check if developer exists
// // // // //     if (!developer) {
// // // // //       console.error('❌ Developer not found in database:', developerName);
// // // // //       return res.status(404).json({ 
// // // // //         success: false, 
// // // // //         message: `Developer "${developerName}" not found in database` 
// // // // //       });
// // // // //     }

// // // // //     console.log('✅ Found developer:', developer.name, 'with email:', developer.email);

// // // // //     // ✅ Step 4: Don't send if tester and developer have same email
// // // // //     if (developer.email === testerEmail) {
// // // // //       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
// // // // //       return res.status(400).json({ 
// // // // //         success: false, 
// // // // //         message: 'Cannot send email to yourself' 
// // // // //       });
// // // // //     }

// // // // //     // ✅ Step 5: Send email - ALL EMAILS FROM DATABASE
// // // // //     const result = await sendReworkRequestEmail({
// // // // //       toEmail: developer.email,        // ✅ FROM DATABASE (the assigned developer)
// // // // //       toName: developer.name,          // ✅ FROM DATABASE (the assigned developer)
// // // // //       taskTitle: taskTitle,
// // // // //       reworkNotes: reworkNotes,
// // // // //       fromName: testerName || 'Tester',
// // // // //       fromEmail: testerEmail           // ✅ FROM DATABASE (logged-in user)
// // // // //     });

// // // // //     if (result) {
// // // // //       console.log('✅ Email sent successfully to:', developer.email);
// // // // //       return res.json({ 
// // // // //         success: true, 
// // // // //         message: `Email sent successfully to ${developer.name} (${developer.email})` 
// // // // //       });
// // // // //     } else {
// // // // //       return res.status(500).json({ 
// // // // //         success: false, 
// // // // //         message: 'Failed to send email' 
// // // // //       });
// // // // //     }
// // // // //   } catch (error: any) {
// // // // //     console.error('Error sending rework email:', error);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       message: error.message || 'Failed to send email' 
// // // // //     });
// // // // //   }
// // // // // });
// // // // // ============= REWORK EMAIL ENDPOINT - COMPLETELY DYNAMIC =============
// // // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // // //   try {
// // // //     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // // //     console.log('📧 Looking up developer by name:', developerName);
// // // //     console.log('📧 Tester (From):', testerEmail);

// // // //     // ✅ Step 1: Validate required fields
// // // //     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'Missing required fields' 
// // // //       });
// // // //     }

// // // //     // ✅ FIX: Ensure developerName is a string before using .trim()
// // // //     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
// // // //     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
// // // //     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
// // // //     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
// // // //     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : String(testerName || '').trim();

// // // //     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'Invalid fields provided' 
// // // //       });
// // // //     }

// // // //     // ✅ Step 2: Fetch developer's email from database by name
// // // //     const developer = await new Promise<any>((resolve, reject) => {
// // // //       db.get(
// // // //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// // // //         [devName],
// // // //         (err: any, row: any) => {
// // // //           if (err) {
// // // //             console.error('Database error:', err);
// // // //             return reject(err);
// // // //           }
// // // //           resolve(row);
// // // //         }
// // // //       );
// // // //     });

// // // //     // ✅ Step 3: Check if developer exists
// // // //     if (!developer) {
// // // //       console.error('❌ Developer not found in database:', devName);
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         message: `Developer "${devName}" not found in database` 
// // // //       });
// // // //     }

// // // //     console.log('✅ Found developer:', developer.name, 'with email:', developer.email);

// // // //     // ✅ Step 4: Don't send if tester and developer have same email
// // // //     if (developer.email === testerEmailStr) {
// // // //       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'Cannot send email to yourself' 
// // // //       });
// // // //     }

// // // //     // ✅ Step 5: Send email - ALL EMAILS FROM DATABASE
// // // //     const result = await sendReworkRequestEmail({
// // // //       toEmail: developer.email,        // ✅ FROM DATABASE (the assigned developer)
// // // //       toName: developer.name,          // ✅ FROM DATABASE (the assigned developer)
// // // //       taskTitle: taskTitleStr,
// // // //       reworkNotes: reworkNotesStr,
// // // //       fromName: testerNameStr || 'Tester',
// // // //       fromEmail: testerEmailStr        // ✅ FROM DATABASE (logged-in user)
// // // //     });

// // // //     if (result) {
// // // //       console.log('✅ Email sent successfully to:', developer.email);
// // // //       return res.json({ 
// // // //         success: true, 
// // // //         message: `Email sent successfully to ${developer.name} (${developer.email})` 
// // // //       });
// // // //     } else {
// // // //       return res.status(500).json({ 
// // // //         success: false, 
// // // //         message: 'Failed to send email' 
// // // //       });
// // // //     }
// // // //   } catch (error: any) {
// // // //     console.error('Error sending rework email:', error);
// // // //     return res.status(500).json({ 
// // // //       success: false, 
// // // //       message: error.message || 'Failed to send email' 
// // // //     });
// // // //   }
// // // // });
// // // // // Interfaces for incoming requests
// // // // interface RegisterBody {
// // // //   company_name?: string; 
// // // //   admin_name?: string;   
// // // //   email?: string;
// // // //   password?: string;
// // // // }

// // // // interface LoginBody {
// // // //   email?: string;
// // // //   password?: string;
// // // //   twoFACode?: string;
// // // // }

// // // // interface ResetPasswordBody {
// // // //   token?: string;
// // // //   newPassword?: string;
// // // // }

// // // // interface JWTPayload {
// // // //   userId: string | number;
// // // //   companyId: number;
// // // //   roleId: number;
// // // //   email?: string;
// // // //   purpose?: string;
// // // // }

// // // // // ============= REGISTER API =============
// // // // app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
// // // //   const { company_name, admin_name, email, password } = req.body;
// // // // console.log("data",req.body)
// // // //   // Basic validation
// // // //   if (!company_name || !email || !password || !admin_name) {
// // // //     return res.status(400).json({ error: 'All fields required' });
// // // //   }

// // // //   try {
// // // //     // Create subdomain from company name (e.g., "My Company" -> "mycompany")
// // // //     const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

// // // //     // Check if company exists using db.get
// // // //     const existingCompany = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });

// // // //     if (existingCompany) {
// // // //       return res.status(400).json({ error: 'Company already exists' });
// // // //     }

// // // //     const existingUser = await new Promise<any>((resolve, reject) => {
// // // //       db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // // //         if (err) return reject(err);
// // // //         resolve(row);
// // // //       });
// // // //     });

// // // //     if (existingUser) {
// // // //       return res.status(400).json({ error: 'Email already registered' });
// // // //     }

// // // //     // Insert company - Handled correctly for MySQL wrappers returning execution results
// // // //     const companyId = await new Promise<number>((resolve, reject) => {
// // // //       db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
// // // //         [company_name, subdomain], 
// // // //         function(this: any, err: any) {
// // // //           if (err) return reject(err);
// // // //           const id = this?.lastID ?? 0;
// // // //           resolve(id);
// // // //         });
// // // //     });

// // // //     // Hash password
// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     // Create user with standard Role ID 1 (Admin)
// // // //     await new Promise<void>((resolve, reject) => {
// // // //       db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
// // // //         [companyId, email, hashedPassword, admin_name, 1],
// // // //         function(err: any) {
// // // //           if (err) return reject(err);
// // // //           resolve();
// // // //         });
// // // //     });

// // // //     // Create JWT token
// // // //     const token = jwt.sign(
// // // //       { userId: email, companyId: companyId, roleId: 1 },
// // // //       JWT_SECRET,
// // // //       { expiresIn: '7d' }
// // // //     );

// // // //     return res.json({ 
// // // //       success: true, 
// // // //       token, 
// // // //       company: { id: companyId, name: company_name, subdomain } 
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error(error);
// // // //     if (error?.code === 'ER_DUP_ENTRY') {
// // // //       return res.status(400).json({ error: 'Email already registered' });
// // // //     }
// // // //     if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
// // // //       return res.status(500).json({ error: 'Foreign key constraint fails. Ensure Role ID 1 exists in the roles table.' });
// // // //     }
// // // //     return res.status(500).json({ error: 'Server error during registration' });
// // // //   }
// // // // });

// // // // // ============= LOGIN WITH 2FA VERIFICATION =============
// // // // app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
// // // //   const { email, password, twoFACode } = req.body;
  
// // // //   if (!email || !password) {
// // // //     return res.status(400).json({ error: 'Email and password required' });
// // // //   }
  
// // // //   try {
// // // //     // Find user with company
// // // //     const user = await new Promise<any>((resolve) => {
// // // //       db.get(`
// // // //         SELECT users.*, companies.company_name, companies.subdomain 
// // // //         FROM users 
// // // //         JOIN companies ON users.company_id = companies.id 
// // // //         WHERE users.email = ?
// // // //       `, [email], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });
    
// // // //     if (!user) {
// // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // //     }
    
// // // //     // Check password
// // // //     const validPassword = await bcrypt.compare(password, user.password);
// // // //     if (!validPassword) {
// // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // //     }
    
// // // //     // Check if 2FA is enabled
// // // //     const twoFA = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });
    
// // // //     // If 2FA is enabled, verify the code
// // // //     if (twoFA && twoFA.enabled === 1) {
// // // //       if (!twoFACode) {
// // // //         return res.status(401).json({ 
// // // //           error: '2FA required',
// // // //           requires2FA: true,
// // // //           userId: user.id
// // // //         });
// // // //       }
      
// // // //       const verified = speakeasy.totp.verify({
// // // //         secret: twoFA.secret,
// // // //         encoding: 'base32',
// // // //         token: twoFACode,
// // // //         window: 1
// // // //       });
      
// // // //       if (!verified) {
// // // //         return res.status(401).json({ error: 'Invalid 2FA code' });
// // // //       }
// // // //     }
    
// // // //     // Create token
// // // //     const token = jwt.sign(
// // // //       { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
// // // //       JWT_SECRET,
// // // //       { expiresIn: '7d' }
// // // //     );
    
// // // //     return res.json({
// // // //       success: true,
// // // //       token,
// // // //       user: {
// // // //         id: user.id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         roleId: user.role_id
// // // //       },
// // // //       company: {
// // // //         id: user.company_id,
// // // //         name: user.company_name,
// // // //         subdomain: user.subdomain
// // // //       },
// // // //       twoFAEnabled: twoFA && twoFA.enabled === 1
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // });

// // // // // ============= VERIFY TOKEN API =============
// // // // app.get('/api/verify', (req: Request, res: Response): any => {
// // // //   const token = req.headers['authorization']?.split(' ')[1];

// // // //   if (!token) {
// // // //     return res.status(401).json({ error: 'No token provided' });
// // // //   }

// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // //     return res.json({ valid: true, user: decoded });
// // // //   } catch (error) {
// // // //     return res.status(401).json({ error: 'Invalid token' });
// // // //   }
// // // // });

// // // // // ============= FORGOT PASSWORD API =============
// // // // app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
// // // //   const { email } = req.body;

// // // //   if (!email) {
// // // //     return res.status(400).json({ error: 'Email is required' });
// // // //   }

// // // //   try {
// // // //     const user = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });

// // // //     if (!user) {
// // // //       return res.json({
// // // //         success: true,
// // // //         message: 'If this email exists, a reset token has been generated for the next step.'
// // // //       });
// // // //     }

// // // //     const resetToken = jwt.sign(
// // // //       { email: user.email, purpose: 'password-reset' },
// // // //       JWT_SECRET,
// // // //       { expiresIn: '15m' }
// // // //     );

// // // //     return res.json({
// // // //       success: true,
// // // //       message: 'Password reset token generated. Enter your new password below.',
// // // //       resetToken
// // // //     });

// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(500).json({ error: 'Server error' });
// // // //   }
// // // // });

// // // // // ============= RESET PASSWORD API =============
// // // // app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
// // // //   const { token, newPassword } = req.body;

// // // //   if (!token || !newPassword) {
// // // //     return res.status(400).json({ error: 'Reset token and new password are required' });
// // // //   }

// // // //   if (newPassword.length < 6) {
// // // //     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
// // // //   }

// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

// // // //     if (decoded.purpose !== 'password-reset' || !decoded.email) {
// // // //       return res.status(401).json({ error: 'Invalid reset token' });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// // // //     await new Promise<number>((resolve, reject) => {
// // // //       db.run(
// // // //         'UPDATE users SET password = ? WHERE email = ?',
// // // //         [hashedPassword, decoded.email],
// // // //         function (this: any, err: any) {
// // // //           if (err) return reject(err);
// // // //           const changes = this?.changes || 0;
// // // //           resolve(changes);
// // // //         }
// // // //       );
// // // //     });

// // // //     return res.json({ success: true, message: 'Password updated successfully' });
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(401).json({ error: 'Invalid or expired reset token' });
// // // //   }
// // // // });

// // // // // ============= ENABLE 2FA - Generate Secret & QR =============
// // // // app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
// // // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // // //   if (!token) {
// // // //     return res.status(401).json({ error: 'Unauthorized' });
// // // //   }
  
// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // //     const userId = decoded.userId;
    
// // // //     const secret = speakeasy.generateSecret({
// // // //       name: `BusinessOS:${decoded.email || userId}`
// // // //     });
    
// // // //     if(!secret.otpauth_url) {
// // // //       return res.status(500).json({ error: 'Could not generate QR Code URI' });
// // // //     }

// // // //     const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
// // // //     await new Promise<void>((resolve, reject) => {
// // // //       db.run(
// // // //         `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
// // // //          ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
// // // //         [userId, secret.base32],
// // // //         function(err: any) {
// // // //           if (err) return reject(err);
// // // //           resolve();
// // // //         }
// // // //       );
// // // //     });
    
// // // //     return res.json({
// // // //       success: true,
// // // //       secret: secret.base32,
// // // //       qrCode: qrCodeDataUrl,
// // // //       otpauth_url: secret.otpauth_url
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(500).json({ error: 'Failed to setup 2FA' });
// // // //   }
// // // // });

// // // // // ============= VERIFY & CONFIRM 2FA =============
// // // // app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // // //   const token = req.headers['authorization']?.split(' ')[1];
// // // //   const { code } = req.body;
  
// // // //   if (!token || !code) {
// // // //     return res.status(400).json({ error: 'Token and code required' });
// // // //   }
  
// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // //     const userId = decoded.userId;
    
// // // //     const twoFA = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });
    
// // // //     if (!twoFA) {
// // // //       return res.status(400).json({ error: '2FA not setup' });
// // // //     }
    
// // // //     const verified = speakeasy.totp.verify({
// // // //       secret: twoFA.secret,
// // // //       encoding: 'base32',
// // // //       token: code,
// // // //       window: 1
// // // //     });
    
// // // //     if (verified) {
// // // //       await new Promise<void>((resolve, reject) => {
// // // //         db.run(
// // // //           `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
// // // //           [userId],
// // // //           function(err: any) {
// // // //             if (err) return reject(err);
// // // //             resolve();
// // // //           }
// // // //         );
// // // //       });
      
// // // //       return res.json({ success: true, message: '2FA enabled successfully' });
// // // //     } else {
// // // //       return res.status(400).json({ error: 'Invalid verification code' });
// // // //     }
    
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(500).json({ error: 'Verification failed' });
// // // //   }
// // // // });

// // // // // ============= DISABLE 2FA =============
// // // // app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // // //   const token = req.headers['authorization']?.split(' ')[1];
// // // //   const { code } = req.body;
  
// // // //   if (!token || !code) {
// // // //     return res.status(400).json({ error: 'Token and code required' });
// // // //   }
  
// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // //     const userId = decoded.userId;
    
// // // //     const twoFA = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });
    
// // // //     if (!twoFA || !twoFA.enabled) {
// // // //       return res.status(400).json({ error: '2FA is not enabled' });
// // // //     }
    
// // // //     const verified = speakeasy.totp.verify({
// // // //       secret: twoFA.secret,
// // // //       encoding: 'base32',
// // // //       token: code,
// // // //       window: 1
// // // //     });
    
// // // //     if (verified) {
// // // //       await new Promise<void>((resolve, reject) => {
// // // //         db.run(
// // // //           `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
// // // //           [userId],
// // // //           function(err: any) {
// // // //             if (err) return reject(err);
// // // //             resolve();
// // // //           }
// // // //         );
// // // //       });
      
// // // //       return res.json({ success: true, message: '2FA disabled successfully' });
// // // //     } else {
// // // //       return res.status(400).json({ error: 'Invalid verification code' });
// // // //     }
    
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return res.status(500).json({ error: 'Failed to disable 2FA' });
// // // //   }
// // // // });

// // // // // ============= CHECK 2FA STATUS =============
// // // // // app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
// // // // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // // // //   if (!token) {
// // // // //     return res.status(401).json({ error: 'Unauthorized' });
// // // // //   }
  
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // // //     const userId = decoded.userId;
    
// // // // //     const twoFA = await new Promise<any>((resolve) => {
// // // // //       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // // //         if (err || !row) return resolve(null);
// // // // //         resolve(row);
// // // // //       });
// // // // //     });
    
// // // // //     return res.json({ 
// // // // //       enabled: twoFA ? twoFA.enabled === 1 : false 
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     return res.status(401).json({ error: 'Invalid token' });
// // // // //   }
// // // // // });
// // // // app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
// // // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // // //   if (!token) {
// // // //     return res.status(401).json({ error: 'Unauthorized' });
// // // //   }
  
// // // //   try {
// // // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // // //     const userId = decoded.userId;
    
// // // //     const twoFA = await new Promise<any>((resolve) => {
// // // //       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // // //         if (err || !row) return resolve(null);
// // // //         resolve(row);
// // // //       });
// // // //     });
    
// // // //     return res.json({ 
// // // //       enabled: twoFA ? twoFA.enabled === 1 : false 
// // // //     });
    
// // // //   } catch (error) {
// // // //     return res.status(401).json({ error: 'Invalid token' });
// // // //   }
// // // // });
// // // // // ============= GET USER BY NAME =============
// // // // // app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
// // // // //   const userName = req.params.name;
  
// // // // //   if (!userName) {
// // // // //     return res.status(400).json({ 
// // // // //       success: false, 
// // // // //       error: 'User name is required' 
// // // // //     });
// // // // //   }

// // // // //   try {
// // // // //     // Query MySQL users table
// // // // //     const user = await new Promise<any>((resolve, reject) => {
// // // // //       db.get(
// // // // //         'SELECT id, name, email, role_id, company_id FROM users WHERE name = ?',
// // // // //         [userName],
// // // // //         (err: any, row: any) => {
// // // // //           if (err) {
// // // // //             console.error('Database error:', err);
// // // // //             return reject(err);
// // // // //           }
// // // // //           resolve(row);
// // // // //         }
// // // // //       );
// // // // //     });

// // // // //     if (!user) {
// // // // //       return res.status(404).json({ 
// // // // //         success: false, 
// // // // //         error: 'User not found' 
// // // // //       });
// // // // //     }

// // // // //     // Return user data
// // // // //     return res.json({
// // // // //       success: true,
// // // // //       user: {
// // // // //         id: user.id,
// // // // //         name: user.name,
// // // // //         email: user.email,
// // // // //         role_id: user.role_id,
// // // // //         company_id: user.company_id
// // // // //       }
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error('Error fetching user by name:', error);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       error: 'Internal server error' 
// // // // //     });
// // // // //   }
// // // // // });
// // // // // ============= GET USER BY NAME =============
// // // // app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
// // // //   const userName = req.params.name;
  
// // // //   if (!userName) {
// // // //     return res.status(400).json({ 
// // // //       success: false, 
// // // //       error: 'User name is required' 
// // // //     });
// // // //   }

// // // //   try {
// // // //     // Query MySQL users table with partial matching
// // // //     const user = await new Promise<any>((resolve, reject) => {
// // // //       db.get(
// // // //         'SELECT id, name, email, role_id, company_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
// // // //         [`%${userName}%`],
// // // //         (err: any, row: any) => {
// // // //           if (err) {
// // // //             console.error('Database error:', err);
// // // //             return reject(err);
// // // //           }
// // // //           resolve(row);
// // // //         }
// // // //       );
// // // //     });

// // // //     if (!user) {
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         error: `User "${userName}" not found` 
// // // //       });
// // // //     }

// // // //     console.log(`✅ Found user: ${user.name} (${user.email})`);

// // // //     return res.json({
// // // //       success: true,
// // // //       user: {
// // // //         id: user.id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role_id: user.role_id,
// // // //         company_id: user.company_id
// // // //       }
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error('Error fetching user by name:', error);
// // // //     return res.status(500).json({ 
// // // //       success: false, 
// // // //       error: 'Internal server error' 
// // // //     });
// // // //   }
// // // // });
// // // // app.listen(PORT, () => {
// // // //   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// // // // });
// // // import express, { type Request, type Response } from 'express';
// // // import bcrypt from 'bcryptjs';
// // // import jwt from 'jsonwebtoken';
// // // import cors from 'cors';
// // // import speakeasy from 'speakeasy';
// // // import QRCode from 'qrcode';
// // // import db from './config/db.js';
// // // import CustomerRoutes from './routes/customer.routes.js';
// // // import AuthRoutes from './routes/authRoutes.js';
// // // import invoiceRoutes from './routes/invoice.routes.js';
// // // import reportRoutes from './routes/report.routes.js';
// // // import paymentRoutes from './routes/paymentRoutes.js';
// // // import categoryRoutes from './routes/category.routes.js';
// // // import productRoutes from './routes/product.routes.js';
// // // import stockMovementRoutes from './routes/stockMovement.routes.js';
// // // import estimateRoutes from "./routes/estimate.routes.js";
// // // import projectRoutes from './routes/project.routes.js';
// // // import taxRateRoutes from './routes/taxRate.routes.js';
// // // import priceListRoutes from './routes/priceList.routes.js';
// // // import employeeRoutes from './routes/employee.routes.js';
// // // import attendanceRoutes from './routes/attendance.routes.js';
// // // import leaveRoutes from "./routes/leave.routes.js";
// // // import taskRoutes from './routes/task.routes.js';
// // // import expenseRoutes from './routes/expense.routes.js';
// // // import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
// // // import vendorRoutes from './routes/vendor.routes.js';

// // // // ✅ IMPORT EMAIL SERVICE
// // // import { sendReworkRequestEmail } from './services/emailService.js';

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;
// // // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// // // // Middleware
// // // app.use(cors({
// // //   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
// // //   credentials: true,
// // //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // //   allowedHeaders: ['Content-Type', 'Authorization']
// // // }));
// // // app.use(express.json());

// // // // Register routes
// // // app.use('/api/customers', CustomerRoutes);
// // // app.use('/api/auth', AuthRoutes);
// // // app.use('/api/invoices', invoiceRoutes);
// // // app.use('/api/reports', reportRoutes);
// // // app.use('/api/payments', paymentRoutes);
// // // app.use('/api/categories', categoryRoutes);
// // // app.use('/api/products', productRoutes);
// // // app.use('/api/stock-movements', stockMovementRoutes);
// // // app.use("/api/estimates", estimateRoutes);
// // // app.use('/api/projects', projectRoutes);
// // // app.use('/api/tax-rates', taxRateRoutes);
// // // app.use('/api/price-lists', priceListRoutes);
// // // app.use("/api/hrms/employees", employeeRoutes);
// // // app.use("/api/hrms/attendance", attendanceRoutes);
// // // app.use("/api/leaves", leaveRoutes);
// // // app.use('/api/tasks', taskRoutes);
// // // app.use('/api', expenseRoutes);
// // // app.use('/api/vendors', vendorRoutes);
// // // app.use('/api/purchase-orders', purchaseOrderRoutes);

// // // // ============= TEST ENDPOINT =============
// // // app.get('/api/test', (req: Request, res: Response) => {
// // //   res.json({ 
// // //     success: true, 
// // //     message: 'Backend is running!',
// // //     timestamp: new Date().toISOString()
// // //   });
// // // });

// // // // ============= DEBUG: GET ALL USERS =============
// // // app.get('/api/debug/users', async (req: Request, res: Response): Promise<any> => {
// // //   try {
// // //     const users = await new Promise<any[]>((resolve, reject) => {
// // //       db.all('SELECT id, name, email, role_id FROM users ORDER BY name', [], (err: any, rows: any[]) => {
// // //         if (err) {
// // //           console.error('Database error:', err);
// // //           return reject(err);
// // //         }
// // //         resolve(rows || []);
// // //       });
// // //     });
    
// // //     console.log('📋 Users in database:');
// // //     users.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
// // //     return res.json({
// // //       success: true,
// // //       count: users.length,
// // //       users: users
// // //     });
// // //   } catch (error: any) {
// // //     console.error('Error fetching users:', error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message || 'Internal server error'
// // //     });
// // //   }
// // // });

// // // // ============= GET USER EMAIL BY NAME =============
// // // app.get('/api/users/email/:name', async (req: Request, res: Response): Promise<any> => {
// // //   const userName = req.params.name;
  
// // //   if (!userName) {
// // //     return res.status(400).json({ 
// // //       success: false, 
// // //       error: 'User name is required' 
// // //     });
// // //   }

// // //   try {
// // //     const nameStr = typeof userName === 'string' ? userName.trim() : String(userName || '').trim();
    
// // //     if (!nameStr) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         error: 'Valid user name is required' 
// // //       });
// // //     }

// // //     console.log(`🔍 Looking up user: "${nameStr}"`);

// // //     const user = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// // //         [nameStr],
// // //         (err: any, row: any) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     if (!user) {
// // //       console.warn(`❌ User "${nameStr}" not found in database`);
      
// // //       const allUsers = await new Promise<any[]>((resolve, reject) => {
// // //         db.all('SELECT name, email FROM users', [], (err: any, rows: any[]) => {
// // //           if (err) return resolve([]);
// // //           resolve(rows || []);
// // //         });
// // //       });
      
// // //       console.log('📋 Available users:', allUsers.map(u => u.name).join(', '));
      
// // //       return res.status(404).json({ 
// // //         success: false, 
// // //         error: `User "${nameStr}" not found in database`,
// // //         availableUsers: allUsers.map(u => u.name)
// // //       });
// // //     }

// // //     console.log(`✅ Found user: ${user.name} (${user.email})`);
// // //     return res.json({
// // //       success: true,
// // //       user: {
// // //         id: user.id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role_id: user.role_id
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error('Error fetching user:', error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       error: 'Internal server error' 
// // //     });
// // //   }
// // // });

// // // // ============= REWORK EMAIL ENDPOINT =============
// // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // //   try {
// // //     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // //     console.log('📧 Rework email request:');
// // //     console.log('  Developer Name:', developerName);
// // //     console.log('  Tester Email:', testerEmail);

// // //     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Missing required fields' 
// // //       });
// // //     }

// // //     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
// // //     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
// // //     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
// // //     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
// // //     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

// // //     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Invalid fields provided' 
// // //       });
// // //     }

// // //     console.log(`🔍 Looking up developer: "${devName}"`);
    
// // //     const developer = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// // //         [devName],
// // //         (err: any, row: any) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     if (!developer) {
// // //       console.error(`❌ Developer "${devName}" not found in database`);
      
// // //       const allUsers = await new Promise<any[]>((resolve, reject) => {
// // //         db.all('SELECT name, email FROM users', [], (err: any, rows: any[]) => {
// // //           if (err) return resolve([]);
// // //           resolve(rows || []);
// // //         });
// // //       });
      
// // //       return res.status(404).json({ 
// // //         success: false, 
// // //         message: `Developer "${devName}" not found in database. Available: ${allUsers.map(u => u.name).join(', ')}`,
// // //         availableUsers: allUsers.map(u => u.name)
// // //       });
// // //     }

// // //     console.log(`✅ Found developer: ${developer.name} (${developer.email})`);

// // //     if (!developer.email) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: `Developer "${developer.name}" has no email in database` 
// // //       });
// // //     }

// // //     if (developer.email === testerEmailStr) {
// // //       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Cannot send email to yourself' 
// // //       });
// // //     }

// // //     console.log('📧 Sending rework email...');
// // //     console.log('  From (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
// // //     console.log('  To (Developer from DB):', developer.email);

// // //     const result = await sendReworkRequestEmail({
// // //       toEmail: developer.email,
// // //       toName: developer.name,
// // //       taskTitle: taskTitleStr,
// // //       reworkNotes: reworkNotesStr,
// // //       fromName: testerNameStr,
// // //       fromEmail: testerEmailStr
// // //     });

// // //     if (result) {
// // //       console.log(`✅ Email sent successfully to: ${developer.email}`);
// // //       return res.json({ 
// // //         success: true, 
// // //         message: `Email sent successfully to ${developer.name} (${developer.email})`,
// // //         developer: {
// // //           id: developer.id,
// // //           name: developer.name,
// // //           email: developer.email
// // //         }
// // //       });
// // //     } else {
// // //       return res.status(500).json({ 
// // //         success: false, 
// // //         message: 'Failed to send email to developer' 
// // //       });
// // //     }
// // //   } catch (error: any) {
// // //     console.error('❌ Error in send-rework-email:', error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       message: error.message || 'Failed to send email' 
// // //     });
// // //   }
// // // });

// // // // ============= ADD DEVELOPER API =============
// // // app.post('/api/add-developer', async (req: Request, res: Response): Promise<any> => {
// // //   try {
// // //     const { name, email } = req.body;
    
// // //     if (!name || !email) {
// // //       return res.status(400).json({ error: 'Name and email required' });
// // //     }
    
// // //     const existing = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         'SELECT id FROM users WHERE email = ? OR LOWER(name) = LOWER(?)',
// // //         [email, name],
// // //         (err: any, row: any) => {
// // //           if (err) return reject(err);
// // //           resolve(row);
// // //         }
// // //       );
// // //     });
    
// // //     if (existing) {
// // //       return res.json({ success: true, message: `User ${name} already exists` });
// // //     }
    
// // //     const hashedPassword = await bcrypt.hash('password123', 10);
    
// // //     await new Promise<void>((resolve, reject) => {
// // //       db.run(
// // //         'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
// // //         [name, email, hashedPassword, 2, 1],
// // //         function(err: any) {
// // //           if (err) return reject(err);
// // //           resolve();
// // //         }
// // //       );
// // //     });
    
// // //     console.log(`✅ Added developer: ${name} (${email})`);
// // //     return res.json({ 
// // //       success: true, 
// // //       message: `Developer ${name} added successfully with email ${email}` 
// // //     });
    
// // //   } catch (error: any) {
// // //     console.error('Error adding developer:', error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       error: error.message || 'Failed to add developer' 
// // //     });
// // //   }
// // // });

// // // // Interfaces
// // // interface RegisterBody {
// // //   company_name?: string; 
// // //   admin_name?: string;   
// // //   email?: string;
// // //   password?: string;
// // // }

// // // interface LoginBody {
// // //   email?: string;
// // //   password?: string;
// // //   twoFACode?: string;
// // // }

// // // interface ResetPasswordBody {
// // //   token?: string;
// // //   newPassword?: string;
// // // }

// // // interface JWTPayload {
// // //   userId: string | number;
// // //   companyId: number;
// // //   roleId: number;
// // //   email?: string;
// // //   purpose?: string;
// // // }

// // // // ============= REGISTER API =============
// // // app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
// // //   const { company_name, admin_name, email, password } = req.body;
// // //   console.log("Registration data:", req.body);

// // //   if (!company_name || !email || !password || !admin_name) {
// // //     return res.status(400).json({ error: 'All fields required' });
// // //   }

// // //   try {
// // //     const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

// // //     const existingCompany = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });

// // //     if (existingCompany) {
// // //       return res.status(400).json({ error: 'Company already exists' });
// // //     }

// // //     const existingUser = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });

// // //     if (existingUser) {
// // //       return res.status(400).json({ error: 'Email already registered' });
// // //     }

// // //     const companyId = await new Promise<number>((resolve, reject) => {
// // //       db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
// // //         [company_name, subdomain], 
// // //         function(this: any, err: any) {
// // //           if (err) return reject(err);
// // //           const id = this?.lastID ?? 0;
// // //           resolve(id);
// // //         });
// // //     });

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     await new Promise<void>((resolve, reject) => {
// // //       db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
// // //         [companyId, email, hashedPassword, admin_name, 1],
// // //         function(err: any) {
// // //           if (err) return reject(err);
// // //           resolve();
// // //         });
// // //     });

// // //     const token = jwt.sign(
// // //       { userId: email, companyId: companyId, roleId: 1 },
// // //       JWT_SECRET,
// // //       { expiresIn: '7d' }
// // //     );

// // //     return res.json({ 
// // //       success: true, 
// // //       token, 
// // //       company: { id: companyId, name: company_name, subdomain } 
// // //     });

// // //   } catch (error: any) {
// // //     console.error(error);
// // //     return res.status(500).json({ error: 'Server error during registration' });
// // //   }
// // // });

// // // // ============= LOGIN API =============
// // // app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
// // //   const { email, password, twoFACode } = req.body;
  
// // //   if (!email || !password) {
// // //     return res.status(400).json({ error: 'Email and password required' });
// // //   }
  
// // //   try {
// // //     console.log(`🔍 Login attempt for: ${email}`);
    
// // //     const user = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         `SELECT users.*, companies.company_name, companies.subdomain 
// // //         FROM users 
// // //         JOIN companies ON users.company_id = companies.id 
// // //         WHERE users.email = ?`,
// // //         [email],
// // //         (err: any, row: any) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });
    
// // //     if (!user) {
// // //       console.warn(`❌ User not found: ${email}`);
// // //       return res.status(401).json({ error: 'Invalid credentials' });
// // //     }
    
// // //     const validPassword = await bcrypt.compare(password, user.password);
// // //     if (!validPassword) {
// // //       console.warn(`❌ Invalid password for: ${email}`);
// // //       return res.status(401).json({ error: 'Invalid credentials' });
// // //     }
    
// // //     console.log(`✅ Login successful for: ${email}`);
    
// // //     const twoFA = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });
    
// // //     if (twoFA && twoFA.enabled === 1) {
// // //       if (!twoFACode) {
// // //         return res.status(401).json({ 
// // //           error: '2FA required',
// // //           requires2FA: true,
// // //           userId: user.id
// // //         });
// // //       }
      
// // //       const verified = speakeasy.totp.verify({
// // //         secret: twoFA.secret,
// // //         encoding: 'base32',
// // //         token: twoFACode,
// // //         window: 1
// // //       });
      
// // //       if (!verified) {
// // //         return res.status(401).json({ error: 'Invalid 2FA code' });
// // //       }
// // //     }
    
// // //     const token = jwt.sign(
// // //       { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
// // //       JWT_SECRET,
// // //       { expiresIn: '7d' }
// // //     );
    
// // //     return res.json({
// // //       success: true,
// // //       token,
// // //       user: {
// // //         id: user.id,
// // //         name: user.name,
// // //         email: user.email,
// // //         roleId: user.role_id
// // //       },
// // //       company: {
// // //         id: user.company_id,
// // //         name: user.company_name,
// // //         subdomain: user.subdomain
// // //       },
// // //       twoFAEnabled: twoFA && twoFA.enabled === 1
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     return res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // // ============= VERIFY TOKEN API =============
// // // app.get('/api/verify', (req: Request, res: Response): any => {
// // //   const token = req.headers['authorization']?.split(' ')[1];

// // //   if (!token) {
// // //     return res.status(401).json({ error: 'No token provided' });
// // //   }

// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET);
// // //     return res.json({ valid: true, user: decoded });
// // //   } catch (error) {
// // //     return res.status(401).json({ error: 'Invalid token' });
// // //   }
// // // });

// // // // ============= FORGOT PASSWORD API =============
// // // app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
// // //   const { email } = req.body;

// // //   if (!email) {
// // //     return res.status(400).json({ error: 'Email is required' });
// // //   }

// // //   try {
// // //     const user = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });

// // //     if (!user) {
// // //       return res.json({
// // //         success: true,
// // //         message: 'If this email exists, a reset token has been generated.'
// // //       });
// // //     }

// // //     const resetToken = jwt.sign(
// // //       { email: user.email, purpose: 'password-reset' },
// // //       JWT_SECRET,
// // //       { expiresIn: '15m' }
// // //     );

// // //     return res.json({
// // //       success: true,
// // //       message: 'Password reset token generated.',
// // //       resetToken
// // //     });

// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // // ============= RESET PASSWORD API =============
// // // app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
// // //   const { token, newPassword } = req.body;

// // //   if (!token || !newPassword) {
// // //     return res.status(400).json({ error: 'Reset token and new password are required' });
// // //   }

// // //   if (newPassword.length < 6) {
// // //     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
// // //   }

// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

// // //     if (decoded.purpose !== 'password-reset' || !decoded.email) {
// // //       return res.status(401).json({ error: 'Invalid reset token' });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// // //     await new Promise<number>((resolve, reject) => {
// // //       db.run(
// // //         'UPDATE users SET password = ? WHERE email = ?',
// // //         [hashedPassword, decoded.email],
// // //         function (this: any, err: any) {
// // //           if (err) return reject(err);
// // //           const changes = this?.changes || 0;
// // //           resolve(changes);
// // //         }
// // //       );
// // //     });

// // //     return res.json({ success: true, message: 'Password updated successfully' });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(401).json({ error: 'Invalid or expired reset token' });
// // //   }
// // // });

// // // // ============= 2FA ENDPOINTS =============
// // // app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
// // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // //   if (!token) {
// // //     return res.status(401).json({ error: 'Unauthorized' });
// // //   }
  
// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // //     const userId = decoded.userId;
    
// // //     const secret = speakeasy.generateSecret({
// // //       name: `BusinessOS:${decoded.email || userId}`
// // //     });
    
// // //     if(!secret.otpauth_url) {
// // //       return res.status(500).json({ error: 'Could not generate QR Code URI' });
// // //     }

// // //     const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
// // //     await new Promise<void>((resolve, reject) => {
// // //       db.run(
// // //         `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
// // //          ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
// // //         [userId, secret.base32],
// // //         function(err: any) {
// // //           if (err) return reject(err);
// // //           resolve();
// // //         }
// // //       );
// // //     });
    
// // //     return res.json({
// // //       success: true,
// // //       secret: secret.base32,
// // //       qrCode: qrCodeDataUrl,
// // //       otpauth_url: secret.otpauth_url
// // //     });
    
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ error: 'Failed to setup 2FA' });
// // //   }
// // // });

// // // app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // //   const token = req.headers['authorization']?.split(' ')[1];
// // //   const { code } = req.body;
  
// // //   if (!token || !code) {
// // //     return res.status(400).json({ error: 'Token and code required' });
// // //   }
  
// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // //     const userId = decoded.userId;
    
// // //     const twoFA = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });
    
// // //     if (!twoFA) {
// // //       return res.status(400).json({ error: '2FA not setup' });
// // //     }
    
// // //     const verified = speakeasy.totp.verify({
// // //       secret: twoFA.secret,
// // //       encoding: 'base32',
// // //       token: code,
// // //       window: 1
// // //     });
    
// // //     if (verified) {
// // //       await new Promise<void>((resolve, reject) => {
// // //         db.run(
// // //           `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
// // //           [userId],
// // //           function(err: any) {
// // //             if (err) return reject(err);
// // //             resolve();
// // //           }
// // //         );
// // //       });
      
// // //       return res.json({ success: true, message: '2FA enabled successfully' });
// // //     } else {
// // //       return res.status(400).json({ error: 'Invalid verification code' });
// // //     }
    
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ error: 'Verification failed' });
// // //   }
// // // });

// // // app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// // //   const token = req.headers['authorization']?.split(' ')[1];
// // //   const { code } = req.body;
  
// // //   if (!token || !code) {
// // //     return res.status(400).json({ error: 'Token and code required' });
// // //   }
  
// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // //     const userId = decoded.userId;
    
// // //     const twoFA = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });
    
// // //     if (!twoFA || !twoFA.enabled) {
// // //       return res.status(400).json({ error: '2FA is not enabled' });
// // //     }
    
// // //     const verified = speakeasy.totp.verify({
// // //       secret: twoFA.secret,
// // //       encoding: 'base32',
// // //       token: code,
// // //       window: 1
// // //     });
    
// // //     if (verified) {
// // //       await new Promise<void>((resolve, reject) => {
// // //         db.run(
// // //           `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
// // //           [userId],
// // //           function(err: any) {
// // //             if (err) return reject(err);
// // //             resolve();
// // //           }
// // //         );
// // //       });
      
// // //       return res.json({ success: true, message: '2FA disabled successfully' });
// // //     } else {
// // //       return res.status(400).json({ error: 'Invalid verification code' });
// // //     }
    
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ error: 'Failed to disable 2FA' });
// // //   }
// // // });

// // // app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
// // //   const token = req.headers['authorization']?.split(' ')[1];
  
// // //   if (!token) {
// // //     return res.status(401).json({ error: 'Unauthorized' });
// // //   }
  
// // //   try {
// // //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// // //     const userId = decoded.userId;
    
// // //     const twoFA = await new Promise<any>((resolve, reject) => {
// // //       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// // //         if (err) return reject(err);
// // //         resolve(row);
// // //       });
// // //     });
    
// // //     return res.json({ 
// // //       enabled: twoFA ? twoFA.enabled === 1 : false 
// // //     });
    
// // //   } catch (error) {
// // //     return res.status(401).json({ error: 'Invalid token' });
// // //   }
// // // });

// // // // ============= GET USER BY NAME =============
// // // app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
// // //   const userName = req.params.name;
  
// // //   if (!userName) {
// // //     return res.status(400).json({ 
// // //       success: false, 
// // //       error: 'User name is required' 
// // //     });
// // //   }

// // //   try {
// // //     const user = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         'SELECT id, name, email, role_id, company_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
// // //         [`%${userName}%`],
// // //         (err: any, row: any) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     if (!user) {
// // //       return res.status(404).json({ 
// // //         success: false, 
// // //         error: `User "${userName}" not found` 
// // //       });
// // //     }

// // //     console.log(`✅ Found user: ${user.name} (${user.email})`);

// // //     return res.json({
// // //       success: true,
// // //       user: {
// // //         id: user.id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role_id: user.role_id,
// // //         company_id: user.company_id
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error('Error fetching user by name:', error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       error: 'Internal server error' 
// // //     });
// // //   }
// // // });

// // // // Start server
// // // app.listen(PORT, () => {
// // //   console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
// // //   console.log(`📧 Test endpoint: http://localhost:${PORT}/api/test`);
// // //   console.log(`📋 Users endpoint: http://localhost:${PORT}/api/debug/users`);
// // //   console.log(`\n📝 Login with: test@gmail.com / password123`);
// // //   console.log(`\n📧 Email Service: Using SMTP ${process.env.SMTP_USER}`);
// // // });

// // // export default app;
// // import express, { type Request, type Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import cors from 'cors';
// // import speakeasy from 'speakeasy';
// // import QRCode from 'qrcode';
// // import db from './config/db.js';
// // import CustomerRoutes from './routes/customer.routes.js';
// // import AuthRoutes from './routes/authRoutes.js';
// // import invoiceRoutes from './routes/invoice.routes.js';
// // import reportRoutes from './routes/report.routes.js';
// // import paymentRoutes from './routes/paymentRoutes.js';
// // import categoryRoutes from './routes/category.routes.js';
// // import productRoutes from './routes/product.routes.js';
// // import stockMovementRoutes from './routes/stockMovement.routes.js';
// // import estimateRoutes from "./routes/estimate.routes.js";
// // import projectRoutes from './routes/project.routes.js';
// // import taxRateRoutes from './routes/taxRate.routes.js';
// // import priceListRoutes from './routes/priceList.routes.js';
// // import employeeRoutes from './routes/employee.routes.js';
// // import attendanceRoutes from './routes/attendance.routes.js';
// // import leaveRoutes from "./routes/leave.routes.js";
// // import taskRoutes from './routes/task.routes.js';
// // import expenseRoutes from './routes/expense.routes.js';
// // import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
// // import vendorRoutes from './routes/vendor.routes.js';

// // // ✅ IMPORT EMAIL SERVICE
// // import { sendReworkRequestEmail } from './services/emailService.js';

// // const app = express();
// // const PORT = process.env.PORT || 5000;
// // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// // // Middleware
// // app.use(cors({
// //   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
// //   credentials: true
// // }));
// // app.use(express.json());

// // // Register routes
// // app.use('/api/customers', CustomerRoutes);
// // app.use('/api/auth', AuthRoutes);
// // app.use('/api/invoices', invoiceRoutes);
// // app.use('/api/reports', reportRoutes);
// // app.use('/api/payments', paymentRoutes);
// // app.use('/api/categories', categoryRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/stock-movements', stockMovementRoutes);
// // app.use("/api/estimates", estimateRoutes);
// // app.use('/api/projects', projectRoutes);
// // app.use('/api/tax-rates', taxRateRoutes);
// // app.use('/api/price-lists', priceListRoutes);
// // app.use("/api/hrms/employees", employeeRoutes);
// // app.use("/api/hrms/attendance", attendanceRoutes);
// // app.use("/api/leaves", leaveRoutes);
// // app.use('/api/tasks', taskRoutes);
// // app.use('/api', expenseRoutes);
// // app.use('/api/vendors', vendorRoutes);
// // app.use('/api/purchase-orders', purchaseOrderRoutes);

// // // ============= TEST ENDPOINT =============
// // app.get('/api/test', (req: Request, res: Response) => {
// //   res.json({ 
// //     success: true, 
// //     message: 'Backend is running!',
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // // ============= DEBUG: GET ALL USERS =============
// // app.get('/api/debug/users', async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const users = await new Promise<any[]>((resolve, reject) => {
// //       db.all('SELECT id, name, email, role_id FROM users ORDER BY name', [], (err: any, rows: any[]) => {
// //         if (err) {
// //           console.error('Database error:', err);
// //           return reject(err);
// //         }
// //         resolve(rows || []);
// //       });
// //     });
    
// //     console.log('📋 Users in database:');
// //     users.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
// //     return res.json({
// //       success: true,
// //       count: users.length,
// //       users: users
// //     });
// //   } catch (error: any) {
// //     console.error('Error fetching users:', error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message || 'Internal server error'
// //     });
// //   }
// // });

// // // ============= GET USER EMAIL BY NAME =============
// // app.get('/api/users/email/:name', async (req: Request, res: Response): Promise<any> => {
// //   const userName = req.params.name;
  
// //   if (!userName) {
// //     return res.status(400).json({ 
// //       success: false, 
// //       error: 'User name is required' 
// //     });
// //   }

// //   try {
// //     const nameStr = typeof userName === 'string' ? userName.trim() : String(userName || '').trim();
    
// //     if (!nameStr) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         error: 'Valid user name is required' 
// //       });
// //     }

// //     console.log(`🔍 Looking up user: "${nameStr}"`);

// //     const user = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// //         [nameStr],
// //         (err: any, row: any) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });

// //     if (!user) {
// //       console.warn(`❌ User "${nameStr}" not found in database`);
      
// //       const allUsers = await new Promise<any[]>((resolve, reject) => {
// //         db.all('SELECT name, email FROM users', [], (err: any, rows: any[]) => {
// //           if (err) return resolve([]);
// //           resolve(rows || []);
// //         });
// //       });
      
// //       console.log('📋 Available users:', allUsers.map(u => u.name).join(', '));
      
// //       return res.status(404).json({ 
// //         success: false, 
// //         error: `User "${nameStr}" not found in database`,
// //         availableUsers: allUsers.map(u => u.name)
// //       });
// //     }

// //     console.log(`✅ Found user: ${user.name} (${user.email})`);
// //     return res.json({
// //       success: true,
// //       user: {
// //         id: user.id,
// //         name: user.name,
// //         email: user.email,
// //         role_id: user.role_id
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error('Error fetching user:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       error: 'Internal server error' 
// //     });
// //   }
// // });

// // // ============= REWORK EMAIL ENDPOINT =============
// // // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// // //   try {
// // //     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// // //     console.log('📧 Rework email request:');
// // //     console.log('  Developer Name:', developerName);
// // //     console.log('  Tester Email:', testerEmail);

// // //     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Missing required fields' 
// // //       });
// // //     }

// // //     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
// // //     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
// // //     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
// // //     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
// // //     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

// // //     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Invalid fields provided' 
// // //       });
// // //     }

// // //     console.log(`🔍 Looking up developer: "${devName}"`);
    
// // //     // ✅ Step 1: Try exact match
// // //     let developer = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// // //         [devName],
// // //         (err: any, row: any) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     // ✅ Step 2: If not found, try partial match
// // //     if (!developer) {
// // //       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
// // //       developer = await new Promise<any>((resolve, reject) => {
// // //         db.get(
// // //           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
// // //           [`%${devName}%`],
// // //           (err: any, row: any) => {
// // //             if (err) {
// // //               console.error('Database error:', err);
// // //               return reject(err);
// // //             }
// // //             resolve(row);
// // //           }
// // //         );
// // //       });
// // //     }

// // //     // ✅ Step 3: If still not found, generate email from name
// // //     if (!developer) {
// // //       console.warn(`❌ Developer "${devName}" not found in database`);
      
// // //       // ✅ Generate email from name (e.g., "muthu" -> "muthu@gmail.com")
// // //       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
// // //       console.log(`📧 Generated email for "${devName}": ${generatedEmail}`);
      
// // //       // Send email with generated email
// // //       console.log('📧 Sending rework email...');
// // //       console.log('  From (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
// // //       console.log('  To (Generated):', generatedEmail);

// // //       const result = await sendReworkRequestEmail({
// // //         toEmail: generatedEmail,        // ✅ Generated email
// // //         toName: devName,
// // //         taskTitle: taskTitleStr,
// // //         reworkNotes: reworkNotesStr,
// // //         fromName: testerNameStr,
// // //         fromEmail: testerEmailStr
// // //       });

// // //       if (result) {
// // //         console.log(`✅ Email sent successfully to: ${generatedEmail}`);
// // //         return res.json({ 
// // //           success: true, 
// // //           message: `Email sent successfully to ${devName} (${generatedEmail})`,
// // //           developer: {
// // //             name: devName,
// // //             email: generatedEmail
// // //           }
// // //         });
// // //       } else {
// // //         return res.status(500).json({ 
// // //           success: false, 
// // //           message: 'Failed to send email to developer' 
// // //         });
// // //       }
// // //     }

// // //     console.log(`✅ Found developer in DB: ${developer.name} (${developer.email})`);

// // //     if (!developer.email) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: `Developer "${developer.name}" has no email in database` 
// // //       });
// // //     }

// // //     if (developer.email === testerEmailStr) {
// // //       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: 'Cannot send email to yourself' 
// // //       });
// // //     }

// // //     // ✅ Send email - FROM always SMTP user, TO = developer from database
// // //     console.log('📧 Sending rework email...');
// // //     console.log('  From (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
// // //     console.log('  To (Developer from DB):', developer.email);

// // //     const result = await sendReworkRequestEmail({
// // //       toEmail: developer.email,        // ✅ FROM DATABASE
// // //       toName: developer.name,
// // //       taskTitle: taskTitleStr,
// // //       reworkNotes: reworkNotesStr,
// // //       fromName: testerNameStr,
// // //       fromEmail: testerEmailStr
// // //     });

// // //     if (result) {
// // //       console.log(`✅ Email sent successfully to: ${developer.email}`);
// // //       return res.json({ 
// // //         success: true, 
// // //         message: `Email sent successfully to ${developer.name} (${developer.email})`,
// // //         developer: {
// // //           id: developer.id,
// // //           name: developer.name,
// // //           email: developer.email
// // //         }
// // //       });
// // //     } else {
// // //       return res.status(500).json({ 
// // //         success: false, 
// // //         message: 'Failed to send email to developer' 
// // //       });
// // //     }
// // //   } catch (error: any) {
// // //     console.error('❌ Error in send-rework-email:', error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       message: error.message || 'Failed to send email' 
// // //     });
// // //   }
// // // });
// // // ============= REWORK EMAIL ENDPOINT =============
// // app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

// //     console.log('📧 Rework email request:');
// //     console.log('  Developer Name:', developerName);
// //     console.log('  Tester Email:', testerEmail);

// //     // ✅ Validate required fields
// //     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: 'Missing required fields' 
// //       });
// //     }

// //     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
// //     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
// //     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
// //     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
// //     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

// //     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: 'Invalid fields provided' 
// //       });
// //     }

// //     console.log(`🔍 Looking up developer: "${devName}"`);
    
// //     // ✅ Step 1: Try exact match in database
// //     let developer = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
// //         [devName],
// //         (err: any, row: any) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });

// //     // ✅ Step 2: If not found, try partial match
// //     if (!developer) {
// //       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
// //       developer = await new Promise<any>((resolve, reject) => {
// //         db.get(
// //           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
// //           [`%${devName}%`],
// //           (err: any, row: any) => {
// //             if (err) {
// //               console.error('Database error:', err);
// //               return reject(err);
// //             }
// //             resolve(row);
// //           }
// //         );
// //       });
// //     }

// //     let developerEmail: string;
// //     let developerNameFromDB: string;

// //     // ✅ Step 3: If still not found, generate email from name
// //     if (!developer) {
// //       console.warn(`❌ Developer "${devName}" not found in database`);
      
// //       // ✅ Generate email from name (e.g., "Ramya" -> "ramya@gmail.com")
// //       developerEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
// //       developerNameFromDB = devName;
      
// //       console.log(`📧 Generated email for "${devName}": ${developerEmail}`);
// //     } else {
// //       developerEmail = developer.email;
// //       developerNameFromDB = developer.name;
// //       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
// //     }

// //     // ✅ Validate developer email
// //     if (!developerEmail) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: `Developer "${developerNameFromDB}" has no email` 
// //       });
// //     }

// //     // ✅ Don't send if tester and developer have same email
// //     if (developerEmail === testerEmailStr) {
// //       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: 'Cannot send email to yourself' 
// //       });
// //     }

// //     // ✅ Send email - FROM is always SMTP user (subasrimuthumanickam@gmail.com)
// //     console.log('📧 Sending rework email...');
// //     console.log('  FROM (SMTP): subasrimuthumanickam@gmail.com');
// //     console.log('  TO (Developer):', developerEmail);
// //     console.log('  REPLY-TO (Tester):', testerEmailStr);

// //     const result = await sendReworkRequestEmail({
// //       toEmail: developerEmail,        // ✅ Developer email
// //       toName: developerNameFromDB,    // ✅ Developer name
// //       taskTitle: taskTitleStr,
// //       reworkNotes: reworkNotesStr,
// //       fromName: testerNameStr,        // ✅ Tester name
// //       fromEmail: testerEmailStr       // ✅ Tester email (for reply-to)
// //     });

// //     if (result) {
// //       console.log(`✅ Email sent successfully to: ${developerEmail}`);
// //       return res.json({ 
// //         success: true, 
// //         message: `Email sent successfully to ${developerNameFromDB} (${developerEmail})`,
// //         developer: {
// //           name: developerNameFromDB,
// //           email: developerEmail
// //         }
// //       });
// //     } else {
// //       return res.status(500).json({ 
// //         success: false, 
// //         message: 'Failed to send email to developer' 
// //       });
// //     }
// //   } catch (error: any) {
// //     console.error('❌ Error in send-rework-email:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       message: error.message || 'Failed to send email' 
// //     });
// //   }
// // });
// // // ============= ADD DEVELOPER API =============
// // app.post('/api/add-developer', async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { name, email } = req.body;
    
// //     if (!name || !email) {
// //       return res.status(400).json({ error: 'Name and email required' });
// //     }
    
// //     const existing = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         'SELECT id FROM users WHERE email = ? OR LOWER(name) = LOWER(?)',
// //         [email, name],
// //         (err: any, row: any) => {
// //           if (err) return reject(err);
// //           resolve(row);
// //         }
// //       );
// //     });
    
// //     if (existing) {
// //       return res.json({ success: true, message: `User ${name} already exists` });
// //     }
    
// //     const hashedPassword = await bcrypt.hash('password123', 10);
    
// //     await new Promise<void>((resolve, reject) => {
// //       db.run(
// //         'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
// //         [name, email, hashedPassword, 2, 1],
// //         function(err: any) {
// //           if (err) return reject(err);
// //           resolve();
// //         }
// //       );
// //     });
    
// //     console.log(`✅ Added developer: ${name} (${email})`);
// //     return res.json({ 
// //       success: true, 
// //       message: `Developer ${name} added successfully with email ${email}` 
// //     });
    
// //   } catch (error: any) {
// //     console.error('Error adding developer:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       error: error.message || 'Failed to add developer' 
// //     });
// //   }
// // });

// // // ============= QUICK ADD DEVELOPER (Auto-generate email) =============
// // app.post('/api/quick-add-developer', async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { name } = req.body;
    
// //     if (!name) {
// //       return res.status(400).json({ error: 'Name is required' });
// //     }

// //     // Generate email from name
// //     const generatedEmail = `${name.toLowerCase().replace(/\s/g, '')}@gmail.com`;
    
// //     const existing = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         'SELECT id FROM users WHERE LOWER(name) = LOWER(?) OR email = ?',
// //         [name, generatedEmail],
// //         (err: any, row: any) => {
// //           if (err) return reject(err);
// //           resolve(row);
// //         }
// //       );
// //     });
    
// //     if (existing) {
// //       return res.json({ 
// //         success: true, 
// //         message: `User ${name} already exists with email ${generatedEmail}`,
// //         email: generatedEmail
// //       });
// //     }
    
// //     const hashedPassword = await bcrypt.hash('password123', 10);
    
// //     await new Promise<void>((resolve, reject) => {
// //       db.run(
// //         'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
// //         [name, generatedEmail, hashedPassword, 2, 1],
// //         function(err: any) {
// //           if (err) return reject(err);
// //           resolve();
// //         }
// //       );
// //     });
    
// //     console.log(`✅ Added developer: ${name} (${generatedEmail})`);
// //     return res.json({ 
// //       success: true, 
// //       message: `Developer ${name} added successfully with email ${generatedEmail}`,
// //       email: generatedEmail
// //     });
    
// //   } catch (error: any) {
// //     console.error('Error adding developer:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       error: error.message || 'Failed to add developer' 
// //     });
// //   }
// // });

// // // Interfaces
// // interface RegisterBody {
// //   company_name?: string; 
// //   admin_name?: string;   
// //   email?: string;
// //   password?: string;
// // }

// // interface LoginBody {
// //   email?: string;
// //   password?: string;
// //   twoFACode?: string;
// // }

// // interface ResetPasswordBody {
// //   token?: string;
// //   newPassword?: string;
// // }

// // interface JWTPayload {
// //   userId: string | number;
// //   companyId: number;
// //   roleId: number;
// //   email?: string;
// //   purpose?: string;
// // }

// // // ============= REGISTER API =============
// // app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
// //   const { company_name, admin_name, email, password } = req.body;
// //   console.log("Registration data:", req.body);

// //   if (!company_name || !email || !password || !admin_name) {
// //     return res.status(400).json({ error: 'All fields required' });
// //   }

// //   try {
// //     const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

// //     const existingCompany = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });

// //     if (existingCompany) {
// //       return res.status(400).json({ error: 'Company already exists' });
// //     }

// //     const existingUser = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });

// //     if (existingUser) {
// //       return res.status(400).json({ error: 'Email already registered' });
// //     }

// //     const companyId = await new Promise<number>((resolve, reject) => {
// //       db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
// //         [company_name, subdomain], 
// //         function(this: any, err: any) {
// //           if (err) return reject(err);
// //           const id = this?.lastID ?? 0;
// //           resolve(id);
// //         });
// //     });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     await new Promise<void>((resolve, reject) => {
// //       db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
// //         [companyId, email, hashedPassword, admin_name, 1],
// //         function(err: any) {
// //           if (err) return reject(err);
// //           resolve();
// //         });
// //     });

// //     const token = jwt.sign(
// //       { userId: email, companyId: companyId, roleId: 1 },
// //       JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );

// //     return res.json({ 
// //       success: true, 
// //       token, 
// //       company: { id: companyId, name: company_name, subdomain } 
// //     });

// //   } catch (error: any) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Server error during registration' });
// //   }
// // });

// // // ============= LOGIN API =============
// // app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
// //   const { email, password, twoFACode } = req.body;
  
// //   if (!email || !password) {
// //     return res.status(400).json({ error: 'Email and password required' });
// //   }
  
// //   try {
// //     console.log(`🔍 Login attempt for: ${email}`);
    
// //     const user = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         `SELECT users.*, companies.company_name, companies.subdomain 
// //         FROM users 
// //         JOIN companies ON users.company_id = companies.id 
// //         WHERE users.email = ?`,
// //         [email],
// //         (err: any, row: any) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });
    
// //     if (!user) {
// //       console.warn(`❌ User not found: ${email}`);
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }
    
// //     const validPassword = await bcrypt.compare(password, user.password);
// //     if (!validPassword) {
// //       console.warn(`❌ Invalid password for: ${email}`);
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }
    
// //     console.log(`✅ Login successful for: ${email}`);
    
// //     const twoFA = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });
    
// //     if (twoFA && twoFA.enabled === 1) {
// //       if (!twoFACode) {
// //         return res.status(401).json({ 
// //           error: '2FA required',
// //           requires2FA: true,
// //           userId: user.id
// //         });
// //       }
      
// //       const verified = speakeasy.totp.verify({
// //         secret: twoFA.secret,
// //         encoding: 'base32',
// //         token: twoFACode,
// //         window: 1
// //       });
      
// //       if (!verified) {
// //         return res.status(401).json({ error: 'Invalid 2FA code' });
// //       }
// //     }
    
// //     const token = jwt.sign(
// //       { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
// //       JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );
    
// //     return res.json({
// //       success: true,
// //       token,
// //       user: {
// //         id: user.id,
// //         name: user.name,
// //         email: user.email,
// //         roleId: user.role_id
// //       },
// //       company: {
// //         id: user.company_id,
// //         name: user.company_name,
// //         subdomain: user.subdomain
// //       },
// //       twoFAEnabled: twoFA && twoFA.enabled === 1
// //     });
    
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // ============= VERIFY TOKEN API =============
// // app.get('/api/verify', (req: Request, res: Response): any => {
// //   const token = req.headers['authorization']?.split(' ')[1];

// //   if (!token) {
// //     return res.status(401).json({ error: 'No token provided' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     return res.json({ valid: true, user: decoded });
// //   } catch (error) {
// //     return res.status(401).json({ error: 'Invalid token' });
// //   }
// // });

// // // ============= FORGOT PASSWORD API =============
// // app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
// //   const { email } = req.body;

// //   if (!email) {
// //     return res.status(400).json({ error: 'Email is required' });
// //   }

// //   try {
// //     const user = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });

// //     if (!user) {
// //       return res.json({
// //         success: true,
// //         message: 'If this email exists, a reset token has been generated.'
// //       });
// //     }

// //     const resetToken = jwt.sign(
// //       { email: user.email, purpose: 'password-reset' },
// //       JWT_SECRET,
// //       { expiresIn: '15m' }
// //     );

// //     return res.json({
// //       success: true,
// //       message: 'Password reset token generated.',
// //       resetToken
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // ============= RESET PASSWORD API =============
// // app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
// //   const { token, newPassword } = req.body;

// //   if (!token || !newPassword) {
// //     return res.status(400).json({ error: 'Reset token and new password are required' });
// //   }

// //   if (newPassword.length < 6) {
// //     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

// //     if (decoded.purpose !== 'password-reset' || !decoded.email) {
// //       return res.status(401).json({ error: 'Invalid reset token' });
// //     }

// //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// //     await new Promise<number>((resolve, reject) => {
// //       db.run(
// //         'UPDATE users SET password = ? WHERE email = ?',
// //         [hashedPassword, decoded.email],
// //         function (this: any, err: any) {
// //           if (err) return reject(err);
// //           const changes = this?.changes || 0;
// //           resolve(changes);
// //         }
// //       );
// //     });

// //     return res.json({ success: true, message: 'Password updated successfully' });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(401).json({ error: 'Invalid or expired reset token' });
// //   }
// // });

// // // ============= 2FA ENDPOINTS =============
// // app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
// //   const token = req.headers['authorization']?.split(' ')[1];
  
// //   if (!token) {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }
  
// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// //     const userId = decoded.userId;
    
// //     const secret = speakeasy.generateSecret({
// //       name: `BusinessOS:${decoded.email || userId}`
// //     });
    
// //     if(!secret.otpauth_url) {
// //       return res.status(500).json({ error: 'Could not generate QR Code URI' });
// //     }

// //     const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
// //     await new Promise<void>((resolve, reject) => {
// //       db.run(
// //         `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
// //          ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
// //         [userId, secret.base32],
// //         function(err: any) {
// //           if (err) return reject(err);
// //           resolve();
// //         }
// //       );
// //     });
    
// //     return res.json({
// //       success: true,
// //       secret: secret.base32,
// //       qrCode: qrCodeDataUrl,
// //       otpauth_url: secret.otpauth_url
// //     });
    
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Failed to setup 2FA' });
// //   }
// // });

// // app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// //   const token = req.headers['authorization']?.split(' ')[1];
// //   const { code } = req.body;
  
// //   if (!token || !code) {
// //     return res.status(400).json({ error: 'Token and code required' });
// //   }
  
// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// //     const userId = decoded.userId;
    
// //     const twoFA = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });
    
// //     if (!twoFA) {
// //       return res.status(400).json({ error: '2FA not setup' });
// //     }
    
// //     const verified = speakeasy.totp.verify({
// //       secret: twoFA.secret,
// //       encoding: 'base32',
// //       token: code,
// //       window: 1
// //     });
    
// //     if (verified) {
// //       await new Promise<void>((resolve, reject) => {
// //         db.run(
// //           `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
// //           [userId],
// //           function(err: any) {
// //             if (err) return reject(err);
// //             resolve();
// //           }
// //         );
// //       });
      
// //       return res.json({ success: true, message: '2FA enabled successfully' });
// //     } else {
// //       return res.status(400).json({ error: 'Invalid verification code' });
// //     }
    
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Verification failed' });
// //   }
// // });

// // app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
// //   const token = req.headers['authorization']?.split(' ')[1];
// //   const { code } = req.body;
  
// //   if (!token || !code) {
// //     return res.status(400).json({ error: 'Token and code required' });
// //   }
  
// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// //     const userId = decoded.userId;
    
// //     const twoFA = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });
    
// //     if (!twoFA || !twoFA.enabled) {
// //       return res.status(400).json({ error: '2FA is not enabled' });
// //     }
    
// //     const verified = speakeasy.totp.verify({
// //       secret: twoFA.secret,
// //       encoding: 'base32',
// //       token: code,
// //       window: 1
// //     });
    
// //     if (verified) {
// //       await new Promise<void>((resolve, reject) => {
// //         db.run(
// //           `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
// //           [userId],
// //           function(err: any) {
// //             if (err) return reject(err);
// //             resolve();
// //           }
// //         );
// //       });
      
// //       return res.json({ success: true, message: '2FA disabled successfully' });
// //     } else {
// //       return res.status(400).json({ error: 'Invalid verification code' });
// //     }
    
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: 'Failed to disable 2FA' });
// //   }
// // });

// // app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
// //   const token = req.headers['authorization']?.split(' ')[1];
  
// //   if (!token) {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }
  
// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
// //     const userId = decoded.userId;
    
// //     const twoFA = await new Promise<any>((resolve, reject) => {
// //       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
// //         if (err) return reject(err);
// //         resolve(row);
// //       });
// //     });
    
// //     return res.json({ 
// //       enabled: twoFA ? twoFA.enabled === 1 : false 
// //     });
    
// //   } catch (error) {
// //     return res.status(401).json({ error: 'Invalid token' });
// //   }
// // });

// // // ============= GET USER BY NAME =============
// // app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
// //   const userName = req.params.name;
  
// //   if (!userName) {
// //     return res.status(400).json({ 
// //       success: false, 
// //       error: 'User name is required' 
// //     });
// //   }

// //   try {
// //     const user = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         'SELECT id, name, email, role_id, company_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
// //         [`%${userName}%`],
// //         (err: any, row: any) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });

// //     if (!user) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         error: `User "${userName}" not found` 
// //       });
// //     }

// //     console.log(`✅ Found user: ${user.name} (${user.email})`);

// //     return res.json({
// //       success: true,
// //       user: {
// //         id: user.id,
// //         name: user.name,
// //         email: user.email,
// //         role_id: user.role_id,
// //         company_id: user.company_id
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error('Error fetching user by name:', error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       error: 'Internal server error' 
// //     });
// //   }
// // });

// // // Start server
// // app.listen(PORT, () => {
// //   console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
// //   console.log(`📧 Test endpoint: http://localhost:${PORT}/api/test`);
// //   console.log(`📋 Users endpoint: http://localhost:${PORT}/api/debug/users`);
// //   console.log(`\n📝 Login with: test@gmail.com / password123`);
// //   console.log(`\n📧 SMTP From: subasrimuthumanickam@gmail.com`);
// // });

// // export default app;
// import express, { type Request, type Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import speakeasy from 'speakeasy';
// import QRCode from 'qrcode';
// import db from './config/db.js';
// import CustomerRoutes from './routes/customer.routes.js';
// import AuthRoutes from './routes/authRoutes.js';
// import invoiceRoutes from './routes/invoice.routes.js';
// import reportRoutes from './routes/report.routes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import categoryRoutes from './routes/category.routes.js';
// import productRoutes from './routes/product.routes.js';
// import stockMovementRoutes from './routes/stockMovement.routes.js';
// import estimateRoutes from "./routes/estimate.routes.js";
// import projectRoutes from './routes/project.routes.js';
// import taxRateRoutes from './routes/taxRate.routes.js';
// import priceListRoutes from './routes/priceList.routes.js';
// import employeeRoutes from './routes/employee.routes.js';
// import attendanceRoutes from './routes/attendance.routes.js';
// import leaveRoutes from "./routes/leave.routes.js";
// import taskRoutes from './routes/task.routes.js';
// import expenseRoutes from './routes/expense.routes.js';
// import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
// import vendorRoutes from './routes/vendor.routes.js';

// // ✅ IMPORT EMAIL SERVICE
// import { sendReworkRequestEmail } from './services/emailService.js';

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
//   credentials: true
// }));
// app.use(express.json());

// // Register routes
// app.use('/api/customers', CustomerRoutes);
// app.use('/api/auth', AuthRoutes);
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/stock-movements', stockMovementRoutes);
// app.use("/api/estimates", estimateRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tax-rates', taxRateRoutes);
// app.use('/api/price-lists', priceListRoutes);
// app.use("/api/hrms/employees", employeeRoutes);
// app.use("/api/hrms/attendance", attendanceRoutes);
// app.use("/api/leaves", leaveRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api', expenseRoutes);
// app.use('/api/vendors', vendorRoutes);
// app.use('/api/purchase-orders', purchaseOrderRoutes);

// // ============= TEST ENDPOINT =============
// app.get('/api/test', (req: Request, res: Response) => {
//   res.json({ 
//     success: true, 
//     message: 'Backend is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// // ============= DEBUG: GET ALL USERS =============
// app.get('/api/debug/users', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const users = await new Promise<any[]>((resolve, reject) => {
//       db.all('SELECT id, name, email, role_id FROM users ORDER BY name', [], (err: any, rows: any[]) => {
//         if (err) {
//           console.error('Database error:', err);
//           return reject(err);
//         }
//         resolve(rows || []);
//       });
//     });
    
//     console.log('📋 Users in database:');
//     users.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
//     return res.json({
//       success: true,
//       count: users.length,
//       users: users
//     });
//   } catch (error: any) {
//     console.error('Error fetching users:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Internal server error'
//     });
//   }
// });

// // ============= GET ALL DEVELOPERS =============
// app.get('/api/developers', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const developers = await new Promise<any[]>((resolve, reject) => {
//       db.all(
//         'SELECT id, name, email, role_id FROM users WHERE role_id = 2 ORDER BY name',
//         [],
//         (err: any, rows: any[]) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(rows || []);
//         }
//       );
//     });
    
//     console.log(`📋 Found ${developers.length} developers`);
//     return res.json({
//       success: true,
//       developers: developers
//     });
//   } catch (error: any) {
//     console.error('Error fetching developers:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Internal server error'
//     });
//   }
// });

// // ============= GET USER EMAIL BY NAME =============
// app.get('/api/users/email/:name', async (req: Request, res: Response): Promise<any> => {
//   const userName = req.params.name;
  
//   if (!userName) {
//     return res.status(400).json({ 
//       success: false, 
//       error: 'User name is required' 
//     });
//   }

//   try {
//     const nameStr = typeof userName === 'string' ? userName.trim() : String(userName || '').trim();
    
//     if (!nameStr) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Valid user name is required' 
//       });
//     }

//     console.log(`🔍 Looking up user: "${nameStr}"`);

//     const user = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [nameStr],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     if (!user) {
//       console.warn(`❌ User "${nameStr}" not found in database`);
      
//       const allUsers = await new Promise<any[]>((resolve, reject) => {
//         db.all('SELECT name, email FROM users', [], (err: any, rows: any[]) => {
//           if (err) return resolve([]);
//           resolve(rows || []);
//         });
//       });
      
//       console.log('📋 Available users:', allUsers.map(u => u.name).join(', '));
      
//       return res.status(404).json({ 
//         success: false, 
//         error: `User "${nameStr}" not found in database`,
//         availableUsers: allUsers.map(u => u.name)
//       });
//     }

//     console.log(`✅ Found user: ${user.name} (${user.email})`);
//     return res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id
//       }
//     });

//   } catch (error: any) {
//     console.error('Error fetching user:', error);
//     return res.status(500).json({ 
//       success: false, 
//       error: 'Internal server error' 
//     });
//   }
// });

// // ============= REWORK EMAIL ENDPOINT - WORKS FOR ANY DEVELOPER NAME =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

//     console.log('📧 Rework email request:');
//     console.log('  Developer Name:', developerName);
//     console.log('  Tester Email:', testerEmail);
//     console.log('  Task Title:', taskTitle);

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name (case insensitive)
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ Step 3: If still not found, AUTO-REGISTER with generated email
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
      
//       // ✅ Generate email from name (e.g., "Rajesh" -> "rajesh@gmail.com")
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      
//       // ✅ Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         // User exists with this email, use it
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         isNewDeveloper = true;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       // ✅ Developer found in database
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Don't send if tester and developer have same email
//     if (developerEmail === testerEmailStr) {
//       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Cannot send email to yourself' 
//       });
//     }

//     // ✅ Send email - FROM is always SMTP user, TO is developer
//     console.log('📧 Sending rework email...');
//     console.log('  FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('  TO (Developer):', developerEmail);
//     console.log('  REPLY-TO (Tester):', testerEmailStr);

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameStr,
//       fromEmail: testerEmailStr,
//       isNewDeveloper: isNewDeveloper
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// // ============= ADD DEVELOPER WITH SPECIFIC EMAIL =============
// app.post('/api/add-developer', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { name, email } = req.body;
    
//     if (!name || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Name and email are required' 
//       });
//     }

//     // Check if user exists
//     const existing = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(name) = LOWER(?)',
//         [email, name],
//         (err: any, row: any) => {
//           if (err) return reject(err);
//           resolve(row);
//         }
//       );
//     });
    
//     if (existing) {
//       return res.status(400).json({ 
//         success: false, 
//         error: `User with name "${name}" or email "${email}" already exists` 
//       });
//     }
    
//     const hashedPassword = await bcrypt.hash('password123', 10);
    
//     await new Promise<void>((resolve, reject) => {
//       db.run(
//         'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//         [name, email, hashedPassword, 2, 1],
//         function(err: any) {
//           if (err) return reject(err);
//           resolve();
//         }
//       );
//     });
    
//     console.log(`✅ Added developer: ${name} (${email})`);
//     return res.json({ 
//       success: true, 
//       message: `Developer ${name} added successfully with email ${email}`,
//       developer: {
//         name: name,
//         email: email
//       }
//     });
    
//   } catch (error: any) {
//     console.error('Error adding developer:', error);
//     return res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Failed to add developer' 
//     });
//   }
// });

// // ============= QUICK ADD DEVELOPER (Auto-generate email) =============
// app.post('/api/quick-add-developer', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { name } = req.body;
    
//     if (!name) {
//       return res.status(400).json({ error: 'Name is required' });
//     }

//     // Generate email from name
//     const generatedEmail = `${name.toLowerCase().replace(/\s/g, '')}@gmail.com`;
    
//     const existing = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id FROM users WHERE LOWER(name) = LOWER(?) OR email = ?',
//         [name, generatedEmail],
//         (err: any, row: any) => {
//           if (err) return reject(err);
//           resolve(row);
//         }
//       );
//     });
    
//     if (existing) {
//       return res.json({ 
//         success: true, 
//         message: `User ${name} already exists with email ${generatedEmail}`,
//         email: generatedEmail
//       });
//     }
    
//     const hashedPassword = await bcrypt.hash('password123', 10);
    
//     await new Promise<void>((resolve, reject) => {
//       db.run(
//         'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//         [name, generatedEmail, hashedPassword, 2, 1],
//         function(err: any) {
//           if (err) return reject(err);
//           resolve();
//         }
//       );
//     });
    
//     console.log(`✅ Added developer: ${name} (${generatedEmail})`);
//     return res.json({ 
//       success: true, 
//       message: `Developer ${name} added successfully with email ${generatedEmail}`,
//       email: generatedEmail
//     });
    
//   } catch (error: any) {
//     console.error('Error adding developer:', error);
//     return res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Failed to add developer' 
//     });
//   }
// });

// // ============= GET USER BY NAME =============
// app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
//   const userName = req.params.name;
  
//   if (!userName) {
//     return res.status(400).json({ 
//       success: false, 
//       error: 'User name is required' 
//     });
//   }

//   try {
//     const user = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id, company_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//         [`%${userName}%`],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         error: `User "${userName}" not found` 
//       });
//     }

//     console.log(`✅ Found user: ${user.name} (${user.email})`);

//     return res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         company_id: user.company_id
//       }
//     });

//   } catch (error: any) {
//     console.error('Error fetching user by name:', error);
//     return res.status(500).json({ 
//       success: false, 
//       error: 'Internal server error' 
//     });
//   }
// });

// // Interfaces
// interface RegisterBody {
//   company_name?: string; 
//   admin_name?: string;   
//   email?: string;
//   password?: string;
// }

// interface LoginBody {
//   email?: string;
//   password?: string;
//   twoFACode?: string;
// }

// interface ResetPasswordBody {
//   token?: string;
//   newPassword?: string;
// }

// interface JWTPayload {
//   userId: string | number;
//   companyId: number;
//   roleId: number;
//   email?: string;
//   purpose?: string;
// }

// // ============= REGISTER API =============
// app.post('/api/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
//   const { company_name, admin_name, email, password } = req.body;
//   console.log("Registration data:", req.body);

//   if (!company_name || !email || !password || !admin_name) {
//     return res.status(400).json({ error: 'All fields required' });
//   }

//   try {
//     const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

//     const existingCompany = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });

//     if (existingCompany) {
//       return res.status(400).json({ error: 'Company already exists' });
//     }

//     const existingUser = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT id FROM users WHERE email = ?', [email], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     const companyId = await new Promise<number>((resolve, reject) => {
//       db.run('INSERT INTO companies (company_name, subdomain) VALUES (?, ?)', 
//         [company_name, subdomain], 
//         function(this: any, err: any) {
//           if (err) return reject(err);
//           const id = this?.lastID ?? 0;
//           resolve(id);
//         });
//     });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await new Promise<void>((resolve, reject) => {
//       db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
//         [companyId, email, hashedPassword, admin_name, 1],
//         function(err: any) {
//           if (err) return reject(err);
//           resolve();
//         });
//     });

//     const token = jwt.sign(
//       { userId: email, companyId: companyId, roleId: 1 },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     return res.json({ 
//       success: true, 
//       token, 
//       company: { id: companyId, name: company_name, subdomain } 
//     });

//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error during registration' });
//   }
// });

// // ============= LOGIN API =============
// app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
//   const { email, password, twoFACode } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password required' });
//   }
  
//   try {
//     console.log(`🔍 Login attempt for: ${email}`);
    
//     const user = await new Promise<any>((resolve, reject) => {
//       db.get(
//         `SELECT users.*, companies.company_name, companies.subdomain 
//         FROM users 
//         JOIN companies ON users.company_id = companies.id 
//         WHERE users.email = ?`,
//         [email],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });
    
//     if (!user) {
//       console.warn(`❌ User not found: ${email}`);
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       console.warn(`❌ Invalid password for: ${email}`);
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     console.log(`✅ Login successful for: ${email}`);
    
//     const twoFA = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });
    
//     if (twoFA && twoFA.enabled === 1) {
//       if (!twoFACode) {
//         return res.status(401).json({ 
//           error: '2FA required',
//           requires2FA: true,
//           userId: user.id
//         });
//       }
      
//       const verified = speakeasy.totp.verify({
//         secret: twoFA.secret,
//         encoding: 'base32',
//         token: twoFACode,
//         window: 1
//       });
      
//       if (!verified) {
//         return res.status(401).json({ error: 'Invalid 2FA code' });
//       }
//     }
    
//     const token = jwt.sign(
//       { userId: user.id, companyId: user.company_id, roleId: user.role_id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     return res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         roleId: user.role_id
//       },
//       company: {
//         id: user.company_id,
//         name: user.company_name,
//         subdomain: user.subdomain
//       },
//       twoFAEnabled: twoFA && twoFA.enabled === 1
//     });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // ============= VERIFY TOKEN API =============
// app.get('/api/verify', (req: Request, res: Response): any => {
//   const token = req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return res.json({ valid: true, user: decoded });
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// });

// // ============= FORGOT PASSWORD API =============
// app.post('/api/forgot-password', async (req: Request<{}, {}, { email?: string }>, res: Response): Promise<any> => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     const user = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });

//     if (!user) {
//       return res.json({
//         success: true,
//         message: 'If this email exists, a reset token has been generated.'
//       });
//     }

//     const resetToken = jwt.sign(
//       { email: user.email, purpose: 'password-reset' },
//       JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     return res.json({
//       success: true,
//       message: 'Password reset token generated.',
//       resetToken
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// // ============= RESET PASSWORD API =============
// app.post('/api/reset-password', async (req: Request<{}, {}, ResetPasswordBody>, res: Response): Promise<any> => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ error: 'Reset token and new password are required' });
//   }

//   if (newPassword.length < 6) {
//     return res.status(400).json({ error: 'Password must be at least 6 characters long' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

//     if (decoded.purpose !== 'password-reset' || !decoded.email) {
//       return res.status(401).json({ error: 'Invalid reset token' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     await new Promise<number>((resolve, reject) => {
//       db.run(
//         'UPDATE users SET password = ? WHERE email = ?',
//         [hashedPassword, decoded.email],
//         function (this: any, err: any) {
//           if (err) return reject(err);
//           const changes = this?.changes || 0;
//           resolve(changes);
//         }
//       );
//     });

//     return res.json({ success: true, message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ error: 'Invalid or expired reset token' });
//   }
// });

// // ============= 2FA ENDPOINTS =============
// app.post('/api/2fa/enable', async (req: Request, res: Response): Promise<any> => {
//   const token = req.headers['authorization']?.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     const userId = decoded.userId;
    
//     const secret = speakeasy.generateSecret({
//       name: `BusinessOS:${decoded.email || userId}`
//     });
    
//     if(!secret.otpauth_url) {
//       return res.status(500).json({ error: 'Could not generate QR Code URI' });
//     }

//     const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    
//     await new Promise<void>((resolve, reject) => {
//       db.run(
//         `INSERT INTO two_fa (user_id, secret, enabled) VALUES (?, ?, 0) 
//          ON DUPLICATE KEY UPDATE secret = VALUES(secret)`,
//         [userId, secret.base32],
//         function(err: any) {
//           if (err) return reject(err);
//           resolve();
//         }
//       );
//     });
    
//     return res.json({
//       success: true,
//       secret: secret.base32,
//       qrCode: qrCodeDataUrl,
//       otpauth_url: secret.otpauth_url
//     });
    
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to setup 2FA' });
//   }
// });

// app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   const { code } = req.body;
  
//   if (!token || !code) {
//     return res.status(400).json({ error: 'Token and code required' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     const userId = decoded.userId;
    
//     const twoFA = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });
    
//     if (!twoFA) {
//       return res.status(400).json({ error: '2FA not setup' });
//     }
    
//     const verified = speakeasy.totp.verify({
//       secret: twoFA.secret,
//       encoding: 'base32',
//       token: code,
//       window: 1
//     });
    
//     if (verified) {
//       await new Promise<void>((resolve, reject) => {
//         db.run(
//           `UPDATE two_fa SET enabled = 1 WHERE user_id = ?`,
//           [userId],
//           function(err: any) {
//             if (err) return reject(err);
//             resolve();
//           }
//         );
//       });
      
//       return res.json({ success: true, message: '2FA enabled successfully' });
//     } else {
//       return res.status(400).json({ error: 'Invalid verification code' });
//     }
    
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Verification failed' });
//   }
// });

// app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   const { code } = req.body;
  
//   if (!token || !code) {
//     return res.status(400).json({ error: 'Token and code required' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     const userId = decoded.userId;
    
//     const twoFA = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });
    
//     if (!twoFA || !twoFA.enabled) {
//       return res.status(400).json({ error: '2FA is not enabled' });
//     }
    
//     const verified = speakeasy.totp.verify({
//       secret: twoFA.secret,
//       encoding: 'base32',
//       token: code,
//       window: 1
//     });
    
//     if (verified) {
//       await new Promise<void>((resolve, reject) => {
//         db.run(
//           `UPDATE two_fa SET enabled = 0 WHERE user_id = ?`,
//           [userId],
//           function(err: any) {
//             if (err) return reject(err);
//             resolve();
//           }
//         );
//       });
      
//       return res.json({ success: true, message: '2FA disabled successfully' });
//     } else {
//       return res.status(400).json({ error: 'Invalid verification code' });
//     }
    
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to disable 2FA' });
//   }
// });

// app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
//   const token = req.headers['authorization']?.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     const userId = decoded.userId;
    
//     const twoFA = await new Promise<any>((resolve, reject) => {
//       db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
//         if (err) return reject(err);
//         resolve(row);
//       });
//     });
    
//     return res.json({ 
//       enabled: twoFA ? twoFA.enabled === 1 : false 
//     });
    
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
//   console.log(`📧 Test endpoint: http://localhost:${PORT}/api/test`);
//   console.log(`📋 Users endpoint: http://localhost:${PORT}/api/debug/users`);
//   console.log(`👨‍💻 Developers endpoint: http://localhost:${PORT}/api/developers`);
//   console.log(`\n📧 SMTP From: subasrimuthumanickam@gmail.com`);
//   console.log(`\n✅ Ready to send rework emails to ANY developer!`);
// });

// export default app;
import express, { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import db from './config/db.js';
import CustomerRoutes from './routes/customer.routes.js';
import AuthRoutes from './routes/authRoutes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import reportRoutes from './routes/report.routes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import stockMovementRoutes from './routes/stockMovement.routes.js';
import estimateRoutes from "./routes/estimate.routes.js";
import projectRoutes from './routes/project.routes.js';
import taxRateRoutes from './routes/taxRate.routes.js';
import priceListRoutes from './routes/priceList.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import leaveRoutes from "./routes/leave.routes.js";
import taskRoutes from './routes/task.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import purchaseOrderRoutes from './routes/purchaseOrder.routes.js';
import vendorRoutes from './routes/vendor.routes.js';

// ✅ IMPORT EMAIL SERVICE
import { sendReworkRequestEmail } from './services/emailService.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-later';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Register routes
app.use('/api/customers', CustomerRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock-movements', stockMovementRoutes);
app.use("/api/estimates", estimateRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tax-rates', taxRateRoutes);
app.use('/api/price-lists', priceListRoutes);
app.use("/api/hrms/employees", employeeRoutes);
app.use("/api/hrms/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', expenseRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

// ============= TEST ENDPOINT =============
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ============= DEBUG: GET ALL USERS =============
app.get('/api/debug/users', async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await new Promise<any[]>((resolve, reject) => {
      db.all('SELECT id, name, email, role_id FROM users ORDER BY name', [], (err: any, rows: any[]) => {
        if (err) {
          console.error('Database error:', err);
          return reject(err);
        }
        resolve(rows || []);
      });
    });
    
    console.log('📋 Users in database:');
    users.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
    return res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// ============= GET ALL DEVELOPERS =============
// app.get('/api/developers', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const developers = await new Promise<any[]>((resolve, reject) => {
//       db.all(
//         'SELECT id, name, email, role_id FROM users WHERE role_id = 2 ORDER BY name',
//         [],
//         (err: any, rows: any[]) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(rows || []);
//         }
//       );
//     });
    
//     console.log(`📋 Found ${developers.length} developers`);
//     return res.json({
//       success: true,
//       developers: developers
//     });
//   } catch (error: any) {
//     console.error('Error fetching developers:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Internal server error'
//     });
//   }
// });
// In your main index.ts file, add this endpoint:

// ============= GET ALL DEVELOPERS =============
app.get('/api/developers', async (req: Request, res: Response): Promise<any> => {
  try {
    const developers = await new Promise<any[]>((resolve, reject) => {
      db.all(
        'SELECT id, name, email, role_id FROM users WHERE role_id = 2 ORDER BY name',
        [],
        (err: any, rows: any[]) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(rows || []);
        }
      );
    });
    
    console.log(`📋 Found ${developers.length} developers`);
    return res.json({
      success: true,
      developers: developers
    });
  } catch (error: any) {
    console.error('Error fetching developers:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// ============= GET CURRENT USER =============
app.get('/api/current-user', async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;

    const user = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id, name, email, role_id, company_id FROM users WHERE id = ?',
        [userId],
        (err: any, row: any) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id
      }
    });
  } catch (error: any) {
    console.error('Error fetching current user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ============= GET USER EMAIL BY NAME =============
app.get('/api/users/email/:name', async (req: Request, res: Response): Promise<any> => {
  const userName = req.params.name;
  
  if (!userName) {
    return res.status(400).json({ 
      success: false, 
      error: 'User name is required' 
    });
  }

  try {
    const nameStr = typeof userName === 'string' ? userName.trim() : String(userName || '').trim();
    
    if (!nameStr) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid user name is required' 
      });
    }

    console.log(`🔍 Looking up user: "${nameStr}"`);

    const user = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
        [nameStr],
        (err: any, row: any) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    if (!user) {
      console.warn(`❌ User "${nameStr}" not found in database`);
      
      const allUsers = await new Promise<any[]>((resolve, reject) => {
        db.all('SELECT name, email FROM users', [], (err: any, rows: any[]) => {
          if (err) return resolve([]);
          resolve(rows || []);
        });
      });
      
      console.log('📋 Available users:', allUsers.map(u => u.name).join(', '));
      
      return res.status(404).json({ 
        success: false, 
        error: `User "${nameStr}" not found in database`,
        availableUsers: allUsers.map(u => u.name)
      });
    }

    console.log(`✅ Found user: ${user.name} (${user.email})`);
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id
      }
    });

  } catch (error: any) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// ============= REWORK EMAIL ENDPOINT - WORKS FOR ANY DEVELOPER NAME =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { developerName, taskTitle, reworkNotes, testerName, testerEmail } = req.body;

//     console.log('📧 Rework email request:');
//     console.log('  Developer Name:', developerName);
//     console.log('  Tester Email:', testerEmail);
//     console.log('  Task Title:', taskTitle);

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name (case insensitive)
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;

//     // ✅ Step 3: If still not found, AUTO-REGISTER with generated email
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
      
//       // ✅ Generate email from name (e.g., "Rajesh" -> "rajesh@gmail.com")
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      
//       // ✅ Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         // User exists with this email, use it
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       // ✅ Developer found in database
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Don't send if tester and developer have same email
//     if (developerEmail === testerEmailStr) {
//       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Cannot send email to yourself' 
//       });
//     }

//     // ✅ Send email - FROM is always SMTP user, TO is developer
//     console.log('📧 Sending rework email...');
//     console.log('  FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('  TO (Developer):', developerEmail);
//     console.log('  REPLY-TO (Tester):', testerEmailStr);

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameStr,
//       fromEmail: testerEmailStr
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// ============= REWORK EMAIL ENDPOINT - FULLY DYNAMIC =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name:', testerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Project:', projectName);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       console.error('❌ Missing required fields');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;

//     // ✅ Step 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Inserted developer into database: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Don't send if tester and developer have same email
//     if (developerEmail === testerEmailStr) {
//       console.warn('⚠️ Cannot send email: Tester and developer have the same email');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Cannot send email to yourself' 
//       });
//     }

//     // ✅ Get tester details from database (if not provided in request)
//     let testerNameFromDB = testerNameStr;
//     let testerEmailFromDB = testerEmailStr;

//     // If tester email is provided, try to get full name from database
//     if (testerEmailStr) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmailStr],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//         console.log(`✅ Found tester in DB: ${testerNameFromDB} (${testerEmailFromDB})`);
//       }
//     }

//     // ✅ Send email with ALL dynamic data
//     console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 Task:', taskTitleStr);
//     console.log('📧 Project:', projectName || 'Not specified');
//     console.log('📧 ============================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameFromDB,
//       fromEmail: testerEmailFromDB,
//       taskId: taskId,
//       projectName: projectName
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail
//         },
//         tester: {
//           name: testerNameFromDB,
//           email: testerEmailFromDB
//         },
//         task: {
//           title: taskTitleStr,
//           id: taskId,
//           project: projectName
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });


// ============= REWORK EMAIL ENDPOINT - FULLY DYNAMIC =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name:', testerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Project:', projectName);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       console.error('❌ Missing required fields');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ Step 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Inserted developer into database: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ FIX: Don't block if tester and developer have same email
//     // Just log it and continue
//     if (developerEmail === testerEmailStr) {
//       console.log('📧 Note: Tester and developer have the same email, still sending email');
//       // ✅ Continue sending email - don't return error
//     }

//     // ✅ Get tester details from database (if not provided in request)
//     let testerNameFromDB = testerNameStr;
//     let testerEmailFromDB = testerEmailStr;

//     // If tester email is provided, try to get full name from database
//     if (testerEmailStr) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmailStr],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//         console.log(`✅ Found tester in DB: ${testerNameFromDB} (${testerEmailFromDB})`);
//       }
//     }

//     // ✅ Send email with ALL dynamic data
//     console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 Task:', taskTitleStr);
//     console.log('📧 Project:', projectName || 'Not specified');
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ============================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameFromDB,
//       fromEmail: testerEmailFromDB,
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         },
//         tester: {
//           name: testerNameFromDB,
//           email: testerEmailFromDB
//         },
//         task: {
//           title: taskTitleStr,
//           id: taskId,
//           project: projectName
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });


// ============= REWORK EMAIL ENDPOINT - FULLY DYNAMIC =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name:', testerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Project:', projectName);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       console.error('❌ Missing required fields');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ Step 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Inserted developer into database: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Allow sending email even if same (just log it)
//     if (developerEmail === testerEmailStr) {
//       console.log('📧 Note: Tester and developer have the same email, still sending');
//     }

//     // ✅ Get tester details from database
//     let testerNameFromDB = testerNameStr;
//     let testerEmailFromDB = testerEmailStr;

//     if (testerEmailStr) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmailStr],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//         console.log(`✅ Found tester in DB: ${testerNameFromDB} (${testerEmailFromDB})`);
//       }
//     }

//     // ✅ Send email with ALL dynamic data
//     console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 Task:', taskTitleStr);
//     console.log('📧 Project:', projectName || 'Not specified');
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ============================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameFromDB,
//       fromEmail: testerEmailFromDB,
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper  // ✅ Pass isNewDeveloper
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         },
//         tester: {
//           name: testerNameFromDB,
//           email: testerEmailFromDB
//         },
//         task: {
//           title: taskTitleStr,
//           id: taskId,
//           project: projectName
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// ============= REWORK EMAIL ENDPOINT - FULLY DYNAMIC =============
// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name (TO):', developerName);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name (FROM):', testerName);
//     console.log('📧 Tester Email (FROM):', testerEmail);
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Project:', projectName);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       console.error('❌ Missing required fields');
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = typeof developerName === 'string' ? developerName.trim() : String(developerName || '').trim();
//     const taskTitleStr = typeof taskTitle === 'string' ? taskTitle.trim() : String(taskTitle || '').trim();
//     const reworkNotesStr = typeof reworkNotes === 'string' ? reworkNotes.trim() : String(reworkNotes || '').trim();
//     const testerEmailStr = typeof testerEmail === 'string' ? testerEmail.trim() : String(testerEmail || '').trim();
//     const testerNameStr = typeof testerName === 'string' ? testerName.trim() : 'Tester';

//     if (!devName || !taskTitleStr || !reworkNotesStr || !testerEmailStr) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid fields provided' 
//       });
//     }

//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ Step 1: Try to find developer in database by name
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ Step 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ Step 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.warn(`❌ Developer "${devName}" not found in database. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Inserted developer into database: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Allow sending email even if tester and developer have same email
//     if (developerEmail === testerEmailStr) {
//       console.log('📧 Note: Tester and developer have the same email, still sending');
//     }

//     // ✅ Get tester details from database
//     let testerNameFromDB = testerNameStr;
//     let testerEmailFromDB = testerEmailStr;

//     if (testerEmailStr) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmailStr],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//         console.log(`✅ Found tester in DB: ${testerNameFromDB} (${testerEmailFromDB})`);
//       }
//     }

//     // ✅ Send email with ALL dynamic data
//     console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Task:', taskTitleStr);
//     console.log('📧 Project:', projectName || 'Not specified');
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ============================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,              // ✅ TO: Developer's email
//       toName: developerNameFromDB,           // ✅ Developer name
//       taskTitle: taskTitleStr,
//       reworkNotes: reworkNotesStr,
//       fromName: testerNameFromDB,            // ✅ FROM: Tester's name
//       fromEmail: testerEmailFromDB,          // ✅ FROM: Tester's email (SMTP user)
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         },
//         tester: {
//           name: testerNameFromDB,
//           email: testerEmailFromDB
//         },
//         task: {
//           title: taskTitleStr,
//           id: taskId,
//           project: projectName
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// In index.ts - /api/send-rework-email

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName,      // ✅ This should be "Muthu"
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,        // ✅ This is the FROM email
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name (TO):', developerName);
//     console.log('📧 Tester Email (FROM):', testerEmail);
//     console.log('📧 ============================================');

//     // ✅ STEP 1: Look up developer by NAME to get their email
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [developerName.trim()],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${developerName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${developerName.trim()}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${developerName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${developerName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [developerName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = developerName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;  // ✅ This should be the developer's email
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ STEP 4: Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ STEP 5: Send email TO the developer
//     console.log('📧 ========== SENDING EMAIL ==========');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);  // ✅ This should be muthu@gmail.com
//     console.log('📧 REPLY-TO (Tester):', testerEmail);
//     console.log('📧 ====================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,           // ✅ TO: Developer's email
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerName || 'Tester',
//       fromEmail: testerEmail,            // ✅ FROM: Tester's email (SMTP user)
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// In index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName,      // ✅ This should be "Muthu"
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,        // ✅ This is the FROM email
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name (TO):', developerName);
//     console.log('📧 Tester Email (FROM):', testerEmail);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Look up developer by NAME
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${devName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Auto-registered developer: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;  // ✅ This will be "muthu@gmail.com"
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;  // ✅ This should be the developer's email
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ STEP 4: Send email TO the developer
//     console.log('📧 ========== SENDING EMAIL ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);  // ✅ This should be "muthu@gmail.com"
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmail);
//     console.log('📧 ====================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,           // ✅ TO: Developer's email
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerName || 'Tester',
//       fromEmail: testerEmail,            // ✅ FROM: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name (TO):', developerName);
//     console.log('📧 Tester Email (FROM):', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Find developer by NAME
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: Try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${devName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Auto-registered developer: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;  // ✅ This will be "muthu@gmail.com"
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;  // ✅ Developer's email from database
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Get tester name from database if not provided
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//       }
//     }

//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer Email):', developerEmail);  // ✅ This should be muthu@gmail.com
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester Email):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 ====================================');

//     // ✅ STEP 4: Send email - TO = Developer, FROM = SMTP user, Reply-To = Tester
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,           // ✅ TO: Developer's email (muthu@gmail.com)
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,        // ✅ FROM: Tester's name
//       fromEmail: testerEmailFromDB,      // ✅ REPLY-TO: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,  // ✅ This should be "muthu@gmail.com"
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });
// index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name (TO):', developerName);
//     console.log('📧 Tester Email (FROM):', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Find developer by NAME
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: Try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${devName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       // ✅ Generate email from name
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email for developer: ${generatedEmail}`);
      
//       // ✅ Check if user exists with this email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Auto-registered developer: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;  // ✅ This will be the developer's email
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       // ✅ Developer found in database
//       developerEmail = developer.email;  // ✅ This is the developer's email from DB
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Get tester details
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//       }
//     }

//     // ✅ CRITICAL: Log the email addresses
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);  // ✅ This MUST be developer's email
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ====================================');

//     // ✅ STEP 4: Send email
//     // FROM = SMTP user (subasrimuthumanickam@gmail.com)
//     // TO = Developer's email (developerEmail)
//     // Reply-To = Tester's email (testerEmailFromDB)
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,           // ✅ TO: Developer's email
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,        // ✅ From Name: Tester
//       fromEmail: testerEmailFromDB,      // ✅ Reply-To: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,  // ✅ Return the developer's email
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });



// index.ts - Complete /api/send-rework-email endpoint (FIXED)

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Try to find developer in database by NAME
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: Try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${devName}" not found in database. Auto-registering...`);
//       isNewDeveloper = true;
      
//       // ✅ Generate email from name (e.g., "Muthu" -> "muthu@gmail.com")
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email for developer: ${generatedEmail}`);
      
//       // ✅ Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, 2, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Auto-registered developer: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;  // ✅ This will be "muthu@gmail.com"
//         developerNameFromDB = devName;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       // ✅ Developer found in database
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ CRITICAL: Validate developer email
//     if (!developerEmail) {
//       console.error(`❌ Developer "${developerNameFromDB}" has no email`);
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Get tester details
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//       }
//     }

//     // ✅ CRITICAL: Log the email addresses for debugging
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer Email):', developerEmail);  // ✅ This MUST be developer's email
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester Email):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ====================================');

//     // ✅ STEP 4: Send email - TO = Developer, FROM = SMTP user
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,           // ✅ TO: Developer's email (muthu@gmail.com)
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,        // ✅ FROM: Tester's name
//       fromEmail: testerEmailFromDB,      // ✅ Reply-To: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       isNewDeveloper: isNewDeveloper,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail,  // ✅ This will be "muthu@gmail.com"
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });


// index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Try exact match in database
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     // ✅ STEP 3: If NOT found in database - RETURN ERROR
//     if (!developer) {
//       console.error(`❌ Developer "${devName}" not found in database`);
      
//       // ✅ Get list of available developers
//       const allDevelopers = await new Promise<any[]>((resolve, reject) => {
//         db.all(
//           'SELECT name, email FROM users WHERE role_id = 2 ORDER BY name',
//           [],
//           (err: any, rows: any[]) => {
//             if (err) return resolve([]);
//             resolve(rows || []);
//           }
//         );
//       });
      
//       const availableNames = allDevelopers.map(d => d.name);
      
//       return res.status(404).json({ 
//         success: false, 
//         message: `❌ Developer "${devName}" not found in database. Please make sure the developer is registered.`,
//         availableDevelopers: availableNames
//       });
//     }

//     // ✅ Developer found - USE EMAIL FROM DATABASE
//     const developerEmail = developer.email;
//     const developerNameFromDB = developer.name;
    
//     console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);

//     // ✅ Validate developer has email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email in database` 
//       });
//     }

//     // ✅ Get tester details
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//       }
//     }

//     // ✅ Log email details
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 ====================================');

//     // ✅ Send email - TO = Developer's email from database
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,
//       fromEmail: testerEmailFromDB,
//       taskId: taskId,
//       projectName: projectName,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });


// index.ts - Better error handling for database operations

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Try to find developer in database
//     let developer = null;
//     try {
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//           [devName],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     } catch (dbError: any) {
//       console.error('❌ Database query error:', dbError.message);
      
//       // ✅ Check if it's a connection error
//       if (dbError.code === 'ETIMEOUT' || dbError.code === 'ECONNREFUSED') {
//         return res.status(503).json({
//           success: false,
//           message: 'Database connection failed. Please check your database server.'
//         });
//       }
//       throw dbError;
//     }

//     // ✅ STEP 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       try {
//         developer = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//             [`%${devName}%`],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('Database error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
//       } catch (dbError: any) {
//         console.error('❌ Database query error:', dbError.message);
//         if (dbError.code === 'ETIMEOUT' || dbError.code === 'ECONNREFUSED') {
//           return res.status(503).json({
//             success: false,
//             message: 'Database connection failed. Please check your database server.'
//           });
//         }
//         throw dbError;
//       }
//     }

//     // ✅ STEP 3: If NOT found - RETURN ERROR
//     if (!developer) {
//       console.error(`❌ Developer "${devName}" not found in database`);
      
//       // ✅ Get available developers (with error handling)
//       let allDevelopers: any[] = [];
//       try {
//         allDevelopers = await new Promise<any[]>((resolve, reject) => {
//           db.all(
//             'SELECT name, email FROM users WHERE role_id = 2 ORDER BY name',
//             [],
//             (err: any, rows: any[]) => {
//               if (err) {
//                 console.error('Database error:', err);
//                 return reject(err);
//               }
//               resolve(rows || []);
//             }
//           );
//         });
//       } catch (dbError: any) {
//         console.error('❌ Error fetching developers:', dbError.message);
//         allDevelopers = [];
//       }
      
//       const availableNames = allDevelopers.map(d => d.name);
      
//       return res.status(404).json({ 
//         success: false, 
//         message: `❌ Developer "${devName}" not found in database. Please make sure the developer is registered.`,
//         availableDevelopers: availableNames
//       });
//     }

//     // ✅ Developer found - USE EMAIL FROM DATABASE
//     const developerEmail = developer.email;
//     const developerNameFromDB = developer.name;
    
//     console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);

//     // ✅ Validate developer has email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email in database` 
//       });
//     }

//     // ✅ Get tester details
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       try {
//         const testerFromDB = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//             [testerEmail],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('Database error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
//         if (testerFromDB) {
//           testerNameFromDB = testerFromDB.name;
//           testerEmailFromDB = testerFromDB.email;
//         }
//       } catch (dbError: any) {
//         console.error('❌ Error fetching tester:', dbError.message);
//         // Continue with provided tester info
//       }
//     }

//     // ✅ Log email details
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 ====================================');

//     // ✅ Send email
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,
//       fromEmail: testerEmailFromDB,
//       taskId: taskId,
//       projectName: projectName,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           name: developerNameFromDB,
//           email: developerEmail
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
    
//     // ✅ Handle specific error types
//     if (error.code === 'ETIMEOUT' || error.code === 'ECONNREFUSED') {
//       return res.status(503).json({
//         success: false,
//         message: 'Database connection failed. Please check your database server is running.'
//       });
//     }
    
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${devName}"`);
    
//     // ✅ STEP 1: Try exact match in database
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: Try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let developerId: number;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If not found, AUTO-REGISTER NEW DEVELOPER
//     if (!developer) {
//       console.log(`⚠️ Developer "${devName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       // ✅ Generate email from name (e.g., "Muthu" -> "muthu@gmail.com")
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // ✅ Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         // ✅ User exists with this email - use it
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         developerId = userByEmail.id;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         // ✅ Check if role_id 2 exists, if not use role_id 1
//         let roleId = 2;
//         const roleCheck = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT role_id FROM roles WHERE role_id = ?',
//             [2],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('Role check error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
        
//         if (!roleCheck) {
//           console.log('⚠️ Role ID 2 not found, using role_id 1');
//           roleId = 1;
//         }
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, roleId, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ Auto-registered developer: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         // ✅ Get the newly inserted user
//         const newUser = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//             [generatedEmail],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('Database error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         developerId = newUser?.id || 0;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       // ✅ Developer found in database
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       developerId = developer.id;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Get tester details
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//       }
//     }

//     // ✅ Log email details
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ====================================');

//     // ✅ Send email - FROM is always SMTP user, TO is developer
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,                    // ✅ TO: Developer's email
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,                 // ✅ FROM: Tester's name
//       fromEmail: testerEmailFromDB,               // ✅ Reply-To: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB,
//       isNewDeveloper: isNewDeveloper
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ Developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           id: developerId,
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });

// index.ts - Complete /api/send-rework-email endpoint

// app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { 
//       developerName, 
//       taskTitle, 
//       reworkNotes, 
//       testerName, 
//       testerEmail,
//       taskId,
//       projectName 
//     } = req.body;

//     console.log('📧 ========== REWORK EMAIL REQUEST ==========');
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Task Title:', taskTitle);
//     console.log('📧 ============================================');

//     // ✅ Validate required fields
//     if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const devName = developerName.trim();
//     console.log(`🔍 STEP 1: Looking up developer in database: "${devName}"`);
    
//     // ✅ STEP 1: FETCH FROM DATABASE - Try exact match
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
//         [devName],
//         (err: any, row: any) => {
//           if (err) {
//             console.error('❌ Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: FETCH FROM DATABASE - Try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
//           [`%${devName}%`],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('❌ Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let developerId: number;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If developer found in DATABASE - USE THEIR EMAIL
//     if (developer) {
//       // ✅ FOUND IN DATABASE - USE EXISTING EMAIL
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       developerId = developer.id;
//       console.log(`✅ FOUND IN DATABASE: ${developerNameFromDB} (${developerEmail})`);
//       console.log(`📧 Using email from DATABASE: ${developerEmail}`);
//     } else {
//       // ✅ STEP 4: NOT FOUND IN DATABASE - AUTO-REGISTER NEW DEVELOPER
//       console.log(`⚠️ NOT FOUND IN DATABASE: "${devName}". Auto-registering new developer...`);
//       isNewDeveloper = true;
      
//       // Generate email from name
//       const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email for new developer: ${generatedEmail}`);
      
//       // ✅ Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [generatedEmail],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('❌ Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         // ✅ User exists with this email - use it
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         developerId = userByEmail.id;
//         console.log(`✅ Found existing user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // ✅ Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         // Check role_id
//         let roleId = 2;
//         const roleCheck = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT role_id FROM roles WHERE role_id = ?',
//             [2],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('Role check error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
        
//         if (!roleCheck) {
//           console.log('⚠️ Role ID 2 not found, using role_id 1');
//           roleId = 1;
//         }
        
//         await new Promise<void>((resolve, reject) => {
//           db.run(
//             'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
//             [devName, generatedEmail, hashedPassword, roleId, 1],
//             function(err: any) {
//               if (err) {
//                 console.error('❌ Error registering developer:', err);
//                 return reject(err);
//               }
//               console.log(`✅ New developer registered in DATABASE: ${devName} (${generatedEmail})`);
//               resolve();
//             }
//           );
//         });
        
//         // Get the newly inserted user
//         const newUser = await new Promise<any>((resolve, reject) => {
//           db.get(
//             'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
//             [generatedEmail],
//             (err: any, row: any) => {
//               if (err) {
//                 console.error('❌ Database error:', err);
//                 return reject(err);
//               }
//               resolve(row);
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = devName;
//         developerId = newUser?.id || 0;
//         console.log(`✅ NEW DEVELOPER CREATED: ${developerNameFromDB} (${developerEmail})`);
//       }
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Developer "${developerNameFromDB}" has no email` 
//       });
//     }

//     // ✅ Get tester details from DATABASE
//     let testerNameFromDB = testerName || 'Tester';
//     let testerEmailFromDB = testerEmail;

//     if (testerEmail) {
//       const testerFromDB = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
//           [testerEmail],
//           (err: any, row: any) => {
//             if (err) {
//               console.error('❌ Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//       if (testerFromDB) {
//         testerNameFromDB = testerFromDB.name;
//         testerEmailFromDB = testerFromDB.email;
//         console.log(`✅ Tester found in DATABASE: ${testerNameFromDB} (${testerEmailFromDB})`);
//       }
//     }

//     // ✅ Log final email details
//     console.log('📧 ========== EMAIL DETAILS ==========');
//     console.log('📧 SOURCE:', isNewDeveloper ? 'NEWLY CREATED' : 'EXISTING DATABASE');
//     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 REPLY-TO (Tester):', testerEmailFromDB);
//     console.log('📧 Tester Name:', testerNameFromDB);
//     console.log('📧 ====================================');

//     // ✅ Send email - FROM is always SMTP user, TO is developer
//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,                    // ✅ TO: Developer's email
//       toName: developerNameFromDB,
//       taskTitle: taskTitle,
//       reworkNotes: reworkNotes,
//       fromName: testerNameFromDB,                 // ✅ FROM: Tester's name
//       fromEmail: testerEmailFromDB,               // ✅ Reply-To: Tester's email
//       taskId: taskId,
//       projectName: projectName,
//       reworkCount: 1,
//       originalDeveloper: developerNameFromDB,
//       isNewDeveloper: isNewDeveloper
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({ 
//         success: true, 
//         message: isNewDeveloper 
//           ? `✅ New developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
//           : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
//         developer: {
//           id: developerId,
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper,
//           source: isNewDeveloper ? 'NEWLY CREATED' : 'EXISTING DATABASE'
//         }
//       });
//     } else {
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Failed to send email to developer' 
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in send-rework-email:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to send email' 
//     });
//   }
// });


// index.ts - Complete /api/send-rework-email endpoint

app.post('/api/send-rework-email', async (req: Request, res: Response): Promise<any> => {
  try {
    const { 
      developerName, 
      taskTitle, 
      reworkNotes, 
      testerName, 
      testerEmail,
      taskId,
      projectName 
    } = req.body;

    console.log('📧 ========== REWORK EMAIL REQUEST ==========');
    console.log('📧 Developer Name:', developerName);
    console.log('📧 Tester Email:', testerEmail);
    console.log('📧 Task Title:', taskTitle);
    console.log('📧 ============================================');

    // ✅ Validate required fields
    if (!developerName || !taskTitle || !reworkNotes || !testerEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const devName = developerName.trim();
    console.log(`🔍 STEP 1: Looking up developer in database: "${devName}"`);
    
    // ✅ STEP 1: Try exact match in database
    let developer = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)',
        [devName],
        (err: any, row: any) => {
          if (err) {
            console.error('❌ Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    // ✅ STEP 2: Try partial match
    if (!developer) {
      console.log(`⚠️ No exact match, trying partial match for "${devName}"`);
      developer = await new Promise<any>((resolve, reject) => {
        db.get(
          'SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
          [`%${devName}%`],
          (err: any, row: any) => {
            if (err) {
              console.error('❌ Database error:', err);
              return reject(err);
            }
            resolve(row);
          }
        );
      });
    }

    let developerEmail: string;
    let developerNameFromDB: string;
    let developerId: number;
    let isNewDeveloper = false;

    // ✅ STEP 3: If developer found in DATABASE - USE THEIR EMAIL
    if (developer) {
      // ✅ FOUND IN DATABASE - USE EXISTING EMAIL
      developerEmail = developer.email;
      developerNameFromDB = developer.name;
      developerId = developer.id;
      console.log(`✅ FOUND IN DATABASE: ${developerNameFromDB} (${developerEmail})`);
      console.log(`📧 TO email will be: ${developerEmail}`);
    } else {
      // ✅ STEP 4: NOT FOUND IN DATABASE - AUTO-REGISTER NEW DEVELOPER
      console.log(`⚠️ NOT FOUND IN DATABASE: "${devName}". Auto-registering new developer...`);
      isNewDeveloper = true;
      
      const generatedEmail = `${devName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      console.log(`📧 Generated email for new developer: ${generatedEmail}`);
      
      // Check if user exists with this generated email
      const userByEmail = await new Promise<any>((resolve, reject) => {
        db.get(
          'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
          [generatedEmail],
          (err: any, row: any) => {
            if (err) {
              console.error('❌ Database error:', err);
              return reject(err);
            }
            resolve(row);
          }
        );
      });

      if (userByEmail) {
        developerEmail = userByEmail.email;
        developerNameFromDB = userByEmail.name;
        developerId = userByEmail.id;
        console.log(`✅ Found existing user by email: ${developerNameFromDB} (${developerEmail})`);
      } else {
        // Auto-register new developer
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        let roleId = 2;
        const roleCheck = await new Promise<any>((resolve, reject) => {
          db.get(
            'SELECT role_id FROM roles WHERE role_id = ?',
            [2],
            (err: any, row: any) => {
              if (err) {
                console.error('Role check error:', err);
                return reject(err);
              }
              resolve(row);
            }
          );
        });
        
        if (!roleCheck) {
          console.log('⚠️ Role ID 2 not found, using role_id 1');
          roleId = 1;
        }
        
        await new Promise<void>((resolve, reject) => {
          db.run(
            'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
            [devName, generatedEmail, hashedPassword, roleId, 1],
            function(err: any) {
              if (err) {
                console.error('❌ Error registering developer:', err);
                return reject(err);
              }
              console.log(`✅ New developer registered in DATABASE: ${devName} (${generatedEmail})`);
              resolve();
            }
          );
        });
        
        const newUser = await new Promise<any>((resolve, reject) => {
          db.get(
            'SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)',
            [generatedEmail],
            (err: any, row: any) => {
              if (err) {
                console.error('❌ Database error:', err);
                return reject(err);
              }
              resolve(row);
            }
          );
        });
        
        developerEmail = generatedEmail;
        developerNameFromDB = devName;
        developerId = newUser?.id || 0;
        console.log(`✅ NEW DEVELOPER CREATED: ${developerNameFromDB} (${developerEmail})`);
      }
    }

    // ✅ Validate developer email
    if (!developerEmail) {
      return res.status(400).json({ 
        success: false, 
        message: `Developer "${developerNameFromDB}" has no email` 
      });
    }

    // ✅ Get tester details (just for reply-to)
    let testerNameFromDB = testerName || 'Tester';
    let testerEmailFromDB = testerEmail;

    if (testerEmail) {
      const testerFromDB = await new Promise<any>((resolve, reject) => {
        db.get(
          'SELECT name, email FROM users WHERE LOWER(email) = LOWER(?)',
          [testerEmail],
          (err: any, row: any) => {
            if (err) {
              console.error('❌ Database error:', err);
              return reject(err);
            }
            resolve(row);
          }
        );
      });
      if (testerFromDB) {
        testerNameFromDB = testerFromDB.name;
        testerEmailFromDB = testerFromDB.email;
        console.log(`✅ Tester found in DATABASE: ${testerNameFromDB} (${testerEmailFromDB})`);
      }
    }

    // ✅ CRITICAL: Log the final email details
    console.log('📧 ========== EMAIL DETAILS ==========');
    console.log('📧 SOURCE:', isNewDeveloper ? 'NEWLY CREATED' : 'EXISTING DATABASE');
    console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
    console.log('📧 TO (Developer Email):', developerEmail);  // ✅ THIS MUST BE DEVELOPER'S EMAIL
    console.log('📧 Developer Name:', developerNameFromDB);
    console.log('📧 REPLY-TO (Tester Email):', testerEmailFromDB);
    console.log('📧 Tester Name:', testerNameFromDB);
    console.log('📧 ====================================');

    // ✅ Send email - TO is ALWAYS the developer's email
    const result = await sendReworkRequestEmail({
      toEmail: developerEmail,                    // ✅ TO: Developer's email (NOT tester)
      toName: developerNameFromDB,
      taskTitle: taskTitle,
      reworkNotes: reworkNotes,
      fromName: testerNameFromDB,                 // ✅ FROM name: Tester's name
      fromEmail: testerEmailFromDB,               // ✅ Reply-To: Tester's email (for replies)
      taskId: taskId,
      projectName: projectName,
      reworkCount: 1,
      originalDeveloper: developerNameFromDB,
      isNewDeveloper: isNewDeveloper
    });

    if (result) {
      console.log(`✅ Email sent successfully to: ${developerEmail}`);
      return res.json({ 
        success: true, 
        message: isNewDeveloper 
          ? `✅ New developer "${developerNameFromDB}" auto-registered. Email sent to ${developerEmail}`
          : `✅ Email sent to ${developerNameFromDB} (${developerEmail})`,
        developer: {
          id: developerId,
          name: developerNameFromDB,
          email: developerEmail,
          isNew: isNewDeveloper
        }
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email to developer' 
      });
    }
  } catch (error: any) {
    console.error('❌ Error in send-rework-email:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send email' 
    });
  }
});
// ============= ADD DEVELOPER WITH SPECIFIC EMAIL =============
app.post('/api/add-developer', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }

    // Check if user exists
    const existing = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(name) = LOWER(?)',
        [email, name],
        (err: any, row: any) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        error: `User with name "${name}" or email "${email}" already exists` 
      });
    }
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, 2, 1],
        function(err: any) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    
    console.log(`✅ Added developer: ${name} (${email})`);
    return res.json({ 
      success: true, 
      message: `Developer ${name} added successfully with email ${email}`,
      developer: {
        name: name,
        email: email
      }
    });
    
  } catch (error: any) {
    console.error('Error adding developer:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to add developer' 
    });
  }
});

// ============= QUICK ADD DEVELOPER (Auto-generate email) =============
app.post('/api/quick-add-developer', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Generate email from name
    const generatedEmail = `${name.toLowerCase().replace(/\s/g, '')}@gmail.com`;
    
    const existing = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id FROM users WHERE LOWER(name) = LOWER(?) OR email = ?',
        [name, generatedEmail],
        (err: any, row: any) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
    
    if (existing) {
      return res.json({ 
        success: true, 
        message: `User ${name} already exists with email ${generatedEmail}`,
        email: generatedEmail
      });
    }
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)',
        [name, generatedEmail, hashedPassword, 2, 1],
        function(err: any) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    
    console.log(`✅ Added developer: ${name} (${generatedEmail})`);
    return res.json({ 
      success: true, 
      message: `Developer ${name} added successfully with email ${generatedEmail}`,
      email: generatedEmail
    });
    
  } catch (error: any) {
    console.error('Error adding developer:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to add developer' 
    });
  }
});

// ============= GET USER BY NAME =============
app.get('/api/users/by-name/:name', async (req: Request, res: Response): Promise<any> => {
  const userName = req.params.name;
  
  if (!userName) {
    return res.status(400).json({ 
      success: false, 
      error: 'User name is required' 
    });
  }

  try {
    const user = await new Promise<any>((resolve, reject) => {
      db.get(
        'SELECT id, name, email, role_id, company_id FROM users WHERE LOWER(name) LIKE LOWER(?)',
        [`%${userName}%`],
        (err: any, row: any) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: `User "${userName}" not found` 
      });
    }

    console.log(`✅ Found user: ${user.name} (${user.email})`);

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        company_id: user.company_id
      }
    });

  } catch (error: any) {
    console.error('Error fetching user by name:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Interfaces
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
  console.log("Registration data:", req.body);

  if (!company_name || !email || !password || !admin_name) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const subdomain = company_name.toLowerCase().replace(/[^a-z0-9]/g, '');

    const existingCompany = await new Promise<any>((resolve, reject) => {
      db.get('SELECT id FROM companies WHERE subdomain = ?', [subdomain], (err: any, row: any) => {
        if (err) return reject(err);
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

    await new Promise<void>((resolve, reject) => {
      db.run('INSERT INTO users (company_id, email, password, name, role_id) VALUES (?, ?, ?, ?, ?)',
        [companyId, email, hashedPassword, admin_name, 1],
        function(err: any) {
          if (err) return reject(err);
          resolve();
        });
    });

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
    return res.status(500).json({ error: 'Server error during registration' });
  }
});

// ============= LOGIN API =============
app.post('/api/login-2fa', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<any> => {
  const { email, password, twoFACode } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    console.log(`🔍 Login attempt for: ${email}`);
    
    const user = await new Promise<any>((resolve, reject) => {
      db.get(
        `SELECT users.*, companies.company_name, companies.subdomain 
        FROM users 
        JOIN companies ON users.company_id = companies.id 
        WHERE users.email = ?`,
        [email],
        (err: any, row: any) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });
    
    if (!user) {
      console.warn(`❌ User not found: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.warn(`❌ Invalid password for: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log(`✅ Login successful for: ${email}`);
    
    const twoFA = await new Promise<any>((resolve, reject) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [user.id], (err: any, row: any) => {
        if (err) return reject(err);
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
    console.error('Login error:', error);
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
    const user = await new Promise<any>((resolve, reject) => {
      db.get('SELECT id, email FROM users WHERE email = ?', [email], (err: any, row: any) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (!user) {
      return res.json({
        success: true,
        message: 'If this email exists, a reset token has been generated.'
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

// ============= 2FA ENDPOINTS =============
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

app.post('/api/2fa/verify', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  
  if (!token || !code) {
    return res.status(400).json({ error: 'Token and code required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve, reject) => {
      db.get('SELECT secret FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err) return reject(err);
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

app.post('/api/2fa/disable', async (req: Request<{}, {}, { code?: string }>, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { code } = req.body;
  
  if (!token || !code) {
    return res.status(400).json({ error: 'Token and code required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve, reject) => {
      db.get('SELECT secret, enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err) return reject(err);
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

app.get('/api/2fa/status', async (req: Request, res: Response): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;
    
    const twoFA = await new Promise<any>((resolve, reject) => {
      db.get('SELECT enabled FROM two_fa WHERE user_id = ?', [userId], (err: any, row: any) => {
        if (err) return reject(err);
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


// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📧 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📋 Users endpoint: http://localhost:${PORT}/api/debug/users`);
  console.log(`👨‍💻 Developers endpoint: http://localhost:${PORT}/api/developers`);
  console.log(`\n📧 SMTP From: subasrimuthumanickam@gmail.com`);
  console.log(`\n✅ Ready to send rework emails to ANY developer!`);
});

export default app;