import { type Request, type Response } from "express";
import * as employeeService from "../services/employee.service.js";

const getEmployeeIdParam = (req: Request): string | null => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return null;
  }

  return id;
};

export const createEmployeeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required for login access",
      });
    }

    // Cast INSIDE the function body, not in the parameter type —
    // this avoids Express RequestHandler overload conflicts
    const user = (req as any).user as
      | { id: number; company_id: number; role_id: number; email: string }
      | undefined;

    const companyId = user?.company_id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "Company context missing, please re-login",
      });
    }

    const result = await employeeService.createEmployee(req.body, companyId);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEmployeesController = async (
  req: Request,
  res: Response
) => {
  try {
    const employees = await employeeService.getAllEmployees();

    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getEmployeeIdParam(req);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getEmployeeIdParam(req);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    await employeeService.updateEmployee(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployeeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getEmployeeIdParam(req);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    await employeeService.deleteEmployee(id);

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};