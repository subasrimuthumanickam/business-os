import db from "../config/db.js";

export const createPurchaseOrder = async (data: any) => {
  const { po_number, vendor_id, po_date, shipping_charge, customs_duty, items } = data;

  const subtotal = items.reduce((sum: number, item: any) => sum + Number(item.quantity) * Number(item.unit_cost), 0);
  const total = subtotal + Number(shipping_charge || 0) + Number(customs_duty || 0);

  const insertPO: any = await db.execute(
    `INSERT INTO purchase_orders (po_number, vendor_id, po_date, status, subtotal, shipping_charge, customs_duty, total)
     VALUES (?, ?, ?, 'Draft', ?, ?, ?, ?)`,
    [po_number, vendor_id, po_date, subtotal, shipping_charge || 0, customs_duty || 0, total]
  );

  const poId = Array.isArray(insertPO) ? insertPO[0].insertId : insertPO.insertId;

  for (const item of items) {
    const amount = Number(item.quantity) * Number(item.unit_cost);
    await db.execute(
      `INSERT INTO purchase_order_items (po_id, product_id, quantity, unit_cost, amount)
       VALUES (?, ?, ?, ?, ?)`,
      [poId, item.product_id, item.quantity, item.unit_cost, amount]
    );
  }

  return { poId };
};

// Marks a PO as Received and adds stock to products.
// This is the step that actually moves inventory — creating the PO alone
// does not touch stock_quantity, only receiving does.
export const receivePurchaseOrder = async (poId: number) => {
  const poRows: any = await db.execute(`SELECT * FROM purchase_orders WHERE id = ?`, [poId]);
  const po = Array.isArray(poRows[0]) ? poRows[0][0] : poRows[0];

  if (!po) throw new Error("Purchase order not found");
  if (po.status === "Received") throw new Error("Purchase order already received");

  const itemRows: any = await db.execute(`SELECT * FROM purchase_order_items WHERE po_id = ?`, [poId]);
  const items = Array.isArray(itemRows[0]) ? itemRows[0] : itemRows;

  for (const item of items) {
    await db.execute(
      `UPDATE products SET stock_quantity = stock_quantity + ?, cost = ? WHERE id = ?`,
      [item.quantity, item.unit_cost, item.product_id]
    );
  }

  await db.execute(`UPDATE purchase_orders SET status = 'Received' WHERE id = ?`, [poId]);

  return { success: true };
};

export const getAllPurchaseOrders = async () => {
  const rows: any = await db.execute(
    `SELECT po.*, v.name AS vendor_name
     FROM purchase_orders po
     LEFT JOIN vendors v ON v.id = po.vendor_id
     ORDER BY po.id DESC`,
    []
  );
  return Array.isArray(rows[0]) ? rows[0] : rows;
};

export const getPurchaseOrderById = async (id: number) => {
  const poRows: any = await db.execute(
    `SELECT po.*, v.name AS vendor_name FROM purchase_orders po
     LEFT JOIN vendors v ON v.id = po.vendor_id WHERE po.id = ?`,
    [id]
  );
  const po = Array.isArray(poRows[0]) ? poRows[0][0] : poRows[0];
  if (!po) throw new Error("Purchase order not found");

  const itemRows: any = await db.execute(
    `SELECT poi.*, p.name AS product_name FROM purchase_order_items poi
     JOIN products p ON p.id = poi.product_id WHERE poi.po_id = ?`,
    [id]
  );
  po.items = Array.isArray(itemRows[0]) ? itemRows[0] : itemRows;

  return po;
};