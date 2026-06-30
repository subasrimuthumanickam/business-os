import express from "express";
import {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  deleteEmployeeController,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/create", createEmployeeController);
router.get("/", getAllEmployeesController);
router.get("/:id", getEmployeeByIdController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;