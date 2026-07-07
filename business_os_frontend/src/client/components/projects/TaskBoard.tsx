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
  XCircle,
  Mail,
  Send
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: number;
  assigned_by: number;
  project_id: number;
  due_date: string;
  estimated_hours: number;
  logged_hours: number;
  tags: string;
  created_at?: string;
  updated_at?: string;
  rework_count?: number;
  testing_notes?: string;
  developer_notes?: string;
  developer_name?: string;
}

interface Developer {
  id: number;
  name: string;
  email: string;
  role?: string;
  department?: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<number>(1); // Default project

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReworkModal, setShowReworkModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form States
  const [createFormData, setCreateFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    estimated_hours: 0,
    tags: '',
    assigned_to: ''
  });

  const [assignFormData, setAssignFormData] = useState({
    assigned_to: ''
  });

  const [reworkNotes, setReworkNotes] = useState('');

  // Load tasks and developers on mount
  useEffect(() => {
    loadTasks();
    loadDevelopers();
  }, [projectId]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks/project/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDevelopers = async () => {
    try {
      const response = await fetch('/api/hrms/employees');
      if (response.ok) {
        const data = await response.json();
        setDevelopers(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load developers:', error);
    }
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Create Task
  const handleCreateTask = async () => {
    if (!createFormData.title.trim()) {
      alert('Task title is required');
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          title: createFormData.title,
          description: createFormData.description,
          priority: createFormData.priority,
          assigned_to: createFormData.assigned_to || null,
          assigned_by: 1, // Replace with actual user ID
          due_date: createFormData.due_date,
          estimated_hours: createFormData.estimated_hours,
          tags: createFormData.tags.split(',').map(t => t.trim())
        })
      });

      if (response.ok) {
        showSuccess('Task created successfully! Developer notified via email.');
        setCreateFormData({
          title: '',
          description: '',
          priority: 'medium',
          due_date: '',
          estimated_hours: 0,
          tags: '',
          assigned_to: ''
        });
        setShowCreateModal(false);
        loadTasks();
      }
    } catch (error) {
      alert('Failed to create task');
      console.error(error);
    }
  };

  // Assign Task to Developer
  const handleAssignTask = async () => {
    if (!selectedTask || !assignFormData.assigned_to) {
      alert('Please select a developer');
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_to: parseInt(assignFormData.assigned_to),
          assigned_by: 1 // Replace with actual user ID
        })
      });

      if (response.ok) {
        showSuccess('Task assigned! Developer notified via email.');
        setShowAssignModal(false);
        loadTasks();
      }
    } catch (error) {
      alert('Failed to assign task');
      console.error(error);
    }
  };

  // Update Task Status
  const handleStatusChange = async (task: Task, newStatus: string) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          updated_by: 1 // Replace with actual user ID
        })
      });

      if (response.ok) {
        showSuccess('Task status updated!');
        loadTasks();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Request Rework
  const handleRequestRework = async () => {
    if (!selectedTask || !reworkNotes.trim()) {
      alert('Please provide rework notes');
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}/rework`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rework_notes: reworkNotes,
          tester_name: 'QA Team', // Replace with actual user name
          tester_id: 1 // Replace with actual user ID
        })
      });

      if (response.ok) {
        showSuccess('Rework request sent! Developer notified via email.');
        setShowReworkModal(false);
        setReworkNotes('');
        loadTasks();
      }
    } catch (error) {
      alert('Failed to request rework');
      console.error(error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showSuccess('Task deleted successfully.');
        loadTasks();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Get filtered tasks
  const getTasksByStatus = (status: string) => {
    let filtered = tasks.filter(task => task.status === status);
    
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }
    
    if (filterAssignee !== 'all') {
      filtered = filtered.filter(task => task.assigned_to === parseInt(filterAssignee));
    }
    
    return filtered;
  };

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

  const getDeveloperName = (developerId: number) => {
    const dev = developers.find(d => d.id === developerId);
    return dev ? dev.name : 'Unassigned';
  };

  const getDeveloperInitials = (developerId: number) => {
    const dev = developers.find(d => d.id === developerId);
    if (!dev) return 'U';
    return dev.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const columns = [
    { id: 'todo', title: 'To Do', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
    { id: 'in-progress', title: 'In Progress', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'review', title: 'Review', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { id: 'done', title: 'Done', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <select
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Developers</option>
            {developers.map(dev => (
              <option key={dev.id} value={dev.id}>
                {dev.name}
              </option>
            ))}
          </select>
          <button
            onClick={loadTasks}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map(column => (
          <div key={column.id} className={`${column.bgColor} rounded-lg border ${column.borderColor} min-h-96`}>
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
              <h2 className="font-bold text-gray-700">
                {column.title} ({getTasksByStatus(column.id).length})
              </h2>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto max-h-96">
              {getTasksByStatus(column.id).map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Task Header */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm text-gray-800 flex-1">
                      {task.title}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        setSelectedTask(task);
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Description */}
                  {task.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  {/* Priority Badge */}
                  <div className="mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>

                  {/* Assigned Developer */}
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {getDeveloperName(task.assigned_to)}
                    </span>
                  </div>

                  {/* Due Date */}
                  {task.due_date && (
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  {task.tags && (
                    <div className="flex gap-1 mb-3 flex-wrap">
                      {task.tags.split(',').map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    {column.id !== 'done' && (
                      <button
                        onClick={() => handleStatusChange(task, 'done')}
                        className="flex-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 py-1 rounded flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Done
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setShowAssignModal(true);
                      }}
                      className="flex-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 rounded flex items-center justify-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Assign
                    </button>
                    {column.id === 'review' && (
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowReworkModal(true);
                        }}
                        className="flex-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1 rounded flex items-center justify-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        Rework
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="flex-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 py-1 rounded flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No tasks in this column</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={createFormData.title}
                onChange={(e) => setCreateFormData({...createFormData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea
                placeholder="Description"
                value={createFormData.description}
                onChange={(e) => setCreateFormData({...createFormData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />

              <select
                value={createFormData.priority}
                onChange={(e) => setCreateFormData({...createFormData, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>

              <select
                value={createFormData.assigned_to}
                onChange={(e) => setCreateFormData({...createFormData, assigned_to: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Assign To Developer (Optional)</option>
                {developers.map(dev => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name} ({dev.email})
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={createFormData.due_date}
                onChange={(e) => setCreateFormData({...createFormData, due_date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Estimated Hours"
                value={createFormData.estimated_hours || ''}
                onChange={(e) => setCreateFormData({...createFormData, estimated_hours: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={createFormData.tags}
                onChange={(e) => setCreateFormData({...createFormData, tags: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setCreateFormData({
                    title: '',
                    description: '',
                    priority: 'medium',
                    due_date: '',
                    estimated_hours: 0,
                    tags: '',
                    assigned_to: ''
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Task Modal */}
      {showAssignModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign Task</h2>
            <p className="text-gray-600 mb-4">Task: <strong>{selectedTask.title}</strong></p>
            
            <select
              value={assignFormData.assigned_to}
              onChange={(e) => setAssignFormData({assigned_to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="">Select Developer</option>
              {developers.map(dev => (
                <option key={dev.id} value={dev.id}>
                  {dev.name} ({dev.email})
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignFormData({assigned_to: ''});
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTask}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Assign & Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rework Modal */}
      {showReworkModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Request Rework</h2>
            <p className="text-gray-600 mb-4">Task: <strong>{selectedTask.title}</strong></p>
            
            <textarea
              placeholder="Rework notes and feedback..."
              value={reworkNotes}
              onChange={(e) => setReworkNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReworkModal(false);
                  setReworkNotes('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestRework}
                className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Send Rework
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
