import React, { useState, useEffect } from 'react';

interface TimeEntry {
  id: string;
  taskId: string;
  taskName: string;
  projectId: string;
  projectName: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  description: string;
  billable: boolean;
}

interface TaskSummary {
  taskId: string;
  taskName: string;
  totalHours: number;
  billableHours: number;
}

const TimeTracker: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [tasks, setTasks] = useState<{ id: string; name: string; projectId: string; projectName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedUser, setSelectedUser] = useState('all');
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  const [newEntry, setNewEntry] = useState({
    taskId: '',
    description: '',
    hours: 1,
    billable: true,
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    fetchTimeEntries();
    fetchTasks();
    fetchUsers();
  }, [selectedDate, selectedUser]);

  const fetchTimeEntries = async () => {
    try {
      const response = await fetch(`/api/time-entries?date=${selectedDate}&user=${selectedUser}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTimeEntries(data.data || data);
      } else {
        setMockEntries();
      }
    } catch (error) {
      setMockEntries();
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks/list', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || data);
      } else {
        setTasks([
          { id: '1', name: 'Design Database Schema', projectId: '1', projectName: 'E-commerce Website' },
          { id: '2', name: 'API Development', projectId: '1', projectName: 'E-commerce Website' },
          { id: '3', name: 'Frontend UI Setup', projectId: '1', projectName: 'E-commerce Website' },
        ]);
      }
    } catch (error) {
      setTasks([
        { id: '1', name: 'Design Database Schema', projectId: '1', projectName: 'E-commerce Website' },
        { id: '2', name: 'API Development', projectId: '1', projectName: 'E-commerce Website' },
      ]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/team/members', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || data);
      } else {
        setUsers([
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Smith' },
        ]);
      }
    } catch (error) {
      setUsers([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ]);
    }
  };

  const setMockEntries = () => {
    setTimeEntries([
      { id: '1', taskId: '1', taskName: 'Design Database Schema', projectId: '1', projectName: 'E-commerce Website', userId: '1', userName: 'John Doe', date: '2024-06-15', startTime: '09:00', endTime: '12:00', hours: 3, description: 'Database design work', billable: true },
      { id: '2', taskId: '1', taskName: 'Design Database Schema', projectId: '1', projectName: 'E-commerce Website', userId: '1', userName: 'John Doe', date: '2024-06-15', startTime: '13:00', endTime: '17:00', hours: 4, description: 'Continued database design', billable: true },
    ]);
  };

  const filteredEntries = timeEntries;
  const totalHours = filteredEntries.reduce((sum, e) => sum + e.hours, 0);
  const billableHours = filteredEntries.filter(e => e.billable).reduce((sum, e) => sum + e.hours, 0);
  const nonBillableHours = totalHours - billableHours;

  const taskSummary: TaskSummary[] = Object.values(
    filteredEntries.reduce((acc, entry) => {
      if (!acc[entry.taskId]) {
        acc[entry.taskId] = {
          taskId: entry.taskId,
          taskName: entry.taskName,
          totalHours: 0,
          billableHours: 0,
        };
      }
      acc[entry.taskId].totalHours += entry.hours;
      if (entry.billable) acc[entry.taskId].billableHours += entry.hours;
      return acc;
    }, {} as Record<string, TaskSummary>)
  );

  const handleStartTracking = () => {
    const taskId = prompt('Enter Task ID to start tracking:');
    if (taskId) {
      setIsTracking(true);
      setCurrentTask(taskId);
      setStartTime(new Date().toLocaleTimeString());
      alert(`Started tracking task at ${startTime}`);
    }
  };

  const handleStopTracking = () => {
    if (currentTask && startTime) {
      const endTime = new Date().toLocaleTimeString();
      const hours = prompt('Enter total hours worked:', '1');
      if (hours) {
        const newTimeEntry: TimeEntry = {
          id: Date.now().toString(),
          taskId: currentTask,
          taskName: tasks.find(t => t.id === currentTask)?.name || `Task ${currentTask}`,
          projectId: tasks.find(t => t.id === currentTask)?.projectId || '1',
          projectName: tasks.find(t => t.id === currentTask)?.projectName || 'Project',
          userId: '1',
          userName: 'John Doe',
          date: new Date().toISOString().slice(0, 10),
          startTime: startTime,
          endTime: endTime,
          hours: parseFloat(hours),
          description: 'Worked on task',
          billable: true,
        };
        setTimeEntries([...timeEntries, newTimeEntry]);
        alert(`Stopped tracking. Added ${hours} hours.`);
      }
    }
    setIsTracking(false);
    setCurrentTask(null);
    setStartTime(null);
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = tasks.find(t => t.id === newEntry.taskId);
    const entry: TimeEntry = {
      id: Date.now().toString(),
      taskId: newEntry.taskId,
      taskName: task?.name || '',
      projectId: task?.projectId || '',
      projectName: task?.projectName || '',
      userId: '1',
      userName: 'John Doe',
      date: newEntry.date,
      startTime: '09:00',
      endTime: `${9 + newEntry.hours}:00`,
      hours: newEntry.hours,
      description: newEntry.description,
      billable: newEntry.billable,
    };
    
    try {
      const response = await fetch('/api/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(entry)
      });
      if (response.ok) {
        const data = await response.json();
        setTimeEntries([...timeEntries, data.data || data]);
      } else {
        setTimeEntries([...timeEntries, entry]);
      }
    } catch (error) {
      setTimeEntries([...timeEntries, entry]);
    }
    
    setShowModal(false);
    setNewEntry({ taskId: '', description: '', hours: 1, billable: true, date: new Date().toISOString().slice(0, 10) });
    alert('Time entry added!');
  };

  if (loading) {
    return <div className="loading">Loading time tracker...</div>;
  }

  return (
    <div className="time-tracker">
      <div className="tracker-header">
        <h2>Time Tracker</h2>
        <div className="tracker-actions">
          <button className={`btn-track ${isTracking ? 'tracking' : ''}`} onClick={handleStartTracking} disabled={isTracking}>
            {isTracking ? '⏺ Tracking...' : '▶ Start Tracking'}
          </button>
          {isTracking && (
            <button className="btn-stop" onClick={handleStopTracking}>⏹ Stop Tracking</button>
          )}
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Time Entry</button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-label">Total Hours</div>
          <div className="stat-value">{totalHours.toFixed(1)} hrs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Billable</div>
          <div className="stat-value">{billableHours.toFixed(1)} hrs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Non-Billable</div>
          <div className="stat-value">{nonBillableHours.toFixed(1)} hrs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Entries</div>
          <div className="stat-value">{filteredEntries.length}</div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Date:</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Employee:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="all">All Employees</option>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
      </div>

      <div className="task-summary">
        <h3>Task Summary</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Total Hours</th>
              <th>Billable Hours</th>
              <th>Non-Billable</th>
            </tr>
          </thead>
          <tbody>
            {taskSummary.map(task => (
              <tr key={task.taskId}>
                <td>{task.taskName}</td>
                <td>{task.totalHours.toFixed(1)} hrs</td>
                <td>{task.billableHours.toFixed(1)} hrs</td>
                <td>{(task.totalHours - task.billableHours).toFixed(1)} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="time-entries">
        <h3>Time Entries</h3>
        <table className="entries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Project</th>
              <th>Hours</th>
              <th>Billable</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.taskName}</td>
                <td>{entry.projectName}</td>
                <td>{entry.hours} hrs</td>
                <td>{entry.billable ? '✅ Yes' : '❌ No'}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Time Entry</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitEntry}>
              <div className="form-group">
                <label>Task *</label>
                <select required value={newEntry.taskId} onChange={(e) => setNewEntry({...newEntry, taskId: e.target.value})}>
                  <option value="">Select Task</option>
                  {tasks.map(task => <option key={task.id} value={task.id}>{task.name}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={newEntry.date} onChange={(e) => setNewEntry({...newEntry, date: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Hours</label>
                  <input type="number" step="0.5" value={newEntry.hours} onChange={(e) => setNewEntry({...newEntry, hours: parseFloat(e.target.value)})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={2} value={newEntry.description} onChange={(e) => setNewEntry({...newEntry, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={newEntry.billable} onChange={(e) => setNewEntry({...newEntry, billable: e.target.checked})} />
                  Billable (chargeable to client)
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTracker;