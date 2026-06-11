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
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'todo', title: 'To Do', status: 'todo', color: '#6b7280' },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress', color: '#3b82f6' },
    { id: 'review', title: 'Review', status: 'review', color: '#f59e0b' },
    { id: 'done', title: 'Done', status: 'done', color: '#10b981' },
  ];

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
  });

  useEffect(() => {
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1', title: 'Design Database Schema', description: 'Create ER diagram', projectId: '1', projectName: 'E-commerce Website',
          assignedTo: '1', assignedToName: 'John Doe', priority: 'high', status: 'todo', dueDate: '2024-01-25', createdAt: '2024-01-15', attachments: 2, comments: 3
        },
        {
          id: '2', title: 'API Development', description: 'Build REST APIs', projectId: '1', projectName: 'E-commerce Website',
          assignedTo: '1', assignedToName: 'John Doe', priority: 'high', status: 'in_progress', dueDate: '2024-01-28', createdAt: '2024-01-16', attachments: 1, comments: 5
        },
        {
          id: '3', title: 'Frontend UI Setup', description: 'Setup React', projectId: '1', projectName: 'E-commerce Website',
          assignedTo: '2', assignedToName: 'Jane Smith', priority: 'medium', status: 'todo', dueDate: '2024-01-30', createdAt: '2024-01-17', attachments: 0, comments: 2
        },
        {
          id: '4', title: 'Testing and QA', description: 'Write unit tests', projectId: '2', projectName: 'Mobile App',
          assignedTo: '3', assignedToName: 'Mike Johnson', priority: 'low', status: 'review', dueDate: '2024-02-01', createdAt: '2024-01-14', attachments: 3, comments: 7
        },
        {
          id: '5', title: 'Deployment Setup', description: 'Configure CI/CD', projectId: '2', projectName: 'Mobile App',
          assignedTo: '1', assignedToName: 'John Doe', priority: 'medium', status: 'done', dueDate: '2024-01-20', createdAt: '2024-01-10', attachments: 1, comments: 4
        },
      ];
      setTasks(mockTasks);
      setLoading(false);
    }, 500);
  }, []);

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

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      projectId: newTask.projectId,
      projectName: newTask.projectId === '1' ? 'E-commerce Website' : 'Mobile App',
      assignedTo: newTask.assignedTo,
      assignedToName: newTask.assignedTo === '1' ? 'John Doe' : 'Jane Smith',
      priority: newTask.priority,
      status: 'todo',
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().slice(0, 10),
      attachments: 0,
      comments: 0,
    };
    setTasks([...tasks, task]);
    setShowNewTaskModal(false);
    setNewTask({ title: '', description: '', projectId: '', assignedTo: '', priority: 'medium', dueDate: '' });
    alert('Task created successfully!');
  };

  if (loading) {
    return <div className="loading">Loading task board...</div>;
  }

  return (
    <div className="task-board">
      <div className="list-header">
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
              <div className="detail-section">
                <label>Project:</label>
                <p>{selectedTask.projectName}</p>
              </div>
              <div className="detail-section">
                <label>Assigned To:</label>
                <p>{selectedTask.assignedToName}</p>
              </div>
              <div className="detail-section">
                <label>Priority:</label>
                <p className={`task-priority ${getPriorityClass(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </p>
              </div>
              <div className="detail-section">
                <label>Due Date:</label>
                <p>{selectedTask.dueDate}</p>
              </div>
              <div className="detail-section">
                <label>Description:</label>
                <p>{selectedTask.description}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowTaskModal(false)}>Close</button>
              <button className="btn-primary">Edit Task</button>
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
                    <option value="1">E-commerce Website</option>
                    <option value="2">Mobile App</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign To *</label>
                  <select required value={newTask.assignedTo} onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}>
                    <option value="">Select Employee</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                    <option value="3">Mike Johnson</option>
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