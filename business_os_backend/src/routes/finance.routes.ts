import { Router } from 'express';
import financeController from '../controllers/finance.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All routes require login (from /api/login-2fa JWT flow)
router.use(authenticateToken);

router.get('/settings', financeController.getSettings);
router.put('/settings', financeController.updateSettings);

export default router;