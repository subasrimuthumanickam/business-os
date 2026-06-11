// src/client/models/ProductModel.ts

export interface ProductModel {
  id: string;
  productCode: string;
  name: string;  // Changed from optional to required
  category: string; // Changed from optional to required
  sku: string; // Changed from optional to required
  barcode?: string;
  description?: string;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  taxRate: number;
  minStock: number;
  maxStock: number;
  currentStock: number;
  reorderLevel: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images?: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export const ProductModel = {
  create: (data: Partial<ProductModel>): ProductModel => {
    return {
      id: Date.now().toString(),
      productCode: `PROD-${Date.now()}`,
      name: data.name || '', // Provide default
      category: data.category || '', // Provide default
      sku: data.sku || '', // Provide default
      unit: data.unit || 'pcs',
      purchasePrice: data.purchasePrice || 0,
      sellingPrice: data.sellingPrice || 0,
      mrp: data.mrp || 0,
      taxRate: data.taxRate || 0,
      minStock: data.minStock || 0,
      maxStock: data.maxStock || 0,
      currentStock: data.currentStock || 0,
      reorderLevel: data.reorderLevel || 0,
      status: data.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
  },

  isLowStock: (product: ProductModel): boolean => {
    return product.currentStock <= product.reorderLevel;
  },

  isOutOfStock: (product: ProductModel): boolean => {
    return product.currentStock === 0;
  },
};