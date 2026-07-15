import db from "../config/db.js"; // adjust path to match your db wrapper location

export interface SalesOrderItemInput {
  product_id?: number | null;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CreateSalesOrderInput {
  customer_id: number;
  order_number: string; // maps to sales_order_number column
  order_date: string;
  expected_shipment_date?: string | null; // maps to delivery_date column
  status?: string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string | null;
  items: SalesOrderItemInput[];
}

// GET /api/sales-orders/last -> most recent sales_order_number for auto-numbering
export const getLastOrderNumber = async (): Promise<string | null> => {
  const rows = await db.execute(
    `SELECT sales_order_number FROM sales_orders
     ORDER BY id DESC LIMIT 1`
  );
  const list = rows as { sales_order_number: string }[];
  const latest = list[0];
  return latest ? latest.sales_order_number : null;
};

// POST /api/sales-orders/create
export const createSalesOrder = async (input: CreateSalesOrderInput): Promise<number> => {
  // TEMP DEBUG — remove once the undefined-param bug is confirmed fixed
  console.log("createSalesOrder payload received:", JSON.stringify(input, null, 2));

  const params = [
    input.order_number ?? null,
    input.customer_id ?? null,
    input.order_date ?? null,
    input.expected_shipment_date ?? null,
    input.status ?? "Draft",
    input.subtotal ?? 0,
    input.tax ?? 0,
    input.total ?? 0,
    input.notes ?? null,
  ];

  // TEMP DEBUG — shows exactly which index is undefined, if any
  params.forEach((p, i) => {
    if (p === undefined) console.error(`sales_orders param at index ${i} is undefined!`);
  });

  const result: any = await db.execute(
    `INSERT INTO sales_orders
       (sales_order_number, customer_id, order_date, delivery_date, status, subtotal, tax, total, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params
  );

  const salesOrderId = result.insertId;

  for (const item of input.items) {
    const itemParams = [
      salesOrderId,
      item.product_id ?? null,
      item.item_name ?? null,
      item.quantity ?? 0,
      item.rate ?? 0,
      item.amount ?? 0,
    ];

    itemParams.forEach((p, i) => {
      if (p === undefined) console.error(`sales_order_items param at index ${i} is undefined!`, item);
    });

    await db.execute(
      `INSERT INTO sales_order_items
         (sales_order_id, product_id, item_name, quantity, rate, amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      itemParams
    );
  }

  return salesOrderId;
};

// GET /api/sales-orders/customer/:customerId -> used by CustomerDetails Related Lists tab
export const getSalesOrdersByCustomer = async (customerId: number) => {
  const rows = await db.execute(
    `SELECT id, sales_order_number, order_date, delivery_date, status, subtotal, tax, total, created_at
     FROM sales_orders
     WHERE customer_id = ?
     ORDER BY order_date DESC, id DESC`,
    [customerId]
  );
  return rows;
};