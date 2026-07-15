import type { Request, Response } from "express";
import db from "../config/db.js"; // adjust path to match your db wrapper location

interface SalesOrderItemInput {
  product_id?: number | null;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

// GET /api/sales-orders/last -> most recent sales_order_number for auto-numbering
export const getLastOrderNumber = async (req: Request, res: Response) => {
  try {
    const rows = await db.execute(
      `SELECT sales_order_number FROM sales_orders
       ORDER BY id DESC LIMIT 1`
    );
    const list = rows as { sales_order_number: string }[];
    const latest = list[0];
    res.json({ success: true, data: { order_number: latest ? latest.sales_order_number : null } });
  } catch (err) {
    console.error("getLastOrderNumber error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch last order number" });
  }
};

// POST /api/sales-orders/create
export const createSalesOrder = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      order_number,
      order_date,
      expected_shipment_date,
      status,
      subtotal,
      tax,
      total,
      notes,
      items,
    } = req.body;

    if (!customer_id) {
      return res.status(400).json({ success: false, message: "customer_id is required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "At least one item is required" });
    }

    const params = [
      order_number ?? null,
      customer_id ?? null,
      order_date ?? null,
      expected_shipment_date ?? null,
      status ?? "Draft",
      subtotal ?? 0,
      tax ?? 0,
      total ?? 0,
      notes ?? null,
    ];

    const result: any = await db.execute(
      `INSERT INTO sales_orders
         (sales_order_number, customer_id, order_date, delivery_date, status, subtotal, tax, total, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params
    );

    const salesOrderId = result.insertId;

    for (const item of items as SalesOrderItemInput[]) {
      await db.execute(
        `INSERT INTO sales_order_items
           (sales_order_id, product_id, item_name, quantity, rate, amount)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          salesOrderId,
          item.product_id ?? null,
          item.item_name ?? null,
          item.quantity ?? 0,
          item.rate ?? 0,
          item.amount ?? 0,
        ]
      );
    }

    res.json({ success: true, data: { id: salesOrderId } });
  } catch (err) {
    console.error("createSalesOrder error:", err);
    res.status(500).json({ success: false, message: "Failed to create sales order" });
  }
};

// GET /api/sales-orders/customer/:customerId -> used by CustomerDetails Related Lists tab
export const getSalesOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.customerId);
    const rows = await db.execute(
      `SELECT id, sales_order_number, order_date, delivery_date, status, subtotal, tax, total, created_at
       FROM sales_orders
       WHERE customer_id = ?
       ORDER BY order_date DESC, id DESC`,
      [customerId]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("getSalesOrdersByCustomer error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch sales orders" });
  }
};