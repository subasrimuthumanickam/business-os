import { Router } from 'express';
import { getSalesReport, getInventoryReport } from '../controllers/report.controller.js';


const router = Router();

// Routes definition
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);

export default router;