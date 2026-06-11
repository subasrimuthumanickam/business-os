 export interface Project {
  id: string;
  projectCode: string;
  name: string;
  description: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string;
  deadline: string;
  budget: number;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  projectManager: string;
  projectManagerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  createdAt: string;
}

export interface ProjectFilters {
  search?: string;
  status?: string;
  clientId?: string;
  page: number;
  limit: number;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  totalPages: number;
}

export {};  // ← ADD THIS LINE
