import React, { useState, useEffect } from 'react';
import { Employee } from '../../types/hrms';

interface EmployeeFormData {
  id?: string;
  name?: string;
  code?: string;
  role?: string;
  email?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  salary?: number;
  status?: 'active' | 'on-leave' | 'inactive';
  skills?: string[];
}

interface EmployeeListProps {
  employees?: Employee[];
  onEmployeeUpdate?: (employees: Employee[]) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ 
  employees: propEmployees,
  onEmployeeUpdate 
}) => {
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || []);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    code: '',
    role: '',
    email: '',
    phone: '',
    department: '',
    joinDate: '',
    salary: 0,
    status: 'active',
    skills: []
  });

  useEffect(() => {
    if (!propEmployees) {
      fetchEmployees();
    }
  }, []);

  const fetchEmployees = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/hrms/employees"
    );

    const data = await response.json();

    setEmployees(data.data || []);
if (selectedEmployee && data.data) {
      const updatedSelectedEmployee = data.data.find(
        (emp: Employee) => String(emp.id) === String(selectedEmployee.id)
      );

      if (updatedSelectedEmployee) {
        setSelectedEmployee(updatedSelectedEmployee);
      }
    }

    if (onEmployeeUpdate) {
      onEmployeeUpdate(data.data || []);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
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
    const response = await fetch(
      `http://localhost:5000/api/hrms/employees/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      fetchEmployees();
      setShowDeleteModal(null);

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

  const handleStatusChange = async (id: string, newStatus: Employee['status']) => {
    try {
      const updatedEmployees = employees.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      );
      setEmployees(updatedEmployees);
      if (onEmployeeUpdate) onEmployeeUpdate(updatedEmployees);
      if (selectedEmployee?.id === id) {
        setSelectedEmployee({ ...selectedEmployee, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const createEmployeeObject = (data: EmployeeFormData, existing?: Employee): Employee => {
    return {
      id: data.id || existing?.id || `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: data.name || existing?.name || '',
      code: data.code || existing?.code || `EMP${String(employees.length + 1).padStart(3, '0')}`,
      role: data.role || existing?.role || '',
      email: data.email || existing?.email || '',
      phone: data.phone || existing?.phone || '',
      department: data.department || existing?.department || '',
      joinDate: data.joinDate || existing?.joinDate || new Date().toISOString().split('T')[0],
      salary: data.salary !== undefined ? data.salary : (existing?.salary || 0),
      status: (data.status as Employee['status']) || existing?.status || 'active',
      skills: data.skills || existing?.skills || []
    };
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/hrms/employees/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (response.ok) {
      fetchEmployees();
      setShowAddModal(false);
      resetForm();
    }
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

  const handleUpdateEmployee = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!editingEmployee) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/hrms/employees/${editingEmployee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    if (response.ok) {
      fetchEmployees();
      setShowAddModal(false);
      setEditingEmployee(null);
      resetForm();
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      role: '',
      email: '',
      phone: '',
      department: '',
      joinDate: '',
      salary: 0,
      status: 'active',
      skills: []
    });
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
    setFormData({
      name: employee.name,
      code: employee.code,
      role: employee.role,
      email: employee.email,
      phone: employee.phone || '',
      department: employee.department,
      joinDate: employee.joinDate,
      salary: employee.salary || 0,
      status: employee.status,
      skills: employee.skills || []
    });
    setShowAddModal(true);
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(selectedEmployee?.id === employee.id ? null : employee);
  };

  return (
    <div className="flex h-full w-full bg-white">
      {/* Table Section - 40% width (reduced) */}
      <div className="w-[40%] border-r border-gray-200 bg-white overflow-hidden flex flex-col">
        {/* Compact Toolbar */}
        <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Employees
            <span className="ml-1.5 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
              {filteredEmployees.length}
            </span>
          </span>
          
          <div className="h-4 w-px bg-gray-200"></div>
          
          <input
            type="text"
            placeholder="Search..."
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Depts</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={handleOpenAddModal}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded-lg transition-colors whitespace-nowrap"
          >
            + Add
          </button>
        </div>

        {/* Table - Only Name column */}
        <div className="flex-1 overflow-auto p-3">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="pb-2 font-medium text-left">Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee: Employee) => (
                  <tr
                    key={employee.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <td className="py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm flex-shrink-0">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{employee.name}</p>
                          <p className="text-xs text-gray-500 truncate">{employee.role}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-400">{employee.code}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-400 truncate">{employee.department}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              employee.status === 'active' ? 'bg-green-100 text-green-700' : 
                              employee.status === 'on-leave' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {employee.status === 'active' ? 'Active' : 
                               employee.status === 'on-leave' ? 'On Leave' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <div className="mt-3 text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 pt-3">
            <span>Displaying {filteredEmployees.length} of {employees.length}</span>
            <span>Rows: 10</span>
          </div>
        </div>
      </div>

      {/* Detail Panel - 60% width (EXTENDED) */}
      <div className="w-[60%] bg-white p-6 overflow-auto">
        {selectedEmployee ? (
          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-4 mb-5">
              Employee Details
            </h2>
            
            <div className="space-y-5">
              {/* Header with Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-medium">
                  {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{selectedEmployee.name}</p>
                  <p className="text-sm text-gray-500">{selectedEmployee.role}</p>
                </div>
              </div>

              {/* Employee Code - Like SKU */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Employee Code</p>
                <p className="text-base font-medium text-gray-800">{selectedEmployee.code}</p>
              </div>

              {/* Status - Like Stock */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' : 
                  selectedEmployee.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedEmployee.status === 'active' ? 'Active' : 
                   selectedEmployee.status === 'on-leave' ? 'On Leave' : 'Inactive'}
                </span>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</p>
                <p className="text-base text-gray-800">{selectedEmployee.email}</p>
                <p className="text-base text-gray-800">{selectedEmployee.phone || '-'}</p>
              </div>

              {/* Department */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Department</p>
                <p className="text-base font-medium text-gray-800">{selectedEmployee.department}</p>
              </div>

              {/* Join Date & Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Join Date</p>
                  <p className="text-base font-medium text-gray-800">
                    {new Date(selectedEmployee.joinDate).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Salary</p>
                  <p className="text-base font-medium text-blue-600">
                    ${selectedEmployee.salary?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Skills</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Actions</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleOpenEditModal(selectedEmployee)}
                    className="text-sm bg-blue-50 text-blue-700 px-4 py-1.5 rounded-lg hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>
                  <button 
                    className="text-sm bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-lg hover:bg-yellow-100 transition"
                  >
                    Leave
                  </button>
                  <button 
                    className="text-sm bg-purple-50 text-purple-700 px-4 py-1.5 rounded-lg hover:bg-purple-100 transition"
                  >
                    Performance
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(selectedEmployee.id)}
                    className="text-sm bg-red-50 text-red-700 px-4 py-1.5 rounded-lg hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-base">
            Select an employee to view details
          </div>
        )}
      </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    // required
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  >
                    <option value="">Select</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.joinDate || ''}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary || ''}
                    onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Employee['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="on-leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEmployee(null);
                    resetForm();
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
                <p className="text-gray-600 mt-1">Are you sure you want to delete this employee?</p>
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