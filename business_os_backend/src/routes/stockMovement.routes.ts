import { Router } from 'express';
import {
    getAllMovementsHandler,
    getMovementsByProductHandler,
    addStockHandler,
    removeStockHandler
} from '../controllers/stockMovement.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

// IMPORTANT: specific routes before any param-catching route
router.get('/', getAllMovementsHandler);
router.get('/product/:productId', getMovementsByProductHandler);
router.post('/add', addStockHandler);
router.post('/remove', removeStockHandler);

export default router;