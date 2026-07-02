import type { Request, Response } from "express";
// import * as leaveService from "../services/leave.service";
import * as leaveService from "../services/leave.service.js";

// Create Leave
export const createLeaveController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leave = await leaveService.createLeave(req.body);

    res.status(201).json({
      success: true,
      message: "Leave created successfully.",
      data: leave,
    });
  } catch (error: any) {
    console.error("Create Leave Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create leave.",
      error: error.message,
    });
  }
};

// Get All Leaves
export const getAllLeavesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaves = await leaveService.getAllLeaves();

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error: any) {
    console.error("Get Leaves Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leave records.",
      error: error.message,
    });
  }
};

// Get Leave By ID
export const getLeaveByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const leave = await leaveService.getLeaveById(Number(id));

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave record not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error: any) {
    console.error("Get Leave By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leave.",
      error: error.message,
    });
  }
};

// Update Leave
export const updateLeaveController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await leaveService.updateLeave(Number(id), req.body);

    res.status(200).json({
      success: true,
      message: "Leave updated successfully.",
    });
  } catch (error: any) {
    console.error("Update Leave Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update leave.",
      error: error.message,
    });
  }
};

// Delete Leave
export const deleteLeaveController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await leaveService.deleteLeave(Number(id));

    res.status(200).json({
      success: true,
      message: "Leave deleted successfully.",
    });
  } catch (error: any) {
    console.error("Delete Leave Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete leave.",
      error: error.message,
    });
  }
};

// Update Leave Status (Approve / Reject)
export const updateLeaveStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, approved_by, rejection_reason } = req.body;

    await leaveService.updateLeaveStatus(
      Number(id),
      status,
      approved_by,
      rejection_reason
    );

    res.status(200).json({
      success: true,
      message: `Leave ${status.toLowerCase()} successfully.`,
    });
  } catch (error: any) {
    console.error("Update Leave Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update leave status.",
      error: error.message,
    });
  }
};