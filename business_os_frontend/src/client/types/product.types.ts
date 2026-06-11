 export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  status: 'active' | 'inactive';
}

export interface ProductFilters {
  search?: string;
  category?: string;
  lowStockOnly?: boolean;
  page: number;
  limit: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

// This makes it a module
export default {};
