import { pool } from "../config/db.js";

export const createEmployee = async (employeeData: any) => {
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
    skills
  } = employeeData;

  const [result]: any = await pool.execute(
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

  return result;
};

export const getAllEmployees = async () => {
  const [rows]: any = await pool.execute(
    "SELECT * FROM hrms_employees ORDER BY id DESC",
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
    "SELECT * FROM hrms_employees WHERE id = ?",
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
    skills
  } = employeeData;

  const [result]: any = await pool.execute(
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

  return result;
};

export const deleteEmployee = async (id: string) => {
  const [result]: any = await pool.execute(
    "DELETE FROM hrms_employees WHERE id = ?",
    [id]
  );

  return result;
};