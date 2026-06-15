// //  export interface Employee {
// //   id: string;
// //   employeeCode: string;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   phone: string;
// //   department: string;
// //   designation: string;
// //   reportingManager?: string;
// //   joiningDate: string;
// //   status: 'active' | 'inactive' | 'on_leave';
// //   salary: number;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export interface EmployeeFilters {
// //   search?: string;
// //   department?: string;
// //   status?: string;
// //   page: number;
// //   limit: number;
// // }

// // export interface EmployeeListResponse {
// //   employees: Employee[];
// //   total: number;
// //   page: number;
// //   totalPages: number;
// // }

// // export {};  // ← ADD THIS LINE
// // types/employee.types.ts
// export interface Employee {
//   id: string;
//   employeeCode: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   department: string;
//   designation: string;
//   reportingManager?: string;
//   joiningDate: string;
//   status: 'active' | 'inactive' | 'on_leave';
//   salary: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface EmployeeFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   department: string;
//   designation: string;
//   reportingManager?: string;
//   joiningDate: string;
//   salary: number;
// }

// export interface EmployeeFilters {
//   search?: string;
//   department?: string;
//   status?: string;
//   page: number;
//   limit: number;
// }

// export interface EmployeeListResponse {
//   employees: Employee[];
//   total: number;
//   page: number;
//   totalPages: number;
// }

// export interface Attendance {
//   id: string;
//   employeeId: string;
//   employeeName: string;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   workHours: number;
//   breakHours: number;
//   overtime: number;
//   status: 'present' | 'absent' | 'late' | 'half-day';
//   lateMinutes: number;
//   notes?: string;
// }

// export interface AttendanceFilters {
//   search?: string;
//   status?: string;
//   department?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   page: number;
//   limit: number;
// }

// export interface AttendanceListResponse {
//   attendances: Attendance[];
//   total: number;
//   page: number;
//   totalPages: number;
// }

// export interface LeaveRequest {
//   id: string;
//   employeeId: string;
//   employeeName: string;
//   department: string;
//   startDate: string;
//   endDate: string;
//   type: 'sick' | 'casual' | 'annual' | 'unpaid';
//   reason: string;
//   status: 'pending' | 'approved' | 'rejected';
//   days: number;
//   approvedBy?: string;
//   approvedAt?: string;
//   rejectionReason?: string;
//   createdAt: string;
// }

// export interface LeaveRequestFormData {
//   employeeId: string;
//   startDate: string;
//   endDate: string;
//   type: 'sick' | 'casual' | 'annual' | 'unpaid';
//   reason: string;
// }

// export interface LeaveFilters {
//   search?: string;
//   status?: string;
//   type?: string;
//   department?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   page: number;
//   limit: number;
// }

// export interface LeaveListResponse {
//   leaveRequests: LeaveRequest[];
//   total: number;
//   page: number;
//   totalPages: number;
// }

// export interface LeaveBalance {
//   employeeId: string;
//   employeeName: string;
//   annual: { total: number; used: number; remaining: number };
//   sick: { total: number; used: number; remaining: number };
//   casual: { total: number; used: number; remaining: number };
//   unpaid: { total: number; used: number; remaining: number };
// }

// export interface PayrollRecord {
//   id: string;
//   employeeId: string;
//   employeeName: string;
//   month: string;
//   year: number;
//   basicSalary: number;
//   hra: number;
//   allowances: number;
//   bonus: number;
//   deductions: number;
//   tax: number;
//   netSalary: number;
//   status: 'pending' | 'processed' | 'paid';
//   paymentDate?: string;
// }

// export interface Department {
//   id: string;
//   name: string;
//   managerId?: string;
//   managerName?: string;
//   employeeCount: number;
//   budget: number;
//   createdAt: string;
// }

// export interface AttendanceSummary {
//   totalEmployees: number;
//   presentToday: number;
//   absentToday: number;
//   lateToday: number;
//   onLeaveToday: number;
//   averageWorkHours: number;
//   totalOvertime: number;
//   attendanceRate: number;
//   weeklyData: WeeklyAttendance[];
// }

// export interface WeeklyAttendance {
//   day: string;
//   date: string;
//   present: number;
//   absent: number;
//   late: number;
//   total: number;
// }

// export interface DepartmentAttendanceStats {
//   department: string;
//   total: number;
//   present: number;
//   absent: number;
//   late: number;
//   attendanceRate: number;
// }

// export {};  // Makes it a module
// types/employee.types.ts
export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  reportingManager?: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  salary: number;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
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
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'casual' | 'annual' | 'unpaid';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  casual: { total: number; used: number; remaining: number };
  unpaid: { total: number; used: number; remaining: number };
}

export interface DepartmentAttendanceStats {
  department: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
}

export interface WeeklyAttendance {
  day: string;
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

export {};  // Makes it a module