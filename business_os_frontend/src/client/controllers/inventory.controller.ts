import { Product, FilterOptions, CreateProductDTO, UpdateProductDTO } from '../types/Inventory.types';
import { InventoryService } from '../services/inventory.service';
import { InventoryModel } from '../models/inventory.model';

export class InventoryController {
  private service: InventoryService;
  private model: InventoryModel;

  constructor() {
    this.service = InventoryService.getInstance();
    this.model = new InventoryModel();
  }

  async initialize(): Promise<void> {
    try {
      const products = await this.service.getProducts();
      this.model.setProducts(products);
    } catch (error) {
      console.error('Failed to initialize inventory:', error);
      throw error;
    }
  }

  getProducts(): Product[] {
    return this.model.getPaginatedProducts();
  }

  getAllProducts(): Product[] {
    return this.model.getProducts();
  }

  getProductById(id: string): Product | undefined {
    return this.model.getProductById(id);
  }

  getPagination() {
    return this.model.getPagination();
  }

  getFilters() {
    return this.model.getFilters();
  }

  getFilteredProducts(filters: FilterOptions): Product[] {
    this.model.setFilters(filters);
    return this.model.getFilteredProducts();
  }

  async handleFilterChange(filters: Partial<FilterOptions>): Promise<void> {
    this.model.setFilters(filters);
  }

  async handlePageChange(page: number): Promise<void> {
    this.model.setPagination({ currentPage: page });
  }

  async handleRowsPerPageChange(rows: number): Promise<void> {
    this.model.setPagination({ rowsPerPage: rows, currentPage: 1 });
  }

  async handleCreateProduct(productData: CreateProductDTO): Promise<Product> {
    try {
      const newProduct = await this.service.createProduct(productData);
      await this.initialize();
      return newProduct;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  }

  async handleUpdateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
    try {
      const updatedProduct = await this.service.updateProduct(id, updates);
      await this.initialize();
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  }

  async handleDeleteProduct(id: string): Promise<void> {
    try {
      await this.service.deleteProduct(id);
      await this.initialize();
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  async handleAddStock(id: string, quantity: number): Promise<Product> {
    try {
      const product = await this.service.addStock(id, quantity);
      await this.initialize();
      return product;
    } catch (error) {
      console.error('Failed to add stock:', error);
      throw error;
    }
  }

  async handleRemoveStock(id: string, quantity: number): Promise<Product> {
    try {
      const product = await this.service.removeStock(id, quantity);
      await this.initialize();
      return product;
    } catch (error) {
      console.error('Failed to remove stock:', error);
      throw error;
    }
  }

  async handleBulkDelete(ids: string[]): Promise<void> {
    try {
      await this.service.bulkDeleteProduct(ids);
      await this.initialize();
    } catch (error) {
      console.error('Failed to bulk delete products:', error);
      throw error;
    }
  }

  async handleSearch(query: string): Promise<Product[]> {
    try {
      return await this.service.searchProducts(query);
    } catch (error) {
      console.error('Failed to search products:', error);
      throw error;
    }
  }

  // ✅ This method now works because getProductsByCategory exists in service
  async handleGetByCategory(category: string): Promise<Product[]> {
    try {
      return await this.service.getProductsByCategory(category);
    } catch (error) {
      console.error('Failed to get products by category:', error);
      throw error;
    }
  }

  async refresh(): Promise<void> {
    await this.initialize();
  }

  getTotalProducts(): number {
    return this.model.getTotalProducts();
  }

  getProductsByStatus(status: string): Product[] {
    return this.model.getProductsByStatus(status);
  }

  getProductsByCategory(category: string): Product[] {
    return this.model.getProductsByCategory(category);
  }

  getLowStockProducts(threshold: number = 10): Product[] {
    return this.model.getLowStockProducts(threshold);
  }
}