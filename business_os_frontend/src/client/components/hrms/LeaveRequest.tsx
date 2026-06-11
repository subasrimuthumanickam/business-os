import React, { useState, useEffect } from 'react';

interface LeaveRequestType {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const LeaveRequest: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockRequests: LeaveRequestType[] = [
        { id: '1', employeeName: 'John Doe', leaveType: 'Sick Leave', startDate: '2024-01-20', endDate: '2024-01-22', reason: 'Fever and cold', status: 'pending' },
        { id: '2', employeeName: 'Jane Smith', leaveType: 'Casual Leave', startDate: '2024-02-10', endDate: '2024-02-12', reason: 'Family function', status: 'approved' },
        { id: '3', employeeName: 'Mike Johnson', leaveType: 'Earned Leave', startDate: '2024-03-05', endDate: '2024-03-10', reason: 'Vacation trip', status: 'pending' },
        { id: '4', employeeName: 'Sarah Williams', leaveType: 'Sick Leave', startDate: '2024-01-25', endDate: '2024-01-26', reason: 'Doctor appointment', status: 'rejected' },
      ];
      setLeaveRequests(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (id: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    alert('Leave request approved!');
  };

  const handleReject = (id: string) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    alert('Leave request rejected!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    alert('Leave request submitted successfully!');
  };

  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedCount = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = leaveRequests.filter(r => r.status === 'rejected').length;

  if (loading) {
    return <div className="loading">Loading leave requests...</div>;
  }

  return (
    <div className="leave-request">
      <div className="list-header">
        <h2>Leave Requests</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + New Request
        </button>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Pending</span>
            <span className="stats-card-icon">⏳</span>
          </div>
          <div className="stats-card-value">{pendingCount}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Approved</span>
            <span className="stats-card-icon">✅</span>
          </div>
          <div className="stats-card-value">{approvedCount}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Rejected</span>
            <span className="stats-card-icon">❌</span>
          </div>
          <div className="stats-card-value">{rejectedCount}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total</span>
            <span className="stats-card-icon">📋</span>
          </div>
          <div className="stats-card-value">{leaveRequests.length}</div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3>Leave Requests List</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.reason}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' && (
                      <>
                        <button 
                          className="action-btn approve" 
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="action-btn reject" 
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.status !== 'pending' && (
                      <span className="action-disabled">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>New Leave Request</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Leave Type *</label>
                <select required>
                  <option value="">Select Leave Type</option>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input type="date" required />
                </div>
              </div>
              <div className="form-group">
                <label>Reason *</label>
                <textarea rows={3} required placeholder="Please provide reason for leave..." />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;