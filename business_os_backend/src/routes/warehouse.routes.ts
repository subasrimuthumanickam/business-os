import { Router } from 'express';
import warehouseController from '../controllers/warehouse.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', warehouseController.getAllWarehouses);
router.post('/', warehouseController.createWarehouse);
router.put('/:id', warehouseController.updateWarehouse);
router.patch('/:id/set-default', warehouseController.setDefaultWarehouse);
router.patch('/:id/toggle-active', warehouseController.toggleActive);
router.delete('/:id', warehouseController.deleteWarehouse);

export default router;