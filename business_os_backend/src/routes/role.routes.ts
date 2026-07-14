import { Router } from 'express';
import roleController from '../controllers/role.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

// 🎯 Specific routes MUST come before dynamic /:id routes
router.get('/permissions', roleController.getAllPermissions);

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleWithPermissions);
router.post('/', roleController.createRole);
router.put('/:id/permissions', roleController.updateRolePermissions);
router.delete('/:id', roleController.deleteRole);

export default router;