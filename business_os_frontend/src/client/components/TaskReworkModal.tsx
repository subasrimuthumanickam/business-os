// // frontend/src/client/components/TaskReworkModal.jsx

// import React, { useState, useEffect } from 'react';
// import './TaskReworkModal.css';

// const TaskReworkModal = ({ task, onClose, onSuccess }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedDeveloper, setSelectedDeveloper] = useState('');
//   const [reworkNotes, setReworkNotes] = useState('');
//   const [developers, setDevelopers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [reworkDeadline, setReworkDeadline] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // ✅ Set the developer from the task when modal opens
//   useEffect(() => {
//     if (task && task.developer_name) {
//       setSelectedDeveloper(task.developer_name);
//     }
//   }, [task]);

//   // Fetch current user and developers on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setError('Please login first');
//           return;
//         }

//         // Get current user
//         const userRes = await fetch('http://localhost:5000/api/current-user', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         const userData = await userRes.json();
//         if (userData.success) {
//           setCurrentUser(userData.user);
//           console.log('✅ Current user:', userData.user);
//         }

//         // Get all developers
//         const devRes = await fetch('http://localhost:5000/api/developers', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         const devData = await devRes.json();
//         if (devData.success) {
//           setDevelopers(devData.developers);
//           console.log('✅ Developers loaded:', devData.developers.length);
//         }

//         // Set default deadline (7 days from now)
//         const defaultDeadline = new Date();
//         defaultDeadline.setDate(defaultDeadline.getDate() + 7);
//         setReworkDeadline(defaultDeadline.toISOString().split('T')[0]);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to load data. Please refresh.');
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // Validate inputs
//     if (!selectedDeveloper) {
//       setError('Please select a developer');
//       return;
//     }

//     if (!reworkNotes || reworkNotes.trim() === '') {
//       setError('Please enter rework notes');
//       return;
//     }

//     if (!reworkDeadline) {
//       setError('Please select a rework deadline');
//       return;
//     }

//     if (!currentUser) {
//       setError('User not logged in');
//       return;
//     }

//     setLoading(true);

//     try {
//       // ✅ Send the rework data - backend will handle the developer lookup
//       const reworkData = {
//         developerName: selectedDeveloper,
//         reworkNotes: reworkNotes.trim(),
//         testerName: currentUser.name || 'Tester',
//         testerEmail: currentUser.email,
//         reworkDeadline: reworkDeadline
//       };

//       console.log('📤 Sending rework request:', reworkData);

//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/tasks/${task.id}/rework`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(reworkData)
//       });

//       const data = await response.json();
//       console.log('📥 Response:', data);

//       if (data.success) {
//         setSuccess(`✅ ${data.message}`);
//         setTimeout(() => {
//           if (onSuccess) onSuccess(data);
//           if (onClose) onClose();
//         }, 1500);
//       } else {
//         setError(data.message || 'Failed to send rework request');
//       }
//     } catch (error) {
//       console.error('Error sending rework:', error);
//       setError('Failed to send rework request. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={(e) => {
//       if (e.target === e.currentTarget) onClose();
//     }}>
//       <div className="modal-container">
//         <div className="modal-header">
//           <div className="modal-header-content">
//             <h2>🔄 Send for Rework</h2>
//             <p className="subtitle">Assign the task back to a developer with feedback</p>
//           </div>
//           <button className="close-btn" onClick={onClose}>&times;</button>
//         </div>

//         <div className="modal-body">
//           {/* Task Info */}
//           <div className="task-info">
//             <h3>📋 {task?.title || 'Loading...'}</h3>
//             <div className="task-meta-grid">
//               <div className="meta-item">
//                 <span className="meta-label">Status</span>
//                 <span className={`badge status-${task?.status || 'unknown'}`}>
//                   {task?.status || 'Unknown'}
//                 </span>
//               </div>
//               {task?.project_name && (
//                 <div className="meta-item">
//                   <span className="meta-label">Project</span>
//                   <span className="meta-value">{task.project_name}</span>
//                 </div>
//               )}
//               {task?.rework_count > 0 && (
//                 <div className="meta-item">
//                   <span className="meta-label">Rework Count</span>
//                   <span className="badge rework-badge">🔄 {task.rework_count}</span>
//                 </div>
//               )}
//               {task?.developer_name && (
//                 <div className="meta-item">
//                   <span className="meta-label">Current Developer</span>
//                   <span className="meta-value">{task.developer_name}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Error/Success Messages */}
//           {error && (
//             <div className="error-message">
//               <span className="icon">❌</span> {error}
//             </div>
//           )}
//           {success && (
//             <div className="success-message">
//               <span className="icon">✅</span> {success}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Developer Selection */}
//             <div className="form-group">
//               <label htmlFor="developer">
//                 Assign to Developer *
//                 <span className="helper-text">The task will move to the developer's To Do column</span>
//               </label>
//               <select
//                 id="developer"
//                 value={selectedDeveloper}
//                 onChange={(e) => setSelectedDeveloper(e.target.value)}
//                 required
//                 disabled={loading}
//                 className="form-select"
//               >
//                 <option value="">Select a developer...</option>
//                 {developers.map(dev => (
//                   <option key={dev.id} value={dev.name}>
//                     {dev.name} ({dev.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Rework Deadline */}
//             <div className="form-group">
//               <label htmlFor="deadline">
//                 Rework Deadline *
//                 <span className="helper-text">When should the rework be completed?</span>
//               </label>
//               <input
//                 type="date"
//                 id="deadline"
//                 value={reworkDeadline}
//                 onChange={(e) => setReworkDeadline(e.target.value)}
//                 required
//                 disabled={loading}
//                 min={new Date().toISOString().split('T')[0]}
//                 className="form-input"
//               />
//             </div>

//             {/* Rework Notes */}
//             <div className="form-group">
//               <label htmlFor="notes">
//                 Rework Notes *
//                 <span className="helper-text">These notes will be visible to the developer</span>
//               </label>
//               <textarea
//                 id="notes"
//                 value={reworkNotes}
//                 onChange={(e) => setReworkNotes(e.target.value)}
//                 placeholder="Describe what needs to be fixed..."
//                 rows={5}
//                 required
//                 disabled={loading}
//                 className="form-textarea"
//               />
//             </div>

//             {/* Notification Checkbox */}
//             <div className="checkbox-group">
//               <input
//                 type="checkbox"
//                 id="notify"
//                 checked={true}
//                 disabled
//                 className="checkbox-input"
//               />
//               <label htmlFor="notify" className="checkbox-label">
//                 <span className="icon">📧</span>
//                 The developer will receive an email notification with rework details
//               </label>
//             </div>

//             {/* Action Buttons */}
//             <div className="modal-actions">
//               <button
//                 type="button"
//                 className="btn-cancel"
//                 onClick={onClose}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn-submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner"></span>
//                     Sending...
//                   </>
//                 ) : (
//                   'Send for Rework'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskReworkModal;
// frontend/src/client/components/TaskReworkModal.tsx

import React, { useState, useEffect } from 'react';
import './TaskReworkModal.css';

// ✅ Define types for the component props
interface TaskReworkModalProps {
  task: {
    id: number;
    title: string;
    status: string;
    project_name?: string;
    rework_count?: number;
    developer_name?: string;
    [key: string]: any; // For any other properties
  };
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

// ✅ Define types for user and developer
interface User {
  id: number;
  name: string;
  email: string;
  role_id?: number;
}

interface Developer {
  id: number;
  name: string;
  email: string;
  role_id?: number;
}

const TaskReworkModal: React.FC<TaskReworkModalProps> = ({ task, onClose, onSuccess }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('');
  const [reworkNotes, setReworkNotes] = useState<string>('');
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reworkDeadline, setReworkDeadline] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // ✅ Set the developer from the task when modal opens
  useEffect(() => {
    if (task && task.developer_name) {
      setSelectedDeveloper(task.developer_name);
    }
  }, [task]);

  // Fetch current user and developers on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please login first');
          return;
        }

        // Get current user
        const userRes = await fetch('http://localhost:5000/api/current-user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const userData = await userRes.json();
        if (userData.success) {
          setCurrentUser(userData.user);
          console.log('✅ Current user:', userData.user);
        }

        // Get all developers
        const devRes = await fetch('http://localhost:5000/api/developers', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const devData = await devRes.json();
        if (devData.success) {
          setDevelopers(devData.developers);
          console.log('✅ Developers loaded:', devData.developers.length);
        }

        // Set default deadline (7 days from now)
        const defaultDeadline = new Date();
        defaultDeadline.setDate(defaultDeadline.getDate() + 7);
        setReworkDeadline(defaultDeadline.toISOString().split('T')[0]);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please refresh.');
      }
    };

    fetchData();
  }, []);

  // ✅ Add type to event parameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!selectedDeveloper) {
      setError('Please select a developer');
      return;
    }

    if (!reworkNotes || reworkNotes.trim() === '') {
      setError('Please enter rework notes');
      return;
    }

    if (!reworkDeadline) {
      setError('Please select a rework deadline');
      return;
    }

    if (!currentUser) {
      setError('User not logged in');
      return;
    }

    setLoading(true);

    try {
      // ✅ Send the rework data - backend will handle the developer lookup
      const reworkData = {
        developerName: selectedDeveloper,
        reworkNotes: reworkNotes.trim(),
        testerName: currentUser.name || 'Tester',
        testerEmail: currentUser.email,
        reworkDeadline: reworkDeadline
      };

      console.log('📤 Sending rework request:', reworkData);

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}/rework`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reworkData)
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (data.success) {
        setSuccess(`✅ ${data.message}`);
        setTimeout(() => {
          if (onSuccess) onSuccess(data);
          if (onClose) onClose();
        }, 1500);
      } else {
        setError(data.message || 'Failed to send rework request');
      }
    } catch (error) {
      console.error('Error sending rework:', error);
      setError('Failed to send rework request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-content">
            <h2>🔄 Send for Rework</h2>
            <p className="subtitle">Assign the task back to a developer with feedback</p>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Task Info */}
          <div className="task-info">
            <h3>📋 {task?.title || 'Loading...'}</h3>
            <div className="task-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className={`badge status-${task?.status || 'unknown'}`}>
                  {task?.status || 'Unknown'}
                </span>
              </div>
              {task?.project_name && (
                <div className="meta-item">
                  <span className="meta-label">Project</span>
                  <span className="meta-value">{task.project_name}</span>
                </div>
              )}
              {task?.rework_count !== undefined && task.rework_count > 0 && (
                <div className="meta-item">
                  <span className="meta-label">Rework Count</span>
                  <span className="badge rework-badge">🔄 {task.rework_count}</span>
                </div>
              )}
              {task?.developer_name && (
                <div className="meta-item">
                  <span className="meta-label">Current Developer</span>
                  <span className="meta-value">{task.developer_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="error-message">
              <span className="icon">❌</span> {error}
            </div>
          )}
          {success && (
            <div className="success-message">
              <span className="icon">✅</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Developer Selection */}
            <div className="form-group">
              <label htmlFor="developer">
                Assign to Developer *
                <span className="helper-text">The task will move to the developer's To Do column</span>
              </label>
              <select
                id="developer"
                value={selectedDeveloper}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDeveloper(e.target.value)}
                required
                disabled={loading}
                className="form-select"
              >
                <option value="">Select a developer...</option>
                {developers.map((dev: Developer) => (
                  <option key={dev.id} value={dev.name}>
                    {dev.name} ({dev.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Rework Deadline */}
            <div className="form-group">
              <label htmlFor="deadline">
                Rework Deadline *
                <span className="helper-text">When should the rework be completed?</span>
              </label>
              <input
                type="date"
                id="deadline"
                value={reworkDeadline}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReworkDeadline(e.target.value)}
                required
                disabled={loading}
                min={new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>

            {/* Rework Notes */}
            <div className="form-group">
              <label htmlFor="notes">
                Rework Notes *
                <span className="helper-text">These notes will be visible to the developer</span>
              </label>
              <textarea
                id="notes"
                value={reworkNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReworkNotes(e.target.value)}
                placeholder="Describe what needs to be fixed..."
                rows={5}
                required
                disabled={loading}
                className="form-textarea"
              />
            </div>

            {/* Notification Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="notify"
                checked={true}
                disabled
                className="checkbox-input"
              />
              <label htmlFor="notify" className="checkbox-label">
                <span className="icon">📧</span>
                The developer will receive an email notification with rework details
              </label>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send for Rework'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskReworkModal;