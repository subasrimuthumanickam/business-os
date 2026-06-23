// // ✅ Correct import - types is at same level as services
// // import { ProductStatus } from '../types/inventory.types';
// import { ProductStatus } from '../types/Inventory.types';

// export const getStatusColor = (status: ProductStatus): string => {
//   switch (status) {
//     case 'Active':
//       return 'bg-green-100 text-green-800';
//     case 'Draft':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'Inactive':
//       return 'bg-gray-100 text-gray-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// export const getStatusBadgeClass = (status: ProductStatus): string => {
//   return `px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`;
// };

// export const formatSKU = (sku: string): string => {
//   return sku.replace(/(\d{3})(?=\d)/g, '$1-');
// };

// export const calculateStockValue = (onHand: number, price?: number): number => {
//   return price ? onHand * price : 0;
// };

import { ProductStatus } from '../types/Inventory.types';

export const getStatusColor = (status: ProductStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusBadgeClass = (status: ProductStatus): string => {
  return `px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`;
};

export const formatSKU = (sku: string): string => {
  return sku.replace(/(\d{3})(?=\d)/g, '$1-');
};

export const calculateStockValue = (stockQuantity: number, price?: number): number => {
  return price ? stockQuantity * price : 0;
};