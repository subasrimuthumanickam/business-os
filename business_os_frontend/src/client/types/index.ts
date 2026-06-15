// // Re-export all types
// export type { Customer, CustomerFilters, CustomerListResponse } from './customer.types';
// export type { Product, ProductFilters, ProductListResponse } from './product.types';
// export type { Invoice, InvoiceFilters, InvoiceListResponse } from './invoice.types';

// // Common types
// export interface ApiResponse<T = any> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   error?: string;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export interface FilterParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// // This makes it a module
// export default {};
// types/index.ts
export type {
  Employee,
  Attendance,
  LeaveRequest,
  LeaveBalance,
  DepartmentAttendanceStats,
  WeeklyAttendance,
} from './employee.types';

export default {};