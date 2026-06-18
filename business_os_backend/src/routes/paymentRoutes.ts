
import express from 'express';
import { createPayment, getPaymentReceipt } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', createPayment);
router.get('/:id/receipt', getPaymentReceipt);

export default router;