// AttendanceTracker.tsx
import React, { useState, useEffect } from 'react';
import {
  Users, Calendar, Clock, UserCheck, AlertCircle, CheckCircle, XCircle,
  Search, Download, MoreVertical, ArrowUpRight, ArrowDownRight, Printer,
  RefreshCw, Bell, HelpCircle, Menu, Building2, UserCircle, BarChart3,
  Zap, Coffee, CalendarDays, UserPlus, Edit, Trash2, X, Mail, Phone,
  Briefcase, MapPin, DollarSign
} from 'lucide-react';

// Type Definitions
interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  salary: number;
}

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  breakHours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  lateMinutes: number;
}

interface DepartmentAttendanceStats {
  department: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
}

interface WeeklyAttendance {
  day: string;
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

// Initial Mock Data
const initialEmployees: Employee[] = [
  { id: '1', employeeCode: 'EMP001', firstName: 'Takiya', lastName: 'Baksh', email: 'takiyabaksh@gmail.com', phone: '+302801431000', department: 'Design', designation: 'UI/UX Designer', joiningDate: '2023-01-15', status: 'active', salary: 75000 },
  { id: '2', employeeCode: 'EMP002', firstName: 'John', lastName: 'Smith', email: 'john.smith@businessos.com', phone: '+302801431001', department: 'Engineering', designation: 'Frontend Developer', joiningDate: '2023-02-20', status: 'active', salary: 85000 },
  { id: '3', employeeCode: 'EMP003', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@businessos.com', phone: '+302801431002', department: 'Product', designation: 'Product Manager', joiningDate: '2023-03-10', status: 'active', salary: 95000 },
  { id: '4', employeeCode: 'EMP004', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@businessos.com', phone: '+302801431003', department: 'Engineering', designation: 'Backend Developer', joiningDate: '2023-01-05', status: 'active', salary: 88000 },
  { id: '5', employeeCode: 'EMP005', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@businessos.com', phone: '+302801431004', department: 'Human Resources', designation: 'HR Specialist', joiningDate: '2023-04-01', status: 'active', salary: 65000 },
  { id: '6', employeeCode: 'EMP006', firstName: 'David', lastName: 'Kim', email: 'david.kim@businessos.com', phone: '+302801431005', department: 'Engineering', designation: 'DevOps Engineer', joiningDate: '2023-05-12', status: 'active', salary: 92000 },
  { id: '7', employeeCode: 'EMP007', firstName: 'Lisa', lastName: 'Wang', email: 'lisa.wang@businessos.com', phone: '+302801431006', department: 'Sales', designation: 'Sales Manager', joiningDate: '2023-06-08', status: 'on_leave', salary: 88000 },
];

const generateAttendance = (employeesList: Employee[]): Attendance[] => {
  const records: Attendance[] = [];
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

  employeesList.forEach((emp, idx) => {
    if (emp.status === 'active') {
      const isLate = idx % 3 === 0;
      records.push({ 
        id: `att-${emp.id}-today`, 
        employeeId: emp.id, 
        employeeName: `${emp.firstName} ${emp.lastName}`, 
        date: today, 
        checkIn: isLate ? '10:15 AM' : '09:30 AM', 
        checkOut: '06:45 PM', 
        workHours: isLate ? 8 : 9, 
        breakHours: 0.75, 
        overtime: isLate ? 10 : 25, 
        status: isLate ? 'late' : 'present', 
        lateMinutes: isLate ? 45 : 0 
      });
    } else if (emp.status === 'on_leave') {
      records.push({ 
        id: `att-${emp.id}-today`, 
        employeeId: emp.id, 
        employeeName: `${emp.firstName} ${emp.lastName}`, 
        date: today, 
        checkIn: '--', 
        checkOut: '--', 
        workHours: 0, 
        breakHours: 0, 
        overtime: 0, 
        status: 'absent', 
        lateMinutes: 0 
      });
    }
    
    if (idx % 4 !== 0) {
      records.push({ 
        id: `att-${emp.id}-yesterday`, 
        employeeId: emp.id, 
        employeeName: `${emp.firstName} ${emp.lastName}`, 
        date: yesterday, 
        checkIn: '09:25 AM', 
        checkOut: '06:30 PM', 
        workHours: 8.75, 
        breakHours: 0.5, 
        overtime: 15, 
        status: 'present', 
        lateMinutes: 0 
      });
    } else {
      records.push({ 
        id: `att-${emp.id}-yesterday`, 
        employeeId: emp.id, 
        employeeName: `${emp.firstName} ${emp.lastName}`, 
        date: yesterday, 
        checkIn: '--', 
        checkOut: '--', 
        workHours: 0, 
        breakHours: 0, 
        overtime: 0, 
        status: 'absent', 
        lateMinutes: 0 
      });
    }
    
    records.push({ 
      id: `att-${emp.id}-2days`, 
      employeeId: emp.id, 
      employeeName: `${emp.firstName} ${emp.lastName}`, 
      date: twoDaysAgo, 
      checkIn: '09:40 AM', 
      checkOut: '06:50 PM', 
      workHours: 8.5, 
      breakHours: 0.5, 
      overtime: 20, 
      status: idx % 5 === 0 ? 'late' : 'present', 
      lateMinutes: idx % 5 === 0 ? 20 : 0 
    });
  });
  return records;
};

const AttendanceTracker: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: 0,
    status: 'active'
  });

  // Regenerate attendance when employees change
  useEffect(() => {
    setAttendanceRecords(generateAttendance(employees));
  }, [employees]);

  // Calculate statistics
  const todayAttendance = attendanceRecords.filter(a => a.date === selectedDate);
  const activeEmployees = employees.filter(e => e.status === 'active');
  const totalActiveEmployees = activeEmployees.length;
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const lateToday = todayAttendance.filter(a => a.status === 'late').length;
  const onLeaveToday = employees.filter(e => e.status === 'on_leave').length;
  
  const totalWorkHours = todayAttendance
    .filter(a => a.status !== 'absent')
    .reduce((sum, a) => sum + a.workHours, 0);
  const avgWorkHours = todayAttendance.filter(a => a.status !== 'absent').length > 0 
    ? totalWorkHours / todayAttendance.filter(a => a.status !== 'absent').length 
    : 0;
  const totalOvertime = todayAttendance.reduce((sum, a) => sum + a.overtime, 0);
  const attendanceRate = totalActiveEmployees > 0 ? (presentToday / totalActiveEmployees) * 100 : 0;

  // Department statistics
  const departments = ['Design', 'Engineering', 'Product', 'Human Resources', 'Sales'];
  const departmentStats: DepartmentAttendanceStats[] = departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept && e.status === 'active');
    const deptAttendance = todayAttendance.filter(a => 
      deptEmployees.some(e => e.id === a.employeeId)
    );
    const deptPresent = deptAttendance.filter(a => a.status === 'present').length;
    const deptLate = deptAttendance.filter(a => a.status === 'late').length;
    return { 
      department: dept, 
      total: deptEmployees.length, 
      present: deptPresent, 
      absent: deptEmployees.length - deptPresent, 
      late: deptLate, 
      attendanceRate: deptEmployees.length > 0 ? (deptPresent / deptEmployees.length) * 100 : 0 
    };
  });

  // Filter attendance
  const getFilteredAttendance = () => {
    let filtered = attendanceRecords.filter(a => a.date === selectedDate);
    if (filterStatus !== 'all') filtered = filtered.filter(a => a.status === filterStatus);
    if (filterDepartment !== 'all') {
      const deptEmployeeIds = employees.filter(e => e.department === filterDepartment).map(e => e.id);
      filtered = filtered.filter(a => deptEmployeeIds.includes(a.employeeId));
    }
    if (searchQuery) filtered = filtered.filter(a => 
      a.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered;
  };

  const filteredAttendance = getFilteredAttendance();

  // Weekly chart data
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const weeklyData: WeeklyAttendance[] = last7Days.map(date => {
    const dayRecords = attendanceRecords.filter(a => a.date === date);
    const present = dayRecords.filter(a => a.status === 'present').length;
    const late = dayRecords.filter(a => a.status === 'late').length;
    const total = dayRecords.length;
    return { 
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }), 
      date, 
      present, 
      absent: total - present - late, 
      late, 
      total 
    };
  });

  const maxValue = Math.max(...weeklyData.map(d => d.total), 5);

  // Employee CRUD operations
  const generateEmployeeCode = () => {
    const nextNum = employees.length + 1;
    return `EMP${String(nextNum).padStart(3, '0')}`;
  };

  const handleAddEmployee = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      alert('Please fill all required fields');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      employeeCode: generateEmployeeCode(),
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      email: formData.email!,
      phone: formData.phone || '',
      department: formData.department!,
      designation: formData.designation || '',
      joiningDate: new Date().toISOString().split('T')[0],
      status: formData.status as 'active' | 'inactive' | 'on_leave' || 'active',
      salary: formData.salary || 0
    };

    setEmployees([...employees, newEmployee]);
    resetModal();
  };

  const handleUpdateEmployee = () => {
    if (!editingEmployee || !formData.firstName) return;
    
    const updatedEmployees = employees.map(emp => 
      emp.id === editingEmployee.id 
        ? { ...emp, ...formData as Partial<Employee> }
        : emp
    );
    setEmployees(updatedEmployees);
    resetModal();
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      salary: 0,
      status: 'active'
    });
  };

  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsModalOpen(true);
  };

  // Export functionality
  const handleExportCSV = () => {
    const headers = ['Employee Name', 'Department', 'Designation', 'Check In', 'Check Out', 'Work Hours', 'Break', 'Overtime', 'Status'];
    const rows = filteredAttendance.map(att => {
      const emp = employees.find(e => e.id === att.employeeId);
      return [
        att.employeeName,
        emp?.department || '',
        emp?.designation || '',
        att.checkIn,
        att.checkOut,
        att.workHours,
        att.breakHours,
        att.overtime,
        att.status
      ];
    });
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportStatsCSV = () => {
    const headers = ['Department', 'Total Employees', 'Present', 'Absent', 'Late', 'Attendance Rate (%)'];
    const rows = departmentStats.map(dept => [
      dept.department,
      dept.total,
      dept.present,
      dept.absent,
      dept.late,
      dept.attendanceRate.toFixed(1)
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `department_stats_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: Attendance['status'] }) => {
    const config: Record<string, string> = {
      present: 'bg-green-50 text-green-700 border-green-200',
      absent: 'bg-red-50 text-red-700 border-red-200',
      late: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'half-day': 'bg-orange-50 text-orange-700 border-orange-200',
    };
    const icons: Record<string, any> = { 
      present: CheckCircle, 
      absent: XCircle, 
      late: AlertCircle, 
      'half-day': Clock 
    };
    const Icon = icons[status];
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config[status]} transition-all duration-200 hover:scale-105`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-105">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">BusinessOS</h1>
                  <p className="text-xs text-gray-500">HRMS Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-105 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-105">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Takiya Baksh</p>
                  <p className="text-xs text-gray-500">UI/UX Designer</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
                  <UserCircle className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Track employee attendance accurately and manage time effortlessly.</p>
        </div>

        {/* Stats Grid - Row 1 with hover animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{totalActiveEmployees}</p>
                <p className="text-xs text-gray-400 mt-1">Active employees</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs font-medium text-green-600">+3 from last month</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-200">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Present Today</p>
                <p className="text-2xl font-bold text-gray-800">{presentToday}/{totalActiveEmployees}</p>
                <p className="text-xs text-gray-400 mt-1">{attendanceRate.toFixed(1)}% rate</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs font-medium text-green-600">+2% from yesterday</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-200">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Late Arrivals</p>
                <p className="text-2xl font-bold text-gray-800">{lateToday}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-xs font-medium text-red-600">-5% from last week</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-yellow-50 group-hover:bg-yellow-100 transition-colors duration-200">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">On Leave</p>
                <p className="text-2xl font-bold text-gray-800">{onLeaveToday}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs font-medium text-gray-500">Same as last week</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-orange-50 group-hover:bg-orange-100 transition-colors duration-200">
                <Coffee className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Work Hours</p>
                <p className="text-2xl font-bold text-gray-800">{avgWorkHours.toFixed(1)}h</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs font-medium text-green-600">+0.5h from last week</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors duration-200">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Overtime</p>
                <p className="text-2xl font-bold text-gray-800">{totalOvertime} min</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs font-medium text-green-600">+8% from last week</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Attendance Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Attendance Trend</h3>
                <p className="text-xs text-gray-400 mt-0.5">Last 7 days overview</p>
              </div>
              <select className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
              </select>
            </div>
            
            <div className="h-64">
              <div className="flex h-full items-end gap-2">
                {weeklyData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-green-100 rounded-t transition-all duration-500 group-hover:opacity-80"
                        style={{ height: `${(data.present / maxValue) * 160}px`, minHeight: '4px' }}
                      >
                        <div className="w-full bg-green-500 rounded-t transition-all duration-300 group-hover:bg-green-600" style={{ height: '100%' }} />
                      </div>
                      {data.late > 0 && (
                        <div 
                          className="w-full bg-yellow-100 rounded-t absolute bottom-0 transition-all duration-500"
                          style={{ height: `${(data.late / maxValue) * 160}px`, minHeight: '2px' }}
                        >
                          <div className="w-full bg-yellow-500 rounded-t transition-all duration-300 group-hover:bg-yellow-600" style={{ height: '100%' }} />
                        </div>
                      )}
                    </div>
                    <div className="text-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs font-medium text-gray-700">{data.day}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{data.present}/{data.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-xs text-gray-600">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-xs text-gray-600">Absent</span>
              </div>
            </div>
          </div>

          {/* Department Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Department Overview</h3>
              <div className="flex gap-2">
                <button onClick={handleExportStatsCSV} className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="Export Stats">
                  <Download className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                </button>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-3">
              {departmentStats.map((dept, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{dept.department}</h4>
                    <span className="text-xs text-gray-400">{dept.present}/{dept.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 rounded-full h-2 transition-all duration-700 hover:bg-indigo-600" 
                      style={{ width: `${dept.attendanceRate}%` }} 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{dept.attendanceRate.toFixed(1)}% attendance</p>
                  {dept.late > 0 && (
                    <p className="text-xs text-yellow-600 mt-1">{dept.late} late arrivals</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search employees..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all duration-200 focus:scale-105" 
                />
              </div>
              
              <select 
                value={filterDepartment} 
                onChange={(e) => setFilterDepartment(e.target.value)} 
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)} 
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
              
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-1 border border-gray-200 hover:scale-105">
                <RefreshCw className="w-4 h-4" />
                Sync
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-1 border border-gray-200 hover:scale-105">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button 
                onClick={handleExportCSV}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:scale-105 hover:shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Break</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAttendance.map((att) => {
                  const emp = employees.find(e => e.id === att.employeeId);
                  if (!emp) return null;
                  return (
                    <tr key={att.id} className="hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <span className="text-sm font-medium text-indigo-600">
                              {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{att.employeeName}</p>
                            <p className="text-xs text-gray-500">{emp.designation}</p>
                          </div>
                        </div>
                        </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{att.checkIn}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{att.checkOut}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{att.workHours}h</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{att.breakHours}h</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-medium">{att.overtime} min</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={att.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => openEditModal(emp)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            <Edit className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEmployee(emp.id)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
              <h3 className="text-lg font-semibold text-white">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <button onClick={resetModal} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1234567890"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Department</option>
                    <option value="Design">Design</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation || ''}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Job title"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="number"
                    value={formData.salary || ''}
                    onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Annual salary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={resetModal}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
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

export default AttendanceTracker;