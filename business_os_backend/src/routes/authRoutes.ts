import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import db from '../config/db.js'; // Ensure this points to your SQLite configuration wrapper

const router = Router();

router.post('/register', authController.registerCompany);
router.post('/register-company', authController.registerCompany);
router.post('/login', authController.login);
router.post('/login-2fa', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/2fa/status', authController.check2FAStatus);
router.post('/2fa/enable', authController.enable2FA);
router.post('/2fa/verify', authController.verify2FA);
router.post('/2fa/disable', authController.disable2FA);

// ========================================================
// 🎯 DYNAMIC LOGGED-IN USER SESSION INJECTOR ROUTE (FINAL STABLE PATCH)
// ========================================================
router.get('/me', authenticateToken, (req: any, res: any): void => {
  const userPayload = req.user; 

  if (!userPayload) {
    res.status(401).json({ success: false, message: 'Invalid or missing user session context.' });
    return;
  }

  // 🎯 Fetch dynamic reference parameters
  const targetDatabaseId = userPayload.userId || userPayload.id;

  if (!targetDatabaseId) {
    res.status(401).json({ success: false, message: 'User reference missing inside token matrix.' });
    return;
  }

  // 🎯 STABLE SQLITE PIPELINE: Direct sequential execution logic
  db.get(
    'SELECT id, name, email, role_id FROM users WHERE id = ?', 
    [targetDatabaseId], 
    (err: any, row: any) => {
      // 1. Check if database engine threw any internal runtime error
      if (err) {
        console.error("❌ SQLite internal query thread breakdown:", err);
        res.status(500).json({ success: false, message: 'Database query execution failure.', error: err.message });
        return;
      }

      // 2. Check if the database successfully found the user row record
      if (!row) {
        console.warn(`⚠️ Profile entity look-up missing for Target ID: ${targetDatabaseId}`);
        res.status(404).json({ success: false, message: 'Session registry profile target missing in DB layers.' });
        return;
      }

      // 3. Success callback: Explicit mapping structure expected by ClientHeader UI components
      res.status(200).json({ 
        success: true, 
        data: {
          name: row.name,    // Yields correct dynamic value seamlessly (Subasri, Yoga, etc.)
          email: row.email,
          role: row.role_id === 1 ? 'Administrator' : 'Staff' 
        }
      });
    }
  );
});

export default router;