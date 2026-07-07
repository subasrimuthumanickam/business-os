// import { pool } from "../config/db.js";

// export interface Task {
//   id?: number;
//   project_id: number;
//   title: string;
//   description: string;
//   status: 'todo' | 'in-progress' | 'review' | 'done';
//   priority: 'low' | 'medium' | 'high' | 'urgent';
//   assigned_to: number; // Developer/Employee ID
//   assigned_by: number; // User who assigned the task
//   due_date: string;
//   estimated_hours: number;
//   logged_hours: number;
//   tags: string;
//   created_at?: string;
//   updated_at?: string;
//   rework_count?: number;
//   testing_notes?: string;
//   developer_notes?: string;
// }

// // Create task
// export const createTask = async (taskData: Task) => {
//   const {
//     project_id,
//     title,
//     description,
//     status,
//     priority,
//     assigned_to,
//     assigned_by,
//     due_date,
//     estimated_hours,
//     logged_hours,
//     tags
//   } = taskData;

//   const [result]: any = await pool.execute(
//     `INSERT INTO tasks
//     (project_id, title, description, status, priority, assigned_to, assigned_by, due_date, estimated_hours, logged_hours, tags, created_at, updated_at)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//     [
//       project_id,
//       title,
//       description,
//       status || 'todo',
//       priority || 'medium',
//       assigned_to,
//       assigned_by,
//       due_date,
//       estimated_hours || 0,
//       logged_hours || 0,
//       tags || ''
//     ]
//   );

//   return result;
// };

// // Get all tasks for a project
// export const getTasksByProject = async (projectId: number) => {
//   const [rows]: any = await pool.execute(
//     `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
//     [projectId]
//   );

//   return rows;
// };

// // Get task by ID
// export const getTaskById = async (taskId: number) => {
//   const [rows]: any = await pool.execute(
//     `SELECT * FROM tasks WHERE id = ?`,
//     [taskId]
//   );

//   return rows.length > 0 ? rows[0] : null;
// };

// // Update task
// export const updateTask = async (taskId: number, taskData: Partial<Task>) => {
//   const {
//     title,
//     description,
//     status,
//     priority,
//     assigned_to,
//     due_date,
//     estimated_hours,
//     logged_hours,
//     tags,
//     testing_notes,
//     developer_notes,
//     rework_count
//   } = taskData;

//   const [result]: any = await pool.execute(
//     `UPDATE tasks
//      SET title=?,
//          description=?,
//          status=?,
//          priority=?,
//          assigned_to=?,
//          due_date=?,
//          estimated_hours=?,
//          logged_hours=?,
//          tags=?,
//          testing_notes=?,
//          developer_notes=?,
//          rework_count=?,
//          updated_at=NOW()
//      WHERE id=?`,
//     [
//       title,
//       description,
//       status,
//       priority,
//       assigned_to,
//       due_date,
//       estimated_hours,
//       logged_hours,
//       tags,
//       testing_notes,
//       developer_notes,
//       rework_count,
//       taskId
//     ]
//   );

//   return result;
// };

// // Assign task to developer and send email
// export const assignTaskToDeveloper = async (taskId: number, developerId: number) => {
//   const [result]: any = await pool.execute(
//     `UPDATE tasks
//      SET assigned_to=?, updated_at=NOW()
//      WHERE id=?`,
//     [developerId, taskId]
//   );

//   return result;
// };

// // Delete task
// export const deleteTask = async (taskId: number) => {
//   const [result]: any = await pool.execute(
//     `DELETE FROM tasks WHERE id = ?`,
//     [taskId]
//   );

//   return result;
// };

// // Get all tasks assigned to a developer
// export const getTasksByDeveloper = async (developerId: number) => {
//   const [rows]: any = await pool.execute(
//     `SELECT * FROM tasks WHERE assigned_to = ? ORDER BY due_date ASC`,
//     [developerId]
//   );

//   return rows;
// };

// // Update task status
// export const updateTaskStatus = async (taskId: number, status: string) => {
//   const [result]: any = await pool.execute(
//     `UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?`,
//     [status, taskId]
//   );

//   return result;
// };
// src/models/taskModel.ts
import db, { pool } from "../config/db.js";

export interface Task {
  id?: number;
  project_id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: number; // Developer/Employee ID
  assigned_by: number; // User who assigned the task
  due_date: string;
  estimated_hours: number;
  logged_hours: number;
  tags: string;
  created_at?: string;
  updated_at?: string;
  rework_count?: number;
  testing_notes?: string;
  developer_notes?: string;
}

// ✅ Create task
export const createTask = async (taskData: Task) => {
  const {
    project_id,
    title,
    description,
    status,
    priority,
    assigned_to,
    assigned_by,
    due_date,
    estimated_hours,
    logged_hours,
    tags
  } = taskData;

  const result = await db.execute(
    `INSERT INTO tasks
    (project_id, title, description, status, priority, assigned_to, assigned_by, due_date, estimated_hours, logged_hours, tags, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      project_id,
      title,
      description,
      status || 'todo',
      priority || 'medium',
      assigned_to,
      assigned_by,
      due_date,
      estimated_hours || 0,
      logged_hours || 0,
      tags || ''
    ]
  );

  return result;
};

// ✅ Get all tasks for a project
export const getTasksByProject = async (projectId: number) => {
  const rows = await db.execute(
    `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
    [projectId]
  );
  return rows;
};

// ✅ Get task by ID
export const getTaskById = async (taskId: number) => {
  const rows = await db.execute(
    `SELECT * FROM tasks WHERE id = ?`,
    [taskId]
  );
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};

// ✅ Update task - Fixed with proper parameter handling
export const updateTask = async (taskId: number, taskData: Partial<Task>) => {
  const {
    title,
    description,
    status,
    priority,
    assigned_to,
    due_date,
    estimated_hours,
    logged_hours,
    tags,
    testing_notes,
    developer_notes,
    rework_count
  } = taskData;

  // ✅ Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];

  if (title !== undefined) {
    updates.push('title = ?');
    values.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    values.push(description);
  }
  if (status !== undefined) {
    updates.push('status = ?');
    values.push(status);
  }
  if (priority !== undefined) {
    updates.push('priority = ?');
    values.push(priority);
  }
  if (assigned_to !== undefined) {
    updates.push('assigned_to = ?');
    values.push(assigned_to);
  }
  if (due_date !== undefined) {
    updates.push('due_date = ?');
    values.push(due_date);
  }
  if (estimated_hours !== undefined) {
    updates.push('estimated_hours = ?');
    values.push(estimated_hours);
  }
  if (logged_hours !== undefined) {
    updates.push('logged_hours = ?');
    values.push(logged_hours);
  }
  if (tags !== undefined) {
    updates.push('tags = ?');
    values.push(tags);
  }
  if (testing_notes !== undefined) {
    updates.push('testing_notes = ?');
    values.push(testing_notes);
  }
  if (developer_notes !== undefined) {
    updates.push('developer_notes = ?');
    values.push(developer_notes);
  }
  if (rework_count !== undefined) {
    updates.push('rework_count = ?');
    values.push(rework_count);
  }

  // ✅ Always update updated_at
  updates.push('updated_at = NOW()');

  // ✅ If no fields to update (only updated_at), return early
  if (updates.length === 1) {
    return { affectedRows: 0 };
  }

  // ✅ Build the final query
  const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
  values.push(taskId);

  const result = await db.execute(query, values);
  return result;
};

// ✅ Assign task to developer
export const assignTaskToDeveloper = async (taskId: number, developerId: number) => {
  const result = await db.execute(
    `UPDATE tasks SET assigned_to = ?, updated_at = NOW() WHERE id = ?`,
    [developerId, taskId]
  );
  return result;
};

// ✅ Delete task
export const deleteTask = async (taskId: number) => {
  const result = await db.execute(
    `DELETE FROM tasks WHERE id = ?`,
    [taskId]
  );
  return result;
};

// ✅ Get all tasks assigned to a developer
export const getTasksByDeveloper = async (developerId: number) => {
  const rows = await db.execute(
    `SELECT * FROM tasks WHERE assigned_to = ? ORDER BY due_date ASC`,
    [developerId]
  );
  return rows;
};

// ✅ Update task status
export const updateTaskStatus = async (taskId: number, status: string) => {
  const result = await db.execute(
    `UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?`,
    [status, taskId]
  );
  return result;
};

// ✅ Get task count by status
export const getTaskCountByStatus = async () => {
  const rows = await db.execute(
    `SELECT status, COUNT(*) as count FROM tasks GROUP BY status`
  );
  return rows;
};

// ✅ Search tasks
export const searchTasks = async (searchTerm: string) => {
  const rows = await db.execute(
    `SELECT * FROM tasks 
     WHERE title LIKE ? 
     OR description LIKE ? 
     OR tags LIKE ?
     ORDER BY created_at DESC`,
    [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  );
  return rows;
};

// ✅ Get tasks with rework count > 0
export const getTasksWithRework = async () => {
  const rows = await db.execute(
    `SELECT * FROM tasks WHERE rework_count > 0 ORDER BY rework_count DESC`
  );
  return rows;
};

// ✅ Update task with rework (for rework workflow)
export const updateTaskForRework = async (
  taskId: number,
  assignee: string,
  reworkNotes: string,
  reworkCount: number
) => {
  const result = await db.execute(
    `UPDATE tasks SET 
      assigned_to = ?,
      testing_notes = ?,
      rework_count = ?,
      status = 'todo',
      updated_at = NOW()
    WHERE id = ?`,
    [assignee, reworkNotes, reworkCount, taskId]
  );
  return result;
};

// ✅ Get tasks by status
export const getTasksByStatus = async (status: string) => {
  const rows = await db.execute(
    `SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC`,
    [status]
  );
  return rows;
};