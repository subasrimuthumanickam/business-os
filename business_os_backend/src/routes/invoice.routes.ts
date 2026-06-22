import { Router } from "express";

import {createInvoiceController,getInvoiceByIdController,updateInvoiceController,deleteInvoiceController,downloadInvoicePdfController 
}from "../controllers/invoice.controller.js";

const router = Router();

router.post(
  "/create",
  createInvoiceController
);
router.get(
  "/download/:id",
  downloadInvoicePdfController
);
router.get(
  "/:id",
  getInvoiceByIdController
);
router.put("/:id", updateInvoiceController);

router.delete("/:id", deleteInvoiceController);

export default router;