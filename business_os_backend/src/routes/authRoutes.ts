import { Router } from 'express';
import { authController } from '../controllers/authController.js';

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

export default router;