import type { Request, Response } from "express";
import {
  createPurchaseOrder,
  receivePurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
} from "../services/purchaseOrder.service.js";

export const createPurchaseOrderController = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await createPurchaseOrder(req.body);
    res.status(201).json({ success: true, message: "Purchase order created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const receivePurchaseOrderController = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await receivePurchaseOrder(Number(req.params.id));
    res.status(200).json({ success: true, message: "Purchase order received", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPurchaseOrdersController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getAllPurchaseOrders();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPurchaseOrderByIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getPurchaseOrderById(Number(req.params.id));
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};