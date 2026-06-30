import type { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service.js";

export const createAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await attendanceService.createAttendance(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const records =
      await attendanceService.getAllAttendance();

    return res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    await attendanceService.updateAttendance(
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    await attendanceService.deleteAttendance(
      id
    );

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};