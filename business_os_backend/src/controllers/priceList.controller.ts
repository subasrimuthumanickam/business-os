import type { Request, Response } from "express";
import db from "../config/db.js";

// GET ALL PRICE LISTS (for dropdown)
export const getAllPriceLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await db.execute(
      `SELECT id, name, description FROM price_lists ORDER BY name ASC`,
      []
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Price list fetch error:", error);
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};
