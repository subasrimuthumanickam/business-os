 export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export const ProductController = {
  getAll: async (): Promise<Product[]> => {
    return [];
  },
  getLowStock: async (): Promise<Product[]> => {
    return [];
  },
  create: async (data: any): Promise<Product> => {
    return {} as Product;
  },
  updateStock: async (id: string, quantity: number): Promise<Product> => {
    return {} as Product;
  }
};

export {};  // ← ADD THIS
