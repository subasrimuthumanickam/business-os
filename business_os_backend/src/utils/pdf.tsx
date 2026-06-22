import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import type { Response } from "express";

// ---------- Types ----------
interface InvoiceItem {
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  customer_name?: string;
  customer_email?: string;
  items?: InvoiceItem[];
  total: number;
}

// ---------- PDF Generator ----------
export const createInvoicePDF = (
  invoice: Invoice,
  filePath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // HEADER
      doc.fontSize(20).text("INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice No: ${invoice.invoice_number}`);
      doc.text(`Date: ${invoice.invoice_date}`);
      doc.text(`Due: ${invoice.due_date}`);
      doc.moveDown();

      // CUSTOMER
      doc.text(`Customer: ${invoice.customer_name || "-"}`);
      doc.text(`Email: ${invoice.customer_email || "-"}`);
      doc.moveDown();

      // ITEMS
      doc.text("Items:");
      invoice.items?.forEach((item, i) => {
        doc.text(
          `${i + 1}. ${item.item_name} | Qty: ${item.quantity} | Rate: ${item.rate} | Amt: ${item.amount}`
        );
      });

      doc.moveDown();

      // TOTAL
      doc.fontSize(14).text(`Total: ${invoice.total}`);

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};
export default createInvoicePDF;