import { Product, CreateProductDTO, UpdateProductDTO, ProductTransaction, ProductHistoryEntry } from '../types/Inventory.types';
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
    const products = await apiService.get<any[]>('/products');
    return products.map(normalizeProduct);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await apiService.get<any>(`/products/${id}`);
    return normalizeProduct(product);
  }

  async createProduct(product: CreateProductDTO): Promise<Product> {
    const result = await apiService.post<{ id: number }>('/products', product);
    return this.getProductById(String(result.id));
  }

  async updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
    await apiService.put(`/products/${id}`, updates);
    return this.getProductById(id);
  }

  async deleteProduct(id: string): Promise<void> {
    return apiService.delete(`/products/${id}`);
  }

  async addStock(id: string, quantity: number, reason?: string): Promise<Product> {
    await apiService.post('/stock-movements/add', { product_id: Number(id), quantity, reason });
    return this.getProductById(id);
  }

  async removeStock(id: string, quantity: number, reason?: string): Promise<Product> {
    await apiService.post('/stock-movements/remove', { product_id: Number(id), quantity, reason });
    return this.getProductById(id);
  }

  async bulkDeleteProduct(ids: string[]): Promise<void> {
    // No bulk-delete endpoint on the backend yet; delete one by one.
    await Promise.all(ids.map((id) => this.deleteProduct(id)));
  }

  async getProductHistory(id: string): Promise<ProductHistoryEntry[]> {
    return apiService.get<ProductHistoryEntry[]>(`/stock-movements/product/${id}`);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await apiService.get<any[]>(`/products?search=${encodeURIComponent(query)}`);
    return products.map(normalizeProduct);
  }

  async getCategories(): Promise<{ id: number; name: string }[]> {
    return apiService.get<{ id: number; name: string }[]>('/categories');
  }

  async getCollections(): Promise<string[]> {
    // Collections aren't backed by the database yet; return an empty list.
    return [];
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await apiService.get<any[]>(`/products?category_id=${categoryId}`);
    return products.map(normalizeProduct);
  }

  async getProductsByStatus(status: string): Promise<Product[]> {
    const products = await apiService.get<any[]>(`/products?status=${status}`);
    return products.map(normalizeProduct);
  }

  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((p) => p.stock_quantity <= threshold);
  }

  async getProductTransactions(id: string): Promise<ProductTransaction[]> {
    return apiService.get<ProductTransaction[]>(`/products/${id}/transactions`);
  }
}

// Converts raw backend row (id: number, stock_quantity as string from MySQL DECIMAL, etc.)
// into the frontend Product shape (id: string, numeric fields normalized).
function normalizeProduct(raw: any): Product {
  return {
    id: String(raw.id),
    name: raw.name,
    sku: raw.sku,
    category_id: raw.category_id ?? null,
    category_name: raw.category_name ?? undefined,
    price: Number(raw.price) || 0,
    cost: Number(raw.cost) || 0,
    stock_quantity: Number(raw.stock_quantity) || 0,
    unit: raw.unit || 'pcs',
    description: raw.description ?? undefined,
    status: raw.status === 'inactive' ? 'inactive' : 'active',
    createdAt: raw.created_at ? new Date(raw.created_at).toISOString() : undefined,
    updatedAt: raw.updated_at ? new Date(raw.updated_at).toISOString() : undefined,
    // Zoho-style fields — now real columns (see migration
    // 2026_06_25_add_zoho_fields_to_products.sql). Falling back to sensible
    // defaults keeps older rows (created before the migration) from
    // rendering as blank/undefined in the UI.
    type: raw.type === 'service' ? 'service' : 'goods',
    tax_preference: raw.tax_preference === 'non-taxable' ? 'non-taxable' : 'taxable',
    sales_account: raw.sales_account ?? undefined,
    purchase_account: raw.purchase_account ?? undefined,
  };
}