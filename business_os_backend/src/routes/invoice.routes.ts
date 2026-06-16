import { Router } from "express";

import {
  createInvoiceController
}
from "../controllers/invoice.controller.js";

const router = Router();

router.post(
  "/create",
  createInvoiceController
);

export default router;