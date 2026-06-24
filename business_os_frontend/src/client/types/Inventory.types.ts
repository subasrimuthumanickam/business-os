// ============================================
// Product Related Types
// ============================================
 
// export interface Product {
//   id: string;               // Kept as string in frontend; converted from number when needed for API calls
//   name: string;
//   sku: string;
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
//   onHand: number;
//   available: number;
//   onHold: number;
//   status: 'Active' | 'Draft' | 'Inactive';
//   category?: string;
//   createdAt?: string;  // ✅ Changed from Date to string
//   updatedAt?: string;  // ✅ Changed from Date to string
//   deletedAt?: string | null;  // ✅ Changed from Date to string
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
//   category_id?: number | null;
//   category_name?: string;   // Joined from categories table by backend
//   price: number;
//   stock_quantity: number;   // Single source of truth for stock (replaces onHand/available/onHold)
//   unit: string;             // e.g. 'pcs', 'kg', 'box'
//   description?: string;
//   status: 'active' | 'inactive';
//   createdAt?: Date;
//   updatedAt?: Date;
 
//   // ---- Legacy fields kept optional so older components (ViewProductModal etc.)
//   // ---- don't break at compile time. Not populated by the real backend.
//   digital?: 'Yes' | 'No';
//   onHand?: number;
//   available?: number;
//   onHold?: number;
//   category?: string;
//   deletedAt?: Date | null;
//   isDeleted?: boolean;
//   cost?: number;
//   weight?: number;
//   dimensions?: {
//     length: number;
//     width: number;
//     height: number;
//   };
//   images?: string[];
//   tags?: string[];
//   brand?: string;
//   supplier?: string;
//   reorderPoint?: number;
//   reorderQuantity?: number;
// }
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
export interface Product {
  id: string;
  name: string;
  sku: string;
<<<<<<< HEAD
 
  category_id?: number | null;
  category_name?: string;
 
  price: number;
  stock_quantity: number;
  unit: string;
 
  description?: string;
  status: 'active' | 'inactive';
 
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
 
=======

  category_id?: number | null;
  category_name?: string;

  price: number;
  stock_quantity: number;
  unit: string;

  description?: string;
  status: 'active' | 'inactive';

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
  // Legacy fields
  digital?: 'Yes' | 'No';
  onHand?: number;
  available?: number;
  onHold?: number;
  category?: string;
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
  isDeleted?: boolean;
  cost?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images?: string[];
  tags?: string[];
  brand?: string;
  supplier?: string;
  reorderPoint?: number;
  reorderQuantity?: number;
}
 
// ============================================
// DTO (Data Transfer Object) Types
// ============================================
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
// export interface CreateProductDTO {
//   name: string;
//   sku: string;
//   category_id?: number | null;
//   price: number;
//   stock_quantity: number;
//   unit: string;
//   description?: string;
//   status?: 'active' | 'inactive';
// }
<<<<<<< HEAD
 
=======

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
export interface CreateProductDTO {
  name: string;
  sku: string;
  category_id?: number | null;
  category?: string;
<<<<<<< HEAD
 
  price: number;
 
  stock_quantity: number;
 
  unit: string;
 
  description?: string;
 
  status?: 'active' | 'inactive';
 
  digital?: 'Yes' | 'No';
 
  onHand?: number;
 
  available?: number;
 
=======

  price: number;

  stock_quantity: number;

  unit: string;

  description?: string;

  status?: 'active' | 'inactive';

  digital?: 'Yes' | 'No';

  onHand?: number;

  available?: number;

>>>>>>> 078ac494953cbdabdccf22a3433e8d10ad93a0d9
  onHold?: number;
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
    start?: string;  // ✅ Changed from Date to string
    end?: string;    // ✅ Changed from Date to string
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
  createdAt: string;  // ✅ Changed from Date to string
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
  createdAt: string;  // ✅ Changed from Date to string
}
 
// ============================================
// Category and Collection Types
// ============================================
 
export interface Category {
  id: string;
  name: string;
  productCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;  // ✅ Already string
}
 
export interface CategoryType {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: CategoryType[];
  productCount?: number;
  createdAt: string;  // ✅ Changed from Date to string
  updatedAt: string;  // ✅ Changed from Date to string
}
 
export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: string[]; // Product IDs
  isActive: boolean;
  createdAt: string;  // ✅ Changed from Date to string
  updatedAt: string;  // ✅ Changed from Date to string
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
  createdAt: string;  // ✅ Changed from Date to string
  updatedAt: string;  // ✅ Changed from Date to string
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
  createdAt: string;  // ✅ Changed from Date to string
  updatedAt: string;  // ✅ Changed from Date to string
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
  timestamp: string;  // ✅ Changed from Date to string
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
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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
  return ['active', 'inactive'].includes(value);
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
    isProductStatus(product.status)
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
  price: {
    required: boolean;
    min?: number;
  };
  stock_quantity: {
    required: boolean;
    min?: number;
  };
}
 
// ============================================
// Type Converter Helpers
// ============================================
 
/**
 * Convert Date to ISO string for API responses
 */
export function toISOString(date: Date | string | undefined): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  return date.toISOString();
}
 
/**
 * Convert ISO string to Date for frontend usage
 */
export function toDate(dateStr: string | Date | undefined): Date | undefined {
  if (!dateStr) return undefined;
  if (typeof dateStr === 'string') return new Date(dateStr);
  return dateStr;
}
 
/**
 * Format date string for display
 */
export function formatDate(dateStr: string | Date | undefined): string {
  if (!dateStr) return 'N/A';
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(date.getTime())) return 'Invalid Date';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}