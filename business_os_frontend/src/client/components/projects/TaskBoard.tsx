import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignedTo: string;
  assignedToName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate: string;
  createdAt: string;
  attachments: number;
  comments: number;
}

interface Column {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  icon: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [teamMembers, setTeamMembers] = useState<{ id: string; name: string }[]>([]);

  const columns: Column[] = [
    { id: 'todo', title: 'To Do', status: 'todo', color: '#6b7280', icon: '📋' },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress', color: '#3b82f6', icon: '🔄' },
    { id: 'review', title: 'Review', status: 'review', color: '#f59e0b', icon: '👀' },
    { id: 'done', title: 'Done', status: 'done', color: '#10b981', icon: '✅' },
  ];

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
  });

  // Fetch data (dynamic)
  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchTeamMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || data);
      } else {
        setMockTasks();
      }
    } catch (error) {
      setMockTasks();
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects/list', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || data);
      } else {
        setProjects([
          { id: '1', name: 'E-commerce Website' },
          { id: '2', name: 'Mobile App Development' },
        ]);
      }
    } catch (error) {
      setProjects([
        { id: '1', name: 'E-commerce Website' },
        { id: '2', name: 'Mobile App Development' },
      ]);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team/members', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.data || data);
      } else {
        setTeamMembers([
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Smith' },
          { id: '3', name: 'Mike Johnson' },
        ]);
      }
    } catch (error) {
      setTeamMembers([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Mike Johnson' },
      ]);
    }
  };

  const setMockTasks = () => {
    setTasks([
      {
        id: '1', title: 'Design Database Schema', description: 'Create ER diagram for the e-commerce platform',
        projectId: '1', projectName: 'E-commerce Website', assignedTo: '1', assignedToName: 'John Doe',
        priority: 'high', status: 'todo', dueDate: '2024-01-25', createdAt: '2024-01-15', attachments: 2, comments: 3
      },
      {
        id: '2', title: 'API Development', description: 'Build REST APIs for user authentication',
        projectId: '1', projectName: 'E-commerce Website', assignedTo: '1', assignedToName: 'John Doe',
        priority: 'high', status: 'in_progress', dueDate: '2024-01-28', createdAt: '2024-01-16', attachments: 1, comments: 5
      },
      {
        id: '3', title: 'Frontend UI Setup', description: 'Setup React with TypeScript and Tailwind',
        projectId: '1', projectName: 'E-commerce Website', assignedTo: '2', assignedToName: 'Jane Smith',
        priority: 'medium', status: 'todo', dueDate: '2024-01-30', createdAt: '2024-01-17', attachments: 0, comments: 2
      },
      {
        id: '4', title: 'Testing and QA', description: 'Write unit tests and integration tests',
        projectId: '2', projectName: 'Mobile App', assignedTo: '3', assignedToName: 'Mike Johnson',
        priority: 'low', status: 'review', dueDate: '2024-02-01', createdAt: '2024-01-14', attachments: 3, comments: 7
      },
      {
        id: '5', title: 'Deployment Setup', description: 'Configure CI/CD pipeline',
        projectId: '2', projectName: 'Mobile App', assignedTo: '1', assignedToName: 'John Doe',
        priority: 'medium', status: 'done', dueDate: '2024-01-20', createdAt: '2024-01-10', attachments: 1, comments: 4
      },
    ]);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setDragOverColumn(null);
    // Optional: Save to API
    saveTaskStatus(taskId, newStatus);
  };

  const saveTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error('Failed to save status:', error);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskData: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      projectId: newTask.projectId,
      projectName: projects.find(p => p.id === newTask.projectId)?.name || '',
      assignedTo: newTask.assignedTo,
      assignedToName: teamMembers.find(m => m.id === newTask.assignedTo)?.name || '',
      priority: newTask.priority,
      status: 'todo',
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().slice(0, 10),
      attachments: 0,
      comments: 0,
    };
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newTaskData)
      });
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data.data || data]);
      } else {
        setTasks([...tasks, newTaskData]);
      }
    } catch (error) {
      setTasks([...tasks, newTaskData]);
    }
    
    setShowNewTaskModal(false);
    setNewTask({ title: '', description: '', projectId: '', assignedTo: '', priority: 'medium', dueDate: '' });
    alert('Task created successfully!');
  };

  if (loading) {
    return <div className="loading">Loading task board...</div>;
  }

  return (
    <div className="task-board">
      <div className="board-header">
        <h2>Task Board</h2>
        <button className="btn-primary" onClick={() => setShowNewTaskModal(true)}>
          + New Task
        </button>
      </div>

      <div className="board-columns">
        {columns.map(column => (
          <div
            key={column.id}
            className={`board-column ${dragOverColumn === column.id ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <div className="column-header" style={{ borderTopColor: column.color }}>
              <span className="column-icon">{column.icon}</span>
              <h3>{column.title}</h3>
              <span className="task-count">{tasks.filter(t => t.status === column.status).length}</span>
            </div>
            <div className="task-list">
              {tasks
                .filter(task => task.status === column.status)
                .map(task => (
                  <div
                    key={task.id}
                    className="task-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onClick={() => { setSelectedTask(task); setShowTaskModal(true); }}
                  >
                    <div className="task-header">
                      <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                        {getPriorityIcon(task.priority)} {task.priority}
                      </span>
                      <span className="task-project">{task.projectName}</span>
                    </div>
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description.substring(0, 60)}...</p>
                    <div className="task-footer">
                      <div className="task-assignee">
                        <span className="assignee-avatar">{task.assignedToName.charAt(0)}</span>
                        <span>{task.assignedToName}</span>
                      </div>
                      <div className="task-meta">
                        <span>📎 {task.attachments}</span>
                        <span>💬 {task.comments}</span>
                        <span>📅 {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              {tasks.filter(t => t.status === column.status).length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedTask.title}</h3>
              <button className="close-btn" onClick={() => setShowTaskModal(false)}>×</button>
            </div>
            <div className="task-detail">
              <div className="detail-row"><label>Project:</label><span>{selectedTask.projectName}</span></div>
              <div className="detail-row"><label>Assigned To:</label><span>{selectedTask.assignedToName}</span></div>
              <div className="detail-row"><label>Priority:</label><span className={`priority-badge ${selectedTask.priority}`}>{selectedTask.priority}</span></div>
              <div className="detail-row"><label>Due Date:</label><span>{selectedTask.dueDate}</span></div>
              <div className="detail-row"><label>Description:</label><p>{selectedTask.description}</p></div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowTaskModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="modal-overlay" onClick={() => setShowNewTaskModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button className="close-btn" onClick={() => setShowNewTaskModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Task Title *</label>
                <input type="text" required value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea rows={3} required value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Project *</label>
                  <select required value={newTask.projectId} onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign To *</label>
                  <select required value={newTask.assignedTo} onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}>
                    <option value="">Select Member</option>
                    {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority *</label>
                  <select required value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input type="date" required value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowNewTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;