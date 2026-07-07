import { Router } from "express";
import { createVendorController, getAllVendorsController } from "../controllers/vendor.controller.js";

const router = Router();
router.post("/create", createVendorController);
router.get("/", getAllVendorsController);

export default router;