import React, { useState, useEffect } from 'react';
import { X, Package, Tag, Layers, Plus, Trash2, Sliders, Settings, Edit, Eye } from 'lucide-react';
import { InventoryHeader } from './InventoryHeader';
import { InventoryFilters } from './InventoryFilters';
import { InventoryTable } from './InventoryTable';
import { InventoryPagination } from './InventoryPagination';
import { NewProductModal } from './NewProductModal';
import { AddStockModal } from './AddStockModal';
import { RemoveStockModal } from './RemoveStockModal';
import { DeleteProductModal } from './DeleteProductModal';
import { EditProductModal } from './EditProductModal';
import { ViewProductModal } from './ViewProductModal';
import { InventoryController } from '../../controllers/inventory.controller';
import { Product, FilterOptions, CreateProductDTO } from '../../types/Inventory.types';

interface InventoryPageProps {
  section?: string;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({ section = 'products' }) => {
  const [controller] = useState(() => new InventoryController());
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal states
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isRemoveStockModalOpen, setIsRemoveStockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Quick action states
  const [showRemoveItemsModal, setShowRemoveItemsModal] = useState(false);
  const [showOptionTypesModal, setShowOptionTypesModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [showProductSettingsModal, setShowProductSettingsModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      await controller.initialize();
      setProducts(controller.getProducts());
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    controller.handleFilterChange(filters);
    setProducts(controller.getProducts());
  };

  const handlePageChange = (page: number) => {
    controller.handlePageChange(page);
    setProducts(controller.getProducts());
  };

  const handleRowsPerPageChange = (rows: number) => {
    controller.handleRowsPerPageChange(rows);
    setProducts(controller.getProducts());
  };

  const selectedProduct = selectedProductId 
    ? products.find((p: Product) => p.id === selectedProductId) 
    : undefined;

  // Add Stock
  const handleAddStock = (id: string) => {
    setSelectedProductId(id);
    setIsAddStockModalOpen(true);
  };

  const handleConfirmAddStock = async (quantity: number) => {
    if (selectedProductId) {
      await controller.handleAddStock(selectedProductId, quantity);
      await loadProducts();
      setIsAddStockModalOpen(false);
      setSelectedProductId(null);
    }
  };

  // Remove Stock
  const handleRemoveStock = (id: string) => {
    setSelectedProductId(id);
    setIsRemoveStockModalOpen(true);
  };

  const handleConfirmRemoveStock = async (quantity: number) => {
    if (selectedProductId) {
      await controller.handleRemoveStock(selectedProductId, quantity);
      await loadProducts();
      setIsRemoveStockModalOpen(false);
      setSelectedProductId(null);
    }
  };

  // Edit Product
  const handleEdit = (id: string) => {
    setSelectedProductId(id);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = async (updatedData: Partial<Product>) => {
    if (selectedProductId) {
      await controller.handleUpdateProduct(selectedProductId, { id: selectedProductId, ...updatedData });
      await loadProducts();
      setIsEditModalOpen(false);
      setSelectedProductId(null);
    }
  };

  // View Product
  const handleView = (id: string) => {
    setSelectedProductId(id);
    setIsViewModalOpen(true);
  };

  // Delete Product
  const handleDelete = (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      await controller.handleDeleteProduct(selectedProductId);
      await loadProducts();
      setIsDeleteModalOpen(false);
      setSelectedProductId(null);
    }
  };

  // Manage Stock (from dropdown)
  const handleManageStock = (id: string) => {
    setSelectedProductId(id);
    setIsAddStockModalOpen(true);
  };

  // Create Product
  const handleCreateProduct = async (productData: CreateProductDTO) => {
    await controller.handleCreateProduct(productData);
    await loadProducts();
    setIsNewProductModalOpen(false);
  };

  // Select handlers
  const handleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((sid: string) => sid !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p: Product) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.length > 0 && window.confirm(`Delete ${selectedIds.length} selected products?`)) {
      await controller.handleBulkDelete(selectedIds);
      await loadProducts();
      setSelectedIds([]);
    }
  };

  // Quick Action Handlers
  const handleRemoveItems = () => {
    setShowRemoveItemsModal(true);
    setShowOptionTypesModal(false);
    setShowCategoriesModal(false);
    setShowCollectionsModal(false);
    setShowProductSettingsModal(false);
  };

  const handleOptionTypes = () => {
    setShowOptionTypesModal(true);
    setShowRemoveItemsModal(false);
    setShowCategoriesModal(false);
    setShowCollectionsModal(false);
    setShowProductSettingsModal(false);
  };

  const handleCategories = () => {
    setShowCategoriesModal(true);
    setShowRemoveItemsModal(false);
    setShowOptionTypesModal(false);
    setShowCollectionsModal(false);
    setShowProductSettingsModal(false);
  };

  const handleCollections = () => {
    setShowCollectionsModal(true);
    setShowRemoveItemsModal(false);
    setShowOptionTypesModal(false);
    setShowCategoriesModal(false);
    setShowProductSettingsModal(false);
  };

  const handleProductSettings = () => {
    setShowProductSettingsModal(true);
    setShowRemoveItemsModal(false);
    setShowOptionTypesModal(false);
    setShowCategoriesModal(false);
    setShowCollectionsModal(false);
  };

  const handleInventoryClick = () => {
    loadProducts();
    setShowRemoveItemsModal(false);
    setShowOptionTypesModal(false);
    setShowCategoriesModal(false);
    setShowCollectionsModal(false);
    setShowProductSettingsModal(false);
  };

  // Data for modals
  const categories = [...new Set(products.map((p: Product) => p.category || 'Uncategorized'))];
  const collections = ['Summer Collection', 'Winter Collection', 'Limited Edition', 'Premium Collection'];
  
  const optionTypes = [
    { id: 1, name: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'] },
    { id: 2, name: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'] },
    { id: 3, name: 'Material', values: ['Cotton', 'Polyester', 'Wool', 'Silk'] },
  ];

  const productSettings = [
    { id: 1, name: 'Default Tax Rate', value: '18%' },
    { id: 2, name: 'Default Currency', value: 'USD' },
    { id: 3, name: 'Stock Alert Threshold', value: '10 units' },
    { id: 4, name: 'Auto-approve Products', value: 'Enabled' },
    { id: 5, name: 'Enable Reviews', value: 'Yes' },
  ];

  const renderContent = () => {
    switch (section) {
      case 'categories':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories Management</h2>
            <div className="space-y-2">
              {categories.map((cat: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-700">{cat}</span>
                  <span className="text-sm text-gray-500">
                    {products.filter((p: Product) => (p.category || 'Uncategorized') === cat).length} products
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'collections':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Collections Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collections.map((collection: string, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h3 className="font-medium text-gray-800">{collection}</h3>
                  <p className="text-sm text-gray-500 mt-1">0 products in this collection</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">View Collection</button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            <InventoryFilters 
              onFilterChange={handleFilterChange}
              onRemoveItems={handleRemoveItems}
              onOptionTypes={handleOptionTypes}
              onCategories={handleCategories}
              onCollections={handleCollections}
              onProductSettings={handleProductSettings}
              onInventoryClick={handleInventoryClick}
            />

            {selectedIds.length > 0 && (
              <div className="bg-blue-50 px-4 py-2 mb-4 rounded-lg flex items-center justify-between border border-blue-100">
                <span className="text-sm text-blue-700">
                  {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Delete Selected
                </button>
              </div>
            )}

            <InventoryTable 
              products={products}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
              onAddStock={handleAddStock}
              onRemoveStock={handleRemoveStock}
              onManageStock={handleManageStock}
              selectedIds={selectedIds}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
            />

            <InventoryPagination
              currentPage={controller.getPagination().currentPage}
              rowsPerPage={controller.getPagination().rowsPerPage}
              totalItems={controller.getPagination().totalItems}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </>
        );
    }
  };

  return (
    <div className="inventory-page">
      <InventoryHeader 
        onNewProduct={() => setIsNewProductModalOpen(true)}
        onManageStock={() => alert('Manage Stock')}
        currentSection={section}
        onExport={() => alert('Export')}
        onImport={() => alert('Import')}
      />
      
      {renderContent()}

      {/* New Product Modal */}
      <NewProductModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onSave={handleCreateProduct}
      />

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onConfirm={handleConfirmAddStock}
        productName={selectedProduct?.name}
      />

      {/* Remove Stock Modal */}
      <RemoveStockModal
        isOpen={isRemoveStockModalOpen}
        onClose={() => setIsRemoveStockModalOpen(false)}
        onConfirm={handleConfirmRemoveStock}
        productName={selectedProduct?.name}
        currentStock={selectedProduct?.available || 0}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleConfirmEdit}
        product={selectedProduct}
      />

      {/* View Product Modal */}
      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        product={selectedProduct}
        onEdit={handleEdit}
        onAddStock={handleAddStock}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedProduct?.name}
      />

      {/* ============================================ */}
      {/* QUICK ACTION MODALS */}
      {/* ============================================ */}

      {/* 1. REMOVE ITEMS MODAL */}
      {/* {showRemoveItemsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Remove Items</h2>
                  <p className="text-xs text-gray-500">Select items to remove from inventory</p>
                </div>
              </div>
              <button onClick={() => setShowRemoveItemsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            
            <div className="space-y-2 mt-2">
              {products.slice(0, 10).map((p: Product) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">SKU: {p.sku} | Available: {p.available}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      handleRemoveStock(p.id);
                      setShowRemoveItemsModal(false);
                    }}
                    className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowRemoveItemsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* 1. REMOVE ITEMS MODAL - Reduced Height & Proper Alignment */}
{showRemoveItemsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl p-4 max-w-xl w-full max-h-[70vh] overflow-y-auto">
      {/* Header - Compact */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-100 rounded-lg">
            <Trash2 size={16} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Remove Items</h2>
            <p className="text-[10px] text-gray-500">Select items to remove from inventory</p>
          </div>
        </div>
        <button onClick={() => setShowRemoveItemsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>
      </div>
      
      {/* Content - Compact List */}
      <div className="space-y-1 mt-2">
        {products.slice(0, 10).map((p: Product) => (
          <div key={p.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                <p className="text-[10px] text-gray-400">SKU: {p.sku} | Available: {p.available}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                handleRemoveStock(p.id);
                setShowRemoveItemsModal(false);
              }}
              className="px-2.5 py-1 text-[10px] bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-1 flex-shrink-0 font-medium"
            >
              <Trash2 size={11} />
              Remove
            </button>
          </div>
        ))}
      </div>
      
      {/* Footer - Compact */}
      <div className="mt-3 pt-2 border-t flex justify-end">
        <button
          onClick={() => setShowRemoveItemsModal(false)}
          className="px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* 2. OPTION TYPES MODAL */}
      {showOptionTypesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sliders size={20} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Option Types</h2>
                  <p className="text-xs text-gray-500">Manage product variations</p>
                </div>
              </div>
              <button onClick={() => setShowOptionTypesModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            
            <div className="space-y-4 mt-2">
              {optionTypes.map((option: { id: number; name: string; values: string[] }) => (
                <div key={option.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{option.name}</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Add Value</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {option.values.map((value: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-default">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowOptionTypesModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CATEGORIES MODAL */}
      {showCategoriesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                  <p className="text-xs text-gray-500">Manage product categories</p>
                </div>
              </div>
              <button onClick={() => setShowCategoriesModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            
            <div className="space-y-3 mt-2">
              {categories.length > 0 ? (
                categories.map((cat: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {cat.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{cat}</p>
                        <p className="text-xs text-gray-400">
                          {products.filter((p: Product) => (p.category || 'Uncategorized') === cat).length} products
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                        <Edit size={12} className="inline mr-1" />
                        Edit
                      </button>
                      <button className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-red-600">
                        <Trash2 size={12} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No categories found</div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCategoriesModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                <Plus size={16} />
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. COLLECTIONS MODAL */}
      {showCollectionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Layers size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Collections</h2>
                  <p className="text-xs text-gray-500">Manage product collections</p>
                </div>
              </div>
              <button onClick={() => setShowCollectionsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {collections.map((collection: string, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-indigo-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      <Layers size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{collection}</h3>
                      <p className="text-xs text-gray-400">0 products</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="flex-1 px-2 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye size={12} className="inline mr-1" />
                      View Products
                    </button>
                    <button className="px-2 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCollectionsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                <Plus size={16} />
                Add Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. PRODUCT SETTINGS MODAL */}
      {showProductSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Settings size={20} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Product Settings</h2>
                  <p className="text-xs text-gray-500">Configure product preferences</p>
                </div>
              </div>
              <button onClick={() => setShowProductSettingsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>
            
            <div className="space-y-3 mt-2">
              {productSettings.map((setting: { id: number; name: string; value: string }) => (
                <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{setting.name}</p>
                    <p className="text-xs text-gray-400">Configure this setting</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {setting.value}
                    </span>
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Change
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowProductSettingsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                <Settings size={16} />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;