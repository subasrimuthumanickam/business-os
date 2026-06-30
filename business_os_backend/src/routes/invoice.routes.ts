import { Router } from "express";

import {createInvoiceController,getInvoiceByIdController,updateInvoiceController,
  deleteInvoiceController,downloadInvoicePdfController,getAllInvoicesController
}from "../controllers/invoice.controller.js";

const router = Router();

router.post(
  "/create",
  createInvoiceController
);
router.get(
  "/",
  getAllInvoicesController
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