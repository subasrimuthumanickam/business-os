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

export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: string;
  page: number;
  limit: number;
}

export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
  page: number;
  totalPages: number;
}

export {};  // ← ADD THIS LINE
