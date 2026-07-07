import type { Request, Response } from "express";
import { createVendor, getAllVendors } from "../services/vendor.service.js";

export const createVendorController = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await createVendor(req.body);
    res.status(201).json({ success: true, message: "Vendor created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVendorsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getAllVendors();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};