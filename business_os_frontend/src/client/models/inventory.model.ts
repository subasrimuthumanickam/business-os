// // import { Product, FilterOptions, PaginationOptions } from '../types/inventory.types';
// import { Product, FilterOptions, PaginationOptions } from '../types/Inventory.types';
// export class InventoryModel {
//   private products: Product[] = [];
//   private filters: FilterOptions = {
//     searchTerm: '',
//     category: 'All',
//     digital: 'All',
//     status: 'All',
//     showDeleted: false,
//   };
//   private pagination: PaginationOptions = {
//     currentPage: 1,
//     rowsPerPage: 10,
//     totalItems: 0,
//   };

//   constructor(initialProducts: Product[] = []) {
//     this.products = initialProducts;
//     this.updateTotalItems();
//   }

//   // ============================================
//   // Core Get Methods
//   // ============================================

//   getProducts(): Product[] {
//     return this.products;
//   }

//   setProducts(products: Product[]): void {
//     this.products = products;
//     this.updateTotalItems();
//   }

//   getFilters(): FilterOptions {
//     return { ...this.filters };
//   }

//   setFilters(filters: Partial<FilterOptions>): void {
//     this.filters = { ...this.filters, ...filters };
//     this.pagination.currentPage = 1;
//     this.updateTotalItems();
//   }

//   getPagination(): PaginationOptions {
//     return { ...this.pagination };
//   }

//   setPagination(pagination: Partial<PaginationOptions>): void {
//     this.pagination = { ...this.pagination, ...pagination };
//   }

//   getFilteredProducts(): Product[] {
//     let filtered = [...this.products];

//     if (this.filters.searchTerm) {
//       const search = this.filters.searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         p =>
//           p.name.toLowerCase().includes(search) ||
//           p.sku.includes(search) ||
//           (p.category && p.category.toLowerCase().includes(search))
//       );
//     }

//     if (this.filters.category !== 'All') {
//       filtered = filtered.filter(p => p.category === this.filters.category);
//     }

//     if (this.filters.digital !== 'All') {
//       filtered = filtered.filter(p => p.digital === this.filters.digital);
//     }

//     if (this.filters.status !== 'All') {
//       filtered = filtered.filter(p => p.status === this.filters.status);
//     }

//     return filtered;
//   }

//   getPaginatedProducts(): Product[] {
//     const filtered = this.getFilteredProducts();
//     const start = (this.pagination.currentPage - 1) * this.pagination.rowsPerPage;
//     const end = start + this.pagination.rowsPerPage;
//     return filtered.slice(start, end);
//   }

//   // ============================================
//   // ✅ ADD THIS - Get product by ID
//   // ============================================
//   getProductById(id: string): Product | undefined {
//     return this.products.find(p => p.id === id);
//   }

//   // ============================================
//   // ✅ ADD THIS - Get total number of products
//   // ============================================
//   getTotalProducts(): number {
//     return this.products.length;
//   }

//   // ============================================
//   // ✅ ADD THIS - Get products by status
//   // ============================================
//   getProductsByStatus(status: string): Product[] {
//     return this.products.filter(p => p.status === status);
//   }

//   // ============================================
//   // Additional Helper Methods
//   // ============================================

//   searchProducts(query: string): Product[] {
//     const search = query.toLowerCase();
//     return this.products.filter(
//       p =>
//         p.name.toLowerCase().includes(search) ||
//         p.sku.includes(search) ||
//         (p.category && p.category.toLowerCase().includes(search))
//     );
//   }

//   getProductsByCategory(category: string): Product[] {
//     return this.products.filter(p => p.category === category);
//   }

//   getProductsByDigitalType(digital: 'Yes' | 'No'): Product[] {
//     return this.products.filter(p => p.digital === digital);
//   }

//   getLowStockProducts(threshold: number = 10): Product[] {
//     return this.products.filter(p => p.onHand <= threshold);
//   }

//   getProductCountByStatus(): Record<string, number> {
//     const count: Record<string, number> = {};
//     this.products.forEach(p => {
//       count[p.status] = (count[p.status] || 0) + 1;
//     });
//     return count;
//   }

//   getProductCountByCategory(): Record<string, number> {
//     const count: Record<string, number> = {};
//     this.products.forEach(p => {
//       const category = p.category || 'Uncategorized';
//       count[category] = (count[category] || 0) + 1;
//     });
//     return count;
//   }

//   getTotalStockValue(): number {
//     return this.products.reduce((total, p) => {
//       return total + (p.price || 0) * p.onHand;
//     }, 0);
//   }

//   // ============================================
//   // CRUD Operations
//   // ============================================

//   addProduct(product: Product): void {
//     this.products.push(product);
//     this.updateTotalItems();
//   }

//   updateProduct(id: string, updates: Partial<Product>): void {
//     const index = this.products.findIndex(p => p.id === id);
//     if (index !== -1) {
//       this.products[index] = { ...this.products[index], ...updates };
//       this.updateTotalItems();
//     }
//   }

//   deleteProduct(id: string): void {
//     this.products = this.products.filter(p => p.id !== id);
//     this.updateTotalItems();
//   }

//   bulkDeleteProducts(ids: string[]): void {
//     this.products = this.products.filter(p => !ids.includes(p.id));
//     this.updateTotalItems();
//   }

//   // ============================================
//   // Stock Operations
//   // ============================================

//   updateStock(productId: string, quantity: number, type: 'add' | 'remove'): void {
//     const product = this.products.find(p => p.id === productId);
//     if (product) {
//       if (type === 'add') {
//         product.onHand += quantity;
//         product.available += quantity;
//       } else {
//         product.onHand = Math.max(0, product.onHand - quantity);
//         product.available = Math.max(0, product.available - quantity);
//       }
//       this.updateTotalItems();
//     }
//   }

//   // ============================================
//   // Private Methods
//   // ============================================

//   private updateTotalItems(): void {
//     this.pagination.totalItems = this.getFilteredProducts().length;
//   }
// }

import { Product, FilterOptions, PaginationOptions } from '../types/Inventory.types';

export class InventoryModel {
  private products: Product[] = [];
  private filters: FilterOptions = {
    searchTerm: '',
    category: 'All',
    digital: 'All',
    status: 'All',
    showDeleted: false,
  };
  private pagination: PaginationOptions = {
    currentPage: 1,
    rowsPerPage: 10,
    totalItems: 0,
  };

  constructor(initialProducts: Product[] = []) {
    this.products = initialProducts;
    this.updateTotalItems();
  }

  // ============================================
  // Core Get Methods
  // ============================================

  getProducts(): Product[] {
    return this.products;
  }

  setProducts(products: Product[]): void {
    this.products = products;
    this.updateTotalItems();
  }

  getFilters(): FilterOptions {
    return { ...this.filters };
  }

  setFilters(filters: Partial<FilterOptions>): void {
    this.filters = { ...this.filters, ...filters };
    this.pagination.currentPage = 1;
    this.updateTotalItems();
  }

  getPagination(): PaginationOptions {
    return { ...this.pagination };
  }

  setPagination(pagination: Partial<PaginationOptions>): void {
    this.pagination = { ...this.pagination, ...pagination };
  }

  getFilteredProducts(): Product[] {
    let filtered = [...this.products];

    if (this.filters.searchTerm) {
      const search = this.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(search) ||
          p.sku.includes(search) ||
          (p.category_name && p.category_name.toLowerCase().includes(search))
      );
    }

    if (this.filters.category !== 'All') {
      filtered = filtered.filter(p => String(p.category_id) === this.filters.category);
    }

    if (this.filters.status !== 'All') {
      filtered = filtered.filter(p => p.status === this.filters.status);
    }

    return filtered;
  }

  getPaginatedProducts(): Product[] {
    const filtered = this.getFilteredProducts();
    const start = (this.pagination.currentPage - 1) * this.pagination.rowsPerPage;
    const end = start + this.pagination.rowsPerPage;
    return filtered.slice(start, end);
  }

  // ============================================
  // Get product by ID
  // ============================================
  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // ============================================
  // Get total number of products
  // ============================================
  getTotalProducts(): number {
    return this.products.length;
  }

  // ============================================
  // Get products by status
  // ============================================
  getProductsByStatus(status: string): Product[] {
    return this.products.filter(p => p.status === status);
  }

  // ============================================
  // Additional Helper Methods
  // ============================================

  searchProducts(query: string): Product[] {
    const search = query.toLowerCase();
    return this.products.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.sku.includes(search) ||
        (p.category_name && p.category_name.toLowerCase().includes(search))
    );
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => String(p.category_id) === categoryId);
  }

  getLowStockProducts(threshold: number = 10): Product[] {
    return this.products.filter(p => (p.stock_quantity ?? 0) <= threshold);
  }

  getProductCountByStatus(): Record<string, number> {
    const count: Record<string, number> = {};
    this.products.forEach(p => {
      count[p.status] = (count[p.status] || 0) + 1;
    });
    return count;
  }

  getProductCountByCategory(): Record<string, number> {
    const count: Record<string, number> = {};
    this.products.forEach(p => {
      const category = p.category_name || 'Uncategorized';
      count[category] = (count[category] || 0) + 1;
    });
    return count;
  }

  getTotalStockValue(): number {
    return this.products.reduce((total, p) => {
      return total + (p.price || 0) * (p.stock_quantity ?? 0);
    }, 0);
  }

  // ============================================
  // CRUD Operations
  // ============================================

  addProduct(product: Product): void {
    this.products.push(product);
    this.updateTotalItems();
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.updateTotalItems();
    }
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
    this.updateTotalItems();
  }

  bulkDeleteProducts(ids: string[]): void {
    this.products = this.products.filter(p => !ids.includes(p.id));
    this.updateTotalItems();
  }

  // ============================================
  // Stock Operations
  // Note: actual stock changes go through the backend (stock_movements ledger).
  // This local update just keeps the in-memory model in sync after a refresh.
  // ============================================

  updateStock(productId: string, quantity: number, type: 'add' | 'remove'): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      const current = product.stock_quantity ?? 0;
      if (type === 'add') {
        product.stock_quantity = current + quantity;
      } else {
        product.stock_quantity = Math.max(0, current - quantity);
      }
      this.updateTotalItems();
    }
  }

  // ============================================
  // Private Methods
  // ============================================

  private updateTotalItems(): void {
    this.pagination.totalItems = this.getFilteredProducts().length;
  }
}