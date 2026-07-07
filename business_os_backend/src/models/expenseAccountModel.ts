import { pool } from '../config/db.js';

export const getAllExpenseAccounts = async (companyId: number) => {
  const [rows] = await pool.query(
    'SELECT * FROM expense_accounts WHERE company_id = ? AND is_active = 1 ORDER BY name ASC',
    [companyId]
  );
  return rows;
};

export const createExpenseAccount = async (companyId: number, name: string, description?: string) => {
  const [result]: any = await pool.query(
    'INSERT INTO expense_accounts (company_id, name, description) VALUES (?, ?, ?)',
    [companyId, name, description || null]
  );
  return result.insertId;
};