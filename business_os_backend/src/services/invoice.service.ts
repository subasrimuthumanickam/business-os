
import db from "../config/db.js";

export const createInvoice = async (
  invoiceData: any
): Promise<any> => {

  const {
    customer_id,
    invoice_number,
    invoice_date,
    due_date,
    status,
    subtotal,
    tax,
    total
  } = invoiceData;

  return new Promise((resolve, reject) => {

    db.run(
      `
      INSERT INTO invoices (
        customer_id,
        invoice_number,
        invoice_date,
        due_date,
        status,
        subtotal,
        tax,
        total
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_id,
        invoice_number,
        invoice_date,
        due_date,
        status,
        subtotal,
        tax,
        total
      ],
      function (err: any) {

        if (err) {
          reject(err);
          return;
        }

        resolve({
          invoiceId: this.lastID
        });
      }
    );
  });
  
};
export const getNextInvoiceNumber = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT MAX(CAST(SUBSTRING(invoice_number, 5) AS UNSIGNED)) as lastNum FROM invoices",
      [], 
      (err: any, row: any) => {
        if (err) {
          reject(err);
          return;
        }
        const lastNum = row?.lastNum || 1000;
        resolve(`INV-${lastNum + 1}`);
      }
    );
  });
};