import { Router } from 'express';
import * as ExpenseController from '../controllers/expenseController.js';

const router = Router();

router.get('/expenses', ExpenseController.listExpenses);
router.get('/expenses/:id', ExpenseController.getExpense);
router.post('/expenses', ExpenseController.addExpense);
router.put('/expenses/:id', ExpenseController.editExpense);
router.patch('/expenses/:id/status', ExpenseController.editExpenseStatus);
router.delete('/expenses/:id', ExpenseController.removeExpense);

router.get('/expense-accounts', ExpenseController.listExpenseAccounts);
router.post('/expense-accounts', ExpenseController.addExpenseAccount);

router.get('/payment-accounts', ExpenseController.listPaymentAccounts);
router.post('/payment-accounts', ExpenseController.addPaymentAccount);

export default router;