// import db from "../config/db.js";

// export const createInvoice = async (
//   invoiceData: any
// ): Promise<any> => {

//   const {
//     customer_id,
//     invoice_number,
//     invoice_date,
//     due_date,
//     status,
//     subtotal,
//     tax,
//     total,
//     items
//   } = invoiceData;

//   return new Promise((resolve, reject) => {

//     const invoiceSql = `
//       INSERT INTO invoices (
//         customer_id,
//         invoice_number,
//         invoice_date,
//         due_date,
//         status,
//         subtotal,
//         tax,
//         total
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.run(
//       invoiceSql,
//       [
//         customer_id,
//         invoice_number,
//         invoice_date,
//         due_date,
//         status,
//         subtotal,
//         tax,
//         total
//       ],
//       (err: any, result: any) => {

//         if (err) {
//           reject(err);
//           return;
//         }

//         const invoiceId = result.insertId;

//         if (!items || items.length === 0) {
//           resolve(result);
//           return;
//         }

//         const itemValues = items.map((item: any) => [
//           invoiceId,
//           item.item_name,
//           item.quantity,
//           item.rate,
//           item.amount
//         ]);

//         const itemSql = `
//           INSERT INTO invoice_items
//           (
//             invoice_id,
//             item_name,
//             quantity,
//             rate,
//             amount
//           )
//           VALUES ?
//         `;

//         db.run(
//           itemSql,
//           [itemValues],
//           (itemErr: any, itemResult: any) => {

//             if (itemErr) {
//               reject(itemErr);
//             } else {
//               resolve({
//                 invoiceId
//               });
//             }
//           }
//         );
//       }
//     );
//   });
// };

// import db from "../config/db.js";

// export const createInvoice = async (
//   invoiceData: any
// ): Promise<any> => {

//   const {
//     customer_id,
//     invoice_number,
//     invoice_date,
//     due_date,
//     status,
//     subtotal,
//     tax,
//     total,
//     items
//   } = invoiceData;

//   return new Promise((resolve, reject) => {

//     const invoiceSql = `
//       INSERT INTO invoices (
//         customer_id,
//         invoice_number,
//         invoice_date,
//         due_date,
//         status,
//         subtotal,
//         tax,
//         total
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.run(
//       invoiceSql,
//       [
//         customer_id,
//         invoice_number,
//         invoice_date,
//         due_date,
//         status,
//         subtotal,
//         tax,
//         total
//       ],
//       function (err: any) {

//         if (err) {
//           reject(err);
//           return;
//         }

//         const invoiceId = this.lastID;

//         if (!items || items.length === 0) {
//           resolve({ invoiceId });
//           return;
//         }

//         let completed = 0;

//         items.forEach((item: any) => {

//           db.run(
//             `
//             INSERT INTO invoice_items
//             (
//               invoice_id,
//               item_name,
//               quantity,
//               rate,
//               amount
//             )
//             VALUES (?, ?, ?, ?, ?)
//             `,
//             [
//               invoiceId,
//               item.item_name,
//               item.quantity,
//               item.rate,
//               item.amount
//             ],
//             (itemErr: any) => {

//               if (itemErr) {
//                 reject(itemErr);
//                 return;
//               }

//               completed++;

//               if (completed === items.length) {
//                 resolve({
//                   invoiceId
//                 });
//               }
//             }
//           );
//         });
//       }
//     );
//   });
// };

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