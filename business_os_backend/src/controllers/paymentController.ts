
import type { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import db from '../config/db.js';

export const createPayment = async (req: Request, res: Response) => {
    const { 
        customer_id, 
        invoice_id, 
        payment_number, 
        payment_date, 
        amount, 
        payment_mode, 
        reference_number, 
        notes 
    } = req.body;

    try {
        // 1. Insert Payment into payments table
        // Note: db.execute function-oda SQL query and parameters-ai correct-a match panna vendum
        const sql = `INSERT INTO payments 
            (customer_id, invoice_id, payment_number, payment_date, payment_method, amount, reference_number, notes, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
        
        const params = [
            customer_id, 
            invoice_id || null, 
            payment_number, 
            payment_date, 
            payment_mode, 
            amount, 
            reference_number, 
            notes
        ];

        await db.execute(sql, params);

        // 2. Update Invoice Status to 'Paid' automatically if invoice_id is present
        if (invoice_id) {
            await db.execute(
                "UPDATE invoices SET status = 'Paid' WHERE id = ?", 
                [invoice_id]
            );
        }
        
        res.status(201).json({ success: true, message: "Payment saved and Invoice marked as Paid" });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: "Database Error: Failed to save payment" });
    }
};

// =============================================
// Download Payment Receipt as PDF
// =============================================
export const getPaymentReceipt = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Join customers so the receipt has a name/email to print, not just IDs
        const rows: any = await db.execute(
            `SELECT p.*, 
                    c.name AS customer_name, 
                    c.email AS customer_email,
                    c.billing_address AS customer_address
             FROM payments p
             JOIN customers c ON p.customer_id = c.id
             WHERE p.id = ?`,
            [id]
        );

        const payment = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${payment.payment_number || "receipt-" + payment.id}.pdf`
        );

        const doc = new PDFDocument({ size: "A4", margin: 50 });
        doc.pipe(res);

        // ---- Header ----
        doc
            .fontSize(20)
            .fillColor("#111827")
            .text("Payment Receipt", { align: "left" });

        doc.moveDown(0.3);
        doc
            .fontSize(10)
            .fillColor("#6b7280")
            .text(`Receipt No: ${payment.payment_number}`)
            .text(`Date: ${new Date(payment.payment_date).toISOString().split("T")[0]}`);

        doc.moveDown(1.5);

        // ---- Customer Info ----
        doc
            .fontSize(11)
            .fillColor("#374151")
            .text("Received From", { underline: true });

        doc.moveDown(0.3);
        doc.fontSize(11).fillColor("#111827").text(payment.customer_name || "-");
        doc.fontSize(10).fillColor("#6b7280").text(payment.customer_email || "-");
        if (payment.customer_address) {
            doc.text(payment.customer_address);
        }

        doc.moveDown(2);

        // ---- Payment Details ----
        const tableTop = doc.y;

        doc
            .fontSize(11)
            .fillColor("#374151")
            .text("Payment Mode", 50, tableTop)
            .text("Reference", 220, tableTop)
            .text("Amount", 420, tableTop, { width: 100, align: "right" });

        doc
            .moveTo(50, tableTop + 18)
            .lineTo(520, tableTop + 18)
            .strokeColor("#e5e7eb")
            .stroke();

        const rowY = tableTop + 28;
        doc
            .fontSize(11)
            .fillColor("#111827")
            .text(payment.payment_method || "-", 50, rowY)
            .text(payment.reference_number || "-", 220, rowY)
            .text(`Rs. ${Number(payment.amount).toFixed(2)}`, 420, rowY, { width: 100, align: "right" });

        if (payment.notes) {
            doc.moveDown(3);
            doc.fontSize(10).fillColor("#6b7280").text(`Notes: ${payment.notes}`);
        }

        doc.moveDown(3);
        doc
            .fontSize(9)
            .fillColor("#9ca3af")
            .text("This is a system-generated receipt.", { align: "center" });

        doc.end();
    } catch (error) {
        console.error("Receipt PDF Error:", error);
        // Only safe to send a JSON error if headers haven't already gone out
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Failed to generate receipt" });
        }
    }
};