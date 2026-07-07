import { type Request, type Response } from "express";
import * as taskService from "../models/taskModel.js";
import * as emailService from "../services/emailService.js";
import * as employeeService from "../services/employee.service.js";

// CREATE NEW TASK
export const createTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    project_id,
    title,
    description,
    priority,
    assigned_to,
    assigned_by,
    due_date,
    estimated_hours,
    tags
  } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ success: false, message: "Task title is required." });
    return;
  }

  try {
    // Create the task
    const result = await taskService.createTask({
      project_id,
      title: title.trim(),
      description: description || '',
      status: 'todo',
      priority: priority || 'medium',
      assigned_to,
      assigned_by,
      due_date,
      estimated_hours: estimated_hours || 0,
      logged_hours: 0,
      tags: tags?.join(',') || ''
    });

    // Get assigned developer info and send email
    if (assigned_to) {
      try {
        const developer = await employeeService.getEmployeeById(String(assigned_to));
        if (developer && developer.email) {
          await emailService.sendTaskAssignmentEmail(
            developer.email,
            developer.name,
            title,
            description || '',
            priority || 'medium',
            due_date,
            `Project ${project_id}`,
            `User ${assigned_by}`
          );
        }
      } catch (emailError) {
        console.error('Failed to send task assignment email:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully and developer notified",
      data: { id: result.insertId }
    });
  } catch (error: any) {
    console.error("Task create error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL TASKS FOR A PROJECT
export const getTasksByProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(400).json({ success: false, message: "Project ID is required." });
    return;
  }

  try {
    const tasks = await taskService.getTasksByProject(parseInt(projectId));
    res.status(200).json({ success: true, data: tasks });
  } catch (error: any) {
    console.error("Task fetch error:", error);
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

// GET TASK BY ID
export const getTaskByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Task ID is required." });
    return;
  }

  try {
    const task = await taskService.getTaskById(parseInt(taskId));
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found." });
      return;
    }
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    console.error("Task fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE TASK
export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const updateData = req.body;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Task ID is required." });
    return;
  }

  try {
    const result = await taskService.updateTask(parseInt(taskId), updateData);
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: result
    });
  } catch (error: any) {
    console.error("Task update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ASSIGN TASK TO DEVELOPER
export const assignTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { assigned_to, assigned_by } = req.body;

  if (!taskId || !assigned_to) {
    res.status(400).json({ success: false, message: "Task ID and Developer ID are required." });
    return;
  }

  try {
    // Get task details
    const task = await taskService.getTaskById(parseInt(taskId));
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found." });
      return;
    }

    // Assign the task
    await taskService.assignTaskToDeveloper(parseInt(taskId), assigned_to);

    // Send email to the assigned developer
    try {
      const developer = await employeeService.getEmployeeById(String(assigned_to));
      if (developer && developer.email) {
        await emailService.sendTaskAssignmentEmail(
          developer.email,
          developer.name,
          task.title,
          task.description || '',
          task.priority,
          task.due_date,
          `Project ${task.project_id}`,
          `User ${assigned_by}`
        );
      }
    } catch (emailError) {
      console.error('Failed to send assignment email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: "Task assigned successfully and email sent"
    });
  } catch (error: any) {
    console.error("Task assignment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE TASK STATUS
export const updateTaskStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status, updated_by } = req.body;

  if (!taskId || !status) {
    res.status(400).json({ success: false, message: "Task ID and status are required." });
    return;
  }

  try {
    // Get task details for email
    const task = await taskService.getTaskById(parseInt(taskId));
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found." });
      return;
    }

    // Update the status
    await taskService.updateTaskStatus(parseInt(taskId), status);

    // Send status update email to the assigned developer
    try {
      const developer = await employeeService.getEmployeeById(String(task.assigned_to));
      if (developer && developer.email) {
        await emailService.sendTaskStatusUpdateEmail(
          developer.email,
          developer.name,
          task.title,
          status,
          `User ${updated_by}`
        );
      }
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully"
    });
  } catch (error: any) {
    console.error("Task status update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE TASK
export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;

  if (!taskId) {
    res.status(400).json({ success: false, message: "Task ID is required." });
    return;
  }

  try {
    const result = await taskService.deleteTask(parseInt(taskId));
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: result
    });
  } catch (error: any) {
    console.error("Task delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET TASKS BY DEVELOPER
export const getTasksByDeveloperController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { developerId } = req.params;

  if (!developerId) {
    res.status(400).json({ success: false, message: "Developer ID is required." });
    return;
  }

  try {
    const tasks = await taskService.getTasksByDeveloper(parseInt(developerId));
    res.status(200).json({ success: true, data: tasks });
  } catch (error: any) {
    console.error("Task fetch error:", error);
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

// REQUEST REWORK
export const requestReworkController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { rework_notes, tester_name, tester_id } = req.body;

  if (!taskId || !rework_notes) {
    res.status(400).json({ success: false, message: "Task ID and rework notes are required." });
    return;
  }

  try {
    // Get task details
    const task = await taskService.getTaskById(parseInt(taskId));
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found." });
      return;
    }

    // Update task with rework info
    await taskService.updateTask(parseInt(taskId), {
      status: 'todo',
      testing_notes: rework_notes,
      rework_count: (task.rework_count || 0) + 1
    });

    // Send rework request email to developer
    try {
      const developer = await employeeService.getEmployeeById(String(task.assigned_to));
      if (developer && developer.email) {
        await emailService.sendReworkRequestEmail(
          developer.email,
          developer.name,
          task.title,
          rework_notes,
          tester_name || 'QA Team'
        );
      }
    } catch (emailError) {
      console.error('Failed to send rework email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: "Rework request sent to developer"
    });
  } catch (error: any) {
    console.error("Rework request error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
