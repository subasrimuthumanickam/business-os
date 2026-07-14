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
import dashboardRoutes from './routes/dashboardRoutes.js';
import settingsRoutes from './routes/settings.routes.js';
import companyRoutes from './routes/company.routes.js';
import roleRoutes from './routes/role.routes.js'; 

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
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/employees", employeeRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/company', companyRoutes); 
app.use('/api/roles', roleRoutes); // Role and permission management routes


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
 
});

export default app;