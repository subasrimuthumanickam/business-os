import * as leaveModel from "../models/leave.model.js";

// Create Leave
export const createLeave = async (leaveData: any) => {
  return await leaveModel.createLeave(leaveData);
};

// Get All Leaves
export const getAllLeaves = async () => {
  return await leaveModel.getAllLeaves();
};

// Get Leave By ID
export const getLeaveById = async (id: number) => {
  return await leaveModel.getLeaveById(id);
};

// Update Leave
export const updateLeave = async (
  id: number,
  leaveData: any
) => {
  return await leaveModel.updateLeave(id, leaveData);
};

// Delete Leave
export const deleteLeave = async (id: number) => {
  return await leaveModel.deleteLeave(id);
};

// Approve / Reject Leave
export const updateLeaveStatus = async (
  id: number,
  status: string,
  approved_by: string,
  rejection_reason: string
) => {
  return await leaveModel.updateLeaveStatus(
    id,
    status,
    approved_by,
    rejection_reason
  );
};