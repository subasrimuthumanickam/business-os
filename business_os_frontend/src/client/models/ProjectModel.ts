 export interface TaskItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  completedAt?: string;
  createdAt: string;
}

export interface ProjectMember {
  userId: string;
  userName: string;
  role: 'project_manager' | 'team_lead' | 'developer' | 'tester' | 'viewer';
  joinedAt: string;
}

export interface ProjectModel {
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
  costIncurred: number;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  projectManager: string;
  projectManagerName: string;
  members: ProjectMember[];
  tasks: TaskItem[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export const ProjectModel = {
  // Create new project
  create: (data: Partial<ProjectModel>): ProjectModel => {
    const now = new Date().toISOString();
    return {
      id: Date.now().toString(),
      projectCode: `PRJ-${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      clientId: data.clientId || '',
      clientName: data.clientName || '',
      startDate: data.startDate || now.split('T')[0],
      endDate: data.endDate || '',
      deadline: data.deadline || '',
      budget: data.budget || 0,
      costIncurred: data.costIncurred || 0,
      status: data.status || 'planning',
      priority: data.priority || 'medium',
      progress: data.progress || 0,
      projectManager: data.projectManager || '',
      projectManagerName: data.projectManagerName || '',
      members: data.members || [],
      tasks: data.tasks || [],
      attachments: data.attachments || [],
      createdAt: now,
      updatedAt: now,
    };
  },

  // Calculate project progress
  calculateProgress: (tasks: TaskItem[]): number => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / tasks.length) * 100);
  },

  // Update project progress
  updateProgress: (project: ProjectModel): ProjectModel => {
    const progress = ProjectModel.calculateProgress(project.tasks);
    const allTasksDone = project.tasks.length > 0 && project.tasks.every(task => task.status === 'done');
    const status = allTasksDone ? 'completed' : project.status;
    
    return {
      ...project,
      progress,
      status: status as ProjectModel['status'],
      updatedAt: new Date().toISOString(),
    };
  },

  // Add task to project
  addTask: (project: ProjectModel, task: Partial<TaskItem>): ProjectModel => {
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: task.title || '',
      description: task.description || '',
      assignedTo: task.assignedTo || '',
      assignedToName: task.assignedToName || '',
      priority: task.priority || 'medium',
      status: task.status || 'todo',
      estimatedHours: task.estimatedHours || 0,
      actualHours: task.actualHours || 0,
      dueDate: task.dueDate || '',
      createdAt: new Date().toISOString(),
    };
    
    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask],
      updatedAt: new Date().toISOString(),
    };
    
    return ProjectModel.updateProgress(updatedProject);
  },

  // Update task status
  updateTaskStatus: (project: ProjectModel, taskId: string, newStatus: TaskItem['status'], actualHours?: number): ProjectModel => {
    const updatedTasks = project.tasks.map(task => {
      if (task.id === taskId) {
        const updated: TaskItem = {
          ...task,
          status: newStatus,
          actualHours: actualHours || task.actualHours,
          completedAt: newStatus === 'done' ? new Date().toISOString() : task.completedAt,
        };
        return updated;
      }
      return task;
    });
    
    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      updatedAt: new Date().toISOString(),
    };
    
    return ProjectModel.updateProgress(updatedProject);
  },

  // Add member to project
  addMember: (project: ProjectModel, member: ProjectMember): ProjectModel => {
    const memberExists = project.members.some(m => m.userId === member.userId);
    if (memberExists) return project;
    
    return {
      ...project,
      members: [...project.members, member],
      updatedAt: new Date().toISOString(),
    };
  },

  // Remove member from project
  removeMember: (project: ProjectModel, userId: string): ProjectModel => {
    return {
      ...project,
      members: project.members.filter(m => m.userId !== userId),
      updatedAt: new Date().toISOString(),
    };
  },

  // Calculate project cost
  calculateCost: (project: ProjectModel): number => {
    // Calculate total hours spent * average rate
    const totalHours = project.tasks.reduce((sum, task) => sum + task.actualHours, 0);
    const averageRate = 500; // ₹500 per hour assumed
    return totalHours * averageRate;
  },

  // Check if project is overdue
  isOverdue: (project: ProjectModel): boolean => {
    if (project.status === 'completed' || project.status === 'cancelled') {
      return false;
    }
    const today = new Date();
    const deadline = new Date(project.deadline);
    return deadline < today;
  },

  // Get project summary
  getSummary: (projects: ProjectModel[]) => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const onHoldProjects = projects.filter(p => p.status === 'on_hold').length;
    const planningProjects = projects.filter(p => p.status === 'planning').length;
    const overdueProjects = projects.filter(p => ProjectModel.isOverdue(p)).length;
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalCost = projects.reduce((sum, p) => sum + p.costIncurred, 0);
    const avgProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
      : 0;
    
    return {
      totalProjects,
      activeProjects,
      completedProjects,
      onHoldProjects,
      planningProjects,
      overdueProjects,
      totalBudget,
      totalCost,
      avgProgress,
    };
  },

  // Get tasks by status
  getTasksByStatus: (project: ProjectModel) => {
    return {
      todo: project.tasks.filter(t => t.status === 'todo'),
      inProgress: project.tasks.filter(t => t.status === 'in_progress'),
      review: project.tasks.filter(t => t.status === 'review'),
      done: project.tasks.filter(t => t.status === 'done'),
    };
  },

  // Get tasks by priority
  getTasksByPriority: (project: ProjectModel) => {
    return {
      high: project.tasks.filter(t => t.priority === 'high'),
      medium: project.tasks.filter(t => t.priority === 'medium'),
      low: project.tasks.filter(t => t.priority === 'low'),
    };
  },

  // Format project code
  formatProjectCode: (number: number): string => {
    return `PRJ-${String(number).padStart(3, '0')}`;
  },
};

export default ProjectModel;
export {};  // Required for isolatedModules
