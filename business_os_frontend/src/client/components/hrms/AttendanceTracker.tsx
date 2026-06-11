 import React, { useState, useEffect } from 'react';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  overtime: number;
}

interface Employee {
  id: string;
  name: string;
  department: string;
}

const AttendanceTracker: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      const mockEmployees: Employee[] = [
        { id: '1', name: 'John Doe', department: 'IT' },
        { id: '2', name: 'Jane Smith', department: 'HR' },
        { id: '3', name: 'Mike Johnson', department: 'Sales' },
      ];

      const mockAttendance: AttendanceRecord[] = [
        { id: '1', employeeId: '1', employeeName: 'John Doe', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', totalHours: 9, status: 'present', overtime: 0 },
        { id: '2', employeeId: '1', employeeName: 'John Doe', date: '2024-01-16', checkIn: '09:15', checkOut: '18:00', totalHours: 8.75, status: 'late', overtime: 0 },
        { id: '3', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', totalHours: 9, status: 'present', overtime: 0 },
        { id: '4', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-16', checkIn: '09:00', checkOut: '18:30', totalHours: 9.5, status: 'present', overtime: 0.5 },
        { id: '5', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-15', checkIn: '00:00', checkOut: '00:00', totalHours: 0, status: 'absent', overtime: 0 },
      ];

      setEmployees(mockEmployees);
      setAttendance(mockAttendance);
      setLoading(false);
    }, 500);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonthDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i).toISOString().slice(0, 10));
    }
    return dates;
  };

  const getAttendanceForDate = (employeeId: string, date: string) => {
    return attendance.find(a => a.employeeId === employeeId && a.date === date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return '✅';
      case 'absent': return '❌';
      case 'late': return '⚠️';
      case 'half-day': return '🌓';
      default: return '❓';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'half-day': return 'status-halfday';
      default: return '';
    }
  };

  const filteredEmployees = selectedEmployee === 'all' 
    ? employees 
    : employees.filter(e => e.id === selectedEmployee);

  const dates = getMonthDates();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleCheckIn = (employeeId: string) => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const existingRecord = attendance.find(a => a.employeeId === employeeId && a.date === today);
    
    if (!existingRecord) {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        employeeId,
        employeeName: employees.find(e => e.id === employeeId)?.name || '',
        date: today,
        checkIn: currentTime,
        checkOut: '',
        totalHours: 0,
        status: currentTime > '09:15' ? 'late' : 'present',
        overtime: 0
      };
      setAttendance([...attendance, newRecord]);
      alert(`Check-in successful at ${currentTime}`);
    } else if (!existingRecord.checkOut) {
      alert('Already checked in today! Please check out first.');
    } else {
      alert('Already checked in and out for today!');
    }
  };

  const handleCheckOut = (employeeId: string) => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const record = attendance.find(a => a.employeeId === employeeId && a.date === today);
    
    if (record && !record.checkOut) {
      const checkInTime = new Date(`${today}T${record.checkIn}`);
      const checkOutTime = new Date(`${today}T${currentTime}`);
      let totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      totalHours = Math.round(totalHours * 100) / 100;
      
      const overtime = totalHours > 9 ? totalHours - 9 : 0;
      
      const updatedAttendance = attendance.map(a => 
        a.id === record.id 
          ? { ...a, checkOut: currentTime, totalHours, overtime: Math.round(overtime * 100) / 100 }
          : a
      );
      setAttendance(updatedAttendance);
      alert(`Check-out successful at ${currentTime}. Total hours: ${totalHours}hrs`);
    } else if (!record) {
      alert('You haven\'t checked in today! Please check in first.');
    } else {
      alert('Already checked out today!');
    }
  };

  const summary = () => {
    const employeeStats = employees.map(emp => {
      const empAttendance = attendance.filter(a => a.employeeId === emp.id);
      const present = empAttendance.filter(a => a.status === 'present').length;
      const absent = empAttendance.filter(a => a.status === 'absent').length;
      const late = empAttendance.filter(a => a.status === 'late').length;
      const totalHours = empAttendance.reduce((sum, a) => sum + a.totalHours, 0);
      const totalOvertime = empAttendance.reduce((sum, a) => sum + a.overtime, 0);
      
      return { ...emp, present, absent, late, totalHours, totalOvertime };
    });
    
    return employeeStats;
  };

  if (loading) {
    return <div className="loading">Loading attendance tracker...</div>;
  }

  const stats = summary();

  return (
    <div className="attendance-tracker">
      <div className="list-header">
        <h2>Attendance Tracker</h2>
        <div className="month-navigation">
          <button className="nav-btn" onClick={handlePrevMonth}>◀ Previous</button>
          <span className="current-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button className="nav-btn" onClick={handleNextMonth}>Next ▶</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Employees</span>
            <span className="stats-card-icon">👥</span>
          </div>
          <div className="stats-card-value">{employees.length}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Present Today</span>
            <span className="stats-card-icon">✅</span>
          </div>
          <div className="stats-card-value">
            {attendance.filter(a => a.date === new Date().toISOString().slice(0, 10) && a.status === 'present').length}
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Late Today</span>
            <span className="stats-card-icon">⚠️</span>
          </div>
          <div className="stats-card-value">
            {attendance.filter(a => a.date === new Date().toISOString().slice(0, 10) && a.status === 'late').length}
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Absent Today</span>
            <span className="stats-card-icon">❌</span>
          </div>
          <div className="stats-card-value">
            {attendance.filter(a => a.date === new Date().toISOString().slice(0, 10) && a.status === 'absent').length}
          </div>
        </div>
      </div>

      {/* Employee Filter */}
      <div className="filters-bar">
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="all">All Employees</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>

      {/* Employee Summary Table */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Employee Summary</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Total Hours</th>
                <th>Overtime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.present}</td>
                  <td>{emp.absent}</td>
                  <td>{emp.late}</td>
                  <td>{emp.totalHours.toFixed(1)} hrs</td>
                  <td>{emp.totalOvertime.toFixed(1)} hrs</td>
                  <td>
                    <button className="action-btn checkin" onClick={() => handleCheckIn(emp.id)}>Check In</button>
                    <button className="action-btn checkout" onClick={() => handleCheckOut(emp.id)}>Check Out</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Attendance Grid */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Monthly Attendance Grid</h3>
        </div>
        <div className="attendance-grid">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                {dates.map(date => (
                  <th key={date} className="date-cell">{new Date(date).getDate()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td className="employee-cell">{emp.name}</td>
                  {dates.map(date => {
                    const record = getAttendanceForDate(emp.id, date);
                    return (
                      <td key={date} className={`attendance-cell ${record ? getStatusClass(record.status) : ''}`}>
                        {record ? getStatusIcon(record.status) : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
