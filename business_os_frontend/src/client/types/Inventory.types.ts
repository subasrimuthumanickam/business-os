export interface Product {
  id: string;
  name: string;
  sku: string;

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

  // Legacy fields
  digital?: 'Yes' | 'No';
  onHand?: number;
  available?: number;
  onHold?: number;
  category?: string;

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

  // ============================================
  // NEW: Zoho-style Sales / Purchase fields
  // NOTE: not yet backed by DB columns — UI-only
  // until backend schema is extended. Treat these
  // as optional so existing data without them still
  // satisfies the type.
  // ============================================

  /** Goods = physical stock-tracked item, Service = no stock tracking */
  type?: 'goods' | 'service';

  /** Sales side: reuses existing `price` field as the sell rate */
  sales_account?: string;

  /** Purchase side: reuses existing `cost` field as the buy rate */
  purchase_account?: string;

  tax_preference?: 'taxable' | 'non-taxable';
}

// ============================================
// DTO (Data Transfer Object) Types
// ============================================

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

export interface CreateProductDTO {
  name: string;
  sku: string;
  category_id?: number | null;
  category?: string;
  type: 'goods' | 'service';
  price: number;
  tax_preference: 'taxable' | 'non-taxable';
  stock_quantity: number;

  unit: string;

  description?: string;

  status?: 'active' | 'inactive';

  digital?: 'Yes' | 'No';

  onHand?: number;

  available?: number;

  onHold?: number;

  // NEW: Zoho-style fields carried through creation
  sales_account?: string;
  purchase_account?: string;
  cost?: number;
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
    start?: string;
    end?: string;
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
// Product Transaction Types (Invoices / Estimates / Sales Orders)
// ============================================

export interface ProductTransaction {
  type: 'invoice' | 'estimate' | 'sales_order';
  id: number;
  number: string;
  date: string;
  status: string;
  customer_name: string;
  quantity: number;
  rate: number;
  amount: number;
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
  createdAt: string;
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
  createdAt: string;
}

// ============================================
// Category and Collection Types
// ============================================

export interface Category {
  id: string;
  name: string;
  productCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface CategoryType {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: CategoryType[];
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: string[]; // Product IDs
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  timestamp: string;
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
export type ProductType = NonNullable<Product['type']>;
export type TaxPreference = NonNullable<Product['tax_preference']>;

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

export enum ProductTypeEnum {
  GOODS = 'goods',
  SERVICE = 'service',
}

export enum TaxPreferenceEnum {
  TAXABLE = 'taxable',
  NON_TAXABLE = 'non-taxable',
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

export function isProductType(value: any): value is ProductType {
  return ['goods', 'service'].includes(value);
}

export function isTaxPreference(value: any): value is TaxPreference {
  return ['taxable', 'non-taxable'].includes(value);
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