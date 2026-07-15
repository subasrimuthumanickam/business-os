import { Router } from "express";
import {
  getLastOrderNumber,
  createSalesOrder,
  getSalesOrdersByCustomer,
} from "../controllers/Salesorder.controller.js";

const router = Router();

// Static routes first
router.get("/last", getLastOrderNumber);
router.post("/create", createSalesOrder);

// Dynamic route last
router.get("/customer/:customerId", getSalesOrdersByCustomer);

export default router;