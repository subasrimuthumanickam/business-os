import { Router } from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js"; // adjust path
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = Router({ mergeParams: true }); // mergeParams to access :customerId from parent mount

router.get("/", authenticateToken, getComments);
router.post("/", authenticateToken, createComment);
router.put("/:commentId", authenticateToken, updateComment);
router.delete("/:commentId", authenticateToken, deleteComment);

export default router;