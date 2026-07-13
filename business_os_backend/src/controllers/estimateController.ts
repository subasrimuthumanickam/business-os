import type { Request, Response } from "express";
import db from "../config/db.js";

// CREATE ESTIMATE
export const createEstimate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      customer_id,
      estimate_number,
      reference_number,
      salesperson_id,
      project_id,
      price_list_id,
      estimate_date,
      expiry_date,
      status,
      subtotal,
      tax,
      shipping_charges,
      total,
      notes,
      items,
    } = req.body;

    // Insert estimate
    const result: any = await db.execute(
      `INSERT INTO estimates
      (
        customer_id,
        estimate_number,
        reference_number,
        salesperson_id,
        project_id,
        price_list_id,
        estimate_date,
        expiry_date,
        status,
        subtotal,
        tax,
        shipping_charges,
        total,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_id,
        estimate_number,
        reference_number || null,
        salesperson_id || null,
        project_id || null,
        price_list_id || null,
        estimate_date,
        expiry_date,
        status || "Draft",
        subtotal || 0,
        tax || 0,
        shipping_charges || 0,
        total || 0,
        notes || null,
      ]
    );

    const estimateId = result.insertId;

    // Insert estimate items
    for (const item of items) {
      await db.execute(
        `INSERT INTO estimate_items
        (
          estimate_id,
          product_id,
          item_name,
          description,
          quantity,
          rate,
          discount_percent,
          tax_rate_id,
          amount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          estimateId,
          item.product_id || null,
          item.item_name || null,
          item.description || null,
          item.quantity,
          item.rate,
          item.discount_percent || 0,
          item.tax_rate_id || null,
          item.amount,
        ]
      );
    }

    res.status(201).json({
      success: true,
      message: "Estimate created successfully",
      data: { id: estimateId },
    });
  } catch (error) {
    console.error("Create Estimate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create estimate",
    });
  }
};

// GET NEXT ESTIMATE NUMBER (for prefill on New Estimate page)
export const getNextEstimateNumber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rows: any = await db.execute(
      `SELECT AUTO_INCREMENT AS nextId
       FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'estimates'`,
      []
    );

    const nextId = rows?.[0]?.nextId || 1;
    const estimateNumber = `EST-${String(nextId).padStart(5, "0")}`;

    res.status(200).json({
      success: true,
      data: { estimate_number: estimateNumber },
    });
  } catch (error) {
    console.error("Get Next Estimate Number Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate estimate number",
    });
  }
};

// GET SINGLE ESTIMATE (with items, for edit/view)
export const getEstimateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const estimateRows: any = await db.execute(
      `SELECT e.*, u.name AS salesperson_name, p.name AS project_name, pl.name AS price_list_name
       FROM estimates e
       LEFT JOIN users u ON e.salesperson_id = u.id
       LEFT JOIN projects p ON e.project_id = p.id
       LEFT JOIN price_lists pl ON e.price_list_id = pl.id
       WHERE e.id = ?`,
      [id]
    );

    if (!estimateRows || estimateRows.length === 0) {
      res.status(404).json({ success: false, message: "Estimate not found" });
      return;
    }

    const itemRows: any = await db.execute(
      `SELECT ei.*, tr.name AS tax_rate_name, tr.rate_percent AS tax_rate_percent
       FROM estimate_items ei
       LEFT JOIN tax_rates tr ON ei.tax_rate_id = tr.id
       WHERE ei.estimate_id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: { ...estimateRows[0], items: itemRows },
    });
  } catch (error) {
    console.error("Get Estimate Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch estimate" });
  }
};

// GET ALL ESTIMATES (list view)
export const getAllEstimates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rows = await db.execute(
      `SELECT e.*, c.display_name AS customer_name
       FROM estimates e
       LEFT JOIN customers c ON e.customer_id = c.id
       ORDER BY e.created_at DESC`,
      []
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Get All Estimates Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch estimates", data: [] });
  }
};

// UPDATE ESTIMATE
export const updateEstimate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      customer_id,
      reference_number,
      salesperson_id,
      project_id,
      price_list_id,
      estimate_date,
      expiry_date,
      status,
      subtotal,
      tax,
      shipping_charges,
      total,
      notes,
      items,
    } = req.body;

    await db.execute(
      `UPDATE estimates SET
        customer_id = ?, reference_number = ?, salesperson_id = ?, project_id = ?,
        price_list_id = ?, estimate_date = ?, expiry_date = ?, status = ?,
        subtotal = ?, tax = ?, shipping_charges = ?, total = ?, notes = ?
       WHERE id = ?`,
      [
        customer_id,
        reference_number || null,
        salesperson_id || null,
        project_id || null,
        price_list_id || null,
        estimate_date,
        expiry_date,
        status,
        subtotal || 0,
        tax || 0,
        shipping_charges || 0,
        total || 0,
        notes || null,
        id,
      ]
    );

    // Replace items: simplest reliable approach — delete old, insert new
    await db.execute(`DELETE FROM estimate_items WHERE estimate_id = ?`, [id]);

    for (const item of items) {
      await db.execute(
        `INSERT INTO estimate_items
        (estimate_id, product_id, item_name, description, quantity, rate, discount_percent, tax_rate_id, amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          item.product_id || null,
          item.item_name || null,
          item.description || null,
          item.quantity,
          item.rate,
          item.discount_percent || 0,
          item.tax_rate_id || null,
          item.amount,
        ]
      );
    }

    res.status(200).json({ success: true, message: "Estimate updated successfully" });
  } catch (error) {
    console.error("Update Estimate Error:", error);
    res.status(500).json({ success: false, message: "Failed to update estimate" });
  }
};

// DELETE ESTIMATE
export const deleteEstimate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await db.execute(`DELETE FROM estimate_items WHERE estimate_id = ?`, [id]);
    await db.execute(`DELETE FROM estimates WHERE id = ?`, [id]);
    res.status(200).json({ success: true, message: "Estimate deleted successfully" });
  } catch (error) {
    console.error("Delete Estimate Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete estimate" });
  }
};