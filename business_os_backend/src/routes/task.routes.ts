import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const router = Router();

// Create a new task
router.post("/", taskController.createTaskController);

// Get all tasks for a project
router.get("/project/:projectId", taskController.getTasksByProjectController);

// Get tasks by developer
router.get("/developer/:developerId", taskController.getTasksByDeveloperController);

// Get task by ID
router.get("/:taskId", taskController.getTaskByIdController);

// Update task
router.put("/:taskId", taskController.updateTaskController);

// Update task status
router.patch("/:taskId/status", taskController.updateTaskStatusController);

// Assign task to developer
router.patch("/:taskId/assign", taskController.assignTaskController);

// Request rework
router.post("/:taskId/rework", taskController.requestReworkController);

// Delete task
router.delete("/:taskId", taskController.deleteTaskController);

export default router;
