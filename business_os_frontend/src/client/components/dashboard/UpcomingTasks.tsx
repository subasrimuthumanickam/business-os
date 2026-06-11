 import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const formatDueDate = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days left`;
  };

  const getPriorityClass = (priority: string) => {
    return `priority-${priority}`;
  };

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompleted(newCompleted);
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Upcoming Tasks</h3>
        <button className="view-all">View All</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={completed.has(task.id)}
              onChange={() => toggleTask(task.id)}
            />
            <div className="task-content">
              <div className="task-title" style={{
                textDecoration: completed.has(task.id) ? 'line-through' : 'none',
                opacity: completed.has(task.id) ? 0.6 : 1
              }}>
                {task.title}
              </div>
              <div className={`task-due ${formatDueDate(task.dueDate) === 'Due Today' ? 'urgent' : ''}`}>
                {formatDueDate(task.dueDate)}
              </div>
            </div>
            <div className={`task-priority ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
