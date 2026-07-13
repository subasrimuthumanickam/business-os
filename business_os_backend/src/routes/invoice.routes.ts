// import { Router } from "express";

// import {createInvoiceController,getInvoiceByIdController,updateInvoiceController,
//   deleteInvoiceController,downloadInvoicePdfController,getAllInvoicesController
// }from "../controllers/invoice.controller.js";

// const router = Router();

// router.post(
//   "/create",
//   createInvoiceController
// );
// router.get(
//   "/",
//   getAllInvoicesController
// );
// router.get(
//   "/download/:id",
//   downloadInvoicePdfController
// );

// router.get(
//   "/:id",
//   getInvoiceByIdController
// );
// router.put("/:id", updateInvoiceController);

// router.delete("/:id", deleteInvoiceController);

// export default router;

import { Router } from "express";

import {
  createInvoiceController,
  getInvoiceByIdController,
  updateInvoiceController,
  deleteInvoiceController,
  downloadInvoicePdfController,
  getAllInvoicesController,
  getNextInvoiceNumberController,   // ✅ ADDED
} from "../controllers/invoice.controller.js";

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

// ✅ ADDED — must stay ABOVE router.get("/:id", ...) below. Express
// matches routes top-to-bottom, and "/:id" matches literally any
// segment (including the string "next-number"), so if this route were
// placed after "/:id" it would never be reached — every request to
// /next-number would hit getInvoiceByIdController instead, trying to
// look up an invoice with id "next-number" and failing.
router.get(
  "/next-number",
  getNextInvoiceNumberController
);

router.get(
  "/:id",
  getInvoiceByIdController
);
router.put("/:id", updateInvoiceController);

router.delete("/:id", deleteInvoiceController);

export default router;