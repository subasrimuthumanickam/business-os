import React, { useState } from 'react';

interface EmployeeData {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  attendance: number;
  status: string;
}

const EmployeeReport: React.FC = () => {
  const [department, setDepartment] = useState('all');
  const [employees] = useState<EmployeeData[]>([
    { id: '1', name: 'John Doe', department: 'IT', position: 'Software Engineer', salary: 75000, attendance: 92, status: 'Active' },
    { id: '2', name: 'Jane Smith', department: 'HR', position: 'HR Manager', salary: 65000, attendance: 88, status: 'Active' },
    { id: '3', name: 'Mike Johnson', department: 'Sales', position: 'Sales Executive', salary: 55000, attendance: 95, status: 'Active' },
    { id: '4', name: 'Sarah Williams', department: 'IT', position: 'Senior Developer', salary: 95000, attendance: 45, status: 'Inactive' },
    { id: '5', name: 'David Brown', department: 'Finance', position: 'Accountant', salary: 58000, attendance: 85, status: 'Active' },
  ]);

  const departments = ['all', ...new Set(employees.map(e => e.department))];
  const filteredEmployees = department === 'all' ? employees : employees.filter(e => e.department === department);
  
  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(e => e.status === 'Active').length;
  const totalSalary = filteredEmployees.reduce((sum, e) => sum + e.salary, 0);
  const avgAttendance = Math.round(filteredEmployees.reduce((sum, e) => sum + e.attendance, 0) / totalEmployees);

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Department', 'Position', 'Salary', 'Attendance', 'Status'],
      ...filteredEmployees.map(e => [e.name, e.department, e.position, e.salary, e.attendance, e.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="employee-report">
      <div className="report-header">
        <h2>Employee Report</h2>
        <div className="report-controls">
          <select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            className="period-select"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
            ))}
          </select>
          <button className="btn-export" onClick={handleExport}>Export Report</button>
        </div>
      </div>

      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="stat-label">TOTAL EMPLOYEES</div>
          <div className="stat-value">{totalEmployees}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">ACTIVE</div>
          <div className="stat-value">{activeEmployees}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">TOTAL SALARY</div>
          <div className="stat-value">₹{totalSalary.toLocaleString()}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">AVG ATTENDANCE</div>
          <div className="stat-value">{avgAttendance}%</div>
        </div>
      </div>

      <div className="report-table-container">
        <h3>Employee Details</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DEPARTMENT</th>
              <th>POSITION</th>
              <th>SALARY</th>
              <th>ATTENDANCE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>₹{emp.salary.toLocaleString()}</td>
                <td>{emp.attendance}%</td>
                <td>
                  <span className={`status-${emp.status.toLowerCase()}`}>{emp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReport;