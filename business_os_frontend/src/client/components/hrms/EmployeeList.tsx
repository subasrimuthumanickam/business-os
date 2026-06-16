import React, { useState, useEffect } from 'react';
import { Employee } from '../../types/hrms';

interface EmployeeListProps {
  employees?: Employee[];
  onEmployeeUpdate?: (employees: Employee[]) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ 
  employees: propEmployees,
  onEmployeeUpdate 
}) => {
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showViewModal, setShowViewModal] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({});

  useEffect(() => {
    if (!propEmployees) {
      fetchEmployees();
    }
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockEmployees: Employee[] = [
        {
          id: '1',
          name: 'Takiya Baksh',
          code: 'EMP001',
          role: 'UI/UX Designer',
          email: 'takiyabaksh@gmail.com',
          phone: '+302801431000',
          department: 'Design',
          joinDate: '2023-01-15',
          salary: 75000,
          status: 'active',
          skills: ['React', 'TypeScript', 'UI/UX Design', 'Figma']
        },
        {
          id: '2',
          name: 'John Smith',
          code: 'EMP002',
          role: 'Frontend Developer',
          email: 'john.smith@businessos.com',
          phone: '+302801431001',
          department: 'Engineering',
          joinDate: '2023-02-01',
          salary: 88000,
          status: 'active',
          skills: ['React', 'TypeScript', 'Node.js', 'GraphQL']
        },
        {
          id: '3',
          name: 'Sarah Johnson',
          code: 'EMP003',
          role: 'Product Manager',
          email: 'sarah@businessos.com',
          phone: '+302801431002',
          department: 'Product',
          joinDate: '2023-03-10',
          salary: 92000,
          status: 'active',
          skills: ['Product Strategy', 'Agile', 'Communication', 'Leadership']
        },
        {
          id: '4',
          name: 'Michael Chen',
          code: 'EMP004',
          role: 'Backend Developer',
          email: 'michael.chen@businessos.com',
          phone: '+302801431003',
          department: 'Engineering',
          joinDate: '2023-04-01',
          salary: 85000,
          status: 'active',
          skills: ['Node.js', 'Python', 'AWS', 'MongoDB']
        },
        {
          id: '5',
          name: 'Emily Rodriguez',
          code: 'EMP005',
          role: 'HR Specialist',
          email: 'emily@businessos.com',
          phone: '+302801431004',
          department: 'HR',
          joinDate: '2023-04-15',
          salary: 65000,
          status: 'on-leave',
          skills: ['Recruitment', 'Employee Relations', 'Training', 'Payroll']
        },
        {
          id: '6',
          name: 'David Kim',
          code: 'EMP006',
          role: 'DevOps Engineer',
          email: 'david.kim@businessos.com',
          phone: '+302801431005',
          department: 'Engineering',
          joinDate: '2023-05-12',
          salary: 92000,
          status: 'active',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
        }
      ];
      setEmployees(mockEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(mockEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'on-leave':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'inactive':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(updatedEmployees);
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Employee['status']) => {
    try {
      const updatedEmployees = employees.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      );
      setEmployees(updatedEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(updatedEmployees);
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEmployee: Employee = {
        id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        name: formData.name || '',
        code: formData.code || `EMP${String(employees.length + 1).padStart(3, '0')}`,
        role: formData.role || '',
        email: formData.email || '',
        phone: formData.phone || '',
        department: formData.department || '',
        joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
        salary: formData.salary || 0,
        status: (formData.status as Employee['status']) || 'active',
        skills: formData.skills || []
      };
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(updatedEmployees);
      setShowAddModal(false);
      setFormData({});
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedEmployees = employees.map(emp =>
        emp.id === editingEmployee?.id ? { ...emp, ...formData } : emp
      );
      setEmployees(updatedEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(updatedEmployees);
      setShowAddModal(false);
      setEditingEmployee(null);
      setFormData({});
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employees.map(e => e.department))];
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'on-leave').length;
  const inactiveEmployees = employees.filter(e => e.status === 'inactive').length;

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      code: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      role: '',
      email: '',
      phone: '',
      department: '',
      joinDate: new Date().toISOString().split('T')[0],
      salary: 0,
      status: 'active',
      skills: []
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium">Total Employees</p>
          <p className="text-xl font-bold text-gray-800">{totalEmployees}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium">Active</p>
          <p className="text-xl font-bold text-gray-800">{activeEmployees}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-xs text-yellow-600 font-medium">On Leave</p>
          <p className="text-xl font-bold text-gray-800">{onLeaveEmployees}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs text-purple-600 font-medium">Departments</p>
          <p className="text-xl font-bold text-gray-800">{departments.length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, code or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-72 text-sm"
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
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
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
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee: Employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {employee.code}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600">
                    {employee.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {employee.phone || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={employee.status}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value as Employee['status'])}
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowViewModal(employee)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(employee)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(employee.id)}
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

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Employee Details</h3>
              <button
                onClick={() => setShowViewModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-medium">
                  {showViewModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{showViewModal.name}</h4>
                  <p className="text-gray-600">{showViewModal.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Employee Code</p>
                  <p className="font-medium">{showViewModal.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(showViewModal.status)}`}>
                    {showViewModal.status.charAt(0).toUpperCase() + showViewModal.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{showViewModal.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{showViewModal.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{showViewModal.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{new Date(showViewModal.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="text-2xl font-bold text-blue-600">${(showViewModal.salary || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {showViewModal.skills && showViewModal.skills.length > 0 ? (
                      showViewModal.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No skills listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setShowViewModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <form onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="EMP001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@businessos.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.joinDate || ''}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary || ''}
                    onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="75000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Employee['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEmployee(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {editingEmployee ? 'Update' : 'Add'} Employee
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
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Delete Employee</h3>
                <p className="text-gray-600 mt-1">
                  Are you sure you want to delete this employee? This action cannot be undone.
                </p>
              </div>
            </div>
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

export default EmployeeList;