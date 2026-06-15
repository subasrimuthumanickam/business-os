// EmployeeList.tsx
import React, { useState } from 'react';
import {
  Users, Search, Mail, Phone, Briefcase, Calendar, MoreVertical, 
  Eye, CheckCircle, XCircle, AlertCircle, UserPlus, Download,
  Filter, ChevronLeft, ChevronRight, Edit, Trash2, X,
  Building2, MapPin, DollarSign
} from 'lucide-react';

// Types
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

// Initial Mock Data
const initialEmployees: Employee[] = [
  { id: '1', employeeCode: 'EMP001', firstName: 'Takiya', lastName: 'Baksh', email: 'takiyabaksh@gmail.com', phone: '+302801431000', department: 'Design', designation: 'UI/UX Designer', joiningDate: '2023-01-15', status: 'active', salary: 75000 },
  { id: '2', employeeCode: 'EMP002', firstName: 'John', lastName: 'Smith', email: 'john.smith@businessos.com', phone: '+302801431001', department: 'Engineering', designation: 'Frontend Developer', joiningDate: '2023-02-20', status: 'active', salary: 85000 },
  { id: '3', employeeCode: 'EMP003', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@businessos.com', phone: '+302801431002', department: 'Product', designation: 'Product Manager', joiningDate: '2023-03-10', status: 'active', salary: 95000 },
  { id: '4', employeeCode: 'EMP004', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@businessos.com', phone: '+302801431003', department: 'Engineering', designation: 'Backend Developer', joiningDate: '2023-01-05', status: 'active', salary: 88000 },
  { id: '5', employeeCode: 'EMP005', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@businessos.com', phone: '+302801431004', department: 'Human Resources', designation: 'HR Specialist', joiningDate: '2023-04-01', status: 'active', salary: 65000 },
  { id: '6', employeeCode: 'EMP006', firstName: 'David', lastName: 'Kim', email: 'david.kim@businessos.com', phone: '+302801431005', department: 'Engineering', designation: 'DevOps Engineer', joiningDate: '2023-05-12', status: 'active', salary: 92000 },
  { id: '7', employeeCode: 'EMP007', firstName: 'Lisa', lastName: 'Wang', email: 'lisa.wang@businessos.com', phone: '+302801431006', department: 'Sales', designation: 'Sales Manager', joiningDate: '2023-06-08', status: 'on_leave', salary: 88000 },
  { id: '8', employeeCode: 'EMP008', firstName: 'Robert', lastName: 'Brown', email: 'robert.brown@businessos.com', phone: '+302801431007', department: 'Marketing', designation: 'Marketing Manager', joiningDate: '2023-07-15', status: 'active', salary: 78000 },
  { id: '9', employeeCode: 'EMP009', firstName: 'Maria', lastName: 'Garcia', email: 'maria.garcia@businessos.com', phone: '+302801431008', department: 'Sales', designation: 'Sales Executive', joiningDate: '2023-08-20', status: 'active', salary: 55000 },
  { id: '10', employeeCode: 'EMP010', firstName: 'James', lastName: 'Wilson', email: 'james.wilson@businessos.com', phone: '+302801431009', department: 'Engineering', designation: 'Senior Developer', joiningDate: '2022-11-10', status: 'active', salary: 105000 },
];

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
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
  
  const itemsPerPage = 6;

  const departments = ['All', 'Design', 'Engineering', 'Product', 'Human Resources', 'Sales', 'Marketing'];

  const getStatusBadge = (status: Employee['status']) => {
    const config = {
      active: 'bg-green-50 text-green-700 border-green-200',
      inactive: 'bg-gray-50 text-gray-700 border-gray-200',
      on_leave: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    const icons = { active: CheckCircle, inactive: XCircle, on_leave: AlertCircle };
    const Icon = icons[status];
    const labels = { active: 'Active', inactive: 'Inactive', on_leave: 'On Leave' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config[status]} transition-all duration-200 hover:scale-105`}>
        <Icon className="w-3 h-3" />
        {labels[status]}
      </span>
    );
  };

  const getFilteredEmployees = () => {
    let filtered = employees;
    if (searchQuery) {
      filtered = filtered.filter(emp =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === filterDepartment);
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(emp => emp.status === filterStatus);
    }
    return filtered;
  };

  const filteredEmployees = getFilteredEmployees();
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'on_leave').length;
  const departmentsCount = [...new Set(employees.map(e => e.department))].length;

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
      if (selectedEmployee?.id === id) setSelectedEmployee(null);
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

  const openAddModal = () => {
    resetModal();
    setIsModalOpen(true);
  };

  // Export functionality
  const handleExportCSV = () => {
    const headers = ['Employee Code', 'First Name', 'Last Name', 'Email', 'Phone', 'Department', 'Designation', 'Joining Date', 'Status', 'Salary'];
    const rows = filteredEmployees.map(emp => [
      emp.employeeCode,
      emp.firstName,
      emp.lastName,
      emp.email,
      emp.phone,
      emp.department,
      emp.designation,
      emp.joiningDate,
      emp.status,
      emp.salary
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // View Employee Details Modal
  const ViewEmployeeModal = ({ employee, onClose }: { employee: Employee; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
          <h3 className="text-lg font-semibold text-white">Employee Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{employee.firstName} {employee.lastName}</h4>
              <p className="text-sm text-gray-500">{employee.employeeCode}</p>
              {getStatusBadge(employee.status)}
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {employee.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {employee.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> {employee.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Designation</p>
                <p className="text-sm text-gray-800">{employee.designation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Joining Date</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {employee.joiningDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Salary</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> ${employee.salary.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
          <button
            onClick={() => {
              onClose();
              openEditModal(employee);
            }}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Employee
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
          <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and view all employee information</p>
        </div>

        {/* Stats Cards with Hover Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{totalEmployees}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Employees</p>
                <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{onLeaveEmployees}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Departments</p>
                <p className="text-2xl font-bold text-purple-600">{departmentsCount}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-lg transition-all duration-300">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, code or email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 bg-white transition-all duration-200 focus:scale-105"
                  />
                </div>

                {/* Department Filter */}
                <select
                  value={filterDepartment}
                  onChange={(e) => {
                    setFilterDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept === 'All' ? 'all' : dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all duration-200 hover:border-indigo-300"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600 scale-105' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600 scale-105' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>

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
                  <UserPlus className="w-4 h-4" />
                  Add Employee
                </button>
              </div>
            </div>
          </div>

          {/* Employee Grid/List View */}
          <div className="p-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedEmployees.map((employee) => (
                  <div key={employee.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-lg font-bold text-indigo-600">
                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{employee.firstName} {employee.lastName}</h4>
                          <p className="text-xs text-gray-500">{employee.designation}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{employee.employeeCode}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => setSelectedEmployee(employee)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => openEditModal(employee)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Edit className="w-3.5 h-3.5 text-gray-400 hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{employee.department}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Joined {employee.joiningDate}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Salary</p>
                        <p className="text-sm font-semibold text-gray-800">${employee.salary.toLocaleString()}</p>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joining Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <span className="text-xs font-bold text-indigo-600">
                                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
                              <p className="text-xs text-gray-400">{employee.employeeCode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{employee.department}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{employee.designation}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{employee.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{employee.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{employee.joiningDate}</td>
                        <td className="px-4 py-3">{getStatusBadge(employee.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => setSelectedEmployee(employee)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Eye className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                            </button>
                            <button 
                              onClick={() => openEditModal(employee)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                            >
                              <Edit className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                            </button>
                            <button 
                              onClick={() => handleDeleteEmployee(employee.id)}
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
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
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
        </div>
      </div>

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
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
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
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                  placeholder="+1234567890"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
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
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
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
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 focus:scale-105"
                    placeholder="Annual salary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
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
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <UserPlus className="w-4 h-4" />
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {selectedEmployee && (
        <ViewEmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
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

export default EmployeeList;