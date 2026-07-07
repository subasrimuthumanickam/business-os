# TaskBoard Task Assignment & Email Notification System - Setup Guide

## Overview
The TaskBoard has been reworked to support:
- ✅ Task assignment to developers
- ✅ SMTP email notifications
- ✅ Task status tracking (todo, in-progress, review, done)
- ✅ Rework request flow with email notifications
- ✅ Developer management from employee database

## Backend Setup

### 1. Environment Variables
Create a `.env` file in the backend directory (`d:\business-os\business_os_backend\`) with the following variables:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=business_os

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@yourdomain.com

# JWT
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Database Setup
Create the following database table for tasks:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT,
  status ENUM('todo', 'in-progress', 'review', 'done') DEFAULT 'todo',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  assigned_to INT,
  assigned_by INT,
  due_date DATE,
  estimated_hours DECIMAL(10, 2),
  logged_hours DECIMAL(10, 2) DEFAULT 0,
  tags VARCHAR(500),
  rework_count INT DEFAULT 0,
  testing_notes LONGTEXT,
  developer_notes LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES hrms_employees(id) ON DELETE SET NULL,
  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
);
```

### 3. Gmail SMTP Configuration (Recommended)
1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated 16-character password as `SMTP_PASSWORD` in .env

### 4. Files Created/Modified

**Backend Files:**
- `src/models/taskModel.ts` - Task database operations
- `src/services/emailService.ts` - SMTP email notifications
- `src/controllers/task.controller.ts` - Task API endpoints
- `src/routes/task.routes.ts` - Task API routes
- `src/server.ts` - Updated with task routes registration

**Frontend Files:**
- `src/client/components/projects/TaskBoard.tsx` - Complete task board UI with assignment

## API Endpoints

### Task Management
- `POST /api/tasks` - Create new task
- `GET /api/tasks/project/:projectId` - Get tasks for a project
- `GET /api/tasks/:taskId` - Get single task details
- `GET /api/tasks/developer/:developerId` - Get tasks assigned to developer
- `PUT /api/tasks/:taskId` - Update task details
- `PATCH /api/tasks/:taskId/status` - Update task status
- `PATCH /api/tasks/:taskId/assign` - Assign task to developer (sends email)
- `POST /api/tasks/:taskId/rework` - Request rework (sends email to developer)
- `DELETE /api/tasks/:taskId` - Delete task

## Frontend Features

### TaskBoard Component Features:
1. **Create Task Modal**
   - Title, description, priority, due date, estimated hours
   - Assign to developer from dropdown
   - Add tags (comma-separated)
   - Automatic email notification to assigned developer

2. **Task Cards Display:**
   - Priority badges with color coding
   - Assigned developer name and avatar
   - Due date display
   - Task tags
   - Status progress

3. **Task Actions:**
   - **Done Button** - Mark task as complete (sends status email)
   - **Assign Button** - Reassign to different developer (sends email)
   - **Rework Button** - Request rework with notes (sends email)
   - **Delete Button** - Remove task

4. **Filters & Search:**
   - Search by task title/description
   - Filter by priority (low, medium, high, urgent)
   - Filter by assigned developer
   - Refresh button to reload tasks

## Email Templates

### 1. Task Assignment Email
Sent when a task is assigned to a developer with:
- Task title and description
- Priority level with color coding
- Due date
- Project information
- Assigned by information

### 2. Task Status Update Email
Sent when task status changes with:
- Task title
- New status
- Updated by information

### 3. Rework Request Email
Sent when testing fails with:
- Task title
- Rework feedback and notes
- Tester name
- Action required

## Testing the System

1. **Start Backend:**
   ```bash
   npm run dev
   ```

2. **Create a Task:**
   - Click "New Task"
   - Fill in task details
   - Select developer from dropdown
   - Click "Create Task" (email sent automatically)

3. **Assign a Task:**
   - Click "Assign" on any task card
   - Select new developer
   - Click "Assign & Email" (notification sent)

4. **Request Rework:**
   - Move task to "Review" column
   - Click "Rework" button
   - Add feedback notes
   - Click "Send Rework" (email sent to developer)

## Troubleshooting

### Email Not Sending
1. Check SMTP credentials in .env
2. Verify Gmail App Password is correct (16 characters, no spaces)
3. Check backend console for connection errors
4. Ensure firewall allows port 587

### Database Errors
1. Verify tasks table exists
2. Check foreign key relationships
3. Ensure employee IDs are valid

### API Errors
1. Verify task routes are registered in server.ts
2. Check request body format matches API expectations
3. Ensure project_id is valid

## Future Enhancements

- [ ] Drag & drop task reordering
- [ ] Task comments system
- [ ] Time tracking/logging
- [ ] File attachments
- [ ] Task notifications dashboard
- [ ] Email digest/summary
- [ ] SMS notifications
- [ ] Task templates
- [ ] Recurring tasks
- [ ] Task dependencies

## Notes

- The frontend uses hardcoded user IDs (1) for assigned_by. Update these with actual logged-in user IDs.
- Email sending is asynchronous and non-blocking
- Rework count automatically increments when requesting rework
- All timestamps use UTC
- Task status follows linear progression: todo → in-progress → review → done
