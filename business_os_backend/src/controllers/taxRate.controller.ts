import type { Request, Response } from "express";
import db from "../config/db.js";

// GET ALL TAX RATES (for dropdown)
export const getAllTaxRates = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await db.execute(
      `SELECT id, name, rate_percent FROM tax_rates ORDER BY rate_percent DESC`,
      []
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Tax rate fetch error:", error);
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};