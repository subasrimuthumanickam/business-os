// src/client/components/projects/ProjectDetail.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit,
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  MoreVertical,
  Calendar,
  Tag,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Activity,
  ClipboardList,
  User,
  Building,
  Trash2,
  ChevronDown
} from 'lucide-react';
import ProjectEdit from './ProjectEdit';

// ==================== TYPES ====================
interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

interface Task {
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
}

interface ProjectDetailData {
  id: string;
  customerName: string;
  projectName: string;
  description: string;
  billingMethod: string;
  rate: number;
  status: 'active' | 'inactive' | 'completed';
  loggedHours: string;
  budget: number;
  revenue: number;
  startDate: string;
  endDate: string;
  teamMembers: TeamMember[];
  tasks: Task[];
  recentActivity: { type: string; description: string; time: string; user: string }[];
}

// ==================== ADD TASK PAGE (Separate Page) ====================
interface AddTaskPageProps {
  projectId: string;
  projectName: string;
  teamMembers: TeamMember[];
  onBack: () => void;
  onSave: (taskData: any) => void;
}

const AddTaskPage: React.FC<AddTaskPageProps> = ({ 
  projectId, 
  projectName, 
  teamMembers, 
  onBack, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in-progress' | 'review' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    assignee: '',
    dueDate: '',
    estimatedHours: 0,
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    // Validate
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.assignee) newErrors.assignee = 'Please select an assignee';
    if (!formData.dueDate) newErrors.dueDate = 'Please select a due date';
    if (formData.estimatedHours <= 0) newErrors.estimatedHours = 'Estimated hours must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    // Convert tags string to array
    const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    // Simulate API call
    setTimeout(() => {
      onSave({
        ...formData,
        tags: tagsArray,
        loggedHours: 0,
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Task</h1>
            <p className="text-sm text-gray-500">Create a new task for {projectName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? 'Saving...' : 'Add Task'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
        <div className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Assignee & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignee <span className="text-red-500">*</span>
              </label>
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.assignee ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Assignee</option>
                {teamMembers.map((member, index) => (
                  <option key={index} value={member.name}>{member.name}</option>
                ))}
              </select>
              {errors.assignee && <p className="text-xs text-red-500 mt-1">{errors.assignee}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.dueDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
            </div>
          </div>

          {/* Estimated Hours & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.estimatedHours ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                step="0.5"
              />
              {errors.estimatedHours && <p className="text-xs text-red-500 mt-1">{errors.estimatedHours}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Design, Backend, Testing (comma separated)"
              />
              <p className="text-xs text-gray-400 mt-0.5">Separate tags with commas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN PROJECT DETAIL COMPONENT ====================
const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const [showEditPage, setShowEditPage] = useState(false);
  const [showAddTaskPage, setShowAddTaskPage] = useState(false);

  // Sample project data based on projectId
  const getProjectData = (id: string): ProjectDetailData => {
    const projects: { [key: string]: ProjectDetailData } = {
      '1': {
        id: '1',
        customerName: 'Bruce Wayne',
        projectName: 'Design contract for Mr. Bruce',
        description: 'Complete UI/UX design for Wayne Enterprises',
        billingMethod: 'Based on Task Hours',
        rate: 45.00,
        status: 'active',
        loggedHours: '106:41',
        budget: 5000,
        revenue: 4500,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        teamMembers: [
          { name: 'Patricia Boyle', role: 'Lead Designer', email: 'patricia@example.com', phone: '+1 555-1111' },
          { name: 'John Doe', role: 'Developer', email: 'john@example.com', phone: '+1 555-2222' },
          { name: 'Jane Smith', role: 'Tester', email: 'jane@example.com', phone: '+1 555-3333' }
        ],
        tasks: [
          { id: '1', title: 'Design Homepage', description: 'Create homepage design', status: 'done', priority: 'high', assignee: 'Patricia Boyle', dueDate: '2024-06-15', estimatedHours: 8, loggedHours: 8, tags: ['Design', 'UI/UX'] },
          { id: '2', title: 'Develop API Integration', description: 'Integrate REST API', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', dueDate: '2024-06-10', estimatedHours: 12, loggedHours: 5, tags: ['Backend', 'API'] },
          { id: '3', title: 'User Testing', description: 'Conduct user testing', status: 'review', priority: 'medium', assignee: 'Jane Smith', dueDate: '2024-06-20', estimatedHours: 6, loggedHours: 3, tags: ['Testing', 'QA'] },
          { id: '4', title: 'Database Optimization', description: 'Optimize queries', status: 'todo', priority: 'medium', assignee: 'John Doe', dueDate: '2024-06-25', estimatedHours: 10, loggedHours: 0, tags: ['Backend', 'Database'] }
        ],
        recentActivity: [
          { type: 'task', description: 'Task completed: Design Homepage', time: '2 hours ago', user: 'Patricia Boyle' },
          { type: 'time', description: 'Logged 4 hours on Development', time: '4 hours ago', user: 'John Doe' },
          { type: 'comment', description: 'Commented on: User Testing', time: '1 day ago', user: 'Jane Smith' }
        ]
      },
      '2': {
        id: '2',
        customerName: 'Bruce Wayne',
        projectName: 'Design project for Bruce',
        description: 'Redesign of corporate website',
        billingMethod: 'Based on Task Hours',
        rate: 45.00,
        status: 'active',
        loggedHours: '35:28',
        budget: 3000,
        revenue: 2500,
        startDate: '2024-02-01',
        endDate: '2024-07-15',
        teamMembers: [
          { name: 'Patricia Boyle', role: 'Designer', email: 'patricia@example.com', phone: '+1 555-1111' },
          { name: 'John Doe', role: 'Developer', email: 'john@example.com', phone: '+1 555-2222' }
        ],
        tasks: [
          { id: '5', title: 'Homepage Redesign', description: 'Redesign homepage', status: 'in-progress', priority: 'high', assignee: 'Patricia Boyle', dueDate: '2024-07-01', estimatedHours: 6, loggedHours: 2, tags: ['Design'] },
          { id: '6', title: 'Content Migration', description: 'Migrate content', status: 'todo', priority: 'medium', assignee: 'John Doe', dueDate: '2024-07-10', estimatedHours: 4, loggedHours: 0, tags: ['Content'] }
        ],
        recentActivity: [
          { type: 'task', description: 'Task started: Homepage Redesign', time: '1 day ago', user: 'Patricia Boyle' }
        ]
      }
    };
    return projects[id] || projects['1'];
  };

  const [project, setProject] = useState<ProjectDetailData>(getProjectData(projectId));

  // Handle Add Task
  const handleAddTask = (taskData: any) => {
    const validStatuses = ['todo', 'in-progress', 'review', 'done'] as const;
    const status = validStatuses.includes(taskData.status) ? taskData.status : 'todo';
    
    const newTask: Task = {
      id: String(Date.now()),
      title: taskData.title,
      description: taskData.description,
      status: status,
      priority: taskData.priority,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate,
      estimatedHours: taskData.estimatedHours,
      loggedHours: 0,
      tags: taskData.tags,
    };
    
    setProject({
      ...project,
      tasks: [...project.tasks, newTask],
      recentActivity: [
        { type: 'task', description: `New task added: ${taskData.title}`, time: 'Just now', user: 'System' },
        ...project.recentActivity
      ]
    });
    setShowAddTaskPage(false);
  };

  // If Add Task page is shown
  if (showAddTaskPage) {
    return (
      <AddTaskPage
        projectId={projectId}
        projectName={project.projectName}
        teamMembers={project.teamMembers}
        onBack={() => setShowAddTaskPage(false)}
        onSave={handleAddTask}
      />
    );
  }

  // If Edit page is shown
  if (showEditPage) {
    return (
      <ProjectEdit 
        projectId={projectId}
        projectName={project.projectName}
        onBack={() => setShowEditPage(false)}
        onSave={() => {
          setShowEditPage(false);
        }}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch(status) {
      case 'done': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'todo': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
    return colors[name.length % colors.length];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-sm text-gray-500">Customer: {project.customerName}</span>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(project.status)} flex items-center gap-1`}>
                {getStatusIcon(project.status)}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Edit button */}
          <button 
            onClick={() => setShowEditPage(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-xs transition"
          >
            <Edit className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </button>
          {/* Add Task button - Opens separate page */}
          <button 
            onClick={() => setShowAddTaskPage(true)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center text-xs transition"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Task
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center text-xs transition">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Total Hours</div>
              <div className="text-2xl font-bold text-blue-600">{project.loggedHours}</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Budget</div>
              <div className="text-2xl font-bold text-green-600">${project.budget.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Revenue</div>
              <div className="text-2xl font-bold text-purple-600">${project.revenue.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Team Members</div>
              <div className="text-2xl font-bold text-indigo-600">{project.teamMembers.length}</div>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Project Description</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-gray-500">Billing Method</div>
                <div className="text-sm font-medium text-gray-800">{project.billingMethod}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Rate Per Hour</div>
                <div className="text-sm font-medium text-gray-800">${project.rate.toFixed(2)}/hr</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Start Date</div>
                <div className="text-sm font-medium text-gray-800">{project.startDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">End Date</div>
                <div className="text-sm font-medium text-gray-800">{project.endDate}</div>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-gray-400" />
                Tasks ({project.tasks.length})
              </h3>
              <button 
                onClick={() => setShowAddTaskPage(true)}
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Task
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {project.tasks.map((task) => (
                <div key={task.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      task.status === 'done' ? 'bg-green-500' : 
                      task.status === 'in-progress' ? 'bg-blue-500' : 
                      task.status === 'review' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{task.title}</div>
                      <div className="text-xs text-gray-500">Assignee: {task.assignee}</div>
                      {task.tags.length > 0 && (
                        <div className="flex gap-1 mt-0.5">
                          {task.tags.map((tag, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${getTaskStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className="text-xs text-gray-400">{task.dueDate}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{task.loggedHours}h / {task.estimatedHours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Information</h3>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${getRandomColor(project.customerName)} text-white flex items-center justify-center text-lg font-bold`}>
                {getInitials(project.customerName)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{project.customerName}</div>
                <div className="text-xs text-gray-500">Customer</div>
              </div>
            </div>
            <button className="mt-3 w-full py-1.5 text-xs text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
              View Customer Details
            </button>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              Team Members ({project.teamMembers.length})
            </h3>
            <div className="space-y-3">
              {project.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getRandomColor(member.name)} text-white flex items-center justify-center text-xs font-medium flex-shrink-0`}>
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                      {member.email && <div className="text-[10px] text-gray-400">{member.email}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {project.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-medium flex-shrink-0">
                    {getInitials(activity.user)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-700">{activity.description}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{activity.time} by {activity.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;