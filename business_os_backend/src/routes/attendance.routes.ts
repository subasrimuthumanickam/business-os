import { Router } from "express";

import {
  createAttendanceController,
  getAllAttendanceController,
  updateAttendanceController,
  deleteAttendanceController
} from "../controllers/attendance.controller.js";

const router = Router();

router.post(
  "/create",
  createAttendanceController
);

router.get(
  "/",
  getAllAttendanceController
);

router.put(
  "/:id",
  updateAttendanceController
);

router.delete(
  "/:id",
  deleteAttendanceController
);

export default router;