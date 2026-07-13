import express from "express";
import {
  createEstimate,
  getAllEstimates,
  getEstimateById,
  getNextEstimateNumber,
  updateEstimate,
  deleteEstimate,
} from "../controllers/estimateController.js";

const router = express.Router();

router.get("/", getAllEstimates);
router.get("/next-number", getNextEstimateNumber); // must come before /:id
router.get("/:id", getEstimateById);
router.post("/create", createEstimate);
router.put("/:id", updateEstimate);
router.delete("/:id", deleteEstimate);

export default router;