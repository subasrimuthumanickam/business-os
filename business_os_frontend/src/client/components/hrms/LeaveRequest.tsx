import React, { useState, useEffect } from 'react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeCode: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
  approvedDate?: string;
}

interface LeaveRequestProps {
  requests?: LeaveRequest[];
  onLeaveUpdate?: (requests: LeaveRequest[]) => void;
}

const LeaveRequest: React.FC<LeaveRequestProps> = ({
  requests: propRequests,
  onLeaveUpdate
}) => {
  const [requests, setRequests] = useState<LeaveRequest[]>(propRequests || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  // const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    if (!propRequests) {
      fetchLeaveRequests();
    }
  }, []);

  const fetchLeaveRequests = async () => {
    // setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockRequests: LeaveRequest[] = [
        {
          id: '1',
          employeeName: 'Takiya Baksh',
          employeeCode: 'EMP001',
          type: 'annual',
          startDate: '2026-07-10',
          endDate: '2026-07-14',
          days: 5,
          status: 'pending',
          reason: 'Family vacation'
        },
        {
          id: '2',
          employeeName: 'John Smith',
          employeeCode: 'EMP002',
          type: 'sick',
          startDate: '2026-06-20',
          endDate: '2026-06-21',
          days: 2,
          status: 'approved',
          reason: 'Doctor appointment',
          approvedBy: 'Sarah Johnson',
          approvedDate: '2026-06-19'
        },
        {
          id: '3',
          employeeName: 'Sarah Johnson',
          employeeCode: 'EMP003',
          type: 'annual',
          startDate: '2026-08-01',
          endDate: '2026-08-15',
          days: 15,
          status: 'pending',
          reason: 'International travel'
        },
        {
          id: '4',
          employeeName: 'Michael Chen',
          employeeCode: 'EMP004',
          type: 'personal',
          startDate: '2026-06-25',
          endDate: '2026-06-25',
          days: 1,
          status: 'rejected',
          reason: 'Personal errand',
          approvedBy: 'Sarah Johnson',
          approvedDate: '2026-06-24'
        },
        {
          id: '5',
          employeeName: 'Emily Rodriguez',
          employeeCode: 'EMP005',
          type: 'sick',
          startDate: '2026-06-18',
          endDate: '2026-06-19',
          days: 2,
          status: 'approved',
          reason: 'Flu symptoms',
          approvedBy: 'Sarah Johnson',
          approvedDate: '2026-06-17'
        }
      ];
      setRequests(mockRequests);
      if (onLeaveUpdate) onLeaveUpdate(mockRequests);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    } finally {
      // setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case 'approved':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLeaveTypeLabel = (type: string): string => {
    switch (type) {
      case 'annual':
        return 'Annual';
      case 'sick':
        return 'Sick';
      case 'personal':
        return 'Personal';
      case 'maternity':
        return 'Maternity';
      case 'paternity':
        return 'Paternity';
      default:
        return type;
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeaveRequest['status']) => {
    try {
      const updatedRequests = requests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      );
      setRequests(updatedRequests);
      if (onLeaveUpdate) onLeaveUpdate(updatedRequests);
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedRequests = requests.filter(req => req.id !== id);
      setRequests(updatedRequests);
      if (onLeaveUpdate) onLeaveUpdate(updatedRequests);
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  const filteredRequests = requests.filter((request: LeaveRequest) => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;
  const totalDays = requests.reduce((sum, r) => sum + r.days, 0);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-xs text-yellow-600 font-medium">Pending</p>
          <p className="text-xl font-bold text-gray-800">{pendingCount}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium">Approved</p>
          <p className="text-xl font-bold text-gray-800">{approvedCount}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-red-600 font-medium">Rejected</p>
          <p className="text-xl font-bold text-gray-800">{rejectedCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium">Total Days</p>
          <p className="text-xl font-bold text-gray-800">{totalDays}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Types</option>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="personal">Personal</option>
            <option value="maternity">Maternity</option>
            <option value="paternity">Paternity</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Request
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No leave requests found
                </td>
              </tr>
            ) : (
              filteredRequests.map((request: LeaveRequest) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        {request.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{request.employeeName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {request.employeeCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {getLeaveTypeLabel(request.type)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(request.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(request.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {request.days}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value as LeaveRequest['status'])}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(request.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">New Leave Request</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Select employee</option>
                    <option value="EMP001">Takiya Baksh</option>
                    <option value="EMP002">John Smith</option>
                    <option value="EMP003">Sarah Johnson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Select type</option>
                    <option value="annual">Annual</option>
                    <option value="sick">Sick</option>
                    <option value="personal">Personal</option>
                    <option value="maternity">Maternity</option>
                    <option value="paternity">Paternity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason *
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Please provide reason for leave..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Request</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this leave request? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;