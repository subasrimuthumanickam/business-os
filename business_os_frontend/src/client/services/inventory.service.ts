// import { Product, CreateProductDTO, UpdateProductDTO } from '../types/Inventory.types';
// import { apiService } from './api.service';

// export class InventoryService {
//   private static instance: InventoryService;

//   private constructor() {}

//   static getInstance(): InventoryService {
//     if (!InventoryService.instance) {
//       InventoryService.instance = new InventoryService();
//     }
//     return InventoryService.instance;
//   }

//   async getProducts(): Promise<Product[]> {
//     return apiService.get<Product[]>('/inventory');
//   }

//   async getProductById(id: string): Promise<Product> {
//     return apiService.get<Product>(`/inventory/${id}`);
//   }

//   async createProduct(product: CreateProductDTO): Promise<Product> {
//     return apiService.post<Product>('/inventory', product);
//   }

//   async updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
//     return apiService.put<Product>(`/inventory/${id}`, updates);
//   }

//   async deleteProduct(id: string): Promise<void> {
//     return apiService.delete(`/inventory/${id}`);
//   }

//   async addStock(id: string, quantity: number): Promise<Product> {
//     return apiService.post<Product>(`/inventory/${id}/stock`, { quantity });
//   }

//   async removeStock(id: string, quantity: number): Promise<Product> {
//     return apiService.post<Product>(`/inventory/${id}/stock/remove`, { quantity });
//   }

//   async bulkDeleteProduct(ids: string[]): Promise<void> {
//     return apiService.post<void>('/inventory/bulk-delete', { ids });
//   }

//   async searchProducts(query: string): Promise<Product[]> {
//     return apiService.get<Product[]>(`/inventory/search?q=${query}`);
//   }

//   async getCategories(): Promise<string[]> {
//     return apiService.get<string[]>('/inventory/categories');
//   }

//   async getCollections(): Promise<string[]> {
//     return apiService.get<string[]>('/inventory/collections');
//   }
// }
import { Product, CreateProductDTO, UpdateProductDTO } from '../types/Inventory.types';
import { apiService } from './api.service';

export class InventoryService {
  private static instance: InventoryService;

  private constructor() {}

  static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  async getProducts(): Promise<Product[]> {
    return apiService.get<Product[]>('/inventory');
  }

  async getProductById(id: string): Promise<Product> {
    return apiService.get<Product>(`/inventory/${id}`);
  }

  async createProduct(product: CreateProductDTO): Promise<Product> {
    return apiService.post<Product>('/inventory', product);
  }

  async updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
    return apiService.put<Product>(`/inventory/${id}`, updates);
  }

  async deleteProduct(id: string): Promise<void> {
    return apiService.delete(`/inventory/${id}`);
  }

  async addStock(id: string, quantity: number): Promise<Product> {
    return apiService.post<Product>(`/inventory/${id}/stock`, { quantity });
  }

  async removeStock(id: string, quantity: number): Promise<Product> {
    return apiService.post<Product>(`/inventory/${id}/stock/remove`, { quantity });
  }

  async bulkDeleteProduct(ids: string[]): Promise<void> {
    return apiService.post<void>('/inventory/bulk-delete', { ids });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/inventory/search?q=${query}`);
  }

  async getCategories(): Promise<string[]> {
    return apiService.get<string[]>('/inventory/categories');
  }

  async getCollections(): Promise<string[]> {
    return apiService.get<string[]>('/inventory/collections');
  }

  // ✅ ADD THIS - Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/inventory?category=${category}`);
  }

  // ✅ ADD THIS - Get products by status
  async getProductsByStatus(status: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/inventory?status=${status}`);
  }

  // ✅ ADD THIS - Get products by digital type
  async getProductsByDigitalType(digital: 'Yes' | 'No'): Promise<Product[]> {
    return apiService.get<Product[]>(`/inventory?digital=${digital}`);
  }

  // ✅ ADD THIS - Get low stock products
  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    return apiService.get<Product[]>(`/inventory?lowStock=true&threshold=${threshold}`);
  }
}