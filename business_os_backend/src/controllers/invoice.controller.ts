import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

import { createInvoice, getInvoiceById, updateInvoice, deleteInvoice } from "../services/invoice.service.js";
import { createInvoicePDF } from "../utils/pdf.js";

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
export const getInvoiceByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const result = await getInvoiceById(
      Number(req.params.id)
    );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
export const updateInvoiceController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await updateInvoice(id, req.body);

    res.json({
      success: true,
      message: "Invoice updated successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update invoice"
    });
  }
};

export const deleteInvoiceController = async (
  req: any,
  res: any
) => {

  try {
     
    console.log("Delete Hit", req.params.id);
    
    const id = Number(req.params.id);

    await deleteInvoice(id);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully"
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
export const downloadInvoicePdfController = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = Number(req.params.id);

    const invoice: any = await getInvoiceById(id);

    console.log("Invoice Full Data:", JSON.stringify(invoice, null, 2));

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    const filePath = path.join(process.cwd(), "tmp", `${invoice.invoice_number}.pdf`);
    
    console.log("PDF File Path:", filePath);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    console.log("Calling createInvoicePDF...");

    await createInvoicePDF(invoice, filePath);

    console.log("PDF Created Successfully");

    // res.download(filePath, `${invoice.invoice_number}.pdf`, (downloadErr) => {
    //   fs.unlink(filePath, () => {
    //     if (downloadErr) {
    //       console.error("PDF download error:", downloadErr);
    //     }
    //   });
    // });
     
   res.download(
  filePath,
  `${invoice.invoice_number}.pdf`
);
 
  } catch (err: any) {

  console.error("PDF generation error:", err);

  res.status(500).json({
    success: false,
    message: err.message
  });
}
};