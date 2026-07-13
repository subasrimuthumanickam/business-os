// // // // import express from 'express';
// // // // import db from '../config/db.js';

// // // // const router = express.Router();

// // // // // Get tasks for a project
// // // // router.get('/project/:projectId', async (req, res) => {
// // // //   try {
// // // //     const { projectId } = req.params;

// // // //     db.all(
// // // //       `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
// // // //       [projectId],
// // // //       (err, rows) => {
// // // //         if (err) {
// // // //           console.error('Error fetching tasks:', err);
// // // //           return res.status(500).json({ error: 'Failed to fetch tasks' });
// // // //         }
// // // //         res.json({ success: true, tasks: rows });
// // // //       }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('Error:', error);
// // // //     res.status(500).json({ error: 'Failed to fetch tasks' });
// // // //   }
// // // // });

// // // // // Create a task
// // // // router.post('/', async (req, res) => {
// // // //   try {
// // // //     const { project_id, title, description, priority, due_date, assigned_to } = req.body;

// // // //     if (!project_id || !title) {
// // // //       return res.status(400).json({ error: 'Project ID and title are required' });
// // // //     }

// // // //     db.run(
// // // //       `INSERT INTO tasks (project_id, title, description, priority, due_date, assigned_to) 
// // // //        VALUES (?, ?, ?, ?, ?, ?)`,
// // // //       [project_id, title, description, priority, due_date, assigned_to],
// // // //       function(err) {
// // // //         if (err) {
// // // //           console.error('Error creating task:', err);
// // // //           return res.status(500).json({ error: 'Failed to create task' });
// // // //         }
// // // //         res.json({ 
// // // //           success: true, 
// // // //           taskId: this.lastID, 
// // // //           message: 'Task created successfully' 
// // // //         });
// // // //       }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('Error:', error);
// // // //     res.status(500).json({ error: 'Failed to create task' });
// // // //   }
// // // // });

// // // // // Update task status
// // // // router.put('/:taskId/status', async (req, res) => {
// // // //   try {
// // // //     const { taskId } = req.params;
// // // //     const { status } = req.body;

// // // //     db.run(
// // // //       `UPDATE tasks SET status = ? WHERE id = ?`,
// // // //       [status, taskId],
// // // //       function(err) {
// // // //         if (err) {
// // // //           console.error('Error updating task:', err);
// // // //           return res.status(500).json({ error: 'Failed to update task' });
// // // //         }
// // // //         res.json({ 
// // // //           success: true, 
// // // //           message: 'Task status updated successfully' 
// // // //         });
// // // //       }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('Error:', error);
// // // //     res.status(500).json({ error: 'Failed to update task' });
// // // //   }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import db from '../config/db.js';
// // // import { sendReworkRequestEmail } from '../services/emailService.js';
// // // import bcrypt from 'bcryptjs';

// // // const router = express.Router();

// // // // Get tasks for a project
// // // router.get('/project/:projectId', async (req, res) => {
// // //   try {
// // //     const { projectId } = req.params;

// // //     db.all(
// // //       `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
// // //       [projectId],
// // //       (err, rows) => {
// // //         if (err) {
// // //           console.error('Error fetching tasks:', err);
// // //           return res.status(500).json({ error: 'Failed to fetch tasks' });
// // //         }
// // //         res.json({ success: true, tasks: rows });
// // //       }
// // //     );
// // //   } catch (error) {
// // //     console.error('Error:', error);
// // //     res.status(500).json({ error: 'Failed to fetch tasks' });
// // //   }
// // // });

// // // // Create a task
// // // router.post('/', async (req, res) => {
// // //   try {
// // //     const { project_id, title, description, priority, due_date, assigned_to } = req.body;

// // //     if (!project_id || !title) {
// // //       return res.status(400).json({ error: 'Project ID and title are required' });
// // //     }

// // //     db.run(
// // //       `INSERT INTO tasks (project_id, title, description, priority, due_date, assigned_to) 
// // //        VALUES (?, ?, ?, ?, ?, ?)`,
// // //       [project_id, title, description, priority, due_date, assigned_to],
// // //       function(err) {
// // //         if (err) {
// // //           console.error('Error creating task:', err);
// // //           return res.status(500).json({ error: 'Failed to create task' });
// // //         }
// // //         res.json({ 
// // //           success: true, 
// // //           taskId: this.lastID, 
// // //           message: 'Task created successfully' 
// // //         });
// // //       }
// // //     );
// // //   } catch (error) {
// // //     console.error('Error:', error);
// // //     res.status(500).json({ error: 'Failed to create task' });
// // //   }
// // // });

// // // // Update task status
// // // router.put('/:taskId/status', async (req, res) => {
// // //   try {
// // //     const { taskId } = req.params;
// // //     const { status } = req.body;

// // //     db.run(
// // //       `UPDATE tasks SET status = ? WHERE id = ?`,
// // //       [status, taskId],
// // //       function(err) {
// // //         if (err) {
// // //           console.error('Error updating task:', err);
// // //           return res.status(500).json({ error: 'Failed to update task' });
// // //         }
// // //         res.json({ 
// // //           success: true, 
// // //           message: 'Task status updated successfully' 
// // //         });
// // //       }
// // //     );
// // //   } catch (error) {
// // //     console.error('Error:', error);
// // //     res.status(500).json({ error: 'Failed to update task' });
// // //   }
// // // });

// // // // ============= REWORK TASK ENDPOINT =============
// // // router.post('/:taskId/rework', async (req, res) => {
// // //   try {
// // //     const { taskId } = req.params;
// // //     const { developerName, reworkNotes, testerName, testerEmail } = req.body;

// // //     console.log('📧 ========== REWORK REQUEST ==========');
// // //     console.log('📧 Task ID:', taskId);
// // //     console.log('📧 Developer Name:', developerName);
// // //     console.log('📧 Rework Notes:', reworkNotes);
// // //     console.log('📧 Tester Name:', testerName);
// // //     console.log('📧 Tester Email:', testerEmail);
// // //     console.log('📧 ====================================');

// // //     // ✅ Validate required fields
// // //     if (!developerName || !reworkNotes || !testerEmail) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Missing required fields: developerName, reworkNotes, testerEmail'
// // //       });
// // //     }

// // //     // ✅ Get task details from database
// // //     const task = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         `SELECT * FROM tasks WHERE id = ?`,
// // //         [taskId],
// // //         (err, row) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     if (!task) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }

// // //     console.log('📋 Task found:', {
// // //       id: task.id,
// // //       title: task.title,
// // //       project_id: task.project_id,
// // //       assigned_to: task.assigned_to,
// // //       rework_count: task.rework_count || 0
// // //     });

// // //     // ✅ Get developer details from database
// // //     let developerEmail: string;
// // //     let developerNameFromDB: string;
// // //     let developerId: number;

// // //     // Try to find developer by name
// // //     let developer = await new Promise<any>((resolve, reject) => {
// // //       db.get(
// // //         `SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)`,
// // //         [developerName.trim()],
// // //         (err, row) => {
// // //           if (err) {
// // //             console.error('Database error:', err);
// // //             return reject(err);
// // //           }
// // //           resolve(row);
// // //         }
// // //       );
// // //     });

// // //     // If not found, try partial match
// // //     if (!developer) {
// // //       console.log(`⚠️ No exact match, trying partial match for "${developerName}"`);
// // //       developer = await new Promise<any>((resolve, reject) => {
// // //         db.get(
// // //           `SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)`,
// // //           [`%${developerName.trim()}%`],
// // //           (err, row) => {
// // //             if (err) {
// // //               console.error('Database error:', err);
// // //               return reject(err);
// // //             }
// // //             resolve(row);
// // //           }
// // //         );
// // //       });
// // //     }

// // //     // If still not found, auto-register
// // //     if (!developer) {
// // //       console.log(`⚠️ Developer "${developerName}" not found. Auto-registering...`);
      
// // //       const generatedEmail = `${developerName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      
// // //       // Check if user exists with this email
// // //       const userByEmail = await new Promise<any>((resolve, reject) => {
// // //         db.get(
// // //           `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
// // //           [generatedEmail],
// // //           (err, row) => {
// // //             if (err) return reject(err);
// // //             resolve(row);
// // //           }
// // //         );
// // //       });

// // //       if (userByEmail) {
// // //         developerEmail = userByEmail.email;
// // //         developerNameFromDB = userByEmail.name;
// // //         developerId = userByEmail.id;
// // //         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
// // //       } else {
// // //         // Auto-register new developer
// // //         const hashedPassword = await bcrypt.hash('password123', 10);
        
// // //         const result = await new Promise<any>((resolve, reject) => {
// // //           db.run(
// // //             `INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)`,
// // //             [developerName, generatedEmail, hashedPassword, 2, 1],
// // //             function(err) {
// // //               if (err) {
// // //                 console.error('Error registering developer:', err);
// // //                 return reject(err);
// // //               }
// // //               resolve({ id: this.lastID });
// // //             }
// // //           );
// // //         });
        
// // //         developerEmail = generatedEmail;
// // //         developerNameFromDB = developerName;
// // //         developerId = result.id;
// // //         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
// // //       }
// // //     } else {
// // //       developerEmail = developer.email;
// // //       developerNameFromDB = developer.name;
// // //       developerId = developer.id;
// // //       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
// // //     }

// // //     // ✅ Update task with rework
// // //     const reworkCount = (task.rework_count || 0) + 1;
    
// // //     await new Promise<void>((resolve, reject) => {
// // //       db.run(
// // //         `UPDATE tasks SET 
// // //           assigned_to = ?,
// // //           testing_notes = ?,
// // //           rework_count = ?,
// // //           status = 'todo',
// // //           updated_at = NOW()
// // //         WHERE id = ?`,
// // //         [developerId, reworkNotes, reworkCount, taskId],
// // //         function(err) {
// // //           if (err) {
// // //             console.error('Error updating task:', err);
// // //             return reject(err);
// // //           }
// // //           resolve();
// // //         }
// // //       );
// // //     });

// // //     console.log(`✅ Task ${taskId} updated with rework count: ${reworkCount}`);

// // //     // ✅ Get project name (if available)
// // //     let projectName = '';
// // //     if (task.project_id) {
// // //       const project = await new Promise<any>((resolve, reject) => {
// // //         db.get(
// // //           `SELECT name FROM projects WHERE id = ?`,
// // //           [task.project_id],
// // //           (err, row) => {
// // //             if (err) return reject(err);
// // //             resolve(row);
// // //           }
// // //         );
// // //       });
// // //       if (project) {
// // //         projectName = project.name;
// // //         console.log(`📁 Project found: ${projectName}`);
// // //       }
// // //     }

// // //     // ✅ Send email
// // //     console.log('📧 ========== SENDING EMAIL ==========');
// // //     console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
// // //     console.log('📧 TO (Developer):', developerEmail);
// // //     console.log('📧 Developer Name:', developerNameFromDB);
// // //     console.log('📧 Task Title:', task.title);
// // //     console.log('📧 Tester Name:', testerName || 'Tester');
// // //     console.log('📧 Tester Email:', testerEmail);
// // //     console.log('📧 Rework Count:', reworkCount);
// // //     console.log('📧 ====================================');

// // //     const result = await sendReworkRequestEmail({
// // //       toEmail: developerEmail,
// // //       toName: developerNameFromDB,
// // //       taskTitle: task.title,
// // //       reworkNotes: reworkNotes,
// // //       fromName: testerName || 'Tester',
// // //       fromEmail: testerEmail,
// // //       taskId: String(taskId),
// // //       projectName: projectName,
// // //       reworkCount: reworkCount
// // //     });

// // //     if (result) {
// // //       console.log(`✅ Email sent successfully to: ${developerEmail}`);
// // //       return res.json({
// // //         success: true,
// // //         message: `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail})`,
// // //         task: {
// // //           id: task.id,
// // //           title: task.title,
// // //           status: 'todo',
// // //           reworkCount: reworkCount
// // //         },
// // //         developer: {
// // //           id: developerId,
// // //           name: developerNameFromDB,
// // //           email: developerEmail,
// // //           isNew: !developer
// // //         }
// // //       });
// // //     } else {
// // //       return res.status(500).json({
// // //         success: false,
// // //         message: 'Failed to send email to developer'
// // //       });
// // //     }
// // //   } catch (error) {
// // //     console.error('❌ Error in rework endpoint:', error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: error.message || 'Failed to process rework request'
// // //     });
// // //   }
// // // });

// // // // Get tasks with rework
// // // router.get('/rework/list', async (req, res) => {
// // //   try {
// // //     db.all(
// // //       `SELECT * FROM tasks WHERE rework_count > 0 ORDER BY rework_count DESC, updated_at DESC`,
// // //       [],
// // //       (err, rows) => {
// // //         if (err) {
// // //           console.error('Error fetching rework tasks:', err);
// // //           return res.status(500).json({ error: 'Failed to fetch rework tasks' });
// // //         }
// // //         res.json({ success: true, tasks: rows });
// // //       }
// // //     );
// // //   } catch (error) {
// // //     console.error('Error:', error);
// // //     res.status(500).json({ error: 'Failed to fetch rework tasks' });
// // //   }
// // // });

// // // export default router;
// // // routes/task.routes.ts

// // import express from 'express';
// // import db from '../config/db.js';
// // import { sendReworkRequestEmail } from '../services/emailService.js';
// // import bcrypt from 'bcryptjs';

// // const router = express.Router();

// // // Get tasks for a project
// // router.get('/project/:projectId', async (req, res) => {
// //   try {
// //     const { projectId } = req.params;

// //     db.all(
// //       `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
// //       [projectId],
// //       (err, rows) => {
// //         if (err) {
// //           console.error('Error fetching tasks:', err);
// //           return res.status(500).json({ error: 'Failed to fetch tasks' });
// //         }
// //         res.json({ success: true, tasks: rows });
// //       }
// //     );
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ error: 'Failed to fetch tasks' });
// //   }
// // });

// // // Create a task
// // router.post('/', async (req, res) => {
// //   try {
// //     const { project_id, title, description, priority, due_date, assigned_to } = req.body;

// //     if (!project_id || !title) {
// //       return res.status(400).json({ error: 'Project ID and title are required' });
// //     }

// //     db.run(
// //       `INSERT INTO tasks (project_id, title, description, priority, due_date, assigned_to) 
// //        VALUES (?, ?, ?, ?, ?, ?)`,
// //       [project_id, title, description, priority, due_date, assigned_to],
// //       function(err) {
// //         if (err) {
// //           console.error('Error creating task:', err);
// //           return res.status(500).json({ error: 'Failed to create task' });
// //         }
// //         res.json({ 
// //           success: true, 
// //           taskId: this.lastID, 
// //           message: 'Task created successfully' 
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ error: 'Failed to create task' });
// //   }
// // });

// // // Update task status
// // router.put('/:taskId/status', async (req, res) => {
// //   try {
// //     const { taskId } = req.params;
// //     const { status } = req.body;

// //     db.run(
// //       `UPDATE tasks SET status = ? WHERE id = ?`,
// //       [status, taskId],
// //       function(err) {
// //         if (err) {
// //           console.error('Error updating task:', err);
// //           return res.status(500).json({ error: 'Failed to update task' });
// //         }
// //         res.json({ 
// //           success: true, 
// //           message: 'Task status updated successfully' 
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ error: 'Failed to update task' });
// //   }
// // });

// // // ============= REWORK TASK ENDPOINT =============
// // router.post('/:taskId/rework', async (req, res) => {
// //   try {
// //     const { taskId } = req.params;
// //     const { developerName, reworkNotes, testerName, testerEmail, reworkDeadline } = req.body;

// //     console.log('📧 ========== REWORK REQUEST ==========');
// //     console.log('📧 Task ID:', taskId);
// //     console.log('📧 Developer Name:', developerName);
// //     console.log('📧 Rework Notes:', reworkNotes);
// //     console.log('📧 Tester Name:', testerName);
// //     console.log('📧 Tester Email:', testerEmail);
// //     console.log('📧 Rework Deadline:', reworkDeadline);
// //     console.log('📧 ====================================');

// //     // ✅ Validate required fields
// //     if (!developerName || !reworkNotes || !testerEmail) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Missing required fields: developerName, reworkNotes, testerEmail'
// //       });
// //     }

// //     // ✅ Get task details from database
// //     const task = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         `SELECT * FROM tasks WHERE id = ?`,
// //         [taskId],
// //         (err, row) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });

// //     if (!task) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found'
// //       });
// //     }

// //     console.log('📋 Task found:', {
// //       id: task.id,
// //       title: task.title,
// //       project_id: task.project_id,
// //       assigned_to: task.assigned_to,
// //       rework_count: task.rework_count || 0
// //     });

// //     // ✅ Get developer details from database
// //     let developerEmail: string;
// //     let developerNameFromDB: string;
// //     let developerId: number;

// //     // Try to find developer by name
// //     let developer = await new Promise<any>((resolve, reject) => {
// //       db.get(
// //         `SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)`,
// //         [developerName.trim()],
// //         (err, row) => {
// //           if (err) {
// //             console.error('Database error:', err);
// //             return reject(err);
// //           }
// //           resolve(row);
// //         }
// //       );
// //     });

// //     // If not found, try partial match
// //     if (!developer) {
// //       console.log(`⚠️ No exact match, trying partial match for "${developerName}"`);
// //       developer = await new Promise<any>((resolve, reject) => {
// //         db.get(
// //           `SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)`,
// //           [`%${developerName.trim()}%`],
// //           (err, row) => {
// //             if (err) {
// //               console.error('Database error:', err);
// //               return reject(err);
// //             }
// //             resolve(row);
// //           }
// //         );
// //       });
// //     }

// //     // If still not found, auto-register
// //     if (!developer) {
// //       console.log(`⚠️ Developer "${developerName}" not found. Auto-registering...`);
      
// //       const generatedEmail = `${developerName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      
// //       // Check if user exists with this email
// //       const userByEmail = await new Promise<any>((resolve, reject) => {
// //         db.get(
// //           `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
// //           [generatedEmail],
// //           (err, row) => {
// //             if (err) return reject(err);
// //             resolve(row);
// //           }
// //         );
// //       });

// //       if (userByEmail) {
// //         developerEmail = userByEmail.email;
// //         developerNameFromDB = userByEmail.name;
// //         developerId = userByEmail.id;
// //         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
// //       } else {
// //         // Auto-register new developer
// //         const hashedPassword = await bcrypt.hash('password123', 10);
        
// //         const result = await new Promise<any>((resolve, reject) => {
// //           db.run(
// //             `INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)`,
// //             [developerName, generatedEmail, hashedPassword, 2, 1],
// //             function(err) {
// //               if (err) {
// //                 console.error('Error registering developer:', err);
// //                 return reject(err);
// //               }
// //               resolve({ id: this.lastID });
// //             }
// //           );
// //         });
        
// //         developerEmail = generatedEmail;
// //         developerNameFromDB = developerName;
// //         developerId = result.id;
// //         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
// //       }
// //     } else {
// //       developerEmail = developer.email;
// //       developerNameFromDB = developer.name;
// //       developerId = developer.id;
// //       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
// //     }

// //     // ✅ Update task with rework
// //     const reworkCount = (task.rework_count || 0) + 1;
    
// //     await new Promise<void>((resolve, reject) => {
// //       db.run(
// //         `UPDATE tasks SET 
// //           assigned_to = ?,
// //           testing_notes = ?,
// //           rework_count = ?,
// //           status = 'todo',
// //           updated_at = NOW()
// //         WHERE id = ?`,
// //         [developerId, reworkNotes, reworkCount, taskId],
// //         function(err) {
// //           if (err) {
// //             console.error('Error updating task:', err);
// //             return reject(err);
// //           }
// //           resolve();
// //         }
// //       );
// //     });

// //     console.log(`✅ Task ${taskId} updated with rework count: ${reworkCount}`);

// //     // ✅ Get project name (if available)
// //     let projectName = '';
// //     if (task.project_id) {
// //       const project = await new Promise<any>((resolve, reject) => {
// //         db.get(
// //           `SELECT name FROM projects WHERE id = ?`,
// //           [task.project_id],
// //           (err, row) => {
// //             if (err) return reject(err);
// //             resolve(row);
// //           }
// //         );
// //       });
// //       if (project) {
// //         projectName = project.name;
// //         console.log(`📁 Project found: ${projectName}`);
// //       }
// //     }

// //     // ✅ Send email - ALL DYNAMIC FROM ENVIRONMENT AND DATABASE
// //     console.log('📧 ========== SENDING EMAIL ==========');
// //     console.log('📧 FROM (SMTP):', process.env.SMTP_FROM || process.env.SMTP_USER);
// //     console.log('📧 TO (Developer):', developerEmail);
// //     console.log('📧 Developer Name:', developerNameFromDB);
// //     console.log('📧 Task Title:', task.title);
// //     console.log('📧 Tester Name:', testerName || 'Tester');
// //     console.log('📧 Tester Email:', testerEmail);
// //     console.log('📧 Rework Count:', reworkCount);
// //     console.log('📧 ====================================');

// //     const result = await sendReworkRequestEmail({
// //       toEmail: developerEmail,
// //       toName: developerNameFromDB,
// //       taskTitle: task.title,
// //       reworkNotes: reworkNotes,
// //       fromName: testerName || 'Tester',
// //       fromEmail: testerEmail,
// //       taskId: String(taskId),
// //       projectName: projectName,
// //       reworkCount: reworkCount
// //     });

// //     if (result) {
// //       console.log(`✅ Email sent successfully to: ${developerEmail}`);
// //       return res.json({
// //         success: true,
// //         message: `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail})`,
// //         task: {
// //           id: task.id,
// //           title: task.title,
// //           status: 'todo',
// //           reworkCount: reworkCount
// //         },
// //         developer: {
// //           id: developerId,
// //           name: developerNameFromDB,
// //           email: developerEmail,
// //           isNew: !developer
// //         }
// //       });
// //     } else {
// //       return res.status(500).json({
// //         success: false,
// //         message: 'Failed to send email to developer'
// //       });
// //     }
// //   } catch (error: any) {
// //     console.error('❌ Error in rework endpoint:', error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || 'Failed to process rework request'
// //     });
// //   }
// // });

// // // Get tasks with rework
// // router.get('/rework/list', async (req, res) => {
// //   try {
// //     db.all(
// //       `SELECT * FROM tasks WHERE rework_count > 0 ORDER BY rework_count DESC, updated_at DESC`,
// //       [],
// //       (err, rows) => {
// //         if (err) {
// //           console.error('Error fetching rework tasks:', err);
// //           return res.status(500).json({ error: 'Failed to fetch rework tasks' });
// //         }
// //         res.json({ success: true, tasks: rows });
// //       }
// //     );
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ error: 'Failed to fetch rework tasks' });
// //   }
// // });

// // export default router;
// // routes/task.routes.ts

// import express from 'express';
// import db from '../config/db.js';
// import { sendReworkRequestEmail } from '../services/emailService.js';
// import bcrypt from 'bcryptjs';

// const router = express.Router();

// // Get tasks for a project
// router.get('/project/:projectId', async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     db.all(
//       `SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC`,
//       [projectId],
//       (err, rows) => {
//         if (err) {
//           console.error('Error fetching tasks:', err);
//           return res.status(500).json({ error: 'Failed to fetch tasks' });
//         }
//         res.json({ success: true, tasks: rows });
//       }
//     );
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// // Create a task
// router.post('/', async (req, res) => {
//   try {
//     const { project_id, title, description, priority, due_date, assigned_to } = req.body;

//     if (!project_id || !title) {
//       return res.status(400).json({ error: 'Project ID and title are required' });
//     }

//     db.run(
//       `INSERT INTO tasks (project_id, title, description, priority, due_date, assigned_to) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [project_id, title, description, priority, due_date, assigned_to],
//       function(err) {
//         if (err) {
//           console.error('Error creating task:', err);
//           return res.status(500).json({ error: 'Failed to create task' });
//         }
//         res.json({ 
//           success: true, 
//           taskId: this.lastID, 
//           message: 'Task created successfully' 
//         });
//       }
//     );
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to create task' });
//   }
// });

// // Update task status
// router.put('/:taskId/status', async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { status } = req.body;

//     db.run(
//       `UPDATE tasks SET status = ? WHERE id = ?`,
//       [status, taskId],
//       function(err) {
//         if (err) {
//           console.error('Error updating task:', err);
//           return res.status(500).json({ error: 'Failed to update task' });
//         }
//         res.json({ 
//           success: true, 
//           message: 'Task status updated successfully' 
//         });
//       }
//     );
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

// // ============= REWORK TASK ENDPOINT =============
// router.post('/:taskId/rework', async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { developerName, reworkNotes, testerName, testerEmail } = req.body;

//     console.log('📧 ========== REWORK REQUEST ==========');
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name:', testerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 ====================================');

//     // ✅ Validate required fields
//     if (!developerName || !reworkNotes || !testerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: developerName, reworkNotes, testerEmail'
//       });
//     }

//     // ✅ Get task details from database
//     const task = await new Promise<any>((resolve, reject) => {
//       db.get(
//         `SELECT * FROM tasks WHERE id = ?`,
//         [taskId],
//         (err, row) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: 'Task not found'
//       });
//     }

//     console.log('📋 Task found:', {
//       id: task.id,
//       title: task.title,
//       project_id: task.project_id,
//       assigned_to: task.assigned_to,
//       rework_count: task.rework_count || 0
//     });

//     // ✅ STEP 1: Try to find developer in database by name
//     const cleanDevName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${cleanDevName}"`);

//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         `SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)`,
//         [cleanDevName],
//         (err, row) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 2: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${cleanDevName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           `SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)`,
//           [`%${cleanDevName}%`],
//           (err, row) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let developerId: number;
//     let isNewDeveloper = false;

//     // ✅ STEP 3: If still not found, AUTO-REGISTER
//     if (!developer) {
//       console.log(`⚠️ Developer "${cleanDevName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       // Generate email from name
//       const generatedEmail = `${cleanDevName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
//           [generatedEmail],
//           (err, row) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         developerId = userByEmail.id;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer with role_id = 2 (Developer)
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         const result = await new Promise<any>((resolve, reject) => {
//           db.run(
//             `INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)`,
//             [cleanDevName, generatedEmail, hashedPassword, 2, 1],
//             function(err) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               resolve({ id: this.lastID });
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = cleanDevName;
//         developerId = result.id;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       developerId = developer.id;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: `Developer "${developerNameFromDB}" has no email`
//       });
//     }

//     // ✅ Update task with rework
//     const reworkCount = (task.rework_count || 0) + 1;
    
//     await new Promise<void>((resolve, reject) => {
//       db.run(
//         `UPDATE tasks SET 
//           assigned_to = ?,
//           testing_notes = ?,
//           rework_count = ?,
//           status = 'todo',
//           updated_at = NOW()
//         WHERE id = ?`,
//         [developerId, reworkNotes, reworkCount, taskId],
//         function(err) {
//           if (err) {
//             console.error('Error updating task:', err);
//             return reject(err);
//           }
//           resolve();
//         }
//       );
//     });

//     console.log(`✅ Task ${taskId} updated with rework count: ${reworkCount}`);

//     // ✅ Get project name (if available)
//     let projectName = '';
//     if (task.project_id) {
//       const project = await new Promise<any>((resolve, reject) => {
//         db.get(
//           `SELECT name FROM projects WHERE id = ?`,
//           [task.project_id],
//           (err, row) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });
//       if (project) {
//         projectName = project.name;
//         console.log(`📁 Project found: ${projectName}`);
//       }
//     }

//     // ✅ Send email - FROM is SMTP user, TO is developer from database
//     console.log('📧 ========== SENDING EMAIL ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_FROM || process.env.SMTP_USER);
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 Task Title:', task.title);
//     console.log('📧 Tester Name:', testerName || 'Tester');
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Rework Count:', reworkCount);
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ====================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: task.title,
//       reworkNotes: reworkNotes,
//       fromName: testerName || 'Tester',
//       fromEmail: testerEmail,
//       taskId: String(taskId),
//       projectName: projectName,
//       reworkCount: reworkCount
//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({
//         success: true,
//         message: `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail})${isNewDeveloper ? ' - New developer auto-registered' : ''}`,
//         task: {
//           id: task.id,
//           title: task.title,
//           status: 'todo',
//           reworkCount: reworkCount
//         },
//         developer: {
//           id: developerId,
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to send email to developer'
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in rework endpoint:', error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to process rework request'
//     });
//   }
// });

// // Get tasks with rework
// router.get('/rework/list', async (req, res) => {
//   try {
//     db.all(
//       `SELECT * FROM tasks WHERE rework_count > 0 ORDER BY rework_count DESC, updated_at DESC`,
//       [],
//       (err, rows) => {
//         if (err) {
//           console.error('Error fetching rework tasks:', err);
//           return res.status(500).json({ error: 'Failed to fetch rework tasks' });
//         }
//         res.json({ success: true, tasks: rows });
//       }
//     );
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch rework tasks' });
//   }
// });

// export default router;
// routes/task.routes.ts

import express from 'express';
import db from '../config/db.js';
import { sendReworkRequestEmail } from '../services/emailService.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get all tasks with developer details
router.get('/', async (req, res) => {
  try {
    db.all(
      `SELECT t.*, 
              u.name as developer_name, 
              u.email as developer_email,
              p.name as project_name
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       LEFT JOIN projects p ON t.project_id = p.id
       ORDER BY t.created_at DESC`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error fetching tasks:', err);
          return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
        res.json({ success: true, tasks: rows });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get tasks for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    db.all(
      `SELECT t.*, 
              u.name as developer_name, 
              u.email as developer_email 
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.project_id = ? 
       ORDER BY t.created_at DESC`,
      [projectId],
      (err, rows) => {
        if (err) {
          console.error('Error fetching tasks:', err);
          return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
        res.json({ success: true, tasks: rows });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a task
router.post('/', async (req, res) => {
  try {
    const { project_id, title, description, priority, due_date, assigned_to } = req.body;

    if (!project_id || !title) {
      return res.status(400).json({ error: 'Project ID and title are required' });
    }

    db.run(
      `INSERT INTO tasks (project_id, title, description, priority, due_date, assigned_to, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'todo')`,
      [project_id, title, description, priority, due_date, assigned_to],
      function(err) {
        if (err) {
          console.error('Error creating task:', err);
          return res.status(500).json({ error: 'Failed to create task' });
        }
        res.json({ 
          success: true, 
          taskId: this.lastID, 
          message: 'Task created successfully' 
        });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task status
router.put('/:taskId/status', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    db.run(
      `UPDATE tasks SET status = ? WHERE id = ?`,
      [status, taskId],
      function(err) {
        if (err) {
          console.error('Error updating task:', err);
          return res.status(500).json({ error: 'Failed to update task' });
        }
        res.json({ 
          success: true, 
          message: 'Task status updated successfully' 
        });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ============= REWORK TASK ENDPOINT - FULLY DYNAMIC =============
// router.post('/:taskId/rework', async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { developerName, reworkNotes, testerName, testerEmail, reworkDeadline } = req.body;

//     console.log('📧 ========== REWORK REQUEST ==========');
//     console.log('📧 Task ID:', taskId);
//     console.log('📧 Developer Name:', developerName);
//     console.log('📧 Rework Notes:', reworkNotes);
//     console.log('📧 Tester Name:', testerName);
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Rework Deadline:', reworkDeadline);
//     console.log('📧 ====================================');

//     // ✅ Validate required fields
//     if (!developerName || !reworkNotes || !testerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: developerName, reworkNotes, testerEmail'
//       });
//     }

//     // ✅ Get task details with developer info
//     const task = await new Promise<any>((resolve, reject) => {
//       db.get(
//         `SELECT t.*, 
//                 u.name as developer_name, 
//                 u.email as developer_email,
//                 p.name as project_name
//          FROM tasks t
//          LEFT JOIN users u ON t.assigned_to = u.id
//          LEFT JOIN projects p ON t.project_id = p.id
//          WHERE t.id = ?`,
//         [taskId],
//         (err, row) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: 'Task not found'
//       });
//     }

//     console.log('📋 Task found:', {
//       id: task.id,
//       title: task.title,
//       project_name: task.project_name,
//       developer_name: task.developer_name,
//       developer_email: task.developer_email,
//       rework_count: task.rework_count || 0
//     });

//     // ✅ STEP 1: Clean developer name
//     const cleanDevName = developerName.trim();
//     console.log(`🔍 Looking up developer: "${cleanDevName}"`);

//     // ✅ STEP 2: Try to find developer in database
//     let developer = await new Promise<any>((resolve, reject) => {
//       db.get(
//         `SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)`,
//         [cleanDevName],
//         (err, row) => {
//           if (err) {
//             console.error('Database error:', err);
//             return reject(err);
//           }
//           resolve(row);
//         }
//       );
//     });

//     // ✅ STEP 3: If not found, try partial match
//     if (!developer) {
//       console.log(`⚠️ No exact match, trying partial match for "${cleanDevName}"`);
//       developer = await new Promise<any>((resolve, reject) => {
//         db.get(
//           `SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)`,
//           [`%${cleanDevName}%`],
//           (err, row) => {
//             if (err) {
//               console.error('Database error:', err);
//               return reject(err);
//             }
//             resolve(row);
//           }
//         );
//       });
//     }

//     let developerEmail: string;
//     let developerNameFromDB: string;
//     let developerId: number;
//     let isNewDeveloper = false;

//     // ✅ STEP 4: If still not found, AUTO-REGISTER (DYNAMIC)
//     if (!developer) {
//       console.log(`⚠️ Developer "${cleanDevName}" not found. Auto-registering...`);
//       isNewDeveloper = true;
      
//       // Generate email from name (DYNAMIC)
//       const generatedEmail = `${cleanDevName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
//       console.log(`📧 Generated email: ${generatedEmail}`);
      
//       // Check if user exists with this generated email
//       const userByEmail = await new Promise<any>((resolve, reject) => {
//         db.get(
//           `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
//           [generatedEmail],
//           (err, row) => {
//             if (err) return reject(err);
//             resolve(row);
//           }
//         );
//       });

//       if (userByEmail) {
//         developerEmail = userByEmail.email;
//         developerNameFromDB = userByEmail.name;
//         developerId = userByEmail.id;
//         console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
//       } else {
//         // Auto-register new developer
//         const hashedPassword = await bcrypt.hash('password123', 10);
        
//         const result = await new Promise<any>((resolve, reject) => {
//           db.run(
//             `INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)`,
//             [cleanDevName, generatedEmail, hashedPassword, 2, 1],
//             function(err) {
//               if (err) {
//                 console.error('Error registering developer:', err);
//                 return reject(err);
//               }
//               resolve({ id: this.lastID });
//             }
//           );
//         });
        
//         developerEmail = generatedEmail;
//         developerNameFromDB = cleanDevName;
//         developerId = result.id;
//         console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
//       }
//     } else {
//       developerEmail = developer.email;
//       developerNameFromDB = developer.name;
//       developerId = developer.id;
//       console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
//     }

//     // ✅ Validate developer email
//     if (!developerEmail) {
//       return res.status(400).json({
//         success: false,
//         message: `Developer "${developerNameFromDB}" has no email`
//       });
//     }

//     // ✅ Update task with rework
//     const reworkCount = (task.rework_count || 0) + 1;
    
//     await new Promise<void>((resolve, reject) => {
//       db.run(
//         `UPDATE tasks SET 
//           assigned_to = ?,
//           testing_notes = ?,
//           rework_count = ?,
//           status = 'todo',
//           updated_at = NOW()
//         WHERE id = ?`,
//         [developerId, reworkNotes, reworkCount, taskId],
//         function(err) {
//           if (err) {
//             console.error('Error updating task:', err);
//             return reject(err);
//           }
//           resolve();
//         }
//       );
//     });

//     console.log(`✅ Task ${taskId} updated with rework count: ${reworkCount}`);

//     // ✅ Get project name from task
//     const projectName = task.project_name || '';

//     // ✅ Send email to developer (DYNAMIC - whoever is assigned)
//     console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
//     console.log('📧 FROM (SMTP):', process.env.SMTP_FROM || process.env.SMTP_USER);
//     console.log('📧 TO (Developer):', developerEmail);
//     console.log('📧 Developer Name:', developerNameFromDB);
//     console.log('📧 Task Title:', task.title);
//     console.log('📧 Project:', projectName);
//     console.log('📧 Tester Name:', testerName || 'Tester');
//     console.log('📧 Tester Email:', testerEmail);
//     console.log('📧 Rework Count:', reworkCount);
//     console.log('📧 Is New Developer:', isNewDeveloper);
//     console.log('📧 ==========================================');

//     const result = await sendReworkRequestEmail({
//       toEmail: developerEmail,
//       toName: developerNameFromDB,
//       taskTitle: task.title,
//       reworkNotes: reworkNotes,
//       fromName: testerName || 'Tester',
//       fromEmail: testerEmail,
//       taskId: String(taskId),
//       projectName: projectName,
//       reworkCount: reworkCount,
//       originalDeveloper: task.developer_name || developerNameFromDB
      

//     });

//     if (result) {
//       console.log(`✅ Email sent successfully to: ${developerEmail}`);
//       return res.json({
//         success: true,
//         message: `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail})${isNewDeveloper ? ' - New developer auto-registered' : ''}`,
//         task: {
//           id: task.id,
//           title: task.title,
//           status: 'todo',
//           reworkCount: reworkCount
//         },
//         developer: {
//           id: developerId,
//           name: developerNameFromDB,
//           email: developerEmail,
//           isNew: isNewDeveloper
//         }
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to send email to developer'
//       });
//     }
//   } catch (error: any) {
//     console.error('❌ Error in rework endpoint:', error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to process rework request'
//     });
//   }
// });
// routes/task.routes.ts - Rework endpoint

// ============= REWORK TASK ENDPOINT =============
router.post('/:taskId/rework', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { developerName, reworkNotes, testerName, testerEmail, reworkDeadline } = req.body;

    console.log('📧 ========== REWORK REQUEST ==========');
    console.log('📧 Task ID:', taskId);
    console.log('📧 Developer Name:', developerName);
    console.log('📧 Rework Notes:', reworkNotes);
    console.log('📧 Tester Name:', testerName);
    console.log('📧 Tester Email:', testerEmail);
    console.log('📧 Rework Deadline:', reworkDeadline);
    console.log('📧 ====================================');

    // ✅ Validate required fields
    if (!developerName || !reworkNotes || !testerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: developerName, reworkNotes, testerEmail'
      });
    }

    // ✅ Get task details
    const task = await new Promise<any>((resolve, reject) => {
      db.get(
        `SELECT t.*, 
                u.name as developer_name, 
                u.email as developer_email,
                p.name as project_name
         FROM tasks t
         LEFT JOIN users u ON t.assigned_to = u.id
         LEFT JOIN projects p ON t.project_id = p.id
         WHERE t.id = ?`,
        [taskId],
        (err, row) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // ✅ Look up or auto-register developer
    const cleanDevName = developerName.trim();
    console.log(`🔍 Looking up developer: "${cleanDevName}"`);

    let developer = await new Promise<any>((resolve, reject) => {
      db.get(
        `SELECT id, name, email, role_id FROM users WHERE LOWER(name) = LOWER(?)`,
        [cleanDevName],
        (err, row) => {
          if (err) {
            console.error('Database error:', err);
            return reject(err);
          }
          resolve(row);
        }
      );
    });

    // ✅ Try partial match
    if (!developer) {
      console.log(`⚠️ No exact match, trying partial match for "${cleanDevName}"`);
      developer = await new Promise<any>((resolve, reject) => {
        db.get(
          `SELECT id, name, email, role_id FROM users WHERE LOWER(name) LIKE LOWER(?)`,
          [`%${cleanDevName}%`],
          (err, row) => {
            if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            resolve(row);
          }
        );
      });
    }

    let developerEmail: string;
    let developerNameFromDB: string;
    let developerId: number;
    let isNewDeveloper = false;

    // ✅ If not found, AUTO-REGISTER
    if (!developer) {
      console.log(`⚠️ Developer "${cleanDevName}" not found. Auto-registering...`);
      isNewDeveloper = true;
      
      const generatedEmail = `${cleanDevName.toLowerCase().replace(/\s/g, '')}@gmail.com`;
      console.log(`📧 Generated email: ${generatedEmail}`);
      
      // ✅ Check if user exists with this email
      const userByEmail = await new Promise<any>((resolve, reject) => {
        db.get(
          `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
          [generatedEmail],
          (err, row) => {
            if (err) {
              console.error('Database error:', err);
              return reject(err);
            }
            resolve(row);
          }
        );
      });

      if (userByEmail) {
        developerEmail = userByEmail.email;
        developerNameFromDB = userByEmail.name;
        developerId = userByEmail.id;
        console.log(`✅ Found user by email: ${developerNameFromDB} (${developerEmail})`);
      } else {
        // ✅ Auto-register new developer
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        // Check role
        let roleId = 2;
        const roleCheck = await new Promise<any>((resolve, reject) => {
          db.get(
            `SELECT role_id FROM roles WHERE role_id = ?`,
            [2],
            (err, row) => {
              if (err) return reject(err);
              resolve(row);
            }
          );
        });
        if (!roleCheck) roleId = 1;
        
        await new Promise<void>((resolve, reject) => {
          db.run(
            `INSERT INTO users (name, email, password, role_id, company_id) VALUES (?, ?, ?, ?, ?)`,
            [cleanDevName, generatedEmail, hashedPassword, roleId, 1],
            function(err) {
              if (err) {
                console.error('Error registering developer:', err);
                return reject(err);
              }
              resolve();
            }
          );
        });
        
        // Get the new user
        const newUser = await new Promise<any>((resolve, reject) => {
          db.get(
            `SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?)`,
            [generatedEmail],
            (err, row) => {
              if (err) return reject(err);
              resolve(row);
            }
          );
        });
        
        developerEmail = generatedEmail;
        developerNameFromDB = cleanDevName;
        developerId = newUser?.id || 0;
        console.log(`✅ Auto-registered developer: ${developerNameFromDB} (${developerEmail})`);
      }
    } else {
      developerEmail = developer.email;
      developerNameFromDB = developer.name;
      developerId = developer.id;
      console.log(`✅ Found developer in DB: ${developerNameFromDB} (${developerEmail})`);
    }

    // ✅ Update task with rework
    const reworkCount = (task.rework_count || 0) + 1;
    
    await new Promise<void>((resolve, reject) => {
      db.run(
        `UPDATE tasks SET 
          assigned_to = ?,
          testing_notes = ?,
          rework_count = ?,
          status = 'todo',
          updated_at = NOW()
        WHERE id = ?`,
        [developerId, reworkNotes, reworkCount, taskId],
        function(err) {
          if (err) {
            console.error('Error updating task:', err);
            return reject(err);
          }
          resolve();
        }
      );
    });

    console.log(`✅ Task ${taskId} updated with rework count: ${reworkCount}`);

    // ✅ Get project name
    const projectName = task.project_name || '';

    // ✅ Send email - FROM is SMTP user, TO is developer
    console.log('📧 ========== SENDING EMAIL ==========');
    console.log('📧 FROM (SMTP): subasrimuthumanickam@gmail.com');
    console.log('📧 TO (Developer):', developerEmail);
    console.log('📧 Developer Name:', developerNameFromDB);
    console.log('📧 Task Title:', task.title);
    console.log('📧 Tester Name:', testerName || 'Tester');
    console.log('📧 Tester Email:', testerEmail);
    console.log('📧 Rework Count:', reworkCount);
    console.log('📧 Is New Developer:', isNewDeveloper);
    console.log('📧 ====================================');

    const result = await sendReworkRequestEmail({
      toEmail: developerEmail,                    // ✅ TO: Developer's email
      toName: developerNameFromDB,
      taskTitle: task.title,
      reworkNotes: reworkNotes,
      fromName: testerName || 'Tester',
      fromEmail: testerEmail,                     // ✅ Reply-To: Tester's email
      taskId: String(taskId),
      projectName: projectName,
      reworkCount: reworkCount,
      originalDeveloper: task.developer_name || developerNameFromDB,
      isNewDeveloper: isNewDeveloper
    });

    if (result) {
      console.log(`✅ Email sent successfully to: ${developerEmail}`);
      return res.json({
        success: true,
        message: isNewDeveloper 
          ? `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail}) - New developer auto-registered`
          : `✅ Task sent for rework to ${developerNameFromDB} (${developerEmail})`,
        task: {
          id: task.id,
          title: task.title,
          status: 'todo',
          reworkCount: reworkCount
        },
        developer: {
          id: developerId,
          name: developerNameFromDB,
          email: developerEmail,
          isNew: isNewDeveloper
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email to developer'
      });
    }
  } catch (error: any) {
    console.error('❌ Error in rework endpoint:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to process rework request'
    });
  }
});
// Get tasks with rework
router.get('/rework/list', async (req, res) => {
  try {
    db.all(
      `SELECT t.*, 
              u.name as developer_name, 
              u.email as developer_email,
              p.name as project_name
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       LEFT JOIN projects p ON t.project_id = p.id
       WHERE t.rework_count > 0 
       ORDER BY t.rework_count DESC, t.updated_at DESC`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error fetching rework tasks:', err);
          return res.status(500).json({ error: 'Failed to fetch rework tasks' });
        }
        res.json({ success: true, tasks: rows });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch rework tasks' });
  }
});

export default router;