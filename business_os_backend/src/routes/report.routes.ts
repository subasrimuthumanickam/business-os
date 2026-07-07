import { Router } from 'express';
import {
  getSalesReport,
  getInventoryReport,
  getProfitAndLossReport,
  getBalanceSheetReport,
  getCashFlowReport,
  getSalesByCustomerReport,
  getSalesByItemReport,
  getSalesBySalesPersonReport,
  getInventorySummaryController,
  getInventoryValuationSummaryController,  
} from '../controllers/report.controller.js';

const router = Router();

router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);
router.get('/profit-loss', getProfitAndLossReport);
router.get('/balance-sheet', getBalanceSheetReport);
router.get('/cash-flow', getCashFlowReport);
router.get('/sales-by-customer', getSalesByCustomerReport);
router.get('/sales-by-item', getSalesByItemReport);
router.get('/sales-by-sales-person', getSalesBySalesPersonReport);
router.get('/inventory-summary', getInventorySummaryController); 
router.get('/inventory-valuation-summary', getInventoryValuationSummaryController);

export default router;