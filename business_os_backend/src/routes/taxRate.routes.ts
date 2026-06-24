import express from "express";
import { getAllTaxRates } from "../controllers/taxRate.controller.js";

const router = express.Router();

router.get("/", getAllTaxRates);

export default router;