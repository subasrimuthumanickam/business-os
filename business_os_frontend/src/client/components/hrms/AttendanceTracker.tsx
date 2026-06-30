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
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
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
  try {
    const response = await fetch(
      "http://localhost:5000/api/hrms/attendance"
    );

    const data = await response.json();

    setRecords(data.data || []);

    if (onAttendanceUpdate) {
      onAttendanceUpdate(data.data || []);
    }
  } catch (error) {
    console.error(
      "Error fetching attendance:",
      error
    );
  }
};

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'present':
        return 'text-green-700 bg-green-50';
      case 'absent':
        return 'text-red-700 bg-red-50';
      case 'late':
        return 'text-yellow-700 bg-yellow-50';
      case 'half-day':
        return 'text-blue-700 bg-blue-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const handleStatusChange = async (id: string, newStatus: AttendanceRecord['status']) => {
    try {
      const updatedRecords = records.map(record =>
        record.id === id ? { ...record, status: newStatus } : record
      );
      setRecords(updatedRecords);
      if (onAttendanceUpdate) onAttendanceUpdate(updatedRecords);
      if (selectedRecord?.id === id) {
        setSelectedRecord({ ...selectedRecord, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating attendance status:', error);
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

  const handleRecordClick = (record: AttendanceRecord) => {
    setSelectedRecord(selectedRecord?.id === record.id ? null : record);
  };

  return (
    <div className="flex h-full w-full bg-white">
      {/* Table Section - 60% width */}
      <div className="w-[60%] border-r border-gray-200 bg-white overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Attendance</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {filteredRecords.length}
            </span>
          </div>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half Day</option>
            </select>
            <button
              onClick={() => setShowMarkModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              + Mark
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-3">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="pb-2 font-medium text-left">Employee</th>
                <th className="pb-2 font-medium text-left">Code</th>
                <th className="pb-2 font-medium text-left">Check In</th>
                <th className="pb-2 font-medium text-left">Check Out</th>
                <th className="pb-2 font-medium text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record: AttendanceRecord) => (
                  <tr
                    key={record.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedRecord?.id === record.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleRecordClick(record)}
                  >
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-sm text-gray-600">{record.employeeCode}</td>
                    <td className="py-2.5 pr-3 text-sm text-gray-600">{record.checkIn}</td>
                    <td className="py-2.5 pr-3 text-sm text-gray-600">{record.checkOut}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <div className="mt-3 text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 pt-3">
            <span>Displaying {filteredRecords.length} of {records.length}</span>
            <span>Rows per page: 10</span>
          </div>
        </div>
      </div>

      {/* Detail Panel - 40% width */}
      <div className="w-[40%] bg-white p-5 overflow-auto">
        {selectedRecord ? (
          <div>
            <h2 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              Attendance Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-medium">
                  {selectedRecord.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-base font-bold text-gray-800">{selectedRecord.employeeName}</p>
                  <p className="text-sm text-gray-500">{selectedRecord.employeeCode}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(selectedRecord.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400">Check In</p>
                  <p className="text-sm font-medium text-gray-800">{selectedRecord.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Check Out</p>
                  <p className="text-sm font-medium text-gray-800">{selectedRecord.checkOut}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</p>
                <select
                  value={selectedRecord.status}
                  onChange={(e) => handleStatusChange(selectedRecord.id, e.target.value as AttendanceRecord['status'])}
                  className={`mt-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedRecord.status)}`}
                >
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                  <option value="half-day">Half Day</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400">Working Hours</p>
                  <p className="text-sm font-medium text-gray-800">{selectedRecord.workingHours}h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Overtime</p>
                  <p className="text-sm font-medium text-blue-600">{selectedRecord.overtime ? `${selectedRecord.overtime}h` : '-'}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Actions</p>
                <div className="flex flex-wrap gap-2">
                  <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition">
                    Edit
                  </button>
                  <button className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-lg hover:bg-green-100 transition">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Select a record to view details
          </div>
        )}
      </div>

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mark Attendance</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option value="">Select employee</option>
                  <option value="EMP001">Takiya Baksh</option>
                  <option value="EMP002">John Smith</option>
                  <option value="EMP003">Sarah Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                  <option value="half-day">Half Day</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
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