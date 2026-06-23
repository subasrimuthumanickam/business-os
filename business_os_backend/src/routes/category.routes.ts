import { Router } from 'express';
import {
    getAllCategoriesHandler,
    getCategoryHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/category.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllCategoriesHandler);
router.get('/:id', getCategoryHandler);
router.post('/', createCategoryHandler);
router.put('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;