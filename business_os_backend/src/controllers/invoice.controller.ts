import type { Request, Response } from "express";

import {
  createInvoice
} from "../services/invoice.service.js";

export const createInvoiceController = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const result = await createInvoice(req.body);

    return res.status(201).json({
      success: true,
      message: "Invoice Created Successfully",
      data: result
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};