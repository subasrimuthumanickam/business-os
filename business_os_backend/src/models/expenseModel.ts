import {pool} from '../config/db.js';

const generateExpenseNumber = () => {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `EXP-${rand}`;
};

export const getAllExpenses = async (companyId: number) => {
  const [rows] = await pool.query(
    `SELECT e.*, ea.name AS category, pa.name AS payment_method, c.display_name AS customer_name
     FROM expenses e
     LEFT JOIN expense_accounts ea ON e.expense_account_id = ea.id
     LEFT JOIN payment_accounts pa ON e.paid_through_id = pa.id
     LEFT JOIN customers c ON e.customer_id = c.id
     WHERE e.company_id = ?
     ORDER BY e.expense_date DESC, e.id DESC`,
    [companyId]
  );
  return rows;
};

export const getExpenseById = async (companyId: number, id: number) => {
  const [rows]: any = await pool.query(
    `SELECT e.*, ea.name AS category, pa.name AS payment_method, c.display_name AS customer_name
     FROM expenses e
     LEFT JOIN expense_accounts ea ON e.expense_account_id = ea.id
     LEFT JOIN payment_accounts pa ON e.paid_through_id = pa.id
     LEFT JOIN customers c ON e.customer_id = c.id
     WHERE e.company_id = ? AND e.id = ?`,
    [companyId, id]
  );
  const expense = rows[0];
  if (!expense) return null;

  if (expense.is_itemized) {
    const [items] = await pool.query(
      `SELECT ei.*, ea.name AS expense_account_name
       FROM expense_items ei
       LEFT JOIN expense_accounts ea ON ei.expense_account_id = ea.id
       WHERE ei.expense_id = ?
       ORDER BY ei.sort_order ASC`,
      [id]
    );
    expense.items = items;
  }
  return expense;
};

export const createExpense = async (companyId: number, data: any) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const expenseNumber = generateExpenseNumber();

    const [result]: any = await connection.query(
      `INSERT INTO expenses
        (company_id, expense_number, expense_date, paid_by, expense_account_id, amount, currency,
         paid_through_id, vendor_name, reference_number, notes, receipt_path, customer_id, status,
         expense_type, sac_code, gst_treatment, vendor_gstin, destination_of_supply, reverse_charge,
         tax_code, tax_rate, tax_amount, invoice_reference, is_itemized, is_billable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        companyId, expenseNumber, data.expense_date, data.paid_by || null,
        data.is_itemized ? null : data.expense_account_id, data.amount, data.currency || 'INR',
        data.paid_through_id, data.vendor_name || null, data.reference_number || null,
        data.notes || null, data.receipt_path || null, data.customer_id || null,
        data.status || 'pending',
        data.expense_type || 'services', data.sac_code || null, data.gst_treatment || null,
        data.vendor_gstin || null, data.destination_of_supply || null, data.reverse_charge ? 1 : 0,
        data.is_itemized ? null : (data.tax_code || null),
        data.is_itemized ? 0 : (data.tax_rate || 0),
        0, // tax_amount computed below if needed
        data.invoice_reference || null,
        data.is_itemized ? 1 : 0,
        data.is_billable ? 1 : 0,          // 👈 added
      ]
    );
    const expenseId = result.insertId;

    if (data.is_itemized && Array.isArray(data.items)) {
      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        await connection.query(
          `INSERT INTO expense_items
            (expense_id, expense_account_id, notes, tax_code, tax_rate, amount, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [expenseId, item.expense_account_id, item.notes || null, item.tax_code || null, item.tax_rate || 0, item.amount, i]
        );
      }
    }

    await connection.commit();
    return expenseId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export const updateExpense = async (companyId: number, id: number, data: any) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE expenses SET
        expense_date = ?, paid_by = ?, expense_account_id = ?, amount = ?, currency = ?,
        paid_through_id = ?, vendor_name = ?, reference_number = ?, notes = ?,
        customer_id = ?, status = ?, expense_type = ?, sac_code = ?, gst_treatment = ?,
        vendor_gstin = ?, destination_of_supply = ?, reverse_charge = ?, tax_code = ?,
        tax_rate = ?, invoice_reference = ?, is_itemized = ?, is_billable = ?
       WHERE company_id = ? AND id = ?`,
      [
        data.expense_date, data.paid_by || null,
        data.is_itemized ? null : data.expense_account_id, data.amount,
        data.currency || 'INR', data.paid_through_id, data.vendor_name || null,
        data.reference_number || null, data.notes || null, data.customer_id || null,
        data.status || 'pending', data.expense_type || 'services', data.sac_code || null,
        data.gst_treatment || null, data.vendor_gstin || null, data.destination_of_supply || null,
        data.reverse_charge ? 1 : 0, data.is_itemized ? null : (data.tax_code || null),
        data.is_itemized ? 0 : (data.tax_rate || 0), data.invoice_reference || null,
        data.is_itemized ? 1 : 0,
        data.is_billable ? 1 : 0,          // 👈 added
        companyId, id,
      ]
    );

    if (data.is_itemized && Array.isArray(data.items)) {
      await connection.query('DELETE FROM expense_items WHERE expense_id = ?', [id]);
      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        await connection.query(
          `INSERT INTO expense_items
            (expense_id, expense_account_id, notes, tax_code, tax_rate, amount, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, item.expense_account_id, item.notes || null, item.tax_code || null, item.tax_rate || 0, item.amount, i]
        );
      }
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// Lightweight status-only update — used by ExpenseList's status dropdown
export const updateExpenseStatus = async (companyId: number, id: number, status: string) => {
  await pool.query(
    'UPDATE expenses SET status = ? WHERE company_id = ? AND id = ?',
    [status, companyId, id]
  );
};

export const deleteExpense = async (companyId: number, id: number) => {
  await pool.query('DELETE FROM expenses WHERE company_id = ? AND id = ?', [companyId, id]);
};

export const updateExpenseBillable = async (companyId: number, id: number, isBillable: boolean) => {
  await pool.query(
    'UPDATE expenses SET is_billable = ? WHERE company_id = ? AND id = ?',
    [isBillable ? 1 : 0, companyId, id]
  );
};