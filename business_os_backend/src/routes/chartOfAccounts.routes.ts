import { Router } from 'express';
import chartOfAccountsController from '../controllers/chartOfAccounts.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

// Specific routes before /:id
router.get('/', chartOfAccountsController.getAllAccounts);
router.post('/', chartOfAccountsController.createAccount);
router.get('/:id', chartOfAccountsController.getAccountById);
router.put('/:id', chartOfAccountsController.updateAccount);
router.patch('/:id/toggle-active', chartOfAccountsController.toggleActive);
router.delete('/:id', chartOfAccountsController.deleteAccount);

export default router;