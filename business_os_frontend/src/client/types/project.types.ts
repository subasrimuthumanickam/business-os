// src/client/types/project.types.ts
export interface Project {
  id: string;
  customerName: string;
  projectName: string;
  billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
  rate: number | null;
  status: 'active' | 'inactive' | 'completed';
  loggedHours: string;
  budget: number | null;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  status?: 'active' | 'inactive' | 'completed';
  customerId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProjectFormData {
  projectName: string;
  description?: string;
  customerName: string;
  billingMethod: 'Based on Task Hours' | 'Based on Project Hours' | 'Fixed Cost for Project' | 'Based on Staff Hours';
  ratePerHour?: number;
  costBudget?: number;
  revenueBudget?: number;
  budgetHours?: string;
  startDate?: string;
  endDate?: string;
  enableClientApproval?: boolean;
  addBudget?: boolean;
  budgetType?: string;
  totalBudgetHours?: string;
  users?: { name: string; email: string; rate: string }[];
  tasks?: { name: string; description: string; rate: string }[];
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  inactiveProjects: number;
  totalHoursLogged: string;
  totalRevenue: string;
  averageCompletionRate: number;
  projectsByCustomer: { customer: string; count: number }[];
  recentActivity: {
    id: string;
    type: 'created' | 'updated' | 'completed' | 'time_logged';
    projectName: string;
    user: string;
    time: string;
  }[];
}

// Task related types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  tags: string[];
  projectName: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  attachments: number;
  subtasks: { title: string; completed: boolean }[];
}

export interface TaskFilters {
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  projectId?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  estimatedHours?: number;
  tags?: string[];
  projectName?: string;
  projectId?: string;
}

// Time Entry types
export interface TimeEntry {
  id: string;
  projectName: string;
  projectId: string;
  taskName: string;
  taskId: string;
  date: string;
  timeSpent: number;
  notes: string;
  billable: boolean;
  user: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntryFilters {
  projectId?: string;
  taskId?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  billable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TimeEntryListResponse {
  entries: TimeEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Project Member types
export interface ProjectMember {
  userId: string;
  name: string;
  email: string;
  role: 'project_manager' | 'developer' | 'designer' | 'tester' | 'viewer';
  joinedAt: string;
  ratePerHour?: number;
  assignedTasks?: string[];
}

export type ProjectMemberRole = 'project_manager' | 'developer' | 'designer' | 'tester' | 'viewer';

export type ViewMode = 'list' | 'card';
export type TabType = 'projects' | 'taskboard' | 'timetracker';
export type ViewState = 'list' | 'detail' | 'edit';