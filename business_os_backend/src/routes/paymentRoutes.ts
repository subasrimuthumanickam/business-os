
import express from 'express';
import { createPayment, getPaymentReceipt, getPayment, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post("/create", createPayment);
router.get("/:id/receipt", getPaymentReceipt);
router.get("/:id", getPayment);
router.delete("/:id", deletePayment);

export default router;