// import React, { useState, useEffect } from 'react';

// interface LeaveRequest {
//   id: string;
//   employeeName: string;
//   employeeCode: string;
//   type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
//   startDate: string;
//   endDate: string;
//   days: number;
//   status: 'pending' | 'approved' | 'rejected';
//   reason: string;
//   approvedBy?: string;
//   approvedDate?: string;
// }

// interface LeaveRequestProps {
//   requests?: LeaveRequest[];
//   onLeaveUpdate?: (requests: LeaveRequest[]) => void;
// }

// const LeaveRequest: React.FC<LeaveRequestProps> = ({
//   requests: propRequests,
//   onLeaveUpdate
// }) => {
//   const [requests, setRequests] = useState<LeaveRequest[]>(propRequests || []);
//   const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [filterType, setFilterType] = useState<string>('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

//   useEffect(() => {
//     if (!propRequests) {
//       fetchLeaveRequests();
//     }
//   }, []);

//   const fetchLeaveRequests = async () => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const mockRequests: LeaveRequest[] = [
//         {
//           id: '1',
//           employeeName: 'Takiya Baksh',
//           employeeCode: 'EMP001',
//           type: 'annual',
//           startDate: '2026-07-10',
//           endDate: '2026-07-14',
//           days: 5,
//           status: 'pending',
//           reason: 'Family vacation'
//         },
//         {
//           id: '2',
//           employeeName: 'John Smith',
//           employeeCode: 'EMP002',
//           type: 'sick',
//           startDate: '2026-06-20',
//           endDate: '2026-06-21',
//           days: 2,
//           status: 'approved',
//           reason: 'Doctor appointment',
//           approvedBy: 'Sarah Johnson',
//           approvedDate: '2026-06-19'
//         },
//         {
//           id: '3',
//           employeeName: 'Sarah Johnson',
//           employeeCode: 'EMP003',
//           type: 'annual',
//           startDate: '2026-08-01',
//           endDate: '2026-08-15',
//           days: 15,
//           status: 'pending',
//           reason: 'International travel'
//         },
//         {
//           id: '4',
//           employeeName: 'Michael Chen',
//           employeeCode: 'EMP004',
//           type: 'personal',
//           startDate: '2026-06-25',
//           endDate: '2026-06-25',
//           days: 1,
//           status: 'rejected',
//           reason: 'Personal errand'
//         },
//         {
//           id: '5',
//           employeeName: 'Emily Rodriguez',
//           employeeCode: 'EMP005',
//           type: 'sick',
//           startDate: '2026-06-18',
//           endDate: '2026-06-19',
//           days: 2,
//           status: 'approved',
//           reason: 'Flu symptoms',
//           approvedBy: 'Sarah Johnson',
//           approvedDate: '2026-06-17'
//         }
//       ];
//       setRequests(mockRequests);
//       if (onLeaveUpdate) onLeaveUpdate(mockRequests);
//     } catch (error) {
//       console.error('Error fetching leave requests:', error);
//     }
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'approved':
//         return 'text-green-700 bg-green-50';
//       case 'pending':
//         return 'text-yellow-700 bg-yellow-50';
//       case 'rejected':
//         return 'text-red-700 bg-red-50';
//       default:
//         return 'text-gray-700 bg-gray-50';
//     }
//   };

//   const getLeaveTypeLabel = (type: string): string => {
//     return type.charAt(0).toUpperCase() + type.slice(1);
//   };

//   const handleStatusChange = async (id: string, newStatus: LeaveRequest['status']) => {
//     try {
//       const updatedRequests = requests.map(request =>
//         request.id === id ? { ...request, status: newStatus } : request
//       );
//       setRequests(updatedRequests);
//       if (onLeaveUpdate) onLeaveUpdate(updatedRequests);
//       if (selectedRequest?.id === id) {
//         setSelectedRequest({ ...selectedRequest, status: newStatus });
//       }
//     } catch (error) {
//       console.error('Error updating leave status:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       const updatedRequests = requests.filter(req => req.id !== id);
//       setRequests(updatedRequests);
//       if (onLeaveUpdate) onLeaveUpdate(updatedRequests);
//       setShowDeleteModal(null);
//       if (selectedRequest?.id === id) setSelectedRequest(null);
//     } catch (error) {
//       console.error('Error deleting leave request:', error);
//     }
//   };

//   const filteredRequests = requests.filter((request: LeaveRequest) => {
//     const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
//     const matchesType = filterType === 'all' || request.type === filterType;
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const pendingCount = requests.filter(r => r.status === 'pending').length;
//   const approvedCount = requests.filter(r => r.status === 'approved').length;
//   const rejectedCount = requests.filter(r => r.status === 'rejected').length;

//   const handleRequestClick = (request: LeaveRequest) => {
//     setSelectedRequest(selectedRequest?.id === request.id ? null : request);
//   };

//   return (
//     <div className="flex h-full w-full bg-white">
//       {/* Table Section - 60% width */}
//       <div className="w-[60%] border-r border-gray-200 bg-white overflow-hidden flex flex-col">
//         {/* Stats & Toolbar */}
//         <div className="px-4 py-3 border-b border-gray-100">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center space-x-3">
//               <span className="text-sm font-medium text-gray-700">Leave Requests</span>
//               <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                 {filteredRequests.length}
//               </span>
//             </div>
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
//             >
//               + New Request
//             </button>
//           </div>
//           <div className="flex items-center space-x-3 flex-wrap gap-2">
//             <div className="flex items-center space-x-2">
//               <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full">{pendingCount} Pending</span>
//               <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{approvedCount} Approved</span>
//               <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full">{rejectedCount} Rejected</span>
//             </div>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Types</option>
//               <option value="annual">Annual</option>
//               <option value="sick">Sick</option>
//               <option value="personal">Personal</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto p-3">
//           <table className="w-full text-sm">
//             <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
//               <tr>
//                 <th className="pb-2 font-medium text-left">Employee</th>
//                 <th className="pb-2 font-medium text-left">Type</th>
//                 <th className="pb-2 font-medium text-left">Days</th>
//                 <th className="pb-2 font-medium text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
//                     No leave requests found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((request: LeaveRequest) => (
//                   <tr
//                     key={request.id}
//                     className={`hover:bg-gray-50 cursor-pointer transition-colors ${
//                       selectedRequest?.id === request.id ? 'bg-blue-50' : ''
//                     }`}
//                     onClick={() => handleRequestClick(request)}
//                   >
//                     <td className="py-2.5 pr-3">
//                       <div className="flex items-center gap-2">
//                         <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs">
//                           {request.employeeName.split(' ').map(n => n[0]).join('')}
//                         </div>
//                         <span className="text-sm font-medium text-gray-800">{request.employeeName}</span>
//                       </div>
//                     </td>
//                     <td className="py-2.5 pr-3 text-sm text-gray-600">
//                       <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
//                         {getLeaveTypeLabel(request.type)}
//                       </span>
//                     </td>
//                     <td className="py-2.5 pr-3 text-sm font-medium text-gray-800">{request.days}</td>
//                     <td className="py-2.5 pr-3">
//                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
//                         {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
          
//           <div className="mt-3 text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 pt-3">
//             <span>Displaying {filteredRequests.length} of {requests.length}</span>
//             <span>Rows per page: 10</span>
//           </div>
//         </div>
//       </div>

//       {/* Detail Panel - 40% width */}
//       <div className="w-[40%] bg-white p-5 overflow-auto">
//         {selectedRequest ? (
//           <div>
//             <h2 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
//               Leave Details
//             </h2>
            
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-medium">
//                   {selectedRequest.employeeName.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div>
//                   <p className="text-base font-bold text-gray-800">{selectedRequest.employeeName}</p>
//                   <p className="text-sm text-gray-500">{selectedRequest.employeeCode}</p>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Leave Type</p>
//                 <p className="text-sm font-medium text-gray-800">{getLeaveTypeLabel(selectedRequest.type)}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <p className="text-xs text-gray-400">Start Date</p>
//                   <p className="text-sm font-medium text-gray-800">
//                     {new Date(selectedRequest.startDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">End Date</p>
//                   <p className="text-sm font-medium text-gray-800">
//                     {new Date(selectedRequest.endDate).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Days</p>
//                 <p className="text-sm font-medium text-gray-800">{selectedRequest.days} days</p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</p>
//                 <select
//                   value={selectedRequest.status}
//                   onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as LeaveRequest['status'])}
//                   className={`mt-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedRequest.status)}`}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Reason</p>
//                 <p className="text-sm text-gray-800">{selectedRequest.reason}</p>
//               </div>

//               {selectedRequest.approvedBy && (
//                 <div>
//                   <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Approved By</p>
//                   <p className="text-sm text-gray-800">{selectedRequest.approvedBy}</p>
//                   <p className="text-xs text-gray-400">{selectedRequest.approvedDate}</p>
//                 </div>
//               )}

//               <div className="border-t border-gray-100 pt-3">
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Actions</p>
//                 <div className="flex flex-wrap gap-2">
//                   <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition">
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => setShowDeleteModal(selectedRequest.id)}
//                     className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-lg hover:bg-red-100 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//             Select a request to view details
//           </div>
//         )}
//       </div>

//       {/* Add Request Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">New Leave Request</h3>
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
//                   <option value="">Select employee</option>
//                   <option value="EMP001">Takiya Baksh</option>
//                   <option value="EMP002">John Smith</option>
//                   <option value="EMP003">Sarah Johnson</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
//                   <option value="annual">Annual</option>
//                   <option value="sick">Sick</option>
//                   <option value="personal">Personal</option>
//                   <option value="maternity">Maternity</option>
//                   <option value="paternity">Paternity</option>
//                 </select>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                   <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
//                 <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Enter reason..." />
//               </div>
//               <div className="flex justify-end gap-3 pt-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
//                 >
//                   Submit Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Request</h3>
//             <p className="text-gray-600 mb-4">Are you sure you want to delete this leave request?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(null)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(showDeleteModal)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveRequest;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/leaves";

interface Leave {
  id: number;
  employee_id: number;
  employee_name: string;
  employee_code: string;
  department: string;
  role: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approved_by?: string;
  approved_on?: string;
  rejection_reason?: string;
}

const LeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<Leave[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Leave[]>([]);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  const [showViewModal, setShowViewModal] = useState(false);
const [processing, setProcessing] = useState(false);

  // ==========================
  // Fetch Leave Requests
  // ==========================
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      const data = res.data.data || [];

      setLeaveRequests(data);
      setFilteredRequests(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================================
// Update Leave Status
// ================================
const updateLeaveStatus = async (
  id: number,
  status: "Approved" | "Rejected"
) => {
  try {
    setProcessing(true);

    await axios.patch(
      `${API_URL}/${id}/status`,
      {
        status,
        approved_by: "HR Manager",
        rejection_reason:
          status === "Rejected"
            ? "Rejected by HR"
            : ""
      }
    );

    // Refresh Data
    await fetchLeaveRequests();

    // Update Selected Leave
    if (selectedLeave) {
      setSelectedLeave({
        ...selectedLeave,
        status,
        approved_by: "HR Manager"
      });
    }

    alert(`Leave ${status} Successfully`);

    closeModal();

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  } finally {

    setProcessing(false);

  }
};
  // Open Leave Details
const handleViewLeave = (leave: Leave) => {
  setSelectedLeave(leave);
  setShowViewModal(true);
};

// Close Modal
const closeModal = () => {
  setShowViewModal(false);
  setSelectedLeave(null);
};

  // ==========================
  // Search & Filters
  // ==========================
  useEffect(() => {
    let data = [...leaveRequests];

    if (search !== "") {
      data = data.filter(
        (item) =>
          item.employee_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.employee_code
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    if (typeFilter !== "All") {
      data = data.filter(
        (item) => item.leave_type === typeFilter
      );
    }

    setFilteredRequests(data);
  }, [
    search,
    statusFilter,
    typeFilter,
    leaveRequests,
  ]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
<div className="bg-white rounded-xl shadow-sm border p-5 mb-5">

  <div className="flex items-center justify-between">

    <h2 className="text-xl font-semibold">
      Leave List
    </h2>

    <div className="flex gap-3">

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="All">Leave Type</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Earned Leave">Earned Leave</option>
      </select>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg pl-10 pr-4 py-2 w-64"
        />
      </div>
    </div>
  </div>
</div>
            {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Leave Type */}

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Leave Types</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Loss of Pay">Loss of Pay</option>
            <option value="Work From Home">Work From Home</option>
          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={fetchLeaveRequests}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
          >
            Refresh
          </button>

        </div>
      </div>

      {/* Leave Request Table */}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr className="text-sm text-gray-700">

                <th className="px-5 py-3 text-left">
                  Employee
                </th>

                <th className="px-5 py-3 text-left">
                  Department
                </th>

                <th className="px-5 py-3 text-left">
                  Leave Type
                </th>

                <th className="px-5 py-3 text-left">
                  From
                </th>

                <th className="px-5 py-3 text-left">
                  To
                </th>

                <th className="px-5 py-3 text-center">
                  Days
                </th>

                <th className="px-5 py-3 text-center">
                  Status
                </th>

                <th className="px-5 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center py-10"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center py-10 text-gray-500"
                  >
                    No Leave Requests Found
                  </td>

                </tr>

              ) : (

                filteredRequests.map((leave) => (

                  <tr
                    key={leave.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">

                      <div>

                        <p className="font-semibold">
                          {leave.employee_name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {leave.employee_code}
                        </p>

                      </div>

                    </td>

                    <td className="px-5 py-4">
                      {leave.department}
                    </td>

                    <td className="px-5 py-4">
                      {leave.leave_type}
                    </td>

                    <td className="px-5 py-4">
                      {leave.start_date}
                    </td>

                    <td className="px-5 py-4">
                      {leave.end_date}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {leave.total_days}
                    </td>

                    <td className="px-5 py-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {leave.status}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => handleViewLeave(leave)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={18} />
                        </button>

                        {leave.status === "Pending" && (

                          <>
                            <button
                              className="text-green-600 hover:text-green-800"
                            >
                              <CheckCircle size={18} />
                            </button>

                            <button
                              className="text-red-600 hover:text-red-800"
                            >
                              <XCircle size={18} />
                            </button>
                          </>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ============================
    View Leave Details Modal
============================ */}

{showViewModal && selectedLeave && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">

{/* Header */}

<div className="flex items-center justify-between border-b px-6 py-4">

<h2 className="text-xl font-bold">
Leave Request Details
</h2>

<button
onClick={closeModal}
className="text-2xl text-gray-500 hover:text-red-500"
>
×
</button>

</div>

{/* Body */}

<div className="p-6 space-y-6">

<div className="grid grid-cols-2 gap-5">

<div>

<label className="text-sm text-gray-500">
Employee Name
</label>

<p className="font-semibold">
{selectedLeave.employee_name}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
Employee Code
</label>

<p className="font-semibold">
{selectedLeave.employee_code}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
Department
</label>

<p className="font-semibold">
{selectedLeave.department}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
Role
</label>

<p className="font-semibold">
{selectedLeave.role}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
Leave Type
</label>

<p className="font-semibold">
{selectedLeave.leave_type}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
Total Days
</label>

<p className="font-semibold">
{selectedLeave.total_days}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
From Date
</label>

<p className="font-semibold">
{selectedLeave.start_date}
</p>

</div>

<div>

<label className="text-sm text-gray-500">
To Date
</label>

<p className="font-semibold">
{selectedLeave.end_date}
</p>

</div>

</div>

<div>

<label className="text-sm text-gray-500">
Reason
</label>

<div className="mt-2 border rounded-lg p-3 bg-gray-50">

{selectedLeave.reason}

</div>

</div>

<div>

<label className="text-sm text-gray-500">
Current Status
</label>

<div className="mt-2">

<span
className={`px-4 py-2 rounded-full text-sm font-semibold

${
selectedLeave.status === "Approved"

? "bg-green-100 text-green-700"

: selectedLeave.status === "Rejected"

? "bg-red-100 text-red-700"

: "bg-yellow-100 text-yellow-700"
}`}
>

{selectedLeave.status}

</span>

</div>

</div>

</div>

{/* Footer */}

<div className="border-t px-6 py-4 flex justify-end gap-3">

<button
onClick={closeModal}
className="px-5 py-2 rounded-lg border"
>

Close

</button>

{selectedLeave.status === "Pending" && (

<>

<button
onClick={() =>
updateLeaveStatus(
selectedLeave.id,
"Rejected"
)
}
disabled={processing}
className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
>

{processing ? "Please Wait..." : "Reject"}

</button>

<button
onClick={() =>
updateLeaveStatus(
selectedLeave.id,
"Approved"
)
}
disabled={processing}
className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
>

Approve

</button>

</>

)}

</div>

</div>

</div>

)}

    </div>
  );
};

export default LeaveManagement;