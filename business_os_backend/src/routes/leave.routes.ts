import { Router } from "express";

import {
  createLeaveController,
  getAllLeavesController,
  getLeaveByIdController,
  updateLeaveController,
  deleteLeaveController,
  updateLeaveStatusController,
} from "../controllers/leave.controller.js";

const router = Router();

// Create Leave
router.post(
  "/create",
  createLeaveController
);

// Get All Leaves
router.get(
  "/",
  getAllLeavesController
);

// Get Leave By ID
router.get(
  "/:id",
  getLeaveByIdController
);

// Update Leave
router.put(
  "/:id",
  updateLeaveController
);

// Delete Leave
router.delete(
  "/:id",
  deleteLeaveController
);

// Approve / Reject Leave
router.patch(
  "/:id/status",
  updateLeaveStatusController
);

export default router;