import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import db from "../config/db.js";

import { createInvoice, getInvoiceById, updateInvoice, deleteInvoice, getAllInvoices } from "../services/invoice.service.js";
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

export const getAllInvoicesController = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    const invoices = await getAllInvoices();

    return res.status(200).json({
      success: true,
      data: invoices
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



export const getNextInvoiceNumberController = async (
  req: Request,
  res: Response
): Promise<any> => {

  try {

    // ✅ ADDED — without this, the browser was caching this GET response
    // and returning it via 304 on every subsequent call, so the invoice
    // number never actually incremented on screen.
    res.set("Cache-Control", "no-store");

    // ✅ CHANGED — previously parsed the digits out of the last saved
    // invoice_number string and added 1 to that. That worked fine in
    // theory, but every invoice created before this feature existed has
    // a random 5-digit invoice_number (INV-89648, INV-67466, ...), so
    // "last number + 1" just kept continuing that random sequence
    // forever instead of ever producing a clean INV-00001 style series.
    //
    // Basing it on MAX(id) instead sidesteps the legacy data completely —
    // id is a real auto-incrementing counter regardless of what text is
    // in invoice_number, so this always produces a clean, ever-increasing
    // sequence from here on: INV-00001, INV-00002, INV-00003 ...
    (db as any).get(
      `SELECT MAX(id) AS lastId FROM invoices`,
      [],
      (err: any, row: any) => {

        if (err) {
          console.error("Next invoice number fetch failed:", err);
          return res.status(500).json({ success: false, message: err.message });
        }

        const lastId = row && row.lastId ? Number(row.lastId) : 0;
        const nextNumber = lastId + 1;

        // Zero-padded to 5 digits: INV-00001, INV-00002, ... INV-99999
        const invoiceNumber = `INV-${String(nextNumber).padStart(5, "0")}`;

        return res.status(200).json({ success: true, invoiceNumber });
      }
    );

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


