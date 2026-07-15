import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js"; // adjust path if different
import {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  deleteEmployeeController
} from "../controllers/employee.controller.js";

const router = Router();

router.post("/create", authenticateToken, createEmployeeController);
router.get("/", getAllEmployeesController);
router.get("/:id", getEmployeeByIdController);
router.put("/:id", authenticateToken, updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;  