import db from "../config/db.js";

export const createVendor = async (data: any) => {
  const { name, email, phone, address } = data;
  const query = `INSERT INTO vendors (name, email, phone, address) VALUES (?, ?, ?, ?)`;
  const result: any = await db.execute(query, [name, email || null, phone || null, address || null]);
  return result;
};

export const getAllVendors = async () => {
  const rows: any = await db.execute(`SELECT * FROM vendors ORDER BY name ASC`, []);
  return Array.isArray(rows[0]) ? rows[0] : rows;
};