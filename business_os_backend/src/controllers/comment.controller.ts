import type { Request, Response } from "express";
import * as commentService from "../services/comment.service.js"; // adjust path

// GET /api/customers/:customerId/comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.customerId);
    const comments = await commentService.getCommentsByCustomer(customerId);
    res.json({ success: true, data: comments });
  } catch (err) {
    console.error("getComments error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

// POST /api/customers/:customerId/comments
export const createComment = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.customerId);
    const { comment_text } = req.body;
    const userId = (req as any).user?.userId;

    if (!comment_text || !comment_text.trim()) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const comment = await commentService.addComment(customerId, comment_text.trim(), userId);
    res.json({ success: true, data: comment });
  } catch (err) {
    console.error("createComment error:", err);
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

// PUT /api/customers/:customerId/comments/:commentId
export const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = Number(req.params.commentId);
    const { comment_text } = req.body;
    const userId = (req as any).user?.userId;

    if (!comment_text || !comment_text.trim()) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }

    const existing = await commentService.getCommentById(commentId);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    if (existing.type !== "manual") {
      return res.status(400).json({ success: false, message: "Activity logs cannot be edited" });
    }
    if (existing.created_by !== userId) {
      return res.status(403).json({ success: false, message: "You can only edit your own comments" });
    }

    await commentService.updateComment(commentId, comment_text.trim());
    res.json({ success: true, message: "Comment updated" });
  } catch (err) {
    console.error("updateComment error:", err);
    res.status(500).json({ success: false, message: "Failed to update comment" });
  }
};

// DELETE /api/customers/:customerId/comments/:commentId
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = Number(req.params.commentId);
    const userId = (req as any).user?.userId;

    const existing = await commentService.getCommentById(commentId);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    if (existing.type !== "manual") {
      return res.status(400).json({ success: false, message: "Activity logs cannot be deleted" });
    }
    if (existing.created_by !== userId) {
      return res.status(403).json({ success: false, message: "You can only delete your own comments" });
    }

    await commentService.deleteComment(commentId);
    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    console.error("deleteComment error:", err);
    res.status(500).json({ success: false, message: "Failed to delete comment" });
  }
};