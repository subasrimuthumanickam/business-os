import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for SMTP
// @ts-ignore - nodemailer types not available
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || ''
  }
});

// Verify connection
transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server ready for sending emails');
  }
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send task assignment email to developer
 */
export const sendTaskAssignmentEmail = async (
  developerEmail: string,
  developerName: string,
  taskTitle: string,
  taskDescription: string,
  priority: string,
  dueDate: string,
  projectName: string,
  assignedBy: string
): Promise<boolean> => {
  const priorityColor = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    urgent: '#dc2626'
  }[priority] || '#6b7280';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #1f2937; }
          .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; }
          .task-info { margin: 20px 0; }
          .task-info-item { margin: 10px 0; }
          .label { font-weight: bold; color: #374151; }
          .priority-badge { display: inline-block; padding: 5px 10px; background-color: ${priorityColor}; color: white; border-radius: 3px; font-weight: bold; }
          .cta-button { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📋 New Task Assignment</h2>
          </div>
          <div class="content">
            <p>Hi ${developerName},</p>
            <p>You have been assigned a new task. Please review the details below:</p>
            
            <div class="task-info">
              <div class="task-info-item">
                <span class="label">Task Title:</span> ${taskTitle}
              </div>
              <div class="task-info-item">
                <span class="label">Project:</span> ${projectName}
              </div>
              <div class="task-info-item">
                <span class="label">Priority:</span> <span class="priority-badge">${priority.toUpperCase()}</span>
              </div>
              <div class="task-info-item">
                <span class="label">Due Date:</span> ${new Date(dueDate).toLocaleDateString()}
              </div>
              <div class="task-info-item">
                <span class="label">Assigned By:</span> ${assignedBy}
              </div>
              <div class="task-info-item">
                <span class="label">Description:</span> <p>${taskDescription}</p>
              </div>
            </div>

            <p>Please log in to the system to view more details and start working on this task.</p>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply to this email address.</p>
              <p>&copy; 2024 Business OS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@business-os.com',
      to: developerEmail,
      subject: `[${priority.toUpperCase()}] New Task: ${taskTitle}`,
      html: htmlContent
    });

    console.log('Task assignment email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending task assignment email:', error);
    return false;
  }
};

/**
 * Send task status update email
 */
export const sendTaskStatusUpdateEmail = async (
  developerEmail: string,
  developerName: string,
  taskTitle: string,
  newStatus: string,
  updatedBy: string
): Promise<boolean> => {
  const statusMessages = {
    'todo': 'returned to To Do',
    'in-progress': 'moved to In Progress',
    'review': 'moved to Review',
    'done': 'marked as Done'
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #1f2937; }
          .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📊 Task Status Update</h2>
          </div>
          <div class="content">
            <p>Hi ${developerName},</p>
            <p>The task "<strong>${taskTitle}</strong>" has been ${statusMessages[newStatus as keyof typeof statusMessages] || newStatus}.</p>
            <p>Updated by: ${updatedBy}</p>
            <p>Please log in to the system for more details.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@business-os.com',
      to: developerEmail,
      subject: `Task Update: ${taskTitle} - ${newStatus}`,
      html: htmlContent
    });

    return true;
  } catch (error) {
    console.error('Error sending status update email:', error);
    return false;
  }
};

/**
 * Send rework request email
 */
export const sendReworkRequestEmail = async (
  developerEmail: string,
  developerName: string,
  taskTitle: string,
  reworkNotes: string,
  testerName: string
): Promise<boolean> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #fef3c7; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #f59e0b; }
          .header h2 { margin: 0; color: #92400e; }
          .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; }
          .notes { background-color: #fef3c7; padding: 15px; border-left: 3px solid #f59e0b; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>⚠️ Rework Request</h2>
          </div>
          <div class="content">
            <p>Hi ${developerName},</p>
            <p>The task "<strong>${taskTitle}</strong>" requires rework and has been returned to you for further development.</p>
            <p>Reported by: ${testerName}</p>
            
            <div class="notes">
              <strong>Feedback:</strong>
              <p>${reworkNotes}</p>
            </div>

            <p>Please address these issues and update the task status when ready for re-testing.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@business-os.com',
      to: developerEmail,
      subject: `REWORK REQUIRED: ${taskTitle}`,
      html: htmlContent
    });

    return true;
  } catch (error) {
    console.error('Error sending rework request email:', error);
    return false;
  }
};

export default transporter;
