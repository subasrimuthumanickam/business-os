import { Router } from 'express';
import { getSalesReport, getInventoryReport, getProfitAndLossReport, getBalanceSheetReport, getCashFlowReport } from '../controllers/report.controller.js';

const router = Router();

// Routes definition
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);
router.get('/profit-loss', getProfitAndLossReport);
router.get('/balance-sheet', getBalanceSheetReport);
router.get('/cash-flow', getCashFlowReport);
export default router;