 import React, { useState, useEffect } from 'react';

interface EmployeeData {
  id: string;
  name: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive';
  attendance: number;
}

const EmployeeReport: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      const mockData: EmployeeData[] = [
        { id: '1', name: 'John Doe', department: 'IT', position: 'Software Engineer', joinDate: '2023-01-15', salary: 75000, status: 'active', attendance: 92 },
        { id: '2', name: 'Jane Smith', department: 'HR', position: 'HR Manager', joinDate: '2023-02-20', salary: 65000, status: 'active', attendance: 88 },
        { id: '3', name: 'Mike Johnson', department: 'Sales', position: 'Sales Executive', joinDate: '2023-03-10', salary: 55000, status: 'active', attendance: 95 },
        { id: '4', name: 'Sarah Williams', department: 'IT', position: 'Senior Developer', joinDate: '2023-04-05', salary: 95000, status: 'active', attendance: 98 },
        { id: '5', name: 'David Brown', department: 'Finance', position: 'Accountant', joinDate: '2023-05-12', salary: 58000, status: 'inactive', attendance: 45 },
        { id: '6', name: 'Emily Davis', department: 'Marketing', position: 'Marketing Manager', joinDate: '2023-06-18', salary: 68000, status: 'active', attendance: 85 },
      ];
      setEmployees(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const departments = ['all', ...new Set(employees.map(e => e.department))];
  const statuses = ['all', 'active', 'inactive'];

  const filteredEmployees = employees.filter(emp => {
    const matchDept = department === 'all' || emp.department === department;
    const matchStatus = status === 'all' || emp.status === status;
    return matchDept && matchStatus;
  });

  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(e => e.status === 'active').length;
  const inactiveEmployees = filteredEmployees.filter(e => e.status === 'inactive').length;
  const totalSalary = filteredEmployees.reduce((sum, e) => sum + e.salary, 0);
  const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;
  const avgAttendance = totalEmployees > 0 
    ? filteredEmployees.reduce((sum, e) => sum + e.attendance, 0) / totalEmployees 
    : 0;

  const departmentStats = departments.filter(d => d !== 'all').map(dept => ({
    name: dept,
    count: employees.filter(e => e.department === dept).length,
    totalSalary: employees.filter(e => e.department === dept).reduce((sum, e) => sum + e.salary, 0)
  }));

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Department', 'Position', 'Join Date', 'Salary', 'Status', 'Attendance (%)'],
      ...filteredEmployees.map(e => [e.name, e.department, e.position, e.joinDate, e.salary, e.status, e.attendance])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="loading">Loading employee report...</div>;
  }

  return (
    <div className="employee-report">
      <div className="list-header">
        <h2>Employee Report</h2>
        <button className="btn-primary" onClick={handleExport}>Export Report</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Employees</span>
            <span className="stats-card-icon">👥</span>
          </div>
          <div className="stats-card-value">{totalEmployees}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Active</span>
            <span className="stats-card-icon">✅</span>
          </div>
          <div className="stats-card-value">{activeEmployees}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Inactive</span>
            <span className="stats-card-icon">❌</span>
          </div>
          <div className="stats-card-value">{inactiveEmployees}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Avg Attendance</span>
            <span className="stats-card-icon">📊</span>
          </div>
          <div className="stats-card-value">{avgAttendance.toFixed(1)}%</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Department Summary */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Department Summary</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employees</th>
                <th>Total Salary</th>
                <th>Avg Salary</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map(dept => (
                <tr key={dept.name}>
                  <td>{dept.name}</td>
                  <td>{dept.count}</td>
                  <td>₹{dept.totalSalary.toLocaleString()}</td>
                  <td>₹{(dept.totalSalary / dept.count).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Table */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Employee Details</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Join Date</th>
                <th>Salary</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>{emp.joinDate}</td>
                  <td>₹{emp.salary.toLocaleString()}</td>
                  <td>{emp.attendance}%</td>
                  <td>
                    <span className={`status-badge ${emp.status}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
