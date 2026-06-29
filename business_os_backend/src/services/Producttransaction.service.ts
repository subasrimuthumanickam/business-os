import db from '../config/db.js';

export interface ProductTransaction {
  type: 'invoice' | 'estimate' | 'sales_order';
  id: number;
  number: string;          // invoice_number / estimate_number / sales_order_number
  date: string;             // invoice_date / estimate_date / order_date
  status: string;
  customer_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

/**
 * Returns every Invoice, Estimate, and Sales Order line item that
 * references this product, newest first.
 *
 * NOTE: invoice_items.product_id is NULL for invoices created before the
 * 2026_06_25_add_product_id_to_invoice_items migration, and will stay NULL
 * until CreateInvoice's save flow is updated to send it — so invoices may
 * under-report until that follow-up is done. Estimates and Sales Orders
 * already had product_id from the start, so those are complete now.
 */
export const getProductTransactions = async (productId: number): Promise<ProductTransaction[]> => {
  const rows = await db.execute(
    `
    SELECT
      'invoice' AS type,
      i.id AS id,
      i.invoice_number AS number,
      i.invoice_date AS date,
      i.status AS status,
      c.display_name AS customer_name,
      ii.quantity AS quantity,
      ii.rate AS rate,
      ii.amount AS amount
    FROM invoice_items ii
    JOIN invoices i ON i.id = ii.invoice_id
    JOIN customers c ON c.id = i.customer_id
    WHERE ii.product_id = ?

    UNION ALL

    SELECT
      'estimate' AS type,
      e.id AS id,
      e.estimate_number AS number,
      e.estimate_date AS date,
      e.status AS status,
      c.display_name AS customer_name,
      ei.quantity AS quantity,
      ei.rate AS rate,
      ei.amount AS amount
    FROM estimate_items ei
    JOIN estimates e ON e.id = ei.estimate_id
    JOIN customers c ON c.id = e.customer_id
    WHERE ei.product_id = ?

    UNION ALL

    SELECT
      'sales_order' AS type,
      so.id AS id,
      so.sales_order_number AS number,
      so.order_date AS date,
      so.status AS status,
      c.display_name AS customer_name,
      soi.quantity AS quantity,
      soi.rate AS rate,
      soi.amount AS amount
    FROM sales_order_items soi
    JOIN sales_orders so ON so.id = soi.sales_order_id
    JOIN customers c ON c.id = so.customer_id
    WHERE soi.product_id = ?

    ORDER BY date DESC
    `,
    [productId, productId, productId]
  );

  return rows as ProductTransaction[];
};