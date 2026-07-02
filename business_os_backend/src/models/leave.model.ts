import { pool } from "../config/db.js";

// =======================
// Create Leave
// =======================
export const createLeave = async (leaveData: any) => {
  const sql = `
    INSERT INTO leave_management (
      employee_id,
      leave_type,
      start_date,
      end_date,
      total_days,
      reason,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    leaveData.employee_id,
    leaveData.leave_type,
    leaveData.start_date,
    leaveData.end_date,
    leaveData.total_days,
    leaveData.reason,
    leaveData.status || "Pending",
  ];

  const [result]: any = await pool.execute(sql, values);

  return {
    id: result.insertId,
    ...leaveData,
    status: leaveData.status || "Pending",
  };
};

// =======================
// Get All Leaves
// =======================
export const getAllLeaves = async () => {
  const sql = `
    SELECT
      lm.*,
      he.employee_code,
      he.name AS employee_name,
      he.department,
      he.role
    FROM leave_management lm
    INNER JOIN hrms_employees he
      ON lm.employee_id = he.id
    ORDER BY lm.created_at DESC
  `;

  const [rows]: any = await pool.execute(sql);

  return rows;
};

// =======================
// Get Leave By ID
// =======================
export const getLeaveById = async (id: number) => {
  const sql = `
    SELECT
      lm.*,
      he.employee_code,
      he.name AS employee_name,
      he.department,
      he.role
    FROM leave_management lm
    INNER JOIN hrms_employees he
      ON lm.employee_id = he.id
    WHERE lm.id = ?
  `;

  const [rows]: any = await pool.execute(sql, [id]);

  return rows.length > 0 ? rows[0] : null;
};

// =======================
// Update Leave
// =======================
export const updateLeave = async (
  id: number,
  leaveData: any
) => {
  const sql = `
    UPDATE leave_management
    SET
      leave_type = ?,
      start_date = ?,
      end_date = ?,
      total_days = ?,
      reason = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    leaveData.leave_type,
    leaveData.start_date,
    leaveData.end_date,
    leaveData.total_days,
    leaveData.reason,
    leaveData.status,
    id,
  ];

  const [result]: any = await pool.execute(sql, values);

  return result;
};

// =======================
// Delete Leave
// =======================
export const deleteLeave = async (id: number) => {
  const sql = `
    DELETE FROM leave_management
    WHERE id = ?
  `;

  const [result]: any = await pool.execute(sql, [id]);

  return result;
};

// =======================
// Update Leave Status
// =======================
export const updateLeaveStatus = async (
  id: number,
  status: string,
  approved_by: string,
  rejection_reason: string
) => {
  const sql = `
    UPDATE leave_management
    SET
      status = ?,
      approved_by = ?,
      approved_on = NOW(),
      rejection_reason = ?
    WHERE id = ?
  `;

  const [result]: any = await pool.execute(sql, [
    status,
    approved_by,
    rejection_reason,
    id,
  ]);

  return result;
};