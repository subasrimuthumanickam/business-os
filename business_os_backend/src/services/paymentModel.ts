import db from "../config/db.js";

export const getPaymentById = async (id: number) => {

  const [rows]: any = await db.execute(
    `
    SELECT
      p.*,
      c.display_name AS customer_name,
      c.email AS customer_email
    FROM payments p
    LEFT JOIN customers c
      ON p.customer_id = c.id
    WHERE p.id = ?
    `,
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
};