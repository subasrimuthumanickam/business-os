import React, { useState, useEffect } from 'react';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeCode: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  workingHours: number;
  overtime?: number;
}

interface AttendanceTrackerProps {
  records?: AttendanceRecord[];
  onAttendanceUpdate?: (records: AttendanceRecord[]) => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  records: propRecords,
  onAttendanceUpdate
}) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(propRecords || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [markData, setMarkData] = useState({
    employeeId: '',
    checkIn: '',
    checkOut: '',
    status: 'present' as AttendanceRecord['status']
  });

  useEffect(() => {
    if (!propRecords) {
      fetchAttendance();
    }
  }, [selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockRecords: AttendanceRecord[] = [
        {
          id: '1',
          employeeName: 'Takiya Baksh',
          employeeCode: 'EMP001',
          date: selectedDate,
          checkIn: '09:00 AM',
          checkOut: '06:00 PM',
          status: 'present',
          workingHours: 8,
          overtime: 0
        },
        {
          id: '2',
          employeeName: 'John Smith',
          employeeCode: 'EMP002',
          date: selectedDate,
          checkIn: '09:15 AM',
          checkOut: '06:30 PM',
          status: 'late',
          workingHours: 8.25,
          overtime: 0.25
        },
        {
          id: '3',
          employeeName: 'Sarah Johnson',
          employeeCode: 'EMP003',
          date: selectedDate,
          checkIn: '--:--',
          checkOut: '--:--',
          status: 'absent',
          workingHours: 0,
          overtime: 0
        },
        {
          id: '4',
          employeeName: 'Michael Chen',
          employeeCode: 'EMP004',
          date: selectedDate,
          checkIn: '09:00 AM',
          checkOut: '01:00 PM',
          status: 'half-day',
          workingHours: 4,
          overtime: 0
        },
        {
          id: '5',
          employeeName: 'Emily Rodriguez',
          employeeCode: 'EMP005',
          date: selectedDate,
          checkIn: '08:45 AM',
          checkOut: '06:15 PM',
          status: 'present',
          workingHours: 8.5,
          overtime: 0.5
        },
        {
          id: '6',
          employeeName: 'David Kim',
          employeeCode: 'EMP006',
          date: selectedDate,
          checkIn: '09:00 AM',
          checkOut: '07:00 PM',
          status: 'present',
          workingHours: 9,
          overtime: 1
        }
      ];
      setRecords(mockRecords);
      if (onAttendanceUpdate) onAttendanceUpdate(mockRecords);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'present':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'absent':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'late':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'half-day':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = async (id: string, newStatus: AttendanceRecord['status']) => {
    try {
      const updatedRecords = records.map(record =>
        record.id === id ? { ...record, status: newStatus } : record
      );
      setRecords(updatedRecords);
      if (onAttendanceUpdate) onAttendanceUpdate(updatedRecords);
    } catch (error) {
      console.error('Error updating attendance status:', error);
    }
  };

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        employeeName: 'Takiya Baksh', // In real app, get from selected employee
        employeeCode: 'EMP001',
        date: selectedDate,
        checkIn: markData.checkIn || '09:00 AM',
        checkOut: markData.checkOut || '06:00 PM',
        status: markData.status,
        workingHours: 8,
        overtime: 0
      };
      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      if (onAttendanceUpdate) onAttendanceUpdate(updatedRecords);
      setShowMarkModal(false);
      setMarkData({ employeeId: '', checkIn: '', checkOut: '', status: 'present' });
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleExport = async () => {
    try {
      // Simulate export
      alert('Exporting attendance data...');
      // In real app, this would download a CSV or PDF
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  const filteredRecords = records.filter((record: AttendanceRecord) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const presentCount = records.filter(r => r.status === 'present').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const absentCount = records.filter(r => r.status === 'absent').length;

  const formatOvertime = (overtime: number | undefined): string => {
    if (overtime === undefined || overtime === null) {
      return '-';
    }
    return overtime > 0 ? `${overtime}h` : '-';
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
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium">Present</p>
          <p className="text-xl font-bold text-gray-800">{presentCount}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-xs text-yellow-600 font-medium">Late</p>
          <p className="text-xl font-bold text-gray-800">{lateCount}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-red-600 font-medium">Absent</p>
          <p className="text-xl font-bold text-gray-800">{absentCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium">Total</p>
          <p className="text-xl font-bold text-gray-800">{records.length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
            <option value="half-day">Half Day</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button
            onClick={() => setShowMarkModal(true)}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Working Hours
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overtime
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
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No attendance records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record: AttendanceRecord) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        {record.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{record.employeeName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.employeeCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.checkIn}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.checkOut}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.workingHours}h
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatOvertime(record.overtime)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={record.status}
                      onChange={(e) => handleStatusChange(record.id, e.target.value as AttendanceRecord['status'])}
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}
                    >
                      <option value="present">Present</option>
                      <option value="late">Late</option>
                      <option value="absent">Absent</option>
                      <option value="half-day">Half Day</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
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

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mark Attendance</h3>
            <form onSubmit={handleMarkAttendance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee *
                </label>
                <select
                  required
                  value={markData.employeeId}
                  onChange={(e) => setMarkData({ ...markData, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select employee</option>
                  <option value="EMP001">Takiya Baksh</option>
                  <option value="EMP002">John Smith</option>
                  <option value="EMP003">Sarah Johnson</option>
                  <option value="EMP004">Michael Chen</option>
                  <option value="EMP005">Emily Rodriguez</option>
                  <option value="EMP006">David Kim</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check In Time *
                </label>
                <input
                  type="time"
                  required
                  value={markData.checkIn}
                  onChange={(e) => setMarkData({ ...markData, checkIn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check Out Time *
                </label>
                <input
                  type="time"
                  required
                  value={markData.checkOut}
                  onChange={(e) => setMarkData({ ...markData, checkOut: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  required
                  value={markData.status}
                  onChange={(e) => setMarkData({ ...markData, status: e.target.value as AttendanceRecord['status'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                  <option value="half-day">Half Day</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Mark Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;