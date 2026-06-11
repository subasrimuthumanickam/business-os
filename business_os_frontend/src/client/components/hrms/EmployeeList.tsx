import React, { useState, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive';
  attendance: number;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setEmployees([
        { id: '1', name: 'John Doe', email: 'john@company.com', department: 'IT', position: 'Software Engineer', joinDate: '2023-01-15', salary: 75000, status: 'active', attendance: 92 },
        { id: '2', name: 'Jane Smith', email: 'jane@company.com', department: 'HR', position: 'HR Manager', joinDate: '2023-02-20', salary: 65000, status: 'active', attendance: 88 },
        { id: '3', name: 'Mike Johnson', email: 'mike@company.com', department: 'Sales', position: 'Sales Executive', joinDate: '2023-03-10', salary: 55000, status: 'active', attendance: 95 },
        { id: '4', name: 'Sarah Williams', email: 'sarah@company.com', department: 'IT', position: 'Senior Developer', joinDate: '2023-04-05', salary: 95000, status: 'inactive', attendance: 45 },
        { id: '5', name: 'David Brown', email: 'david@company.com', department: 'Finance', position: 'Accountant', joinDate: '2023-05-12', salary: 58000, status: 'active', attendance: 85 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusStyle = (status: string) => {
    return status === 'active' 
      ? { bg: '#d1fae5', color: '#065f46' }
      : { bg: '#fee2e2', color: '#991b1b' };
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return '#10b981';
    if (attendance >= 75) return '#f59e0b';
    return '#ef4444';
  };

  const departments = ['all', ...new Set(employees.map(e => e.department))];
  const filteredEmployees = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = departmentFilter === 'all' || e.department === departmentFilter;
    return matchSearch && matchDept;
  });

  // Table styles
  const tableStyles = {
    container: { overflowX: 'auto' as const },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: { 
      padding: '14px 16px', 
      textAlign: 'left' as const, 
      borderBottom: '2px solid #e5e7eb', 
      background: '#f8fafc', 
      fontWeight: 600, 
      color: '#1e293b',
      fontSize: '13px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    td: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb' },
  };

  if (loading) return <div className="loading">Loading employees...</div>;

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2 style={{ color: '#1e293b' }}>Employees</h2>
        <button className="btn-primary" onClick={() => alert('Add Employee')}>+ Add Employee</button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Total Employees</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{employees.length}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Active</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{employees.filter(e => e.status === 'active').length}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Total Salary</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>₹{employees.reduce((s, e) => s + e.salary, 0).toLocaleString()}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Avg Attendance</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>{Math.round(employees.reduce((s, e) => s + e.attendance, 0) / employees.length)}%</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '30px', border: '1px solid #d1d5db', width: '300px', outline: 'none' }}
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white' }}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <div style={tableStyles.container}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>EMPLOYEE NAME</th>
              <th style={tableStyles.th}>EMAIL</th>
              <th style={tableStyles.th}>DEPARTMENT</th>
              <th style={tableStyles.th}>POSITION</th>
              <th style={tableStyles.th}>JOIN DATE</th>
              <th style={tableStyles.th}>SALARY</th>
              <th style={tableStyles.th}>ATTENDANCE</th>
              <th style={tableStyles.th}>STATUS</th>
              <th style={tableStyles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => {
              const statusStyle = getStatusStyle(emp.status);
              return (
                <tr key={emp.id}>
                  <td style={{ ...tableStyles.td, color: '#1e293b', fontWeight: 500 }}>{emp.name}</td>
                  <td style={{ ...tableStyles.td, color: '#475569' }}>{emp.email}</td>
                  <td style={{ ...tableStyles.td, color: '#4f46e5', fontWeight: 500 }}>{emp.department}</td>
                  <td style={{ ...tableStyles.td, color: '#64748b' }}>{emp.position}</td>
                  <td style={{ ...tableStyles.td, color: '#64748b' }}>{new Date(emp.joinDate).toLocaleDateString()}</td>
                  <td style={{ ...tableStyles.td, color: '#4f46e5', fontWeight: 600 }}>₹{emp.salary.toLocaleString()}</td>
                  <td style={{ ...tableStyles.td, color: getAttendanceColor(emp.attendance), fontWeight: 500 }}>{emp.attendance}%</td>
                  <td style={tableStyles.td}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    <button style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', marginRight: '8px', fontSize: '12px' }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;