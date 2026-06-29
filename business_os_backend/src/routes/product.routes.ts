// import { Router } from 'express';
// import {
//     getAllProductsHandler,
//     getProductHandler,
//     createProductHandler,
//     updateProductHandler,
//     deleteProductHandler
// } from '../controllers/product.controller.js';
// import { getProductTransactionsHandler } from '../controllers/Producttransaction.controller.js';
// import { authenticateToken } from '../middleware/authMiddleware.js';

// const router = Router();

// router.use(authenticateToken);

// router.get('/', getAllProductsHandler);
// router.get('/:id', getProductHandler);
// router.get('/:id/transactions', getProductTransactionsHandler);
// router.post('/', createProductHandler);
// router.put('/:id', updateProductHandler);
// router.delete('/:id', deleteProductHandler);

// export default router;

// import { Router } from 'express';
// import {
//     getAllProductsHandler,
//     getProductHandler,
//     createProductHandler,
//     updateProductHandler,
//     deleteProductHandler,
//     searchProductsHandler
// } from '../controllers/product.controller.js';
// import { getProductTransactionsHandler } from '../controllers/Producttransaction.controller.js';
// import { authenticateToken } from '../middleware/authMiddleware.js';

// const router = Router();

// router.use(authenticateToken);

// router.get('/', getAllProductsHandler);
// router.get('/search', searchProductsHandler);
// router.get('/:id', getProductHandler);
// router.get('/:id/transactions', getProductTransactionsHandler);
// router.post('/', createProductHandler);
// router.put('/:id', updateProductHandler);
// router.delete('/:id', deleteProductHandler);

// export default router;

import { Router } from 'express';
import {
    getAllProductsHandler,
    getProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    searchProductsHandler
} from '../controllers/product.controller.js';
import { getProductTransactionsHandler } from '../controllers/Producttransaction.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllProductsHandler);
router.get('/search', searchProductsHandler);
router.get('/:id', getProductHandler);
router.get('/:id/transactions', getProductTransactionsHandler);
router.post('/', createProductHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

export default router;