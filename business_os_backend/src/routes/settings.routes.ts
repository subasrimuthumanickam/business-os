// src/server/routes/settings.routes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js'; // adjust to your actual middleware name
import {
  getGeneralSettings,
  updateGeneralSettings,
  getFinancialSettings,
  updateFinancialSettings,
} from '../controllers/settings.controller.js';

const router = Router();

router.get('/general', authenticateToken, getGeneralSettings);
router.put('/general', authenticateToken, updateGeneralSettings);
router.get('/financial', authenticateToken, getFinancialSettings);
router.put('/financial', authenticateToken, updateFinancialSettings);

export default router;