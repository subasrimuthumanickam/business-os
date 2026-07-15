import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const createEmployee = async (employeeData: any, companyId: number) => {
  const {
    code,
    name,
    email,
    phone,
    role,
    department,
    joinDate,
    salary,
    status,
    skills,
    password
  } = employeeData;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Get 'Employee' role_id
    const [roleRows]: any = await connection.execute(
      "SELECT role_id FROM roles WHERE role_name = 'Employee'"
    );

    if (!roleRows.length) {
      throw new Error("Employee role not found. Please add it in roles table first.");
    }

    const employeeRoleId = roleRows[0].role_id;

    // 2. Check email uniqueness in login (users) table
    const [existingUser]: any = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      throw new Error("A login account with this email already exists");
    }

    // 3. Insert employee record
    const [empResult]: any = await connection.execute(
      `INSERT INTO hrms_employees
      (employee_code, name, email, phone, role,
       department, join_date, salary, status, skills)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code,
        name,
        email,
        phone,
        role,
        department,
        joinDate,
        salary,
        status,
        skills?.join(",") || ""
      ]
    );

    const employeeId = empResult.insertId;

    // 4. Hash password & create login account
    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      `INSERT INTO users (company_id, role_id, name, email, phone, password, employee_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [companyId, employeeRoleId, name, email, phone, hashedPassword, employeeId]
    );

    await connection.commit();

    return { insertId: employeeId, code, name };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getAllEmployees = async () => {
  const [rows]: any = await pool.execute(
    `SELECT e.*, 
            CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END AS has_login
     FROM hrms_employees e
     LEFT JOIN users u ON u.employee_id = e.id
     ORDER BY e.id DESC`,
    []
  );

  return rows.map((emp: any) => ({
    ...emp,
    code: emp.employee_code,
    joinDate: emp.join_date,
    skills: emp.skills ? emp.skills.split(",") : []
  }));
};

export const getEmployeeById = async (id: string) => {
  const [rows]: any = await pool.execute(
    `SELECT e.*,
            CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END AS has_login
     FROM hrms_employees e
     LEFT JOIN users u ON u.employee_id = e.id
     WHERE e.id = ?`,
    [id]
  );

  if (!rows.length) return null;

  return {
    ...rows[0],
    code: rows[0].employee_code,
    joinDate: rows[0].join_date,
    skills: rows[0].skills
      ? rows[0].skills.split(",")
      : []
  };
};

export const updateEmployee = async (
  id: string,
  employeeData: any
) => {
  const {
    code,
    name,
    email,
    phone,
    role,
    department,
    joinDate,
    salary,
    status,
    skills,
    password
  } = employeeData;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      `UPDATE hrms_employees
       SET employee_code=?,
           name=?,
           email=?,
           phone=?,
           role=?,
           department=?,
           join_date=?,
           salary=?,
           status=?,
           skills=?
       WHERE id=?`,
      [
        code,
        name,
        email,
        phone,
        role,
        department,
        joinDate,
        salary,
        status,
        skills?.join(",") || "",
        id
      ]
    );

    // Keep login email in sync + update password only if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        "UPDATE users SET name=?, email=?, phone=?, password=? WHERE employee_id=?",
        [name, email, phone, hashedPassword, id]
      );
    } else {
      await connection.execute(
        "UPDATE users SET name=?, email=?, phone=? WHERE employee_id=?",
        [name, email, phone, id]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteEmployee = async (id: string) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      "DELETE FROM users WHERE employee_id = ?",
      [id]
    );

    const [result]: any = await connection.execute(
      "DELETE FROM hrms_employees WHERE id = ?",
      [id]
    );

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};