// 
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
  Tag,
  Users,
  ChevronDown,
  Search,
  RefreshCw,
  Bug,
  ArrowRight,
  Play,
  XCircle
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
  // ✅ New fields for developer/tester workflow
  isBug?: boolean;
  bugReportedBy?: string;
  bugAssignedTo?: string;
  reworkCount?: number;
  testingNotes?: string;
  developerNotes?: string;
}

// Column order - defines forward-only progression
const COLUMN_ORDER = ['todo', 'in-progress', 'review', 'done'];

// Column display names
const COLUMN_NAMES: Record<string, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done'
};

// Get next column (forward only)
const getNextColumn = (currentColumn: string): string | null => {
  const currentIndex = COLUMN_ORDER.indexOf(currentColumn);
  if (currentIndex === -1 || currentIndex === COLUMN_ORDER.length - 1) {
    return null;
  }
  return COLUMN_ORDER[currentIndex + 1];
};

// Check if move is allowed (forward only) - SILENT PREVENTION
const isMoveAllowed = (source: string, destination: string): boolean => {
  const sourceIndex = COLUMN_ORDER.indexOf(source);
  const destIndex = COLUMN_ORDER.indexOf(destination);
  return destIndex > sourceIndex;
};

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
      title: 'Design Homepage 1',
      description: 'Create wireframes and design for the homepage with responsive layout',
      status: 'todo',
      priority: 'high',
      assignee: 'Patricia B.',
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
      ],
      isBug: false,
      reworkCount: 0
    },
    {
      id: '2',
      title: 'testing',
      description: 'testing',
      status: 'todo',
      priority: 'medium',
      assignee: 'Patricia B.',
      dueDate: '2024-06-03',
      estimatedHours: 8,
      loggedHours: 0,
      tags: ['test'],
      projectName: 'Design cont...',
      createdAt: '2024-06-02T09:00:00Z',
      updatedAt: '2024-06-02T09:00:00Z',
      comments: 0,
      attachments: 0,
      subtasks: [],
      isBug: false,
      reworkCount: 0
    },
    {
      id: '3',
      title: 'Develop API Integration',
      description: 'Integrate REST API for customer data with authentication',
      status: 'done',
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
      ],
      isBug: false,
      reworkCount: 0
    },
    {
      id: '4',
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
      ],
      isBug: false,
      reworkCount: 0
    },
    {
      id: '5',
      title: 'Database Optimization',
      description: 'Optimize queries and database structure for performance',
      status: 'review',
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
      ],
      isBug: false,
      reworkCount: 0
    },
    {
      id: '6',
      title: 'Finalize Branding',
      description: 'Complete logo and brand guidelines document',
      status: 'review',
      priority: 'low',
      assignee: 'Patricia B.',
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
      ],
      isBug: false,
      reworkCount: 0
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasksFromStorage();
    return stored.length > 0 ? stored : defaultTasks;
  });

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  // ✅ New state for modals
  const [showBugReportModal, setShowBugReportModal] = useState(false);
  const [bugReport, setBugReport] = useState({
    taskId: '',
    title: '',
    description: '',
    assignee: '',
    priority: 'high' as 'low' | 'medium' | 'high' | 'urgent'
  });
  const [showReworkModal, setShowReworkModal] = useState(false);
  const [reworkTask, setReworkTask] = useState<Task | null>(null);
  const [reworkNotes, setReworkNotes] = useState('');

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

  // ✅ Move task to next status (Developer workflow)
  const handleMoveTask = (taskId: string, direction: 'forward' | 'backward') => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const statusOrder: Task['status'][] = ['todo', 'in-progress', 'review', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    
    let newStatus: Task['status'];
    if (direction === 'forward') {
      if (currentIndex < statusOrder.length - 1) {
        newStatus = statusOrder[currentIndex + 1];
      } else {
        return;
      }
    } else {
      if (currentIndex > 0) {
        newStatus = statusOrder[currentIndex - 1];
      } else {
        return;
      }
    }

    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return t;
    });

    setTasks(updatedTasks);
  };

  // ✅ Report a bug (Tester -> Developer)
  const handleReportBug = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setBugReport({
      taskId: taskId,
      title: `[BUG] ${task.title}`,
      description: `Bug found in task: ${task.title}\n\nOriginal Description: ${task.description}\n\nPlease fix the following issues:\n`,
      assignee: task.assignee,
      priority: 'high'
    });
    setShowBugReportModal(true);
  };

  const handleSubmitBugReport = () => {
    const originalTask = tasks.find(t => t.id === bugReport.taskId);
    if (!originalTask) return;

    const newBugTask: Task = {
      id: `bug-${Date.now()}`,
      title: bugReport.title,
      description: bugReport.description + `\n\n**Bug reported by:** ${originalTask.assignee}\n**Original task:** ${originalTask.title}`,
      status: 'todo',
      priority: bugReport.priority,
      assignee: bugReport.assignee,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedHours: originalTask.estimatedHours || 4,
      loggedHours: 0,
      tags: ['Bug', ...(originalTask.tags || [])],
      projectName: originalTask.projectName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: 0,
      attachments: 0,
      subtasks: [],
      isBug: true,
      bugReportedBy: originalTask.assignee,
      bugAssignedTo: bugReport.assignee,
      reworkCount: (originalTask.reworkCount || 0) + 1,
      testingNotes: bugReport.description
    };

    setTasks([newBugTask, ...tasks]);
    setShowBugReportModal(false);
    setBugReport({
      taskId: '',
      title: '',
      description: '',
      assignee: '',
      priority: 'high'
    });
  };

  // ✅ Rework task (Tester sends back to Developer)
  const handleReworkTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setReworkTask(task);
    setReworkNotes('');
    setShowReworkModal(true);
  };

  const handleSubmitRework = () => {
    if (!reworkTask) return;

    const updatedTasks = tasks.map(t => {
      if (t.id === reworkTask.id) {
        return {
          ...t,
          status: 'todo' as Task['status'],
          reworkCount: (t.reworkCount || 0) + 1,
          testingNotes: reworkNotes || 'Needs rework. Please fix the issues.',
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    setTasks(updatedTasks);
    setShowReworkModal(false);
    setReworkTask(null);
    setReworkNotes('');
  };

  // Handle drag start
  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  // Handle drag over - allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ✅ Handle drop with forward-only validation - NO ALERT
  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;
    
    // ✅ Check if move is allowed (forward only) - SILENT PREVENTION
    if (!isMoveAllowed(draggedTask.status, targetStatus)) {
      setDraggedTask(null);
      return;
    }
    
    // If dropping in the same column, do nothing
    if (draggedTask.status === targetStatus) {
      setDraggedTask(null);
      return;
    }
    
    // Move the task forward
    const updatedTasks = tasks.map(task =>
      task.id === draggedTask.id ? { ...task, status: targetStatus as Task['status'], updatedAt: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  // Handle drag end - clean up
  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <div className="bg-gray-50">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-sm focus:ring-2 focus:ring-purple-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-sm focus:ring-2 focus:ring-purple-500"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
            >
              <option value="all">All Assignees</option>
              {getUniqueAssignees().filter(a => a !== 'all').map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-gray-500 pointer-events-none" />
          </div>
          <button
            onClick={() => { setSearchTerm(''); setFilterPriority('all'); setFilterAssignee('all'); }}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center transition whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.id);
          const isDropAllowed = draggedTask && isMoveAllowed(draggedTask.status, column.id);
          
          return (
            <div
              key={column.id}
              className={`${column.bgColor} rounded-[30px] p-3 min-h-[350px] border ${column.borderColor} transition-colors ${
                isDropAllowed ? 'ring-2 ring-blue-400 ring-offset-2' : ''
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-sm ${column.headerColor}`}>{column.title}</h3>
                  <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    <Circle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No tasks</p>
                    {isDropAllowed && (
                      <p className="text-[10px] text-blue-400 mt-1">Drop here to move forward</p>
                    )}
                  </div>
                ) : (
                  columnTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white rounded-[30px] shadow-sm p-3 hover:shadow-md transition border border-gray-100 cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <div className="mt-0.5 flex-shrink-0">{getStatusIcon(task.status)}</div>
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{task.title}</h4>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
                          <button 
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
                        {/* ✅ Bug badge */}
                        {task.isBug && (
                          <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full flex items-center border border-red-200">
                            <Bug className="w-2.5 h-2.5 mr-0.5" /> Bug
                          </span>
                        )}
                        {/* ✅ Rework count badge */}
                        {task.reworkCount && task.reworkCount > 0 && (
                          <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full flex items-center border border-orange-200">
                            <RefreshCw className="w-2.5 h-2.5 mr-0.5" /> {task.reworkCount}
                          </span>
                        )}
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

                      {/* ✅ Action buttons for developer/tester workflow */}
                      {task.status === 'todo' && (
                        <div className="mt-2 flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTask(task.id, 'forward');
                            }}
                            className="flex-1 text-[10px] px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition flex items-center justify-center gap-1"
                          >
                            <Play className="w-2.5 h-2.5" /> Start Work
                          </button>
                        </div>
                      )}

                      {task.status === 'in-progress' && (
                        <div className="mt-2 flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTask(task.id, 'forward');
                            }}
                            className="flex-1 text-[10px] px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition flex items-center justify-center gap-1"
                          >
                            <ArrowRight className="w-2.5 h-2.5" /> Move to Review
                          </button>
                        </div>
                      )}

                      {task.status === 'review' && (
                        <div className="mt-2 flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReworkTask(task.id);
                            }}
                            className="flex-1 text-[10px] px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition flex items-center justify-center gap-1"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Rework
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReportBug(task.id);
                            }}
                            className="flex-1 text-[10px] px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition flex items-center justify-center gap-1"
                          >
                            <Bug className="w-2.5 h-2.5" /> Bug
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTask(task.id, 'forward');
                            }}
                            className="flex-1 text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition flex items-center justify-center gap-1"
                          >
                            <CheckCircle className="w-2.5 h-2.5" /> Approve
                          </button>
                        </div>
                      )}

                      {task.status === 'done' && task.isBug && (
                        <div className="mt-2 text-[10px] text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Bug fixed by {task.assignee}
                        </div>
                      )}

                      {/* Forward indicator - shows next column */}
                      {task.status !== 'done' && !task.isBug && (
                        <div className="mt-2 text-[10px] text-blue-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Drag to {COLUMN_NAMES[getNextColumn(task.status) || '']}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <button
                className="mt-3 w-full py-1.5 text-sm text-gray-500 hover:text-gray-700 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
              >
                + Add Task
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ Bug Report Modal - NEW */}
      {showBugReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-red-600">
                <Bug className="w-5 h-5" /> Report Bug
              </h3>
              <button onClick={() => setShowBugReportModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bug Title *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={bugReport.title}
                  onChange={(e) => setBugReport({ ...bugReport, title: e.target.value })}
                  placeholder="Enter bug title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bug Description *</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={5}
                  value={bugReport.description}
                  onChange={(e) => setBugReport({ ...bugReport, description: e.target.value })}
                  placeholder="Describe the bug in detail..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Developer *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={bugReport.assignee}
                    onChange={(e) => setBugReport({ ...bugReport, assignee: e.target.value })}
                    placeholder="Developer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={bugReport.priority}
                    onChange={(e) => setBugReport({ ...bugReport, priority: e.target.value as Task['priority'] })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
              <button 
                onClick={() => setShowBugReportModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitBugReport} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Report Bug
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Rework Modal - NEW */}
      {showReworkModal && reworkTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-600">
                <RefreshCw className="w-5 h-5" /> Send for Rework
              </h3>
              <button onClick={() => setShowReworkModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Task: {reworkTask.title}</p>
                <p className="text-xs text-gray-500 mt-1">Assignee: {reworkTask.assignee}</p>
                <p className="text-xs text-gray-500">Status: In Review → To Do</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rework Notes *</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={4}
                  value={reworkNotes}
                  onChange={(e) => setReworkNotes(e.target.value)}
                  placeholder="Describe what needs to be fixed or improved..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
              <button 
                onClick={() => setShowReworkModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitRework} 
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition"
              >
                Send for Rework
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;