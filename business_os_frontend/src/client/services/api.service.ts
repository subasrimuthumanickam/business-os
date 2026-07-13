
const API_BASE_URL = 'http://localhost:5000/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // Backend responses follow { success, message, data } shape
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }

  return data as T;
}

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data || {}),
    });
    return handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data || {}),
    });
    return handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data || {}),
    });
    return handleResponse<T>(response);
  }

  async delete<T = void>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  }
}

export const apiService = ApiService.getInstance();

export const reportService = {
  getProfitAndLoss: (params: { from: string; to: string }) =>
    apiService.get(`/reports/profit-loss?${new URLSearchParams(params).toString()}`),

  getBalanceSheet: () =>
    apiService.get('/reports/balance-sheet'),

  getCashFlow: (params: { from: string; to: string }) =>
    apiService.get(`/reports/cash-flow?${new URLSearchParams(params).toString()}`),

  getSalesByCustomer: () =>
    apiService.get('/reports/sales-by-customer'),

  getSalesByItem: () =>
    apiService.get('/reports/sales-by-item'),

  getSalesBySalesPerson: () =>
    apiService.get('/reports/sales-by-sales-person'),

  getInventorySummary: () =>
    apiService.get('/reports/inventory-summary'),
  
  getInventoryValuationSummary: () =>
  apiService.get('/reports/inventory-valuation-summary'),

  getProductSalesReport: () =>
  apiService.get('/reports/product-sales'),

  getLandedCostSummary: () =>
    apiService.get('/reports/landed-cost'),

  getFifoCostLotTracking: () =>
    apiService.get('/reports/fifo-cost-lot-tracking'),

  getCustomerSummary: () =>
    apiService.get('/reports/customer-summary'),
  
  getCustomerAging: () =>
    apiService.get('/reports/customer-aging'),

  getLeadSummary: () =>
    apiService.get('/reports/lead-summary'),

  getCustomerTransactions: () =>
    apiService.get('/reports/customer-transactions'),
};

export const vendorService = {
  getAll: () => apiService.get('/vendors'),
  create: (data: { name: string; email?: string; phone?: string; address?: string }) =>
    apiService.post('/vendors/create', data),
};

export const purchaseOrderService = {
  getAll: () => apiService.get('/purchase-orders'),
  getById: (id: number) => apiService.get(`/purchase-orders/${id}`),
  create: (data: any) => apiService.post('/purchase-orders/create', data),
  receive: (id: number) => apiService.put(`/purchase-orders/${id}/receive`),
};

export const productService = {
  getAll: () => apiService.get('/products'),
};

export const companyService = {
  getProfile: <T = any>() =>
    apiService.get<T>('/company/profile'),

  updateProfile: <T = any>(data: {
    company_name: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    pincode?: string | null;
    gst_number?: string | null;
    phone?: string | null;
    email?: string | null;
    currency?: string | null;
    timezone?: string | null;
    fiscal_year_start?: string | null;
    date_format?: string | null;
    default_language?: string | null;
    time_format?: string | null;
  }) =>
    apiService.put<T>('/company/profile', data),
};