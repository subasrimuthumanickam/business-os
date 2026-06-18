
// components/hrms/AnalyticsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Employee, LeaveRequest, PerformanceReview } from '../../types/hrms';

interface AnalyticsDashboardProps {
  employees?: Employee[];
  leaveRequests?: LeaveRequest[];
  reviews?: PerformanceReview[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  employees: propEmployees,
  leaveRequests: propLeaveRequests,
  reviews: propReviews
}) => {
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || []);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(propLeaveRequests || []);
  const [reviews, setReviews] = useState<PerformanceReview[]>(propReviews || []);
  const [timeRange, setTimeRange] = useState('month');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!propEmployees) fetchEmployees();
    if (!propLeaveRequests) fetchLeaveRequests();
    if (!propReviews) fetchReviews();
  }, []);

  const fetchEmployees = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockEmployees: Employee[] = [
        { id: '1', name: 'Takiya Baksh', code: 'EMP001', email: 'takiya@company.com', department: 'Design', role: 'UI/UX Designer', joinDate: '2024-01-15', status: 'active', skills: [] },
        { id: '2', name: 'John Smith', code: 'EMP002', email: 'john@company.com', department: 'Engineering', role: 'Frontend Developer', joinDate: '2023-11-01', status: 'active', skills: [] },
        { id: '3', name: 'Sarah Johnson', code: 'EMP003', email: 'sarah@company.com', department: 'Executive', role: 'CEO', joinDate: '2020-06-10', status: 'active', skills: [] },
        { id: '4', name: 'Michael Chen', code: 'EMP004', email: 'michael@company.com', department: 'Engineering', role: 'Backend Developer', joinDate: '2024-03-20', status: 'active', skills: [] },
        { id: '5', name: 'Emily Rodriguez', code: 'EMP005', email: 'emily@company.com', department: 'HR', role: 'HR Specialist', joinDate: '2023-08-05', status: 'active', skills: [] }
      ];
      setEmployees(mockEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockLeaveRequests: LeaveRequest[] = [
        { id: '1', employeeId: '1', employeeName: 'Takiya Baksh', employeeCode: 'EMP001', type: 'annual', startDate: '2026-07-10', endDate: '2026-07-14', days: 5, status: 'pending', reason: 'Vacation' },
        { id: '2', employeeId: '2', employeeName: 'John Smith', employeeCode: 'EMP002', type: 'sick', startDate: '2026-06-20', endDate: '2026-06-21', days: 2, status: 'approved', reason: 'Sick' },
        { id: '3', employeeId: '3', employeeName: 'Sarah Johnson', employeeCode: 'EMP003', type: 'annual', startDate: '2026-08-01', endDate: '2026-08-15', days: 15, status: 'pending', reason: 'Travel' }
      ];
      setLeaveRequests(mockLeaveRequests);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockReviews: PerformanceReview[] = [
        { id: '1', employeeId: '1', employeeName: 'Takiya Baksh', reviewer: 'Sarah Johnson', date: '2026-06-15', rating: 4.5, comments: 'Excellent', strengths: ['Design'], improvements: ['Time'], goals: ['Lead'] },
        { id: '2', employeeId: '2', employeeName: 'John Smith', reviewer: 'Sarah Johnson', date: '2026-06-10', rating: 4.2, comments: 'Great', strengths: ['Code'], improvements: ['Architecture'], goals: ['AWS'] },
        { id: '3', employeeId: '3', employeeName: 'Sarah Johnson', reviewer: 'Board', date: '2026-06-05', rating: 4.8, comments: 'Excellent', strengths: ['Leadership'], improvements: [], goals: ['Growth'] }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeave = employees.filter(e => e.status === 'on-leave').length;
  const averageRating = reviews.length > 0 
    ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10 
    : 0;

  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leaveDistribution = leaveRequests.reduce((acc, req) => {
    acc[req.type] = (acc[req.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const performanceDistribution = reviews.reduce((acc, review) => {
    const level = review.rating >= 4.5 ? 'Excellent' : 
                  review.rating >= 4 ? 'Good' : 
                  review.rating >= 3 ? 'Satisfactory' : 'Needs Improvement';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">HR Analytics Dashboard</h3>
          <p className="text-sm text-gray-500 mt-1">
            Real-time insights and analytics
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80">Total Employees</p>
          <p className="text-3xl font-bold">{totalEmployees}</p>
          <p className="text-xs opacity-80 mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80">Active Employees</p>
          <p className="text-3xl font-bold">{activeEmployees}</p>
          <p className="text-xs opacity-80 mt-1">↑ 5% from last month</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80">On Leave</p>
          <p className="text-3xl font-bold">{onLeave}</p>
          <p className="text-xs opacity-80 mt-1">{onLeave > 0 ? '↑' : '↓'} from last month</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-80">Avg. Rating</p>
          <p className="text-3xl font-bold">{averageRating}</p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-800 mb-4">Department Distribution</h4>
          <div className="space-y-3">
            {Object.entries(departmentStats).map(([name, count]) => (
              <div key={name}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{name}</span>
                  <span className="font-medium text-gray-800">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / totalEmployees) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-800 mb-4">Leave Distribution</h4>
          <div className="space-y-3">
            {Object.entries(leaveDistribution).map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <span className="font-medium text-gray-800">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(count / leaveRequests.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-800 mb-4">Performance Distribution</h4>
          <div className="space-y-3">
            {Object.entries(performanceDistribution).map(([level, count]) => (
              <div key={level}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{level}</span>
                  <span className="font-medium text-gray-800">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      level === 'Excellent' ? 'bg-green-500' :
                      level === 'Good' ? 'bg-blue-500' :
                      level === 'Satisfactory' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-800 mb-4">Quick Stats</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-800">Highest Performance</p>
                <p className="text-sm text-gray-600">
                  {reviews.length > 0 ? 
                    reviews.reduce((a, b) => a.rating > b.rating ? a : b).employeeName : 
                    'No reviews'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-800">Most Leave Used</p>
                <p className="text-sm text-gray-600">
                  {leaveRequests.length > 0 ?
                    leaveRequests.reduce((a, b) => a.days > b.days ? a : b).employeeName :
                    'No leave requests'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-800">Total Skills Tracked</p>
                <p className="text-sm text-gray-600">8 skills across {totalEmployees} employees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;