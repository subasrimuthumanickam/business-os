import { pool } from "../config/db.js";

export const createAttendance = async (data: any) => {
  const {
    employee_id,
    attendance_date,
    check_in,
    check_out,
    status,
    working_hours,
    overtime,
  } = data;

  const [result]: any = await pool.execute(
    `INSERT INTO hrms_attendance
    (employee_id, attendance_date, check_in, check_out,
     status, working_hours, overtime)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      employee_id,
      attendance_date,
      check_in,
      check_out,
      status,
      working_hours,
      overtime,
    ]
  );

  return result;
};

export const getAllAttendance = async () => {
  const [rows]: any = await pool.execute(`
      SELECT
        a.id,
        e.name as employeeName,
        e.employee_code as employeeCode,
        a.attendance_date as date,
        a.check_in as checkIn,
        a.check_out as checkOut,
        a.status,
        a.working_hours as workingHours,
        a.overtime
      FROM hrms_attendance a
      JOIN hrms_employees e
      ON a.employee_id = e.id
      ORDER BY a.attendance_date DESC
  `);

  return rows;
};

export const updateAttendance = async (
  id: string,
  data: any
) => {
  const {
    check_in,
    check_out,
    status,
    working_hours,
    overtime,
  } = data;

  const [result]: any = await pool.execute(
    `UPDATE hrms_attendance
     SET check_in=?,
         check_out=?,
         status=?,
         working_hours=?,
         overtime=?
     WHERE id=?`,
    [
      check_in,
      check_out,
      status,
      working_hours,
      overtime,
      id,
    ]
  );

  return result;
};

export const deleteAttendance = async (id: string) => {
  const [result]: any = await pool.execute(
    `DELETE FROM hrms_attendance WHERE id=?`,
    [id]
  );

  return result;
};