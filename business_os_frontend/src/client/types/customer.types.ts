 export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  status: 'active' | 'inactive';
  totalPurchases: number;
  createdAt: string;
}

export interface CustomerFilters {
  search?: string;
  status?: string;
  page: number;
  limit: number;
}

export interface CustomerListResponse {
  customers: Customer[];
  total: number;
  page: number;
  totalPages: number;
}

// This makes it a module
export default {};
