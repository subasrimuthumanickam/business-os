// ============================================
// Product Related Types
// ============================================

export interface Product {
  id: string;
  name: string;
  digital: 'Yes' | 'No';
  sku: string;
  onHand: number;
  available: number;
  onHold: number;
  status: 'Active' | 'Draft' | 'Inactive';
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  price?: number;
  cost?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images?: string[];
  description?: string;
  tags?: string[];
  brand?: string;
  supplier?: string;
  reorderPoint?: number;
  reorderQuantity?: number;
}

// ============================================
// DTO (Data Transfer Object) Types
// ============================================

export interface CreateProductDTO {
  name: string;
  digital: 'Yes' | 'No';
  sku: string;
  onHand: number;
  available: number;
  onHold: number;
  status: 'Active' | 'Draft' | 'Inactive';
  category?: string;
  price?: number;
  cost?: number;
  weight?: number;
  description?: string;
  brand?: string;
  supplier?: string;
  reorderPoint?: number;
  reorderQuantity?: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string;
}

export interface BulkDeleteDTO {
  ids: string[];
  permanent?: boolean;
}

export interface AddStockDTO {
  productId: string;
  quantity: number;
  note?: string;
}

export interface RemoveStockDTO {
  productId: string;
  quantity: number;
  reason?: string;
}

// ============================================
// Filter and Search Types
// ============================================

export interface FilterOptions {
  searchTerm: string;
  category: string;
  digital: string;
  status: string;
  showDeleted: boolean;
  sortBy?: 'name' | 'sku' | 'onHand' | 'available' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  priceRange?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

export interface SearchParams {
  query: string;
  fields?: ('name' | 'sku' | 'category' | 'brand' | 'supplier')[];
  limit?: number;
  offset?: number;
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationOptions {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  totalPages?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationOptions;
}

// ============================================
// Stock Management Types
// ============================================

export interface StockMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUST' | 'HOLD' | 'RELEASE';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  note?: string;
  createdAt: Date;
  createdBy: string;
}

export interface StockAlert {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  reorderPoint: number;
  alertType: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVER_STOCK';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
}

// ============================================
// Category and Collection Types
// ============================================

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: string[]; // Product IDs
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Option Types and Variants
// ============================================

export interface OptionType {
  id: string;
  name: string;
  description?: string;
  values: OptionValue[];
  productId?: string;
  isGlobal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OptionValue {
  id: string;
  value: string;
  label?: string;
  priceAdjustment?: number;
  stockAdjustment?: number;
  sku?: string;
  isDefault?: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  options: Record<string, string>; // optionTypeId: value
  price: number;
  cost: number;
  onHand: number;
  available: number;
  onHold: number;
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Import/Export Types
// ============================================

export interface ImportResult {
  success: boolean;
  importedCount: number;
  failedCount: number;
  errors: ImportError[];
  warning?: string[];
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ExportOptions {
  format: 'CSV' | 'EXCEL' | 'JSON';
  fields?: string[];
  filters?: Partial<FilterOptions>;
}

// ============================================
// Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: Date;
}

export interface InventoryStats {
  totalProducts: number;
  totalCategories: number;
  totalCollections: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalStockValue: number;
  totalCostValue: number;
  mostSoldProduct?: Product;
  topCategory?: Category;
}

// ============================================
// Utility Types
// ============================================

export type ProductStatus = Product['status'];
export type DigitalType = Product['digital'];
export type StockMovementType = StockMovement['type'];
export type AlertSeverity = StockAlert['severity'];
export type AlertType = StockAlert['alertType'];

// ============================================
// Enums for better type safety
// ============================================

export enum ProductStatusEnum {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'Inactive',
}

export enum DigitalTypeEnum {
  YES = 'Yes',
  NO = 'No',
}

export enum StockMovementTypeEnum {
  IN = 'IN',
  OUT = 'OUT',
  ADJUST = 'ADJUST',
  HOLD = 'HOLD',
  RELEASE = 'RELEASE',
}

export enum AlertTypeEnum {
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  OVER_STOCK = 'OVER_STOCK',
}

export enum AlertSeverityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum SortFieldEnum {
  NAME = 'name',
  SKU = 'sku',
  ON_HAND = 'onHand',
  AVAILABLE = 'available',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

// ============================================
// Type Guards
// ============================================

export function isProductStatus(value: any): value is ProductStatus {
  return ['Active', 'Draft', 'Inactive'].includes(value);
}

export function isDigitalType(value: any): value is DigitalType {
  return ['Yes', 'No'].includes(value);
}

export function isProduct(product: any): product is Product {
  return (
    product &&
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.sku === 'string' &&
    isProductStatus(product.status) &&
    isDigitalType(product.digital)
  );
}

// ============================================
// Type Helpers
// ============================================

export type PartialProduct = Partial<Product>;
export type ReadonlyProduct = Readonly<Product>;
export type ProductList = Product[];
export type ProductMap = Record<string, Product>;

// ============================================
// Validation Types
// ============================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ProductValidationRules {
  name: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  sku: {
    required: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
  onHand: {
    required: boolean;
    min?: number;
    max?: number;
  };
  available: {
    required: boolean;
    min?: number;
    max?: number;
  };
  onHold: {
    required: boolean;
    min?: number;
    max?: number;
  };
}