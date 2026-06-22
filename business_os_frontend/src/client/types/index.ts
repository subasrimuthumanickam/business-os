// types/index.ts

// Export all types from individual type files
export * from './customer.types';
export * from './Inventory.types';
export * from './invoice.types';
export * from './employee.types';
// export * from './hrm'; // Commented out - file doesn't exist

// Import from project.types and re-export with proper types
export type {
  Project,
  ProjectFilters,
  ProjectListResponse,
  // ProjectFormData,
  // ProjectStats,
  // TaskFilters,
  // TaskListResponse,
  // TaskFormData,
  // TimeEntry,
  // TimeEntryFilters,
  // TimeEntryListResponse,
  // ProjectMember,
  // ProjectMemberRole,
} from './project.types';

export * from './dashboard.types';

// Define missing types here since they're not in project.types
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
}

// Time Entry types
export interface TimeEntry {
  id: string;
  projectName: string;
  taskName: string;
  date: string;
  timeSpent: number;
  notes: string;
  billable: boolean;
  user: string;
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

// Common/Shared Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: string[];
  statusCode?: number;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  alternativePhone?: string;
}

export interface TaxInfo {
  gstin?: string;
  pan?: string;
  tin?: string;
  vatNumber?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
  tenantId: string;
  isActive: boolean;
  lastLoginAt?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  description: string;
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'manage')[];
}

export interface Tenant {
  id: string;
  companyName: string;
  companyLogo?: string;
  planId: string;
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended';
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  usersCount: number;
  maxUsers: number;
  modules: string[];
  settings: TenantSettings;
  createdAt: string;
  updatedAt: string;
}

export interface TenantSettings {
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  language: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  features: string[];
  maxUsers: number;
  maxStorage: number;
  modules: string[];
  isActive: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Component State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view' | 'delete';
  data?: any;
}

export interface TableState {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  filters: Record<string, any>;
  selectedIds: string[];
}

export interface FormState<T = any> {
  data: T;
  errors: Record<keyof T, string>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    fill?: boolean;
  }[];
}

export interface StatCard {
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
}

export interface ReportData {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'revenue' | 'inventory' | 'employee' | 'project' | 'custom';
  generatedAt: string;
  format: 'pdf' | 'excel' | 'csv';
  url: string;
  filters?: Record<string, any>;
}

// Task type - defined here to avoid duplication
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  tags: string[];
  projectName: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  attachments: number;
  subtasks: { title: string; completed: boolean }[];
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type SortOrder = 'asc' | 'desc';
export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'draft' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// This makes it a module
export default {};