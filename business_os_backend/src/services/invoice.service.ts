
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
  total,
  items
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

  const invoiceId = this.lastID;

  if (!items || items.length === 0) {
    resolve({ invoiceId });
    return;
  }

  let completed = 0;

  items.forEach((item: any) => {

    db.run(
      `
      INSERT INTO invoice_items
      (
        invoice_id,
        item_name,
        quantity,
        rate,
        amount
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        invoiceId,
        item.item_name,
        item.quantity,
        item.rate,
        item.amount
      ],
      (itemErr: any) => {

        if (itemErr) {
          reject(itemErr);
          return;
        }

        completed++;

        if (completed === items.length) {
          resolve({ invoiceId });
        }
      }
    );

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

export const getInvoiceById = async (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {

    console.log("Searching Invoice ID:", id);

    db.get(
      `SELECT * FROM invoices WHERE id = ?`,
      [id],
      (err: any, invoice: any) => {

        console.log("DB Error:", err);
        console.log("Invoice Result:", invoice);

        if (err) return reject(err);

        if (!invoice) {
          return reject(new Error("Invoice not found"));
        }

        db.all(
          `SELECT * FROM invoice_items WHERE invoice_id = ?`,
          [id],
          (itemErr: any, items: any[]) => {

            if (itemErr) return reject(itemErr);

            invoice.items = items;

            resolve(invoice);
          }
        );

      }
    );
  });
};

export const updateInvoice = async (
  id: number,
  invoiceData: any
) => {

  const {
    customer_id,
    invoice_number,
    invoice_date,
    due_date,
    status,
    subtotal,
    tax,
    total,
    items
  } = invoiceData;

  return new Promise((resolve, reject) => {

    db.run(
      `
      UPDATE invoices
      SET
        customer_id=?,
        invoice_number=?,
        invoice_date=?,
        due_date=?,
        status=?,
        subtotal=?,
        tax=?,
        total=?
      WHERE id=?
      `,
      [
        customer_id,
        invoice_number,
        invoice_date,
        due_date,
        status,
        subtotal,
        tax,
        total,
        id
      ],
      function (err: any) {

        if (err) {
          reject(err);
          return;
        }

        // Delete old items
        db.run(
          `DELETE FROM invoice_items WHERE invoice_id=?`,
          [id],
          (deleteErr: any) => {

            if (deleteErr) {
              reject(deleteErr);
              return;
            }

            if (!items || items.length === 0) {
              resolve(true);
              return;
            }

            let completed = 0;

            items.forEach((item: any) => {

              db.run(
                `
                INSERT INTO invoice_items
                (
                  invoice_id,
                  item_name,
                  quantity,
                  rate,
                  amount
                )
                VALUES (?, ?, ?, ?, ?)
                `,
                [
                  id,
                  item.item_name,
                  item.quantity,
                  item.rate,
                  item.amount
                ],
                (itemErr: any) => {

                  if (itemErr) {
                    reject(itemErr);
                    return;
                  }

                  completed++;

                  if (completed === items.length) {
                    resolve(true);
                  }

                }
              );

            });

          }
        );

      }
    );

  });

};

export const deleteInvoice = async (
  id: number
): Promise<any> => {

  return new Promise((resolve, reject) => {

    // First delete invoice items
    db.run(
      `DELETE FROM invoice_items WHERE invoice_id = ?`,
      [id],
      (itemErr: any) => {

        if (itemErr) {
          reject(itemErr);
          return;
        }

        // Then delete invoice
        db.run(
          `DELETE FROM invoices WHERE id = ?`,
          [id],
          function (err: any) {

            if (err) {
              reject(err);
              return;
            }

            resolve({
              success: true,
              deletedRows: this.changes
            });
          }
        );
      }
    );

  });

};