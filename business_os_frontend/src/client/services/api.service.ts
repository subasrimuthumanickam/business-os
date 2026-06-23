// // import { Product } from '../types/inventory.types';
// import { Product } from '../types/Inventory.types';
// // ✅ Mock data at the top
// const mockProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Good Samsung A71 Blue, 4Gb',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 185,
//     available: 185,
//     onHold: 740,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '2',
//     name: '001_Apple_iPhone_12 4Gb White',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 877,
//     available: 877,
//     onHold: 12345,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '3',
//     name: 'New NFT Gift',
//     digital: 'Yes',
//     sku: '123456789999',
//     onHand: 536,
//     available: 536,
//     onHold: 130,
//     status: 'Active',
//     category: 'Digital',
//   },
//   {
//     id: '4',
//     name: 'Goldpen',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 738,
//     available: 738,
//     onHold: 583,
//     status: 'Draft',
//     category: 'Office',
//   },
//   {
//     id: '5',
//     name: 'Lenovo Yoga 10X, 512',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 994,
//     available: 994,
//     onHold: 4,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '6',
//     name: 'HPlaptop',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 826,
//     available: 826,
//     onHold: 177,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '7',
//     name: 'New Samsung S23',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 561,
//     available: 561,
//     onHold: 492,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '8',
//     name: 'Motorola',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 922,
//     available: 922,
//     onHold: 647,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '9',
//     name: 'Apple iPhone 12 124Gb',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 196,
//     available: 196,
//     onHold: 703,
//     status: 'Active',
//     category: 'Electronics',
//   },
//   {
//     id: '10',
//     name: 'Apple iPhone 12/256Gb/Black',
//     digital: 'No',
//     sku: '123456789999',
//     onHand: 583,
//     available: 583,
//     onHold: 447,
//     status: 'Active',
//     category: 'Electronics',
//   },
// ];

// export class ApiService {
//   private static instance: ApiService;
//   private products: Product[] = [...mockProducts];
//   private useMock: boolean = true;

//   private constructor() {}

//   static getInstance(): ApiService {
//     if (!ApiService.instance) {
//       ApiService.instance = new ApiService();
//     }
//     return ApiService.instance;
//   }

//   private async delay(ms: number = 300): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   async get<T>(endpoint: string): Promise<T> {
//     await this.delay();
    
//     // ✅ Handle GET /inventory
//     if (endpoint === '/inventory' || endpoint === '/inventory/') {
//       return this.products as unknown as T;
//     }

//     // ✅ Handle GET /inventory/:id
//     const idMatch = endpoint.match(/\/inventory\/([^\/]+)/);
//     if (idMatch) {
//       const id = idMatch[1];
//       const product = this.products.find(p => p.id === id);
//       if (!product) {
//         throw new Error('Product not found');
//       }
//       return product as unknown as T;
//     }

//     // ✅ Handle GET /inventory/search?q=query
//     if (endpoint.includes('/inventory/search')) {
//       const url = new URL(`http://localhost${endpoint}`);
//       const query = url.searchParams.get('q') || '';
//       const results = this.products.filter(p =>
//         p.name.toLowerCase().includes(query.toLowerCase()) ||
//         p.sku.includes(query)
//       );
//       return results as unknown as T;
//     }

//     // ✅ Handle GET /inventory/categories
//     if (endpoint === '/inventory/categories') {
//       const categories = [...new Set(this.products.map(p => p.category || 'Uncategorized'))];
//       return categories as unknown as T;
//     }

//     // ✅ Handle GET /inventory/collections
//     if (endpoint === '/inventory/collections') {
//       return ['Summer Collection', 'Winter Collection', 'Limited Edition'] as unknown as T;
//     }

//     throw new Error(`GET endpoint not found: ${endpoint}`);
//   }

//   async post<T>(endpoint: string, data?: any): Promise<T> {
//     await this.delay();
//     const body = data || {};

//     // ✅ Handle POST /inventory
//     if (endpoint === '/inventory' || endpoint === '/inventory/') {
//       const newProduct = {
//         ...body,
//         id: Date.now().toString(),
//       };
//       this.products.push(newProduct);
//       return newProduct as unknown as T;
//     }

//     // ✅ Handle POST /inventory/:id/stock
//     const stockMatch = endpoint.match(/\/inventory\/([^\/]+)\/stock/);
//     if (stockMatch) {
//       const id = stockMatch[1];
//       const product = this.products.find(p => p.id === id);
//       if (!product) {
//         throw new Error('Product not found');
//       }
      
//       if (endpoint.includes('/stock/remove')) {
//         product.onHand = Math.max(0, product.onHand - (body?.quantity || 0));
//         product.available = Math.max(0, product.available - (body?.quantity || 0));
//       } else {
//         product.onHand += body?.quantity || 0;
//         product.available += body?.quantity || 0;
//       }
//       return product as unknown as T;
//     }

//     // ✅ Handle POST /inventory/bulk-delete
//     if (endpoint === '/inventory/bulk-delete') {
//       const ids = body?.ids || [];
//       this.products = this.products.filter(p => !ids.includes(p.id));
//       return { success: true } as unknown as T;
//     }

//     throw new Error(`POST endpoint not found: ${endpoint}`);
//   }

//   async put<T>(endpoint: string, data?: any): Promise<T> {
//     await this.delay();
//     const body = data || {};

//     // ✅ Handle PUT /inventory/:id
//     const idMatch = endpoint.match(/\/inventory\/([^\/]+)/);
//     if (idMatch) {
//       const id = idMatch[1];
//       const index = this.products.findIndex(p => p.id === id);
//       if (index === -1) {
//         throw new Error('Product not found');
//       }
//       this.products[index] = { ...this.products[index], ...body };
//       return this.products[index] as unknown as T;
//     }

//     throw new Error(`PUT endpoint not found: ${endpoint}`);
//   }

//   async patch<T>(endpoint: string, data?: any): Promise<T> {
//     await this.delay();
//     return this.put<T>(endpoint, data);
//   }

//   async delete(endpoint: string): Promise<void> {
//     await this.delay();

//     // ✅ Handle DELETE /inventory/:id
//     const idMatch = endpoint.match(/\/inventory\/([^\/]+)/);
//     if (idMatch) {
//       const id = idMatch[1];
//       this.products = this.products.filter(p => p.id !== id);
//       return;
//     }

//     throw new Error(`DELETE endpoint not found: ${endpoint}`);
//   }
// }

// export const apiService = ApiService.getInstance();
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