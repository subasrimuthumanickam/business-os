import { pool } from '../config/db.js';

export const getAllPaymentAccounts = async (companyId: number) => {
  const [rows] = await pool.query(
    'SELECT * FROM payment_accounts WHERE company_id = ? AND is_active = 1 ORDER BY name ASC',
    [companyId]
  );
  return rows;
};

export const createPaymentAccount = async (companyId: number, name: string, accountType: string) => {
  const [result]: any = await pool.query(
    'INSERT INTO payment_accounts (company_id, name, account_type) VALUES (?, ?, ?)',
    [companyId, name, accountType]
  );
  return result.insertId;
};