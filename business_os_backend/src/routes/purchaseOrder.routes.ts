import { Router } from "express";
import {
  createPurchaseOrderController,
  receivePurchaseOrderController,
  getAllPurchaseOrdersController,
  getPurchaseOrderByIdController,
} from "../controllers/purchaseOrder.controller.js";

const router = Router();
router.post("/create", createPurchaseOrderController);
router.get("/", getAllPurchaseOrdersController);
router.get("/:id", getPurchaseOrderByIdController);
router.put("/:id/receive", receivePurchaseOrderController);

export default router;