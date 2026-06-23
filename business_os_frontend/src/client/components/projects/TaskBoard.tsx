// src/client/components/projects/TaskBoard.tsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle,
  Circle,
  AlertCircle,
  Calendar,
  X,
  Tag,
  Users,
  ChevronDown,
  Filter,
  Search,
  RefreshCw,
  Save,
  User,
  ArrowLeft,
  DollarSign,
  Briefcase,
  LayoutDashboard
} from 'lucide-react';

interface Subtask {
  title: string;
  completed: boolean;
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
  projectName: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  attachments: number;
  subtasks: Subtask[];
}

// ==================== ADD TASK PAGE ====================
interface AddTaskPageProps {
  onBack: () => void;
  onSave: (taskData: any) => void;
  projectName?: string;
}

const AddTaskPage: React.FC<AddTaskPageProps> = ({ onBack, onSave, projectName }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in-progress' | 'review' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    assignee: '',
    dueDate: '',
    estimatedHours: 0,
    tags: '',
    projectName: projectName || '',
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
    const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    setTimeout(() => {
      onSave({
        ...formData,
        tags: tagsArray,
        loggedHours: 0,
        comments: 0,
        attachments: 0,
        subtasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header with Back button */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Task</h1>
              <p className="text-sm text-gray-500">
                {projectName ? `Create a new task for ${projectName}` : 'Create a new task for your project'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card - Centered */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'}`} 
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
                rows={3} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.assignee ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Assignee</option>
                  <option value="Patricia Boyle">Patricia Boyle</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Michael Johnson">Michael Johnson</option>
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? 'border-red-300' : 'border-gray-300'}`} 
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.estimatedHours ? 'border-red-300' : 'border-gray-300'}`} 
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
                  placeholder="Design, Backend (comma separated)" 
                />
              </div>
            </div>
          </div>

          {/* Buttons - Below the form */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button 
              onClick={onBack} 
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={isSaving} 
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== EDIT TASK PAGE ====================
interface EditTaskPageProps {
  task: Task;
  onBack: () => void;
  onSave: (taskData: any) => void;
}

const EditTaskPage: React.FC<EditTaskPageProps> = ({ task, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate,
    estimatedHours: task.estimatedHours,
    tags: task.tags.join(', '),
    projectName: task.projectName,
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
    const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    setTimeout(() => {
      onSave({
        ...formData,
        id: task.id,
        tags: tagsArray,
      });
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header with Back button */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
              <p className="text-sm text-gray-500">Update task details</p>
            </div>
          </div>
        </div>

        {/* Form Card - Centered */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'}`} 
                placeholder="Enter task title" 
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={4} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter task description" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee <span className="text-red-500">*</span>
                </label>
                <select 
                  name="assignee" 
                  value={formData.assignee} 
                  onChange={handleChange} 
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.assignee ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Assignee</option>
                  <option value="Patricia Boyle">Patricia Boyle</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? 'border-red-300' : 'border-gray-300'}`} 
                />
                {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>

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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${errors.estimatedHours ? 'border-red-300' : 'border-gray-300'}`} 
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" 
                  placeholder="Design, Backend (comma separated)" 
                />
              </div>
            </div>
          </div>

          {/* Buttons - Below the form */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button 
              onClick={onBack} 
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={isSaving} 
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN TASK BOARD COMPONENT ====================
const TaskBoard: React.FC = () => {
  const loadTasksFromStorage = (): Task[] => {
    try {
      const stored = localStorage.getItem('taskBoardTasks');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
    }
    return [];
  };

  const defaultTasks: Task[] = [
    {
      id: '1',
      title: 'Design Homepage',
      description: 'Create wireframes and design for the homepage with responsive layout',
      status: 'todo',
      priority: 'high',
      assignee: 'Patricia Boyle',
      dueDate: '2024-06-15',
      estimatedHours: 8,
      loggedHours: 0,
      tags: ['Design', 'UI/UX'],
      projectName: 'Web Designing',
      createdAt: '2024-06-01T10:00:00Z',
      updatedAt: '2024-06-01T10:00:00Z',
      comments: 3,
      attachments: 2,
      subtasks: [
        { title: 'Create wireframes', completed: false },
        { title: 'Design mockups', completed: false },
        { title: 'Get feedback', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Develop API Integration',
      description: 'Integrate REST API for customer data with authentication',
      status: 'in-progress',
      priority: 'urgent',
      assignee: 'John Doe',
      dueDate: '2024-06-10',
      estimatedHours: 12,
      loggedHours: 5,
      tags: ['Backend', 'API'],
      projectName: 'Design contract for Mr. Bruce',
      createdAt: '2024-06-02T09:00:00Z',
      updatedAt: '2024-06-05T14:30:00Z',
      comments: 5,
      attachments: 1,
      subtasks: [
        { title: 'Setup API endpoints', completed: true },
        { title: 'Implement authentication', completed: true },
        { title: 'Test integration', completed: false }
      ]
    },
    {
      id: '3',
      title: 'User Testing',
      description: 'Conduct user testing sessions with target audience',
      status: 'review',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2024-06-20',
      estimatedHours: 6,
      loggedHours: 3,
      tags: ['Testing', 'QA'],
      projectName: 'Web app designing',
      createdAt: '2024-06-03T11:00:00Z',
      updatedAt: '2024-06-06T16:20:00Z',
      comments: 8,
      attachments: 4,
      subtasks: [
        { title: 'Prepare test cases', completed: true },
        { title: 'Conduct sessions', completed: true },
        { title: 'Compile results', completed: false }
      ]
    },
    {
      id: '4',
      title: 'Finalize Branding',
      description: 'Complete logo and brand guidelines document',
      status: 'done',
      priority: 'low',
      assignee: 'Patricia Boyle',
      dueDate: '2024-06-05',
      estimatedHours: 4,
      loggedHours: 4,
      tags: ['Design', 'Branding'],
      projectName: 'Design project for MR.X',
      createdAt: '2024-05-28T08:00:00Z',
      updatedAt: '2024-06-05T18:00:00Z',
      comments: 2,
      attachments: 6,
      subtasks: [
        { title: 'Create logo variations', completed: true },
        { title: 'Finalize brand colors', completed: true },
        { title: 'Create guidelines', completed: true }
      ]
    },
    {
      id: '5',
      title: 'Database Optimization',
      description: 'Optimize queries and database structure for performance',
      status: 'todo',
      priority: 'medium',
      assignee: 'John Doe',
      dueDate: '2024-06-25',
      estimatedHours: 10,
      loggedHours: 0,
      tags: ['Backend', 'Database'],
      projectName: 'Design project for Bruce',
      createdAt: '2024-06-04T13:00:00Z',
      updatedAt: '2024-06-04T13:00:00Z',
      comments: 1,
      attachments: 0,
      subtasks: [
        { title: 'Analyze current queries', completed: false },
        { title: 'Implement indexes', completed: false },
        { title: 'Performance testing', completed: false }
      ]
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasksFromStorage();
    return stored.length > 0 ? stored : defaultTasks;
  });

  const [showAddTaskPage, setShowAddTaskPage] = useState(false);
  const [showEditTaskPage, setShowEditTaskPage] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem('taskBoardTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to storage:', error);
    }
  }, [tasks]);

  const columns = [
    { id: 'todo', title: 'To Do', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', headerColor: 'text-gray-700' },
    { id: 'in-progress', title: 'In Progress', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', headerColor: 'text-blue-700' },
    { id: 'review', title: 'Review', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', headerColor: 'text-yellow-700' },
    { id: 'done', title: 'Done', bgColor: 'bg-green-50', borderColor: 'border-green-200', headerColor: 'text-green-700' }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'done': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTasksByStatus = (status: string) => {
    let filtered = tasks.filter(task => task.status === status);
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }
    if (filterAssignee !== 'all') {
      filtered = filtered.filter(task => task.assignee === filterAssignee);
    }
    return filtered;
  };

  const handleAddTask = (taskData: any) => {
    const newTask: Task = {
      id: String(Date.now()),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      priority: taskData.priority,
      assignee: taskData.assignee,
      dueDate: taskData.dueDate,
      estimatedHours: taskData.estimatedHours,
      loggedHours: 0,
      tags: taskData.tags || [],
      projectName: taskData.projectName || 'Unassigned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: 0,
      attachments: 0,
      subtasks: []
    };
    setTasks(prev => [...prev, newTask]);
    setShowAddTaskPage(false);
  };

  const handleEditTask = (taskData: any) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskData.id ? {
        ...task,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        assignee: taskData.assignee,
        dueDate: taskData.dueDate,
        estimatedHours: taskData.estimatedHours,
        tags: taskData.tags,
        updatedAt: new Date().toISOString()
      } : task
    );
    setTasks(updatedTasks);
    setShowEditTaskPage(false);
    setEditingTask(null);
  };

  const openEditPage = (task: Task) => {
    setEditingTask(task);
    setShowEditTaskPage(true);
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  const getAssigneeColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
    return colors[name.length % colors.length];
  };

  const getProgress = (task: Task) => {
    if (task.estimatedHours === 0) return 0;
    return Math.round((task.loggedHours / task.estimatedHours) * 100);
  };

  const getUniqueAssignees = () => {
    const assignees = tasks.map(task => task.assignee);
    return ['all', ...new Set(assignees)];
  };

  const handleDragStart = (task: Task) => setDraggedTask(task);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedTask) {
      moveTask(draggedTask.id, status as Task['status']);
      setDraggedTask(null);
    }
  };

  // If Edit Task page is shown
  if (showEditTaskPage && editingTask) {
    return (
      <EditTaskPage
        task={editingTask}
        onBack={() => { setShowEditTaskPage(false); setEditingTask(null); }}
        onSave={handleEditTask}
      />
    );
  }

  // If Add Task page is shown
  if (showAddTaskPage) {
    return <AddTaskPage onBack={() => setShowAddTaskPage(false)} onSave={handleAddTask} projectName="Design contract for Mr. Bruce" />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-blue-600" />
            Task Board
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage and track tasks across your projects</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (tasks.length > 0) {
                openEditPage(tasks[0]);
              } else {
                alert('No tasks to edit. Please add a task first.');
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm shadow-sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => setShowAddTaskPage(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center text-sm shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
            <Users className="w-4 h-4 mr-1" />
            <span>{tasks.length} Total</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
            >
              <option value="all">All Assignees</option>
              {getUniqueAssignees().filter(a => a !== 'all').map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
          </div>
          <button
            onClick={() => { setSearchTerm(''); setFilterPriority('all'); setFilterAssignee('all'); }}
            className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center transition whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Reset
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.id);
          return (
            <div
              key={column.id}
              className={`${column.bgColor} rounded-[30px] p-4 min-h-[400px] border ${column.borderColor}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-sm ${column.headerColor}`}>{column.title}</h3>
                  <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    {columnTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowAddTaskPage(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    <Circle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No tasks</p>
                    <button onClick={() => setShowAddTaskPage(true)} className="mt-2 text-xs text-purple-600 hover:text-purple-700">
                      + Add Task
                    </button>
                  </div>
                ) : (
                  columnTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white rounded-[30px] shadow-sm p-4 hover:shadow-md transition border border-gray-100 cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={() => handleDragStart(task)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <div className="mt-0.5 flex-shrink-0">{getStatusIcon(task.status)}</div>
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{task.title}</h4>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
                          <button 
                            onClick={() => openEditPage(task)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition" 
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteTask(task.id)} className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>

                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)} font-medium`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center border border-gray-200">
                          <Tag className="w-2.5 h-2.5 mr-0.5" />
                          <span className="truncate max-w-[60px]">{task.projectName}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className={`w-5 h-5 rounded-full ${getAssigneeColor(task.assignee)} text-white flex items-center justify-center text-[8px] font-medium flex-shrink-0`}>
                            {getInitials(task.assignee)}
                          </div>
                          <span className="text-gray-600 truncate max-w-[60px] text-xs">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[10px]">{task.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] text-gray-500">{task.loggedHours}h / {task.estimatedHours}h</span>
                        </div>
                        <div className="w-12 bg-gray-200 rounded-full h-1">
                          <div className="bg-blue-500 h-1 rounded-full transition-all" style={{ width: `${getProgress(task)}%` }} />
                        </div>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {task.tags.map((tag, index) => (
                            <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] rounded border border-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100 pt-2">
                        <span>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks</span>
                        <span>{task.comments} comments</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => setShowAddTaskPage(true)}
                className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
              >
                + Add Task
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;