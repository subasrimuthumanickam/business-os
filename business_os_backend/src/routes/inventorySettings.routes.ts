import { Router } from 'express';
import inventorySettingsController from '../controllers/inventorySettings.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', inventorySettingsController.getSettings);
router.put('/', inventorySettingsController.updateSettings);

export default router;