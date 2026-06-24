import type { Request, Response } from "express";
import db from "../config/db.js";

// GET ALL PROJECTS (for dropdown)
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await db.execute(
      `SELECT id, name, customer_id, status FROM projects ORDER BY name ASC`,
      []
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Project fetch error:", error);
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

// CREATE NEW PROJECT
export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name, customer_id, status } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ success: false, message: "Project name is required." });
    return;
  }

  try {
    const result: any = await db.execute(
      `INSERT INTO projects (name, customer_id, status) VALUES (?, ?, ?)`,
      [name.trim(), customer_id || null, status || "active"]
    );
    res.status(201).json({ success: true, message: "Project created successfully", data: { id: result.insertId } });
  } catch (error: any) {
    console.error("Project create error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};