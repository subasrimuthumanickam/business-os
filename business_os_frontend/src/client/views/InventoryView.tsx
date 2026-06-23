// import React, { useState, useEffect } from 'react';
// // import { InventoryHeader } from './InventoryHeader';
// import { InventoryHeader } from '../components/inventory/InventoryHeader';
// // import { InventoryFilters } from './InventoryFilters';
// import { InventoryFilters } from '../components/inventory/InventoryFilters';
// // import { InventoryTable } from './InventoryTable';
// import { InventoryTable } from '../components/inventory/InventoryTable';
// // import { InventoryPagination } from './InventoryPagination';
// import { InventoryPagination } from '../components/inventory/InventoryPagination';
// // import { NewProductModal } from './NewProductModal';
// import { NewProductModal } from '../components/inventory/NewProductModal';
// // import { AddStockModal } from './AddStockModal';

// // import { DeleteProductModal } from './DeleteProductModal';
// import { DeleteProductModal } from '../components/inventory/DeleteProductModal';
// // import { InventoryController } from '../../controllers/inventory.controller';
// import { InventoryController } from '../controllers/inventory.controller';
// // import { Product, FilterOptions, CreateProductDTO } from '../../types/inventory.types';
// import { Product, FilterOptions, CreateProductDTO } from
// // ✅ Add the section prop interface
// interface InventoryPageProps {
//   section?: string;
// }

// // ✅ Add the section prop with default value
// export const InventoryPage: React.FC<InventoryPageProps> = ({ section = 'products' }) => {
//   const [controller] = useState(() => new InventoryController());
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
//   const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     setIsLoading(true);
//     try {
//       await controller.initialize();
//       setProducts(controller.getProducts());
//     } catch (error) {
//       console.error('Failed to load products:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (filters: Partial<FilterOptions>) => {
//     controller.handleFilterChange(filters);
//     setProducts(controller.getProducts());
//   };

//   const handlePageChange = (page: number) => {
//     controller.handlePageChange(page);
//     setProducts(controller.getProducts());
//   };

//   const handleRowsPerPageChange = (rows: number) => {
//     controller.handleRowsPerPageChange(rows);
//     setProducts(controller.getProducts());
//   };

//   const handleAddStock = (id: string) => {
//     setSelectedProductId(id);
//     setIsAddStockModalOpen(true);
//   };

//   const handleConfirmAddStock = async (quantity: number) => {
//     if (selectedProductId) {
//       await controller.handleAddStock(selectedProductId, quantity);
//       await loadProducts();
//       setIsAddStockModalOpen(false);
//     }
//   };

//   const handleDelete = (id: string) => {
//     setSelectedProductId(id);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedProductId) {
//       await controller.handleDeleteProduct(selectedProductId);
//       await loadProducts();
//       setIsDeleteModalOpen(false);
//     }
//   };

//   const handleCreateProduct = async (productData: CreateProductDTO) => {
//     await controller.handleCreateProduct(productData);
//     await loadProducts();
//     setIsNewProductModalOpen(false);
//   };

//   const selectedProduct = selectedProductId 
//     ? products.find(p => p.id === selectedProductId) 
//     : undefined;

//   // ✅ Render different content based on section
//   const renderContent = () => {
//     switch (section) {
//       case 'categories':
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories Management</h2>
//             <p className="text-gray-500">Categories management coming soon...</p>
//           </div>
//         );
//       case 'collections':
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Collections Management</h2>
//             <p className="text-gray-500">Collections management coming soon...</p>
//           </div>
//         );
//       case 'stock':
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Management</h2>
//             <p className="text-gray-500">Stock management coming soon...</p>
//           </div>
//         );
//       case 'settings':
//         return (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Settings</h2>
//             <p className="text-gray-500">Inventory settings coming soon...</p>
//           </div>
//         );
//       default:
//         // Products view (default)
//         return (
//           <>
//             <InventoryFilters onFilterChange={handleFilterChange} />

//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               </div>
//             ) : (
//               <>
//                 <InventoryTable 
//                   products={products}
//                   onEdit={(id) => alert(`Edit ${id}`)}
//                   onListOnChannel={(id) => alert(`List ${id}`)}
//                   onViewAllListings={(id) => alert(`View ${id}`)}
//                   onClone={(id) => alert(`Clone ${id}`)}
//                   onDelete={handleDelete}
//                   onAddStock={handleAddStock}
//                   onRemoveItems={(id) => alert(`Remove ${id}`)}
//                 />

//                 <InventoryPagination
//                   currentPage={controller.getPagination().currentPage}
//                   rowsPerPage={controller.getPagination().rowsPerPage}
//                   totalItems={controller.getPagination().totalItems}
//                   onPageChange={handlePageChange}
//                   onRowsPerPageChange={handleRowsPerPageChange}
//                 />
//               </>
//             )}

//             <NewProductModal
//               isOpen={isNewProductModalOpen}
//               onClose={() => setIsNewProductModalOpen(false)}
//               onSave={handleCreateProduct}
//             />

//             <AddStockModal
//               isOpen={isAddStockModalOpen}
//               onClose={() => setIsAddStockModalOpen(false)}
//               onConfirm={handleConfirmAddStock}
//               productName={selectedProduct?.name}
//             />

//             <DeleteProductModal
//               isOpen={isDeleteModalOpen}
//               onClose={() => setIsDeleteModalOpen(false)}
//               onConfirm={handleConfirmDelete}
//               productName={selectedProduct?.name}
//             />
//           </>
//         );
//     }
//   };

//   return (
//     <div className="inventory-page">
//       <InventoryHeader 
//         onNewProduct={() => setIsNewProductModalOpen(true)}
//         onManageStock={() => alert('Manage Stock')}
//         currentSection={section}
//       />
      
//       {renderContent()}
//     </div>
//   );
// };
// InventoryView.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
// ✅ Fixed: Using default import instead of named import
import InventoryPage from '../components/inventory/InventoryPage';

const InventoryView: React.FC = () => {
  const location = useLocation();
  
  const getSection = (): string => {
    const path = location.pathname;
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/collections')) return 'collections';
    if (path.includes('/stock')) return 'stock';
    if (path.includes('/settings')) return 'settings';
    return 'products';
  };

  // Using type assertion to fix the TypeScript error
  return <InventoryPage {...({ section: getSection() } as any)} />;
};

export default InventoryView;