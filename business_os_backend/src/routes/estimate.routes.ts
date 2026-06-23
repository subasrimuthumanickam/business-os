// import express from "express";
// import { createEstimate } from "../controllers/estimateController.js";

// const router = express.Router();

// router.post("/create", createEstimate);

// export default router;

import express from "express";
import {
  createEstimate,
  getAllEstimates,
  getEstimateById,
  updateEstimate,
  deleteEstimate,
} from "../controllers/estimateController.js";

const router = express.Router();

router.get("/", getAllEstimates);
router.get("/:id", getEstimateById);
router.post("/create", createEstimate);
router.put("/:id", updateEstimate);
router.delete("/:id", deleteEstimate);

export default router;