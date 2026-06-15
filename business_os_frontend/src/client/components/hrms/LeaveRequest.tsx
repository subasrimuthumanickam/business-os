// LeaveRequest.tsx
import React, { useState } from 'react';
import {
  Calendar, Clock, User, FileText, CheckCircle, XCircle, AlertCircle,
  Search, Eye, MoreVertical, Send, Plus, ChevronLeft, ChevronRight,
  Filter, Download, Bell, HelpCircle, Menu, Building2, UserCircle,
  Briefcase, MessageCircle, ThumbsUp, ThumbsDown, Users, Edit, Trash2, X,
  Mail, Phone, DollarSign
} from 'lucide-react';

// Types
interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  avatar?: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'casual' | 'annual' | 'unpaid';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  casual: { total: number; used: number; remaining: number };
  unpaid: { total: number; used: number; remaining: number };
}

// Initial Mock Data
const initialLeaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '7', employeeName: 'Lisa Wang', department: 'Sales', startDate: '2024-11-20', endDate: '2024-11-22', type: 'annual', reason: 'Family vacation - planning a trip to Hawaii', status: 'approved', days: 3, approvedBy: 'Sarah Johnson', approvedAt: '2024-11-15T10:00:00Z', createdAt: '2024-11-10T09:00:00Z' },
  { id: '2', employeeId: '2', employeeName: 'John Smith', department: 'Engineering', startDate: '2024-11-25', endDate: '2024-11-26', type: 'sick', reason: 'Flu symptoms, need rest and recovery', status: 'pending', days: 2, createdAt: '2024-11-18T14:30:00Z' },
  { id: '3', employeeId: '4', employeeName: 'Michael Chen', department: 'Engineering', startDate: '2024-12-01', endDate: '2024-12-05', type: 'annual', reason: 'Year-end vacation with family', status: 'pending', days: 5, createdAt: '2024-11-20T11:00:00Z' },
  { id: '4', employeeId: '5', employeeName: 'Emily Rodriguez', department: 'Human Resources', startDate: '2024-11-15', endDate: '2024-11-15', type: 'casual', reason: 'Personal work at bank', status: 'approved', days: 1, approvedBy: 'Sarah Johnson', approvedAt: '2024-11-14T09:00:00Z', createdAt: '2024-11-10T09:00:00Z' },
  { id: '5', employeeId: '6', employeeName: 'David Kim', department: 'Engineering', startDate: '2024-11-28', endDate: '2024-11-29', type: 'unpaid', reason: 'Family emergency - need to travel', status: 'rejected', days: 2, rejectionReason: 'Team has critical deadline this week', createdAt: '2024-11-20T15:00:00Z' },
  { id: '6', employeeId: '1', employeeName: 'Takiya Baksh', department: 'Design', startDate: '2024-12-10', endDate: '2024-12-15', type: 'annual', reason: 'Christmas vacation', status: 'pending', days: 6, createdAt: '2024-11-22T09:00:00Z' },
];

const initialLeaveBalances: LeaveBalance[] = [
  { employeeId: '1', employeeName: 'Takiya Baksh', annual: { total: 20, used: 8, remaining: 12 }, sick: { total: 12, used: 2, remaining: 10 }, casual: { total: 6, used: 1, remaining: 5 }, unpaid: { total: 0, used: 0, remaining: 0 } },
  { employeeId: '2', employeeName: 'John Smith', annual: { total: 20, used: 5, remaining: 15 }, sick: { total: 12, used: 1, remaining: 11 }, casual: { total: 6, used: 2, remaining: 4 }, unpaid: { total: 0, used: 0, remaining: 0 } },
  { employeeId: '3', employeeName: 'Sarah Johnson', annual: { total: 25, used: 12, remaining: 13 }, sick: { total: 12, used: 0, remaining: 12 }, casual: { total: 6, used: 3, remaining: 3 }, unpaid: { total: 0, used: 0, remaining: 0 } },
  { employeeId: '4', employeeName: 'Michael Chen', annual: { total: 20, used: 4, remaining: 16 }, sick: { total: 12, used: 2, remaining: 10 }, casual: { total: 6, used: 1, remaining: 5 }, unpaid: { total: 0, used: 0, remaining: 0 } },
];

// Available employees for new requests
const availableEmployees = [
  { id: '1', name: 'Takiya Baksh', department: 'Design' },
  { id: '2', name: 'John Smith', department: 'Engineering' },
  { id: '3', name: 'Sarah Johnson', department: 'Product' },
  { id: '4', name: 'Michael Chen', department: 'Engineering' },
  { id: '5', name: 'Emily Rodriguez', department: 'Human Resources' },
  { id: '6', name: 'David Kim', department: 'Engineering' },
  { id: '7', name: 'Lisa Wang', department: 'Sales' },
];

const LeaveRequestComponent: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>(initialLeaveBalances);
  const [activeTab, setActiveTab] = useState<'requests' | 'balances' | 'calendar'>('requests');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState<Partial<LeaveRequest>>({
    employeeId: '',
    employeeName: '',
    department: '',
    startDate: '',
    endDate: '',
    type: 'casual',
    reason: '',
    days: 1,
    status: 'pending'
  });
  
  const itemsPerPage = 5;

  const getStatusBadge = (status: LeaveRequest['status']) => {
    const config = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    const icons = { pending: AlertCircle, approved: CheckCircle, rejected: XCircle };
    const Icon = icons[status];
    const labels = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config[status]} transition-all duration-200 hover:scale-105`}>
        <Icon className="w-3 h-3" />
        {labels[status]}
      </span>
    );
  };

  const getTypeBadge = (type: LeaveRequest['type']) => {
    const config = {
      sick: 'bg-blue-50 text-blue-700 border-blue-200',
      casual: 'bg-purple-50 text-purple-700 border-purple-200',
      annual: 'bg-green-50 text-green-700 border-green-200',
      unpaid: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    const labels = { sick: 'Sick Leave', casual: 'Casual Leave', annual: 'Annual Leave', unpaid: 'Unpaid Leave' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config[type]} transition-all duration-200 hover:scale-105`}>
        {labels[type]}
      </span>
    );
  };

  const getFilteredRequests = () => {
    let filtered = leaveRequests;
    if (filterStatus !== 'all') filtered = filtered.filter(req => req.status === filterStatus);
    if (filterType !== 'all') filtered = filtered.filter(req => req.type === filterType);
    if (searchQuery) filtered = filtered.filter(req =>
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered;
  };

  const filteredRequests = getFilteredRequests();
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Statistics
  const pendingRequests = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'rejected').length;
  const totalDaysRequested = leaveRequests.reduce((sum, r) => sum + r.days, 0);

  // Calculate days between dates
  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Handle form field changes
  const handleEmployeeSelect = (employeeId: string) => {
    const employee = availableEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setFormData({
        ...formData,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department
      });
    }
  };

  const handleDateChange = () => {
    if (formData.startDate && formData.endDate) {
      const days = calculateDays(formData.startDate, formData.endDate);
      setFormData({ ...formData, days });
    }
  };

  // CRUD Operations
  const handleAddRequest = () => {
    if (!formData.employeeId || !formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill all required fields');
      return;
    }

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: formData.employeeId!,
      employeeName: formData.employeeName!,
      department: formData.department!,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      type: formData.type as 'sick' | 'casual' | 'annual' | 'unpaid',
      reason: formData.reason!,
      status: 'pending',
      days: formData.days || 1,
      createdAt: new Date().toISOString()
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    resetModal();
  };

  const handleUpdateRequest = () => {
    if (!editingRequest) return;

    const updatedRequests = leaveRequests.map(req =>
      req.id === editingRequest.id
        ? { ...req, ...formData as Partial<LeaveRequest> }
        : req
    );
    setLeaveRequests(updatedRequests);
    resetModal();
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaveRequests(leaveRequests.filter(req => req.id !== id));
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  const handleApproveRequest = (id: string) => {
    const updatedRequests = leaveRequests.map(req =>
      req.id === id
        ? { ...req, status: 'approved' as const, approvedBy: 'HR Manager', approvedAt: new Date().toISOString() }
        : req
    );
    setLeaveRequests(updatedRequests);
    
    // Update leave balances
    const request = leaveRequests.find(req => req.id === id);
    if (request) {
      const balance = leaveBalances.find(b => b.employeeId === request.employeeId);
      if (balance) {
        const leaveType = request.type;
        const updatedBalances = leaveBalances.map(b => {
          if (b.employeeId === request.employeeId) {
            return {
              ...b,
              [leaveType]: {
                ...b[leaveType],
                used: b[leaveType].used + request.days,
                remaining: b[leaveType].remaining - request.days
              }
            };
          }
          return b;
        });
        setLeaveBalances(updatedBalances);
      }
    }
  };

  const handleRejectRequest = (id: string, reason: string) => {
    const rejectReason = prompt('Please provide a reason for rejection:', '');
    if (rejectReason) {
      const updatedRequests = leaveRequests.map(req =>
        req.id === id
          ? { ...req, status: 'rejected' as const, rejectionReason: rejectReason }
          : req
      );
      setLeaveRequests(updatedRequests);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingRequest(null);
    setFormData({
      employeeId: '',
      employeeName: '',
      department: '',
      startDate: '',
      endDate: '',
      type: 'casual',
      reason: '',
      days: 1,
      status: 'pending'
    });
  };

  const openEditModal = (request: LeaveRequest) => {
    setEditingRequest(request);
    setFormData(request);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetModal();
    setIsModalOpen(true);
  };

  // Export functionality
  const handleExportCSV = () => {
    const headers = ['Employee Name', 'Department', 'Leave Type', 'Start Date', 'End Date', 'Days', 'Reason', 'Status', 'Created At'];
    const rows = filteredRequests.map(req => [
      req.employeeName,
      req.department,
      req.type,
      req.startDate,
      req.endDate,
      req.days,
      req.reason,
      req.status,
      new Date(req.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leave_requests_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calendar days for current month
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const calendarDays = [...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).fill(null).map((_, i) => i + 1)];

  // Get leave requests for a specific day
  const getLeaveRequestsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return leaveRequests.filter(req => 
      req.startDate <= dateStr && req.endDate >= dateStr && req.status === 'approved'
    );
  };

  // Request Details Modal
  const RequestDetailsModal = ({ request, onClose }: { request: LeaveRequest; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
          <h3 className="text-lg font-semibold text-white">Leave Request Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{request.employeeName}</p>
              <p className="text-xs text-gray-500">{request.department}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Leave Type</p>
                {getTypeBadge(request.type)}
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                {getStatusBadge(request.status)}
              </div>
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="text-sm font-medium text-gray-800">{request.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">End Date</p>
                <p className="text-sm font-medium text-gray-800">{request.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Days</p>
                <p className="text-sm font-medium text-gray-800">{request.days} days</p>
              </div>
              {request.approvedBy && (
                <div>
                  <p className="text-xs text-gray-500">Approved By</p>
                  <p className="text-sm font-medium text-gray-800">{request.approvedBy}</p>
                </div>
              )}
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm text-gray-700 mt-1">{request.reason}</p>
            </div>
            {request.rejectionReason && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-red-500">Rejection Reason</p>
                <p className="text-sm text-red-600 mt-1">{request.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
          {request.status === 'pending' && (
            <>
              <button
                onClick={() => {
                  handleApproveRequest(request.id);
                  onClose();
                }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <ThumbsUp className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => {
                  handleRejectRequest(request.id, '');
                  onClose();
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <ThumbsDown className="w-4 h-4" />
                Reject
              </button>
            </>
          )}
          <button
            onClick={() => {
              onClose();
              openEditModal(request);
            }}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Leave Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage employee leave requests and track balances</p>
        </div>

        {/* Stats Cards with Hover Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved Requests</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected Requests</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Days</p>
                <p className="text-2xl font-bold text-purple-600">{totalDaysRequested}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="border-b border-gray-100">
            <div className="flex px-4">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === 'requests' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                Leave Requests
              </button>
              <button
                onClick={() => setActiveTab('balances')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === 'balances' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                Leave Balances
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === 'calendar' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {/* Leave Requests Tab */}
          {activeTab === 'requests' && (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name or department..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 bg-white transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <select
                      value={filterType}
                      onChange={(e) => {
                        setFilterType(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                    >
                      <option value="all">All Types</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="annual">Annual Leave</option>
                      <option value="unpaid">Unpaid Leave</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleExportCSV}
                      className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center gap-1 border border-gray-200 bg-white hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button 
                      onClick={openAddModal}
                      className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      New Request
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{request.employeeName}</p>
                            <p className="text-xs text-gray-500">{request.department}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">{getTypeBadge(request.type)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {request.startDate} → {request.endDate}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">{request.days} days</td>
                        <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{request.reason}</td>
                        <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => setSelectedRequest(request)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Eye className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                            </button>
                            <button 
                              onClick={() => openEditModal(request)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Edit className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                            </button>
                            <button 
                              onClick={() => handleDeleteRequest(request.id)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Leave Balances Tab */}
          {activeTab === 'balances' && (
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {leaveBalances.map((balance) => (
                  <div key={balance.employeeId} className="border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-sm font-bold text-indigo-600">
                          {balance.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{balance.employeeName}</h4>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {/* Annual Leave */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Annual Leave</span>
                          <span className="text-gray-700 font-medium">{balance.annual.used}/{balance.annual.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-indigo-500 rounded-full h-2 transition-all duration-700 group-hover:bg-indigo-600" style={{ width: `${(balance.annual.used / balance.annual.total) * 100}%` }} />
                        </div>
                        <p className="text-xs text-green-600 mt-1">{balance.annual.remaining} days remaining</p>
                      </div>
                      {/* Sick Leave */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Sick Leave</span>
                          <span className="text-gray-700 font-medium">{balance.sick.used}/{balance.sick.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2 transition-all duration-700 group-hover:bg-blue-600" style={{ width: `${(balance.sick.used / balance.sick.total) * 100}%` }} />
                        </div>
                        <p className="text-xs text-green-600 mt-1">{balance.sick.remaining} days remaining</p>
                      </div>
                      {/* Casual Leave */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Casual Leave</span>
                          <span className="text-gray-700 font-medium">{balance.casual.used}/{balance.casual.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-purple-500 rounded-full h-2 transition-all duration-700 group-hover:bg-purple-600" style={{ width: `${(balance.casual.used / balance.casual.total) * 100}%` }} />
                        </div>
                        <p className="text-xs text-green-600 mt-1">{balance.casual.remaining} days remaining</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar View Tab */}
          {activeTab === 'calendar' && (
            <div className="p-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{currentMonth} {currentYear}</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, idx) => {
                    const leaveRequestsForDay = day ? getLeaveRequestsForDay(day as number) : [];
                    return (
                      <div key={idx} className="min-h-[80px] border border-gray-100 rounded-lg p-1 hover:shadow-md transition-all duration-200 group">
                        {day && (
                          <>
                            <span className={`text-xs font-medium ${leaveRequestsForDay.length > 0 ? 'text-indigo-600 bg-indigo-50 w-6 h-6 inline-flex items-center justify-center rounded-full' : 'text-gray-600'}`}>
                              {day}
                            </span>
                            {leaveRequestsForDay.length > 0 && (
                              <div className="mt-1 space-y-0.5">
                                {leaveRequestsForDay.slice(0, 2).map(req => (
                                  <div key={req.id} className="w-full text-[10px] bg-green-100 text-green-700 rounded px-1 truncate" title={req.employeeName}>
                                    {req.employeeName.split(' ')[0]}
                                  </div>
                                ))}
                                {leaveRequestsForDay.length > 2 && (
                                  <div className="w-full text-[10px] text-gray-400 text-center">
                                    +{leaveRequestsForDay.length - 2} more
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Leave Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
              <h3 className="text-lg font-semibold text-white">
                {editingRequest ? 'Edit Leave Request' : 'New Leave Request'}
              </h3>
              <button onClick={resetModal} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Employee *</label>
                <select
                  value={formData.employeeId || ''}
                  onChange={(e) => handleEmployeeSelect(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  disabled={!!editingRequest}
                >
                  <option value="">Select Employee</option>
                  {availableEmployees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, startDate: e.target.value });
                      handleDateChange();
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, endDate: e.target.value });
                      handleDateChange();
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Leave Type *</label>
                  <select
                    value={formData.type || 'casual'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="annual">Annual Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total Days</label>
                  <input
                    type="number"
                    value={formData.days || 1}
                    readOnly
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Reason *</label>
                <textarea
                  value={formData.reason || ''}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  placeholder="Please provide a reason for your leave request..."
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={resetModal}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={editingRequest ? handleUpdateRequest : handleAddRequest}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Send className="w-4 h-4" />
                {editingRequest ? 'Update Request' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LeaveRequestComponent;