import type { Request, Response } from 'express';
import { getProductTransactions } from '../services/Producttransaction.service.js';

// GET /products/:id/transactions
// Returns invoices, estimates, and sales orders referencing this product.
export const getProductTransactionsHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = Number(req.params.id);
    if (!productId) {
      return res.status(400).json({ success: false, message: "Valid product id is required." });
    }

    const transactions = await getProductTransactions(productId);
    return res.status(200).json({ success: true, data: transactions });
  } catch (error: any) {
    console.error("Product transactions fetch error:", error);
    return res.status(500).json({ success: false, message: error.message, data: [] });
  }
};