<<<<<<< HEAD


// // import React, { useState, useEffect } from 'react';
// // import { 
// //   X, Package, Tag, Layers, Plus, Trash2, Sliders, Settings, Edit, Eye,
// //   BarChart3, TrendingUp, Clock, Users, DollarSign, AlertCircle, CheckCircle,
// //   ArrowUp, ArrowDown, Search, Filter, MoreVertical, Save, ArrowLeft
// // } from 'lucide-react';
// // // import { InventoryHeader } from './ProductList/InventoryHeader';
// // import { InventoryHeader } from './InventoryHeader';
// // // import { InventoryFilters } from './ProductList/InventoryFilters';
// // import { InventoryFilters } from './InventoryFilters';
// // // import { InventoryTable } from './ProductList/InventoryTable';
// // import { InventoryTable } from './InventoryTable';
// // // import { InventoryPagination } from './ProductList/InventoryPagination';
// // import { InventoryPagination } from './InventoryPagination';
// // // import { NewProductModal } from './ProductList/NewProductModal';
// // import { NewProductModal } from './NewProductModal';
// // // import { AddStockModal } from './ProductList/AddStockModal';
// // import { AddStockModal } from './AddStockModal';
// // // import { RemoveStockModal } from './ProductList/RemoveStockModal';
// // import { RemoveStockModal } from './RemoveStockModal';
// // // import { DeleteProductModal } from './ProductList/DeleteProductModal';
// // import { DeleteProductModal } from './DeleteProductModal';
// // // import { EditProductModal } from './ProductList/EditProductModal';
// // import { EditProductModal } from './EditProductModal';
// // // import { ViewProductModal } from './ProductList/ViewProductModal';
// // import { ViewProductModal } from './ViewProductModal';
// // import { InventoryController } from '../../controllers/inventory.controller';
// // import { Product, FilterOptions, CreateProductDTO, Category } from '../../types/Inventory.types';
// // import { useNavigate } from 'react-router-dom';




// // interface InventoryPageProps {
// //   section?: string;
// // }

// // // Option Types Interface
// // interface OptionType {
// //   id: string;
// //   name: string;
// //   displayName: string;
// //   values: string[];
// //   onHold: number;
// //   status: 'Active' | 'Draft' | 'Inactive';
// //   createdAt: string;
// // }

// // // Collection Interface
// // interface Collection {
// //   id: string;
// //   name: string;
// //   productCount: number;
// //   color: string;
// //   gradient: string;
// //   borderColor: string;
// //   createdAt: string;
// //   description?: string;
// // }

// // export const InventoryPage: React.FC<InventoryPageProps> = ({ section = 'products' }) => {
// //   const navigate = useNavigate();
// //   const [controller] = useState(() => new InventoryController());
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [selectedIds, setSelectedIds] = useState<string[]>([]);
// //   const [activeTab, setActiveTab] = useState<string>(section || 'products');
  
// //   // Modal states
// //   const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
// //   const [isRemoveStockModalOpen, setIsRemoveStockModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// //   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

// //   // Quick action states
// //   const [showProductSettingsModal, setShowProductSettingsModal] = useState(false);

// //   // New Product Page State
// //   const [showNewProductPage, setShowNewProductPage] = useState(false);
  
// //   // Option Types Page State
// //   const [showOptionTypesPage, setShowOptionTypesPage] = useState(false);
  
// //   // Collections Page State
// //   const [showCollectionsPage, setShowCollectionsPage] = useState(false);
  
// //   // New Product Form State
// //   const [newProductForm, setNewProductForm] = useState({
// //     name: '',
// //     sku: '',
// //     category: '',
// //     digital: 'No' as 'Yes' | 'No',
// //     onHand: 0,
// //     available: 0,
// //     onHold: 0,
// //     status: 'Draft' as 'Active' | 'Draft' | 'Inactive',
// //     price: 0,
// //     cost: 0,
// //     description: ''
// //   });
// //   const [newProductErrors, setNewProductErrors] = useState<Record<string, string>>({});
// //   const [newProductLoading, setNewProductLoading] = useState(false);

// //   // Option Types State
// //   const [optionTypes, setOptionTypes] = useState<OptionType[]>([
// //     { id: '1', name: 'color', displayName: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'], onHold: 740, status: 'Active', createdAt: '2024-01-15' },
// //     { id: '2', name: 'size', displayName: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'], onHold: 12345, status: 'Active', createdAt: '2024-01-20' },
// //     { id: '3', name: 'material', displayName: 'Material', values: ['Cotton', 'Polyester', 'Wool', 'Silk'], onHold: 583, status: 'Draft', createdAt: '2024-02-01' },
// //   ]);

// //   const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
// //   const [editOptionForm, setEditOptionForm] = useState<Partial<OptionType>>({});
// //   const [optionFormData, setOptionFormData] = useState({
// //     name: '',
// //     displayName: '',
// //     values: '',
// //     onHold: 0,
// //     status: 'Active' as 'Active' | 'Draft' | 'Inactive'
// //   });
// //   const [optionErrors, setOptionErrors] = useState<Record<string, string>>({});

// //   // Collections State
// //   const [collections, setCollections] = useState<Collection[]>([
// //     { id: '1', name: 'Summer Collection', productCount: 0, color: 'orange', gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200', createdAt: '2024-06-01', description: 'Summer season products' },
// //     { id: '2', name: 'Winter Collection', productCount: 0, color: 'blue', gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200', createdAt: '2024-06-01', description: 'Winter season products' },
// //     { id: '3', name: 'Limited Edition', productCount: 0, color: 'purple', gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200', createdAt: '2024-06-01', description: 'Limited edition products' },
// //     { id: '4', name: 'Premium Collection', productCount: 0, color: 'emerald', gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200', createdAt: '2024-06-01', description: 'Premium quality products' },
// //   ]);
// //   const [collectionSearchTerm, setCollectionSearchTerm] = useState('');
// //   const [newCollectionName, setNewCollectionName] = useState('');
// //   const [newCollectionDescription, setNewCollectionDescription] = useState('');
// //   const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
// //   const [editCollectionForm, setEditCollectionForm] = useState<Partial<Collection>>({});
// //   const [collectionLoading, setCollectionLoading] = useState(false);

// //   // Categories State
// //   const [categories, setCategories] = useState<Category[]>([
// //     { id: '1', name: 'Electronics', productCount: 45, status: 'Active', createdAt: '2024-01-15' },
// //     { id: '2', name: 'Clothing', productCount: 32, status: 'Active', createdAt: '2024-01-20' },
// //     { id: '3', name: 'Books', productCount: 28, status: 'Active', createdAt: '2024-02-01' },
// //     { id: '4', name: 'Home & Garden', productCount: 15, status: 'Inactive', createdAt: '2024-02-15' },
// //     { id: '5', name: 'Toys', productCount: 20, status: 'Active', createdAt: '2024-03-01' },
// //   ]);
// //   const [categorySearchTerm, setCategorySearchTerm] = useState('');
// //   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
// //   const [editCategoryForm, setEditCategoryForm] = useState<Partial<Category>>({});
// //   const [showCategoryAddForm, setShowCategoryAddForm] = useState(false);
// //   const [newCategoryName, setNewCategoryName] = useState('');

// //   // Generate SKU
// //   const generateSKU = () => {
// //     const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
// //     setNewProductForm({ ...newProductForm, sku });
// //   };

// //   // New Product Handlers
// //   const handleNewProductSubmit = () => {
// //     const errors: Record<string, string> = {};
// //     if (!newProductForm.name.trim()) errors.name = 'Product name is required';
// //     if (!newProductForm.sku.trim()) errors.sku = 'SKU is required';
// //     if (newProductForm.sku.length !== 12) errors.sku = 'SKU must be exactly 12 digits';
// //     if (!newProductForm.category) errors.category = 'Category is required';

// //     if (Object.keys(errors).length > 0) {
// //       setNewProductErrors(errors);
// //       return;
// //     }

// //     setNewProductLoading(true);
    
// //     setTimeout(() => {
// //       const newProduct: Product = {
// //         id: Date.now().toString(),
// //         name: newProductForm.name,
// //         digital: newProductForm.digital,
// //         sku: newProductForm.sku,
// //         onHand: newProductForm.onHand,
// //         available: newProductForm.available || newProductForm.onHand,
// //         onHold: newProductForm.onHold,
// //         status: newProductForm.status,
// //         category: newProductForm.category,
// //         createdAt: new Date().toISOString(),
// //         price: newProductForm.price,
// //         cost: newProductForm.cost,
// //         description: newProductForm.description
// //       };
      
// //       setProducts([newProduct, ...products]);
// //       setNewProductLoading(false);
// //       setShowNewProductPage(false);
// //       resetNewProductForm();
// //     }, 500);
// //   };

// //   const resetNewProductForm = () => {
// //     setNewProductForm({
// //       name: '',
// //       sku: '',
// //       category: '',
// //       digital: 'No',
// //       onHand: 0,
// //       available: 0,
// //       onHold: 0,
// //       status: 'Draft',
// //       price: 0,
// //       cost: 0,
// //       description: ''
// //     });
// //     setNewProductErrors({});
// //   };

// //   const handleNewProductCancel = () => {
// //     setShowNewProductPage(false);
// //     resetNewProductForm();
// //   };

// //   // ============================================
// //   // COLLECTION HANDLERS - ALL IN ONE PLACE
// //   // ============================================

// //   // ✅ Open collections page
// //   const handleCollections = () => {
// //     setShowCollectionsPage(true);
// //   };

// //   // ✅ FIXED: SINGLE handleBackFromCollections function (only one declaration)
// //   const handleBackFromCollections = () => {
// //     setShowCollectionsPage(false);
// //     resetCollectionForm();
// //   };

// //   const resetCollectionForm = () => {
// //     setNewCollectionName('');
// //     setNewCollectionDescription('');
// //     setEditingCollectionId(null);
// //     setEditCollectionForm({});
// //     setCollectionSearchTerm('');
// //   };

// //   const handleAddCollection = () => {
// //     if (!newCollectionName.trim()) {
// //       alert('Collection name is required');
// //       return;
// //     }
    
// //     setCollectionLoading(true);
    
// //     const colors = ['orange', 'blue', 'purple', 'emerald', 'red', 'pink', 'indigo', 'teal'];
// //     const colorMap: Record<string, { gradient: string; borderColor: string }> = {
// //       orange: { gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200' },
// //       blue: { gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200' },
// //       purple: { gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200' },
// //       emerald: { gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200' },
// //       red: { gradient: 'from-red-400 to-red-500', borderColor: 'border-red-200' },
// //       pink: { gradient: 'from-pink-400 to-pink-500', borderColor: 'border-pink-200' },
// //       indigo: { gradient: 'from-indigo-400 to-indigo-500', borderColor: 'border-indigo-200' },
// //       teal: { gradient: 'from-teal-400 to-teal-500', borderColor: 'border-teal-200' },
// //     };
    
// //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
// //     setTimeout(() => {
// //       const newCollection: Collection = {
// //         id: Date.now().toString(),
// //         name: newCollectionName.trim(),
// //         productCount: 0,
// //         color: randomColor,
// //         gradient: colorMap[randomColor].gradient,
// //         borderColor: colorMap[randomColor].borderColor,
// //         createdAt: new Date().toISOString().split('T')[0],
// //         description: newCollectionDescription.trim() || undefined
// //       };
      
// //       setCollections([newCollection, ...collections]);
// //       setNewCollectionName('');
// //       setNewCollectionDescription('');
// //       setCollectionLoading(false);
// //     }, 300);
// //   };

// //   const handleEditCollection = (id: string) => {
// //     const collection = collections.find(c => c.id === id);
// //     if (collection) {
// //       setEditingCollectionId(id);
// //       setEditCollectionForm({ 
// //         name: collection.name,
// //         description: collection.description || ''
// //       });
// //     }
// //   };

// //   const handleSaveCollectionEdit = () => {
// //     if (!editingCollectionId || !editCollectionForm.name?.trim()) return;
    
// //     setCollectionLoading(true);
// //     setTimeout(() => {
// //       const updated = collections.map(c =>
// //         c.id === editingCollectionId 
// //           ? { 
// //               ...c, 
// //               name: editCollectionForm.name || c.name,
// //               description: editCollectionForm.description || c.description
// //             } 
// //           : c
// //       );
// //       setCollections(updated);
// //       setEditingCollectionId(null);
// //       setEditCollectionForm({});
// //       setCollectionLoading(false);
// //     }, 300);
// //   };

// //   const handleDeleteCollection = (id: string) => {
// //     if (window.confirm('Are you sure you want to delete this collection?')) {
// //       setCollectionLoading(true);
// //       setTimeout(() => {
// //         setCollections(collections.filter(c => c.id !== id));
// //         setCollectionLoading(false);
// //       }, 300);
// //     }
// //   };

// //   const filteredCollections = collections.filter(c =>
// //     c.name.toLowerCase().includes(collectionSearchTerm.toLowerCase()) ||
// //     (c.description && c.description.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
// //   );

// //   // ============================================
// //   // CATEGORY HANDLERS
// //   // ============================================

// //   const handleAddCategory = () => {
// //     if (!newCategoryName.trim()) return;
// //     const newCategory: Category = {
// //       id: Date.now().toString(),
// //       name: newCategoryName.trim(),
// //       productCount: 0,
// //       status: 'Active',
// //       createdAt: new Date().toISOString().split('T')[0]
// //     };
// //     setCategories([newCategory, ...categories]);
// //     setNewCategoryName('');
// //     setShowCategoryAddForm(false);
// //   };

// //   const handleEditCategory = (id: string) => {
// //     const category = categories.find(c => c.id === id);
// //     if (category) {
// //       setEditingCategoryId(id);
// //       setEditCategoryForm({ ...category });
// //     }
// //   };

// //   const handleSaveCategoryEdit = () => {
// //     if (!editingCategoryId) return;
// //     const updated = categories.map(c =>
// //       c.id === editingCategoryId ? { ...c, ...editCategoryForm } : c
// //     );
// //     setCategories(updated);
// //     setEditingCategoryId(null);
// //     setEditCategoryForm({});
// //   };

// //   const handleDeleteCategory = (id: string) => {
// //     if (window.confirm('Delete this category?')) {
// //       setCategories(categories.filter(c => c.id !== id));
// //     }
// //   };

// //   const handleCategoryStatusToggle = (id: string) => {
// //     const updated = categories.map(c =>
// //       c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
// //     );
// //     setCategories(updated);
// //   };

// //   const filteredCategories = categories.filter(c =>
// //     c.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
// //   );

// //   // ============================================
// //   // OPTION TYPES HANDLERS
// //   // ============================================

// //   const handleAddOption = () => {
// //     const errors: Record<string, string> = {};
// //     if (!optionFormData.name.trim()) errors.name = 'Name is required';
// //     if (!optionFormData.displayName.trim()) errors.displayName = 'Display name is required';
// //     if (!optionFormData.values.trim()) errors.values = 'At least one value is required';

// //     if (Object.keys(errors).length > 0) {
// //       setOptionErrors(errors);
// //       return;
// //     }

// //     const newOption: OptionType = {
// //       id: Date.now().toString(),
// //       name: optionFormData.name.trim().toLowerCase().replace(/\s+/g, '_'),
// //       displayName: optionFormData.displayName.trim(),
// //       values: optionFormData.values.split(',').map(v => v.trim()).filter(v => v),
// //       onHold: optionFormData.onHold || 0,
// //       status: optionFormData.status,
// //       createdAt: new Date().toISOString().split('T')[0]
// //     };

// //     setOptionTypes([newOption, ...optionTypes]);
// //     resetOptionForm();
// //   };

// //   const handleUpdateOption = () => {
// //     if (!editingOptionId) return;
// //     const errors: Record<string, string> = {};
// //     if (!editOptionForm.displayName?.trim()) errors.displayName = 'Display name is required';
// //     if (!editOptionForm.values?.length) errors.values = 'At least one value is required';

// //     if (Object.keys(errors).length > 0) {
// //       setOptionErrors(errors);
// //       return;
// //     }

// //     const updated = optionTypes.map(opt =>
// //       opt.id === editingOptionId
// //         ? {
// //             ...opt,
// //             displayName: editOptionForm.displayName || opt.displayName,
// //             values: editOptionForm.values || opt.values,
// //             onHold: editOptionForm.onHold !== undefined ? editOptionForm.onHold : opt.onHold,
// //             status: (editOptionForm.status as 'Active' | 'Draft' | 'Inactive') || opt.status
// //           }
// //         : opt
// //     );
// //     setOptionTypes(updated);
// //     setEditingOptionId(null);
// //     setEditOptionForm({});
// //     setOptionErrors({});
// //   };

// //   const handleDeleteOption = (id: string) => {
// //     if (window.confirm('Are you sure you want to delete this option type?')) {
// //       setOptionTypes(optionTypes.filter(o => o.id !== id));
// //     }
// //   };

// //   const handleRemoveValue = (optionId: string, valueToRemove: string) => {
// //     const updated = optionTypes.map(opt =>
// //       opt.id === optionId ? { ...opt, values: opt.values.filter(v => v !== valueToRemove) } : opt
// //     );
// //     setOptionTypes(updated);
// //   };

// //   const handleAddValue = (optionId: string) => {
// //     const newValue = prompt('Enter new value:');
// //     if (newValue && newValue.trim()) {
// //       const updated = optionTypes.map(opt =>
// //         opt.id === optionId ? { ...opt, values: [...opt.values, newValue.trim()] } : opt
// //       );
// //       setOptionTypes(updated);
// //     }
// //   };

// //   const resetOptionForm = () => {
// //     setOptionFormData({ name: '', displayName: '', values: '', onHold: 0, status: 'Active' });
// //     setOptionErrors({});
// //   };

// //   const getStatusBadge = (status: string) => {
// //     switch(status) {
// //       case 'Active': return 'bg-green-100 text-green-800';
// //       case 'Draft': return 'bg-yellow-100 text-yellow-800';
// //       case 'Inactive': return 'bg-gray-100 text-gray-600';
// //       default: return 'bg-gray-100 text-gray-600';
// //     }
// //   };

// //   // ============================================
// //   // INVENTORY CRUD OPERATIONS
// //   // ============================================

// //   useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   const loadProducts = async () => {
// //     try {
// //       await controller.initialize();
// //       setProducts(controller.getProducts());
// //     } catch (error) {
// //       console.error('Failed to load products:', error);
// //     }
// //   };

// //   const handleFilterChange = (filters: Partial<FilterOptions>) => {
// //     controller.handleFilterChange(filters);
// //     setProducts(controller.getProducts());
// //   };

// //   const handlePageChange = (page: number) => {
// //     controller.handlePageChange(page);
// //     setProducts(controller.getProducts());
// //   };

// //   const handleRowsPerPageChange = (rows: number) => {
// //     controller.handleRowsPerPageChange(rows);
// //     setProducts(controller.getProducts());
// //   };

// //   const selectedProduct = selectedProductId 
// //     ? products.find((p: Product) => p.id === selectedProductId) 
// //     : undefined;

// //   const handleAddStock = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsAddStockModalOpen(true);
// //   };

// //   const handleConfirmAddStock = async (quantity: number) => {
// //     if (selectedProductId) {
// //       await controller.handleAddStock(selectedProductId, quantity);
// //       await loadProducts();
// //       setIsAddStockModalOpen(false);
// //       setSelectedProductId(null);
// //     }
// //   };

// //   const handleRemoveStock = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsRemoveStockModalOpen(true);
// //   };

// //   const handleConfirmRemoveStock = async (quantity: number) => {
// //     if (selectedProductId) {
// //       await controller.handleRemoveStock(selectedProductId, quantity);
// //       await loadProducts();
// //       setIsRemoveStockModalOpen(false);
// //       setSelectedProductId(null);
// //     }
// //   };

// //   const handleEdit = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleConfirmEdit = async (updatedData: Partial<Product>) => {
// //     if (selectedProductId) {
// //       await controller.handleUpdateProduct(selectedProductId, { id: selectedProductId, ...updatedData });
// //       await loadProducts();
// //       setIsEditModalOpen(false);
// //       setSelectedProductId(null);
// //     }
// //   };

// //   const handleView = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsViewModalOpen(true);
// //   };

// //   const handleDelete = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const handleConfirmDelete = async () => {
// //     if (selectedProductId) {
// //       await controller.handleDeleteProduct(selectedProductId);
// //       await loadProducts();
// //       setIsDeleteModalOpen(false);
// //       setSelectedProductId(null);
// //     }
// //   };

// //   const handleManageStock = (id: string) => {
// //     setSelectedProductId(id);
// //     setIsAddStockModalOpen(true);
// //   };

// //   const handleSelectProduct = (id: string, checked: boolean) => {
// //     if (checked) {
// //       setSelectedIds([...selectedIds, id]);
// //     } else {
// //       setSelectedIds(selectedIds.filter((sid: string) => sid !== id));
// //     }
// //   };

// //   const handleSelectAll = (checked: boolean) => {
// //     if (checked) {
// //       setSelectedIds(products.map((p: Product) => p.id));
// //     } else {
// //       setSelectedIds([]);
// //     }
// //   };

// //   const handleBulkDelete = async () => {
// //     if (selectedIds.length > 0 && window.confirm(`Delete ${selectedIds.length} selected products?`)) {
// //       await controller.handleBulkDelete(selectedIds);
// //       await loadProducts();
// //       setSelectedIds([]);
// //     }
// //   };

// //   // ============================================
// //   // QUICK ACTION HANDLERS
// //   // ============================================

// //   const handleNewProduct = () => {
// //     setShowNewProductPage(true);
// //     resetNewProductForm();
// //   };

// //   const handleOptionTypes = () => {
// //     setShowOptionTypesPage(true);
// //   };

// //   const handleBackToInventory = () => {
// //     setShowOptionTypesPage(false);
// //   };

// //   // ✅ NO DUPLICATE - using the single handleBackFromCollections defined above

// //   const handleProductSettings = () => {
// //     setShowProductSettingsModal(true);
// //   };

// //   const handleInventoryClick = () => {
// //     setActiveTab('products');
// //     loadProducts();
// //     setShowCollectionsPage(false);
// //     setShowProductSettingsModal(false);
// //     setShowNewProductPage(false);
// //   };

// //   const productSettings = [
// //     { id: 1, name: 'Default Tax Rate', value: '18%' },
// //     { id: 2, name: 'Default Currency', value: 'USD' },
// //     { id: 3, name: 'Stock Alert Threshold', value: '10 units' },
// //     { id: 4, name: 'Auto-approve Products', value: 'Enabled' },
// //     { id: 5, name: 'Enable Reviews', value: 'Yes' },
// //   ];

// //   // ============================================
// //   // RENDER NEW PRODUCT PAGE
// //   // ============================================
// //   if (showNewProductPage) {
// //     return (
// //       <div className="inventory-page">
// //         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //           <div className="px-4 sm:px-6 py-3 sm:py-4">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //               <div className="flex items-center gap-3">
// //                 <button
// //                   onClick={handleNewProductCancel}
// //                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                 >
// //                   <ArrowLeft size={20} className="text-gray-600" />
// //                 </button>
// //                 <div>
// //                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Product</h1>
// //                   <p className="text-xs sm:text-sm text-gray-500">Fill in the details to create a new product</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-4 sm:p-6 max-w-4xl mx-auto">
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Product Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={newProductForm.name}
// //                   onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
// //                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
// //                     newProductErrors.name ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                   placeholder="Enter product name"
// //                 />
// //                 {newProductErrors.name && <p className="text-red-500 text-xs mt-1">{newProductErrors.name}</p>}
// //               </div>

// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   SKU <span className="text-red-500">*</span>
// //                 </label>
// //                 <div className="flex gap-2">
// //                   <input
// //                     type="text"
// //                     value={newProductForm.sku}
// //                     onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value.replace(/\D/g, '') })}
// //                     className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
// //                       newProductErrors.sku ? 'border-red-500' : 'border-gray-300'
// //                     }`}
// //                     placeholder="Enter 12-digit SKU"
// //                     maxLength={12}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={generateSKU}
// //                     className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
// //                   >
// //                     Generate
// //                   </button>
// //                 </div>
// //                 {newProductErrors.sku && <p className="text-red-500 text-xs mt-1">{newProductErrors.sku}</p>}
// //                 <p className="text-xs text-gray-400 mt-1">Enter exactly 12 digits (e.g., 123456789012)</p>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Category <span className="text-red-500">*</span>
// //                 </label>
// //                 <select
// //                   value={newProductForm.category}
// //                   onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
// //                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
// //                     newProductErrors.category ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                 >
// //                   <option value="">Select category</option>
// //                   <option value="Electronics">Electronics</option>
// //                   <option value="Clothing">Clothing</option>
// //                   <option value="Books">Books</option>
// //                   <option value="Home & Garden">Home & Garden</option>
// //                   <option value="Toys">Toys</option>
// //                   <option value="Beauty">Beauty</option>
// //                   <option value="Sports">Sports</option>
// //                 </select>
// //                 {newProductErrors.category && <p className="text-red-500 text-xs mt-1">{newProductErrors.category}</p>}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Digital Product</label>
// //                 <div className="flex gap-4 pt-1.5">
// //                   <label className="flex items-center gap-2 cursor-pointer">
// //                     <input
// //                       type="radio"
// //                       value="No"
// //                       checked={newProductForm.digital === 'No'}
// //                       onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
// //                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
// //                     />
// //                     <span className="text-sm text-gray-700">No</span>
// //                   </label>
// //                   <label className="flex items-center gap-2 cursor-pointer">
// //                     <input
// //                       type="radio"
// //                       value="Yes"
// //                       checked={newProductForm.digital === 'Yes'}
// //                       onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
// //                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
// //                     />
// //                     <span className="text-sm text-gray-700">Yes</span>
// //                   </label>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
// //                 <div className="relative">
// //                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
// //                   <input
// //                     type="number"
// //                     value={newProductForm.price}
// //                     onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) || 0 })}
// //                     className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                     min="0"
// //                     step="0.01"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
// //                 <div className="relative">
// //                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
// //                   <input
// //                     type="number"
// //                     value={newProductForm.cost}
// //                     onChange={(e) => setNewProductForm({ ...newProductForm, cost: parseFloat(e.target.value) || 0 })}
// //                     className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                     min="0"
// //                     step="0.01"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantities</label>
// //                 <div className="grid grid-cols-3 gap-3">
// //                   <div>
// //                     <label className="block text-xs text-gray-500 mb-1">On Hand</label>
// //                     <input
// //                       type="number"
// //                       value={newProductForm.onHand}
// //                       onChange={(e) => setNewProductForm({ ...newProductForm, onHand: parseInt(e.target.value) || 0 })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                       min="0"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs text-gray-500 mb-1">Available</label>
// //                     <input
// //                       type="number"
// //                       value={newProductForm.available}
// //                       onChange={(e) => setNewProductForm({ ...newProductForm, available: parseInt(e.target.value) || 0 })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                       min="0"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs text-gray-500 mb-1">On Hold</label>
// //                     <input
// //                       type="number"
// //                       value={newProductForm.onHold}
// //                       onChange={(e) => setNewProductForm({ ...newProductForm, onHold: parseInt(e.target.value) || 0 })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                       min="0"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// //                 <select
// //                   value={newProductForm.status}
// //                   onChange={(e) => setNewProductForm({ ...newProductForm, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                 >
// //                   <option value="Active">Active</option>
// //                   <option value="Draft">Draft</option>
// //                   <option value="Inactive">Inactive</option>
// //                 </select>
// //               </div>

// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// //                 <textarea
// //                   value={newProductForm.description}
// //                   onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-y"
// //                   rows={3}
// //                   placeholder="Enter product description (max 2000 characters)"
// //                   maxLength={2000}
// //                 />
// //                 <p className="text-xs text-gray-400 mt-1">{newProductForm.description.length}/2000 characters</p>
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
// //               <button
// //                 onClick={handleNewProductSubmit}
// //                 disabled={newProductLoading}
// //                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
// //               >
// //                 {newProductLoading ? 'Creating...' : 'Create Product'}
// //               </button>
// //               <button
// //                 onClick={handleNewProductCancel}
// //                 className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ============================================
// //   // RENDER COLLECTIONS PAGE (Separate Page)
// //   // ============================================
// //   if (showCollectionsPage) {
// //     return (
// //       <div className="inventory-page">
// //         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //           <div className="px-4 sm:px-6 py-3 sm:py-4">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //               <div className="flex items-center gap-3">
// //                 <button
// //                   onClick={handleBackFromCollections}
// //                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                 >
// //                   <ArrowLeft size={20} className="text-gray-600" />
// //                 </button>
// //                 <div>
// //                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Collections</h1>
// //                   <p className="text-xs sm:text-sm text-gray-500">Manage product collections</p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={() => {
// //                   setNewCollectionName('');
// //                   setNewCollectionDescription('');
// //                   setEditingCollectionId(null);
// //                   document.getElementById('collection-form')?.scrollIntoView({ behavior: 'smooth' });
// //                 }}
// //                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
// //               >
// //                 <Plus size={18} />
// //                 New Collection
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-4 sm:p-6 max-w-full">
// //           {/* Add Collection Form */}
// //           <div id="collection-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
// //             <h2 className="text-lg font-semibold text-gray-800 mb-4">
// //               {editingCollectionId ? 'Edit Collection' : 'Create New Collection'}
// //             </h2>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Collection Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editingCollectionId ? editCollectionForm.name || '' : newCollectionName}
// //                   onChange={(e) => {
// //                     if (editingCollectionId) {
// //                       setEditCollectionForm({ ...editCollectionForm, name: e.target.value });
// //                     } else {
// //                       setNewCollectionName(e.target.value);
// //                     }
// //                   }}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
// //                   placeholder="Enter collection name"
// //                 />
// //               </div>

// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
// //                 <textarea
// //                   value={editingCollectionId ? editCollectionForm.description || '' : newCollectionDescription}
// //                   onChange={(e) => {
// //                     if (editingCollectionId) {
// //                       setEditCollectionForm({ ...editCollectionForm, description: e.target.value });
// //                     } else {
// //                       setNewCollectionDescription(e.target.value);
// //                     }
// //                   }}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-y"
// //                   rows={2}
// //                   placeholder="Enter collection description"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
// //               <button
// //                 onClick={editingCollectionId ? handleSaveCollectionEdit : handleAddCollection}
// //                 disabled={collectionLoading}
// //                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50"
// //               >
// //                 {collectionLoading ? 'Saving...' : (editingCollectionId ? 'Update Collection' : 'Create Collection')}
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   if (editingCollectionId) {
// //                     setEditingCollectionId(null);
// //                     setEditCollectionForm({});
// //                   } else {
// //                     setNewCollectionName('');
// //                     setNewCollectionDescription('');
// //                   }
// //                 }}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>

// //           {/* Search */}
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
// //               <input
// //                 type="text"
// //                 placeholder="Search collections..."
// //                 value={collectionSearchTerm}
// //                 onChange={(e) => setCollectionSearchTerm(e.target.value)}
// //                 className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
// //               />
// //               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
// //                 {filteredCollections.length} found
// //               </span>
// //             </div>
// //           </div>

// //           {/* Collections Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {filteredCollections.length === 0 ? (
// //               <div className="col-span-full text-center py-12 text-gray-500">
// //                 <Layers size={48} className="mx-auto text-gray-300 mb-3" />
// //                 <p className="text-lg font-medium text-gray-600">No collections found</p>
// //                 <p className="text-sm text-gray-400">Create your first collection above</p>
// //               </div>
// //             ) : (
// //               filteredCollections.map((collection) => (
// //                 <div
// //                   key={collection.id}
// //                   className="group bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 overflow-hidden"
// //                 >
// //                   {/* Color Bar */}
// //                   <div className={`h-2 bg-gradient-to-r ${collection.gradient}`}></div>
                  
// //                   <div className="p-4">
// //                     <div className="flex items-start justify-between mb-3">
// //                       <div className="flex items-center gap-3">
// //                         <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
// //                           <Layers size={18} />
// //                         </div>
// //                         <div>
// //                           <h3 className="font-semibold text-gray-800">{collection.name}</h3>
// //                           <p className="text-xs text-gray-500">{collection.productCount} products</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
// //                         <button
// //                           onClick={() => handleEditCollection(collection.id)}
// //                           className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
// //                           title="Edit"
// //                         >
// //                           <Edit size={14} />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDeleteCollection(collection.id)}
// //                           className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
// //                           title="Delete"
// //                         >
// //                           <Trash2 size={14} />
// //                         </button>
// //                       </div>
// //                     </div>
                    
// //                     {collection.description && (
// //                       <p className="text-sm text-gray-500 mb-3 line-clamp-2">{collection.description}</p>
// //                     )}
                    
// //                     <div className="flex gap-2">
// //                       <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
// //                         <Eye size={12} />
// //                         View Products
// //                       </button>
// //                       <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
// //                         <Trash2 size={12} />
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ============================================
// //   // RENDER OPTION TYPES PAGE
// //   // ============================================
// //   if (showOptionTypesPage) {
// //     return (
// //       <div className="inventory-page">
// //         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //           <div className="px-4 sm:px-6 py-3 sm:py-4">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //               <div className="flex items-center gap-3">
// //                 <button
// //                   onClick={handleBackToInventory}
// //                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                 >
// //                   <ArrowLeft size={20} className="text-gray-600" />
// //                 </button>
// //                 <div>
// //                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Option Types</h1>
// //                   <p className="text-xs sm:text-sm text-gray-500">Manage product variations</p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={() => {
// //                   resetOptionForm();
// //                   setEditingOptionId(null);
// //                   document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
// //                 }}
// //                 className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
// //               >
// //                 <Plus size={18} />
// //                 New Option Type
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-4 sm:p-6 max-w-full">
// //           <div id="option-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
// //             <h2 className="text-lg font-semibold text-gray-800 mb-4">
// //               {editingOptionId ? 'Edit Option Type' : 'Create New Option Type'}
// //             </h2>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editingOptionId ? editOptionForm.name || '' : optionFormData.name}
// //                   onChange={(e) => {
// //                     if (editingOptionId) {
// //                       setEditOptionForm({ ...editOptionForm, name: e.target.value });
// //                     } else {
// //                       setOptionFormData({ ...optionFormData, name: e.target.value });
// //                     }
// //                   }}
// //                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
// //                     optionErrors.name ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                   placeholder="e.g., color"
// //                   disabled={!!editingOptionId}
// //                 />
// //                 {optionErrors.name && <p className="text-red-500 text-xs mt-1">{optionErrors.name}</p>}
// //                 <p className="text-xs text-gray-400 mt-1">Unique identifier (lowercase, no spaces)</p>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Display Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editingOptionId ? editOptionForm.displayName || '' : optionFormData.displayName}
// //                   onChange={(e) => {
// //                     if (editingOptionId) {
// //                       setEditOptionForm({ ...editOptionForm, displayName: e.target.value });
// //                     } else {
// //                       setOptionFormData({ ...optionFormData, displayName: e.target.value });
// //                     }
// //                   }}
// //                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
// //                     optionErrors.displayName ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                   placeholder="e.g., Color"
// //                 />
// //                 {optionErrors.displayName && <p className="text-red-500 text-xs mt-1">{optionErrors.displayName}</p>}
// //               </div>

// //               <div className="sm:col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Values <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={editingOptionId ? (editOptionForm.values || []).join(', ') : optionFormData.values}
// //                   onChange={(e) => {
// //                     const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
// //                     if (editingOptionId) {
// //                       setEditOptionForm({ ...editOptionForm, values });
// //                     } else {
// //                       setOptionFormData({ ...optionFormData, values: e.target.value });
// //                     }
// //                   }}
// //                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
// //                     optionErrors.values ? 'border-red-500' : 'border-gray-300'
// //                   }`}
// //                   placeholder="e.g., Red, Blue, Green"
// //                 />
// //                 {optionErrors.values && <p className="text-red-500 text-xs mt-1">{optionErrors.values}</p>}
// //                 <p className="text-xs text-gray-400 mt-1">Comma separated values</p>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">On Hold</label>
// //                 <input
// //                   type="number"
// //                   value={editingOptionId ? editOptionForm.onHold || 0 : optionFormData.onHold}
// //                   onChange={(e) => {
// //                     const value = parseInt(e.target.value) || 0;
// //                     if (editingOptionId) {
// //                       setEditOptionForm({ ...editOptionForm, onHold: value });
// //                     } else {
// //                       setOptionFormData({ ...optionFormData, onHold: value });
// //                     }
// //                   }}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
// //                   min="0"
// //                   placeholder="0"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// //                 <select
// //                   value={editingOptionId ? editOptionForm.status || 'Active' : optionFormData.status}
// //                   onChange={(e) => {
// //                     const value = e.target.value as 'Active' | 'Draft' | 'Inactive';
// //                     if (editingOptionId) {
// //                       setEditOptionForm({ ...editOptionForm, status: value });
// //                     } else {
// //                       setOptionFormData({ ...optionFormData, status: value });
// //                     }
// //                   }}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
// //                 >
// //                   <option value="Active">Active</option>
// //                   <option value="Draft">Draft</option>
// //                   <option value="Inactive">Inactive</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
// //               <button
// //                 onClick={editingOptionId ? handleUpdateOption : handleAddOption}
// //                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
// //               >
// //                 {editingOptionId ? 'Update Option Type' : 'Create Option Type'}
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   if (editingOptionId) {
// //                     setEditingOptionId(null);
// //                     setEditOptionForm({});
// //                     setOptionErrors({});
// //                   } else {
// //                     resetOptionForm();
// //                   }
// //                 }}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISPLAY NAME</th>
// //                     <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VALUES</th>
// //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ON HOLD</th>
// //                     <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
// //                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {optionTypes.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No option types found</td>
// //                     </tr>
// //                   ) : (
// //                     optionTypes.map((option) => (
// //                       <tr key={option.id} className="hover:bg-gray-50 transition-colors">
// //                         <td className="px-4 py-3 text-sm font-medium text-gray-800">
// //                           <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{option.name}</span>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-700">{option.displayName}</td>
// //                         <td className="hidden md:table-cell px-4 py-3">
// //                           <div className="flex flex-wrap gap-1">
// //                             {option.values.slice(0, 3).map((val, idx) => (
// //                               <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center gap-1 group">
// //                                 {val}
// //                                 <button
// //                                   onClick={() => handleRemoveValue(option.id, val)}
// //                                   className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
// //                                 >
// //                                   <X size={12} />
// //                                 </button>
// //                               </span>
// //                             ))}
// //                             {option.values.length > 3 && (
// //                               <span className="text-xs text-gray-400">+{option.values.length - 3} more</span>
// //                             )}
// //                             <button
// //                               onClick={() => handleAddValue(option.id)}
// //                               className="px-2 py-0.5 text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors flex items-center gap-0.5 border border-dashed border-purple-300"
// //                             >
// //                               <Plus size={12} />
// //                               Add Value
// //                             </button>
// //                           </div>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-gray-600">{option.onHold}</td>
// //                         <td className="hidden sm:table-cell px-4 py-3">
// //                           <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(option.status)}`}>
// //                             {option.status}
// //                           </span>
// //                         </td>
// //                         <td className="px-4 py-3 text-right">
// //                           <div className="flex items-center justify-end gap-1">
// //                             <button
// //                               onClick={() => {
// //                                 setEditingOptionId(option.id);
// //                                 setEditOptionForm({
// //                                   name: option.name,
// //                                   displayName: option.displayName,
// //                                   values: option.values,
// //                                   onHold: option.onHold,
// //                                   status: option.status
// //                                 });
// //                                 document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
// //                               }}
// //                               className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
// //                               title="Edit"
// //                             >
// //                               <Edit size={16} />
// //                             </button>
// //                             <button
// //                               onClick={() => handleDeleteOption(option.id)}
// //                               className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
// //                               title="Delete"
// //                             >
// //                               <Trash2 size={16} />
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ============================================
// //   // RENDER CATEGORIES TAB CONTENT (No Modal)
// //   // ============================================
// //   const renderCategoriesContent = () => {
// //     return (
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //         <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //           <div className="relative flex-1 max-w-full sm:max-w-xs">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
// //             <input
// //               type="text"
// //               placeholder="Search categories..."
// //               value={categorySearchTerm}
// //               onChange={(e) => setCategorySearchTerm(e.target.value)}
// //               className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //             />
// //           </div>
// //           <button
// //             onClick={() => setShowCategoryAddForm(!showCategoryAddForm)}
// //             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
// //           >
// //             <Plus size={16} />
// //             Add Category
// //           </button>
// //         </div>

// //         {showCategoryAddForm && (
// //           <div className="p-3 sm:p-4 bg-blue-50 border-b border-blue-100">
// //             <div className="flex flex-col sm:flex-row gap-3">
// //               <input
// //                 type="text"
// //                 value={newCategoryName}
// //                 onChange={(e) => setNewCategoryName(e.target.value)}
// //                 placeholder="Enter category name..."
// //                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //                 autoFocus
// //               />
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleAddCategory}
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
// //                 >
// //                   Save
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowCategoryAddForm(false);
// //                     setNewCategoryName('');
// //                   }}
// //                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //                 <th className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
// //                 <th className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
// //                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {filteredCategories.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No categories found</td>
// //                 </tr>
// //               ) : (
// //                 filteredCategories.map((category) => (
// //                   <tr key={category.id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-3 sm:px-4 py-2 sm:py-3">
// //                       {editingCategoryId === category.id ? (
// //                         <input
// //                           type="text"
// //                           value={editCategoryForm.name || ''}
// //                           onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
// //                           className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                           autoFocus
// //                         />
// //                       ) : (
// //                         <span className="text-sm font-medium text-gray-800">{category.name}</span>
// //                       )}
// //                     </td>
// //                     <td className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-600">{category.productCount}</td>
// //                     <td className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-500">{category.createdAt}</td>
// //                     <td className="px-3 sm:px-4 py-2 sm:py-3">
// //                       {editingCategoryId === category.id ? (
// //                         <select
// //                           value={editCategoryForm.status || 'Active'}
// //                           onChange={(e) => setEditCategoryForm({ ...editCategoryForm, status: e.target.value as 'Active' | 'Inactive' })}
// //                           className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                         >
// //                           <option value="Active">Active</option>
// //                           <option value="Inactive">Inactive</option>
// //                         </select>
// //                       ) : (
// //                         <span className={`px-2 py-1 text-xs rounded-full font-medium ${
// //                           category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
// //                         }`}>
// //                           {category.status}
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
// //                       <div className="flex items-center justify-end gap-1">
// //                         {editingCategoryId === category.id ? (
// //                           <>
// //                             <button
// //                               onClick={handleSaveCategoryEdit}
// //                               className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
// //                               title="Save"
// //                             >
// //                               <Save size={14} />
// //                             </button>
// //                             <button
// //                               onClick={() => {
// //                                 setEditingCategoryId(null);
// //                                 setEditCategoryForm({});
// //                               }}
// //                               className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
// //                               title="Cancel"
// //                             >
// //                               <X size={14} />
// //                             </button>
// //                           </>
// //                         ) : (
// //                           <>
// //                             <button
// //                               onClick={() => handleEditCategory(category.id)}
// //                               className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
// //                               title="Edit"
// //                             >
// //                               <Edit size={14} className="sm:w-4 sm:h-4" />
// //                             </button>
// //                             <button
// //                               onClick={() => handleDeleteCategory(category.id)}
// //                               className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
// //                               title="Delete"
// //                             >
// //                               <Trash2 size={14} className="sm:w-4 sm:h-4" />
// //                             </button>
// //                           </>
// //                         )}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // ============================================
// //   // RENDER MAIN INVENTORY CONTENT
// //   // ============================================
// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case 'categories':
// //         return renderCategoriesContent();
// //       case 'collections':
// //         return (
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //               <div>
// //                 <h2 className="text-lg font-semibold text-gray-800">Collections</h2>
// //                 <p className="text-sm text-gray-500">Manage your product collections</p>
// //               </div>
// //               <button
// //                 onClick={handleCollections}
// //                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
// //               >
// //                 <Layers size={16} />
// //                 Manage Collections
// //               </button>
// //             </div>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {collections.slice(0, 3).map((collection) => (
// //                 <div key={collection.id} className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200">
// //                   <div className="flex items-start gap-3">
// //                     <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
// //                       <Layers size={18} />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <h3 className="font-medium text-gray-800 truncate">{collection.name}</h3>
// //                       <p className="text-xs text-gray-400">{collection.productCount} products</p>
// //                     </div>
// //                   </div>
// //                   <div className="mt-3 flex gap-2">
// //                     <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
// //                       <Eye size={12} className="inline mr-1" />
// //                       View Products
// //                     </button>
// //                     <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
// //                       <Trash2 size={12} className="inline mr-1" />
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );
// //       case 'stock':
// //         return (
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
// //             <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Management</h2>
// //             <p className="text-gray-500">Stock management features coming soon...</p>
// //           </div>
// //         );
// //       case 'settings':
// //         return (
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
// //             <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Settings</h2>
// //             <div className="space-y-4">
// //               {productSettings.map((setting) => (
// //                 <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3">
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">{setting.name}</p>
// //                     <p className="text-xs text-gray-400">Configure this setting</p>
// //                   </div>
// //                   <div className="flex items-center gap-3">
// //                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
// //                       {setting.value}
// //                     </span>
// //                     <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                       Change
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );
// //       default:
// //         return (
// //           <>
// //             <InventoryFilters 
// //               onFilterChange={handleFilterChange}
// //               onOptionTypes={handleOptionTypes}
// //               onCollections={handleCollections}
// //               onProductSettings={handleProductSettings}
// //               onInventoryClick={handleInventoryClick}
// //             />

// //             {selectedIds.length > 0 && (
// //               <div className="bg-blue-50 px-4 py-2 mb-4 rounded-lg flex items-center justify-between border border-blue-100">
// //                 <span className="text-sm text-blue-700">
// //                   {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
// //                 </span>
// //                 <button
// //                   onClick={handleBulkDelete}
// //                   className="text-sm text-red-600 hover:text-red-800 font-medium"
// //                 >
// //                   Delete Selected
// //                 </button>
// //               </div>
// //             )}

// //             <InventoryTable 
// //               products={products}
// //               onEdit={handleEdit}
// //               onView={handleView}
// //               onDelete={handleDelete}
// //               onAddStock={handleAddStock}
// //               onRemoveStock={handleRemoveStock}
// //               onManageStock={handleManageStock}
// //               selectedIds={selectedIds}
// //               onSelectProduct={handleSelectProduct}
// //               onSelectAll={handleSelectAll}
// //             />

// //             <InventoryPagination
// //               currentPage={controller.getPagination().currentPage}
// //               rowsPerPage={controller.getPagination().rowsPerPage}
// //               totalItems={controller.getPagination().totalItems}
// //               onPageChange={handlePageChange}
// //               onRowsPerPageChange={handleRowsPerPageChange}
// //             />
// //           </>
// //         );
// //     }
// //   };

// //   // ============================================
// //   // MAIN RENDER
// //   // ============================================
// //   return (
// //     <div className="inventory-page">
// //       <InventoryHeader 
// //         onNewProduct={handleNewProduct}
// //         onManageStock={() => alert('Manage Stock')}
// //         currentSection={activeTab}
// //         onExport={() => alert('Export')}
// //         onImport={() => alert('Import')}
// //       />
      
// //       {renderContent()}

// //       {/* Add Stock Modal */}
// //       <AddStockModal
// //         isOpen={isAddStockModalOpen}
// //         onClose={() => setIsAddStockModalOpen(false)}
// //         onConfirm={handleConfirmAddStock}
// //         productName={selectedProduct?.name}
// //       />

// //       {/* Remove Stock Modal */}
// //       <RemoveStockModal
// //         isOpen={isRemoveStockModalOpen}
// //         onClose={() => setIsRemoveStockModalOpen(false)}
// //         onConfirm={handleConfirmRemoveStock}
// //         productName={selectedProduct?.name}
// //         currentStock={selectedProduct?.available || 0}
// //       />

// //       {/* Edit Product Modal */}
// //       <EditProductModal
// //         isOpen={isEditModalOpen}
// //         onClose={() => setIsEditModalOpen(false)}
// //         onSave={handleConfirmEdit}
// //         product={selectedProduct}
// //       />

// //       {/* View Product Modal */}
// //       <ViewProductModal
// //         isOpen={isViewModalOpen}
// //         onClose={() => setIsViewModalOpen(false)}
// //         product={selectedProduct}
// //         onEdit={handleEdit}
// //         onAddStock={handleAddStock}
// //       />

// //       {/* Delete Product Modal */}
// //       <DeleteProductModal
// //         isOpen={isDeleteModalOpen}
// //         onClose={() => setIsDeleteModalOpen(false)}
// //         onConfirm={handleConfirmDelete}
// //         productName={selectedProduct?.name}
// //       />

// //       {/* Product Settings Modal */}
// //       {showProductSettingsModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="flex justify-between items-center mb-4 pb-3 border-b">
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-gray-100 rounded-lg">
// //                   <Settings size={20} className="text-gray-600" />
// //                 </div>
// //                 <div>
// //                   <h2 className="text-lg font-semibold text-gray-800">Product Settings</h2>
// //                   <p className="text-xs text-gray-500">Configure product preferences</p>
// //                 </div>
// //               </div>
// //               <button onClick={() => setShowProductSettingsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
// //                 <X size={22} />
// //               </button>
// //             </div>
            
// //             <div className="space-y-3 mt-2">
// //               {productSettings.map((setting) => (
// //                 <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">{setting.name}</p>
// //                     <p className="text-xs text-gray-400">Configure this setting</p>
// //                   </div>
// //                   <div className="flex items-center gap-3">
// //                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
// //                       {setting.value}
// //                     </span>
// //                     <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //                       Change
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
            
// //             <div className="mt-4 flex justify-end gap-3">
// //               <button
// //                 onClick={() => setShowProductSettingsModal(false)}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
// //               >
// //                 Close
// //               </button>
// //               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
// //                 <Settings size={16} />
// //                 Save Settings
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default InventoryPage;
// import React, { useState, useEffect } from 'react';
// import { 
//   X, Package, Tag, Layers, Plus, Trash2, Sliders, Settings, Edit, Eye,
//   BarChart3, TrendingUp, Clock, Users, DollarSign, AlertCircle, CheckCircle,
//   ArrowUp, ArrowDown, Search, Filter, MoreVertical, Save, ArrowLeft
// } from 'lucide-react';
// import { InventoryHeader } from './InventoryHeader';
// import { InventoryFilters } from './InventoryFilters';
// import { InventoryTable } from './InventoryTable';
// import { InventoryPagination } from './InventoryPagination';
// import { NewProductModal } from './NewProductModal';
// import { AddStockModal } from './AddStockModal';
// import { RemoveStockModal } from './RemoveStockModal';
// import { DeleteProductModal } from './DeleteProductModal';
// import { EditProductModal } from './EditProductModal';
// import { ViewProductModal } from './ViewProductModal';
// import { InventoryController } from '../../controllers/inventory.controller';
// import { Product, FilterOptions, CreateProductDTO, Category } from '../../types/Inventory.types';
// import { useNavigate } from 'react-router-dom';

// interface InventoryPageProps {
//   section?: string;
// }

// // Option Types Interface
// interface OptionType {
//   id: string;
//   name: string;
//   displayName: string;
//   values: string[];
//   onHold: number;
//   status: 'Active' | 'Draft' | 'Inactive';
//   createdAt: string;
// }

// // Collection Interface
// interface Collection {
//   id: string;
//   name: string;
//   productCount: number;
//   color: string;
//   gradient: string;
//   borderColor: string;
//   createdAt: string;
//   description?: string;
// }

// export const InventoryPage: React.FC<InventoryPageProps> = ({ section = 'products' }) => {
//   const navigate = useNavigate();
//   const [controller] = useState(() => new InventoryController());
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [activeTab, setActiveTab] = useState<string>(section || 'products');
  
//   // Modal states
//   const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
//   const [isRemoveStockModalOpen, setIsRemoveStockModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

//   // Quick action states
//   const [showProductSettingsModal, setShowProductSettingsModal] = useState(false);

//   // New Product Page State
//   const [showNewProductPage, setShowNewProductPage] = useState(false);
  
//   // Option Types Page State
//   const [showOptionTypesPage, setShowOptionTypesPage] = useState(false);
  
//   // Collections Page State
//   const [showCollectionsPage, setShowCollectionsPage] = useState(false);
  
//   // New Product Form State
//   const [newProductForm, setNewProductForm] = useState({
//     name: '',
//     sku: '',
//     category: '',
//     digital: 'No' as 'Yes' | 'No',
//     onHand: 0,
//     available: 0,
//     onHold: 0,
//     status: 'Draft' as 'Active' | 'Draft' | 'Inactive',
//     price: 0,
//     cost: 0,
//     description: ''
//   });
//   const [newProductErrors, setNewProductErrors] = useState<Record<string, string>>({});
//   const [newProductLoading, setNewProductLoading] = useState(false);

//   // Option Types State
//   const [optionTypes, setOptionTypes] = useState<OptionType[]>([
//     { id: '1', name: 'color', displayName: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'], onHold: 740, status: 'Active', createdAt: '2024-01-15' },
//     { id: '2', name: 'size', displayName: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'], onHold: 12345, status: 'Active', createdAt: '2024-01-20' },
//     { id: '3', name: 'material', displayName: 'Material', values: ['Cotton', 'Polyester', 'Wool', 'Silk'], onHold: 583, status: 'Draft', createdAt: '2024-02-01' },
//   ]);

//   const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
//   const [editOptionForm, setEditOptionForm] = useState<Partial<OptionType>>({});
//   const [optionFormData, setOptionFormData] = useState({
//     name: '',
//     displayName: '',
//     values: '',
//     onHold: 0,
//     status: 'Active' as 'Active' | 'Draft' | 'Inactive'
//   });
//   const [optionErrors, setOptionErrors] = useState<Record<string, string>>({});

//   // Collections State
//   const [collections, setCollections] = useState<Collection[]>([
//     { id: '1', name: 'Summer Collection', productCount: 0, color: 'orange', gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200', createdAt: '2024-06-01', description: 'Summer season products' },
//     { id: '2', name: 'Winter Collection', productCount: 0, color: 'blue', gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200', createdAt: '2024-06-01', description: 'Winter season products' },
//     { id: '3', name: 'Limited Edition', productCount: 0, color: 'purple', gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200', createdAt: '2024-06-01', description: 'Limited edition products' },
//     { id: '4', name: 'Premium Collection', productCount: 0, color: 'emerald', gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200', createdAt: '2024-06-01', description: 'Premium quality products' },
//   ]);
//   const [collectionSearchTerm, setCollectionSearchTerm] = useState('');
//   const [newCollectionName, setNewCollectionName] = useState('');
//   const [newCollectionDescription, setNewCollectionDescription] = useState('');
//   const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
//   const [editCollectionForm, setEditCollectionForm] = useState<Partial<Collection>>({});
//   const [collectionLoading, setCollectionLoading] = useState(false);

//   // Categories State
//   const [categories, setCategories] = useState<Category[]>([
//     { id: '1', name: 'Electronics', productCount: 45, status: 'Active', createdAt: '2024-01-15' },
//     { id: '2', name: 'Clothing', productCount: 32, status: 'Active', createdAt: '2024-01-20' },
//     { id: '3', name: 'Books', productCount: 28, status: 'Active', createdAt: '2024-02-01' },
//     { id: '4', name: 'Home & Garden', productCount: 15, status: 'Inactive', createdAt: '2024-02-15' },
//     { id: '5', name: 'Toys', productCount: 20, status: 'Active', createdAt: '2024-03-01' },
//   ]);
//   const [categorySearchTerm, setCategorySearchTerm] = useState('');
//   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
//   const [editCategoryForm, setEditCategoryForm] = useState<Partial<Category>>({});
//   const [showCategoryAddForm, setShowCategoryAddForm] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState('');

//   // ✅ FIXED: Type-safe category status toggle helper
//   const toggleCategoryStatus = (status: 'Active' | 'Inactive'): 'Active' | 'Inactive' => {
//     return status === 'Active' ? 'Inactive' : 'Active';
//   };

//   // Generate SKU
//   const generateSKU = () => {
//     const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
//     setNewProductForm({ ...newProductForm, sku });
//   };

//   // New Product Handlers
//   const handleNewProductSubmit = () => {
//     const errors: Record<string, string> = {};
//     if (!newProductForm.name.trim()) errors.name = 'Product name is required';
//     if (!newProductForm.sku.trim()) errors.sku = 'SKU is required';
//     if (newProductForm.sku.length !== 12) errors.sku = 'SKU must be exactly 12 digits';
//     if (!newProductForm.category) errors.category = 'Category is required';

//     if (Object.keys(errors).length > 0) {
//       setNewProductErrors(errors);
//       return;
//     }

//     setNewProductLoading(true);
    
//     setTimeout(() => {
//       const newProduct: Product = {
//         id: Date.now().toString(),
//         name: newProductForm.name,
//         digital: newProductForm.digital,
//         sku: newProductForm.sku,
//         onHand: newProductForm.onHand,
//         available: newProductForm.available || newProductForm.onHand,
//         onHold: newProductForm.onHold,
//         status: newProductForm.status,
//         category: newProductForm.category,
//         createdAt: new Date().toISOString(),
//         price: newProductForm.price,
//         cost: newProductForm.cost,
//         description: newProductForm.description
//       };
      
//       setProducts([newProduct, ...products]);
//       setNewProductLoading(false);
//       setShowNewProductPage(false);
//       resetNewProductForm();
//     }, 500);
//   };
// // ============================================
// // PRODUCT CLICK HANDLER - Navigate to Product Details Page
// // ============================================
// const handleProductClick = (productId: string) => {
//   navigate(`/inventory/product/${productId}`);
// };
//   const resetNewProductForm = () => {
//     setNewProductForm({
//       name: '',
//       sku: '',
//       category: '',
//       digital: 'No',
//       onHand: 0,
//       available: 0,
//       onHold: 0,
//       status: 'Draft',
//       price: 0,
//       cost: 0,
//       description: ''
//     });
//     setNewProductErrors({});
//   };

//   const handleNewProductCancel = () => {
//     setShowNewProductPage(false);
//     resetNewProductForm();
//   };

//   // ============================================
//   // COLLECTION HANDLERS - ALL IN ONE PLACE
//   // ============================================

//   // ✅ Open collections page
//   const handleCollections = () => {
//     setShowCollectionsPage(true);
//   };

//   // ✅ FIXED: SINGLE handleBackFromCollections function (only one declaration)
//   const handleBackFromCollections = () => {
//     setShowCollectionsPage(false);
//     resetCollectionForm();
//   };

//   const resetCollectionForm = () => {
//     setNewCollectionName('');
//     setNewCollectionDescription('');
//     setEditingCollectionId(null);
//     setEditCollectionForm({});
//     setCollectionSearchTerm('');
//   };

//   const handleAddCollection = () => {
//     if (!newCollectionName.trim()) {
//       alert('Collection name is required');
//       return;
//     }
    
//     setCollectionLoading(true);
    
//     const colors = ['orange', 'blue', 'purple', 'emerald', 'red', 'pink', 'indigo', 'teal'];
//     const colorMap: Record<string, { gradient: string; borderColor: string }> = {
//       orange: { gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200' },
//       blue: { gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200' },
//       purple: { gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200' },
//       emerald: { gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200' },
//       red: { gradient: 'from-red-400 to-red-500', borderColor: 'border-red-200' },
//       pink: { gradient: 'from-pink-400 to-pink-500', borderColor: 'border-pink-200' },
//       indigo: { gradient: 'from-indigo-400 to-indigo-500', borderColor: 'border-indigo-200' },
//       teal: { gradient: 'from-teal-400 to-teal-500', borderColor: 'border-teal-200' },
//     };
    
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
//     setTimeout(() => {
//       const newCollection: Collection = {
//         id: Date.now().toString(),
//         name: newCollectionName.trim(),
//         productCount: 0,
//         color: randomColor,
//         gradient: colorMap[randomColor].gradient,
//         borderColor: colorMap[randomColor].borderColor,
//         createdAt: new Date().toISOString().split('T')[0],
//         description: newCollectionDescription.trim() || undefined
//       };
      
//       setCollections([newCollection, ...collections]);
//       setNewCollectionName('');
//       setNewCollectionDescription('');
//       setCollectionLoading(false);
//     }, 300);
//   };

//   const handleEditCollection = (id: string) => {
//     const collection = collections.find(c => c.id === id);
//     if (collection) {
//       setEditingCollectionId(id);
//       setEditCollectionForm({ 
//         name: collection.name,
//         description: collection.description || ''
//       });
//     }
//   };

//   const handleSaveCollectionEdit = () => {
//     if (!editingCollectionId || !editCollectionForm.name?.trim()) return;
    
//     setCollectionLoading(true);
//     setTimeout(() => {
//       const updated = collections.map(c =>
//         c.id === editingCollectionId 
//           ? { 
//               ...c, 
//               name: editCollectionForm.name || c.name,
//               description: editCollectionForm.description || c.description
//             } 
//           : c
//       );
//       setCollections(updated);
//       setEditingCollectionId(null);
//       setEditCollectionForm({});
//       setCollectionLoading(false);
//     }, 300);
//   };

//   const handleDeleteCollection = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this collection?')) {
//       setCollectionLoading(true);
//       setTimeout(() => {
//         setCollections(collections.filter(c => c.id !== id));
//         setCollectionLoading(false);
//       }, 300);
//     }
//   };

//   const filteredCollections = collections.filter(c =>
//     c.name.toLowerCase().includes(collectionSearchTerm.toLowerCase()) ||
//     (c.description && c.description.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
//   );

//   // ============================================
//   // CATEGORY HANDLERS
//   // ============================================

//   const handleAddCategory = () => {
//     if (!newCategoryName.trim()) return;
//     const newCategory: Category = {
//       id: Date.now().toString(),
//       name: newCategoryName.trim(),
//       productCount: 0,
//       status: 'Active',
//       createdAt: new Date().toISOString().split('T')[0]
//     };
//     setCategories([newCategory, ...categories]);
//     setNewCategoryName('');
//     setShowCategoryAddForm(false);
//   };

//   const handleEditCategory = (id: string) => {
//     const category = categories.find(c => c.id === id);
//     if (category) {
//       setEditingCategoryId(id);
//       setEditCategoryForm({ ...category });
//     }
//   };

//   const handleSaveCategoryEdit = () => {
//     if (!editingCategoryId) return;
//     const updated = categories.map(c =>
//       c.id === editingCategoryId ? { ...c, ...editCategoryForm } : c
//     );
//     setCategories(updated);
//     setEditingCategoryId(null);
//     setEditCategoryForm({});
//   };

//   const handleDeleteCategory = (id: string) => {
//     if (window.confirm('Delete this category?')) {
//       setCategories(categories.filter(c => c.id !== id));
//     }
//   };

//   // ✅ FIXED: Type-safe category status toggle using helper function
//   const handleCategoryStatusToggle = (id: string) => {
//     const updated = categories.map(c =>
//       c.id === id 
//         ? { ...c, status: toggleCategoryStatus(c.status) } 
//         : c
//     );
//     setCategories(updated);
//   };

//   const filteredCategories = categories.filter(c =>
//     c.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
//   );

//   // ============================================
//   // OPTION TYPES HANDLERS
//   // ============================================

//   const handleAddOption = () => {
//     const errors: Record<string, string> = {};
//     if (!optionFormData.name.trim()) errors.name = 'Name is required';
//     if (!optionFormData.displayName.trim()) errors.displayName = 'Display name is required';
//     if (!optionFormData.values.trim()) errors.values = 'At least one value is required';

//     if (Object.keys(errors).length > 0) {
//       setOptionErrors(errors);
//       return;
//     }

//     const newOption: OptionType = {
//       id: Date.now().toString(),
//       name: optionFormData.name.trim().toLowerCase().replace(/\s+/g, '_'),
//       displayName: optionFormData.displayName.trim(),
//       values: optionFormData.values.split(',').map(v => v.trim()).filter(v => v),
//       onHold: optionFormData.onHold || 0,
//       status: optionFormData.status,
//       createdAt: new Date().toISOString().split('T')[0]
//     };

//     setOptionTypes([newOption, ...optionTypes]);
//     resetOptionForm();
//   };

//   const handleUpdateOption = () => {
//     if (!editingOptionId) return;
//     const errors: Record<string, string> = {};
//     if (!editOptionForm.displayName?.trim()) errors.displayName = 'Display name is required';
//     if (!editOptionForm.values?.length) errors.values = 'At least one value is required';

//     if (Object.keys(errors).length > 0) {
//       setOptionErrors(errors);
//       return;
//     }

//     const updated = optionTypes.map(opt =>
//       opt.id === editingOptionId
//         ? {
//             ...opt,
//             displayName: editOptionForm.displayName || opt.displayName,
//             values: editOptionForm.values || opt.values,
//             onHold: editOptionForm.onHold !== undefined ? editOptionForm.onHold : opt.onHold,
//             status: (editOptionForm.status as 'Active' | 'Draft' | 'Inactive') || opt.status
//           }
//         : opt
//     );
//     setOptionTypes(updated);
//     setEditingOptionId(null);
//     setEditOptionForm({});
//     setOptionErrors({});
//   };

//   const handleDeleteOption = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this option type?')) {
//       setOptionTypes(optionTypes.filter(o => o.id !== id));
//     }
//   };

//   const handleRemoveValue = (optionId: string, valueToRemove: string) => {
//     const updated = optionTypes.map(opt =>
//       opt.id === optionId ? { ...opt, values: opt.values.filter(v => v !== valueToRemove) } : opt
//     );
//     setOptionTypes(updated);
//   };

//   const handleAddValue = (optionId: string) => {
//     const newValue = prompt('Enter new value:');
//     if (newValue && newValue.trim()) {
//       const updated = optionTypes.map(opt =>
//         opt.id === optionId ? { ...opt, values: [...opt.values, newValue.trim()] } : opt
//       );
//       setOptionTypes(updated);
//     }
//   };

//   const resetOptionForm = () => {
//     setOptionFormData({ name: '', displayName: '', values: '', onHold: 0, status: 'Active' });
//     setOptionErrors({});
//   };

//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'Active': return 'bg-green-100 text-green-800';
//       case 'Draft': return 'bg-yellow-100 text-yellow-800';
//       case 'Inactive': return 'bg-gray-100 text-gray-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   // ============================================
//   // INVENTORY CRUD OPERATIONS
//   // ============================================

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       await controller.initialize();
//       setProducts(controller.getProducts());
//     } catch (error) {
//       console.error('Failed to load products:', error);
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

//   const selectedProduct = selectedProductId 
//     ? products.find((p: Product) => p.id === selectedProductId) 
//     : undefined;

//   const handleAddStock = (id: string) => {
//     setSelectedProductId(id);
//     setIsAddStockModalOpen(true);
//   };

//   const handleConfirmAddStock = async (quantity: number) => {
//     if (selectedProductId) {
//       await controller.handleAddStock(selectedProductId, quantity);
//       await loadProducts();
//       setIsAddStockModalOpen(false);
//       setSelectedProductId(null);
//     }
//   };

//   const handleRemoveStock = (id: string) => {
//     setSelectedProductId(id);
//     setIsRemoveStockModalOpen(true);
//   };

//   const handleConfirmRemoveStock = async (quantity: number) => {
//     if (selectedProductId) {
//       await controller.handleRemoveStock(selectedProductId, quantity);
//       await loadProducts();
//       setIsRemoveStockModalOpen(false);
//       setSelectedProductId(null);
//     }
//   };

//   const handleEdit = (id: string) => {
//     setSelectedProductId(id);
//     setIsEditModalOpen(true);
//   };

//   const handleConfirmEdit = async (updatedData: Partial<Product>) => {
//     if (selectedProductId) {
//       await controller.handleUpdateProduct(selectedProductId, { id: selectedProductId, ...updatedData });
//       await loadProducts();
//       setIsEditModalOpen(false);
//       setSelectedProductId(null);
//     }
//   };

//   const handleView = (id: string) => {
//     setSelectedProductId(id);
//     setIsViewModalOpen(true);
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
//       setSelectedProductId(null);
//     }
//   };

//   const handleManageStock = (id: string) => {
//     setSelectedProductId(id);
//     setIsAddStockModalOpen(true);
//   };

//   const handleSelectProduct = (id: string, checked: boolean) => {
//     if (checked) {
//       setSelectedIds([...selectedIds, id]);
//     } else {
//       setSelectedIds(selectedIds.filter((sid: string) => sid !== id));
//     }
//   };

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedIds(products.map((p: Product) => p.id));
//     } else {
//       setSelectedIds([]);
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedIds.length > 0 && window.confirm(`Delete ${selectedIds.length} selected products?`)) {
//       await controller.handleBulkDelete(selectedIds);
//       await loadProducts();
//       setSelectedIds([]);
//     }
//   };

//   // ============================================
//   // QUICK ACTION HANDLERS
//   // ============================================

//   const handleNewProduct = () => {
//     setShowNewProductPage(true);
//     resetNewProductForm();
//   };

//   const handleOptionTypes = () => {
//     setShowOptionTypesPage(true);
//   };

//   const handleBackToInventory = () => {
//     setShowOptionTypesPage(false);
//   };

//   // ✅ NO DUPLICATE - using the single handleBackFromCollections defined above

//   const handleProductSettings = () => {
//     setShowProductSettingsModal(true);
//   };

//   const handleInventoryClick = () => {
//     setActiveTab('products');
//     loadProducts();
//     setShowCollectionsPage(false);
//     setShowProductSettingsModal(false);
//     setShowNewProductPage(false);
//   };

//   const productSettings = [
//     { id: 1, name: 'Default Tax Rate', value: '18%' },
//     { id: 2, name: 'Default Currency', value: 'USD' },
//     { id: 3, name: 'Stock Alert Threshold', value: '10 units' },
//     { id: 4, name: 'Auto-approve Products', value: 'Enabled' },
//     { id: 5, name: 'Enable Reviews', value: 'Yes' },
//   ];

//   // ============================================
//   // RENDER NEW PRODUCT PAGE
//   // ============================================
//   if (showNewProductPage) {
//     return (
//       <div className="inventory-page">
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleNewProductCancel}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <ArrowLeft size={20} className="text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Product</h1>
//                   <p className="text-xs sm:text-sm text-gray-500">Fill in the details to create a new product</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 sm:p-6 max-w-4xl mx-auto">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={newProductForm.name}
//                   onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
//                     newProductErrors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter product name"
//                 />
//                 {newProductErrors.name && <p className="text-red-500 text-xs mt-1">{newProductErrors.name}</p>}
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   SKU <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newProductForm.sku}
//                     onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value.replace(/\D/g, '') })}
//                     className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
//                       newProductErrors.sku ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter 12-digit SKU"
//                     maxLength={12}
//                   />
//                   <button
//                     type="button"
//                     onClick={generateSKU}
//                     className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
//                   >
//                     Generate
//                   </button>
//                 </div>
//                 {newProductErrors.sku && <p className="text-red-500 text-xs mt-1">{newProductErrors.sku}</p>}
//                 <p className="text-xs text-gray-400 mt-1">Enter exactly 12 digits (e.g., 123456789012)</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={newProductForm.category}
//                   onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
//                     newProductErrors.category ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select category</option>
//                   <option value="Electronics">Electronics</option>
//                   <option value="Clothing">Clothing</option>
//                   <option value="Books">Books</option>
//                   <option value="Home & Garden">Home & Garden</option>
//                   <option value="Toys">Toys</option>
//                   <option value="Beauty">Beauty</option>
//                   <option value="Sports">Sports</option>
//                 </select>
//                 {newProductErrors.category && <p className="text-red-500 text-xs mt-1">{newProductErrors.category}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Digital Product</label>
//                 <div className="flex gap-4 pt-1.5">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="No"
//                       checked={newProductForm.digital === 'No'}
//                       onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
//                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">No</span>
//                   </label>
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="Yes"
//                       checked={newProductForm.digital === 'Yes'}
//                       onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
//                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Yes</span>
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={newProductForm.price}
//                     onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) || 0 })}
//                     className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                     min="0"
//                     step="0.01"
//                     placeholder="0.00"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={newProductForm.cost}
//                     onChange={(e) => setNewProductForm({ ...newProductForm, cost: parseFloat(e.target.value) || 0 })}
//                     className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                     min="0"
//                     step="0.01"
//                     placeholder="0.00"
//                   />
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantities</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">On Hand</label>
//                     <input
//                       type="number"
//                       value={newProductForm.onHand}
//                       onChange={(e) => setNewProductForm({ ...newProductForm, onHand: parseInt(e.target.value) || 0 })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Available</label>
//                     <input
//                       type="number"
//                       value={newProductForm.available}
//                       onChange={(e) => setNewProductForm({ ...newProductForm, available: parseInt(e.target.value) || 0 })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">On Hold</label>
//                     <input
//                       type="number"
//                       value={newProductForm.onHold}
//                       onChange={(e) => setNewProductForm({ ...newProductForm, onHold: parseInt(e.target.value) || 0 })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                       min="0"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={newProductForm.status}
//                   onChange={(e) => setNewProductForm({ ...newProductForm, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Draft">Draft</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={newProductForm.description}
//                   onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-y"
//                   rows={3}
//                   placeholder="Enter product description (max 2000 characters)"
//                   maxLength={2000}
//                 />
//                 <p className="text-xs text-gray-400 mt-1">{newProductForm.description.length}/2000 characters</p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
//               <button
//                 onClick={handleNewProductSubmit}
//                 disabled={newProductLoading}
//                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
//               >
//                 {newProductLoading ? 'Creating...' : 'Create Product'}
//               </button>
//               <button
//                 onClick={handleNewProductCancel}
//                 className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ============================================
//   // RENDER COLLECTIONS PAGE (Separate Page)
//   // ============================================
//   // if (showCollectionsPage) {
//   //   return (
//   //     <div className="inventory-page">
//   //       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//   //         <div className="px-4 sm:px-6 py-3 sm:py-4">
//   //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//   //             <div className="flex items-center gap-3">
//   //               <button
//   //                 onClick={handleBackFromCollections}
//   //                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//   //               >
//   //                 <ArrowLeft size={20} className="text-gray-600" />
//   //               </button>
//   //               <div>
//   //                 <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Collections</h1>
//   //                 <p className="text-xs sm:text-sm text-gray-500">Manage product collections</p>
//   //               </div>
//   //             </div>
//   //             <button
//   //               onClick={() => {
//   //                 setNewCollectionName('');
//   //                 setNewCollectionDescription('');
//   //                 setEditingCollectionId(null);
//   //                 document.getElementById('collection-form')?.scrollIntoView({ behavior: 'smooth' });
//   //               }}
//   //               className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
//   //             >
//   //               <Plus size={18} />
//   //               New Collection
//   //             </button>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       <div className="p-4 sm:p-6 max-w-full">
//   //         {/* Add Collection Form */}
//   //         <div id="collection-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
//   //           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//   //             {editingCollectionId ? 'Edit Collection' : 'Create New Collection'}
//   //           </h2>
            
//   //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//   //             <div className="sm:col-span-2">
//   //               <label className="block text-sm font-medium text-gray-700 mb-1">
//   //                 Collection Name <span className="text-red-500">*</span>
//   //               </label>
//   //               <input
//   //                 type="text"
//   //                 value={editingCollectionId ? editCollectionForm.name || '' : newCollectionName}
//   //                 onChange={(e) => {
//   //                   if (editingCollectionId) {
//   //                     setEditCollectionForm({ ...editCollectionForm, name: e.target.value });
//   //                   } else {
//   //                     setNewCollectionName(e.target.value);
//   //                   }
//   //                 }}
//   //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
//   //                 placeholder="Enter collection name"
//   //               />
//   //             </div>

//   //             <div className="sm:col-span-2">
//   //               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//   //               <textarea
//   //                 value={editingCollectionId ? editCollectionForm.description || '' : newCollectionDescription}
//   //                 onChange={(e) => {
//   //                   if (editingCollectionId) {
//   //                     setEditCollectionForm({ ...editCollectionForm, description: e.target.value });
//   //                   } else {
//   //                     setNewCollectionDescription(e.target.value);
//   //                   }
//   //                 }}
//   //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-y"
//   //                 rows={2}
//   //                 placeholder="Enter collection description"
//   //               />
//   //             </div>
//   //           </div>

//   //           <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
//   //             <button
//   //               onClick={editingCollectionId ? handleSaveCollectionEdit : handleAddCollection}
//   //               disabled={collectionLoading}
//   //               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50"
//   //             >
//   //               {collectionLoading ? 'Saving...' : (editingCollectionId ? 'Update Collection' : 'Create Collection')}
//   //             </button>
//   //             <button
//   //               onClick={() => {
//   //                 if (editingCollectionId) {
//   //                   setEditingCollectionId(null);
//   //                   setEditCollectionForm({});
//   //                 } else {
//   //                   setNewCollectionName('');
//   //                   setNewCollectionDescription('');
//   //                 }
//   //               }}
//   //               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
//   //             >
//   //               Cancel
//   //             </button>
//   //           </div>
//   //         </div>

//   //         {/* Search */}
//   //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
//   //           <div className="relative">
//   //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//   //             <input
//   //               type="text"
//   //               placeholder="Search collections..."
//   //               value={collectionSearchTerm}
//   //               onChange={(e) => setCollectionSearchTerm(e.target.value)}
//   //               className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
//   //             />
//   //             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
//   //               {filteredCollections.length} found
//   //             </span>
//   //           </div>
//   //         </div>

//   //         {/* Collections Grid */}
//   //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//   //           {filteredCollections.length === 0 ? (
//   //             <div className="col-span-full text-center py-12 text-gray-500">
//   //               <Layers size={48} className="mx-auto text-gray-300 mb-3" />
//   //               <p className="text-lg font-medium text-gray-600">No collections found</p>
//   //               <p className="text-sm text-gray-400">Create your first collection above</p>
//   //             </div>
//   //           ) : (
//   //             filteredCollections.map((collection) => (
//   //               <div
//   //                 key={collection.id}
//   //                 className="group bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200 overflow-hidden"
//   //               >
//   //                 {/* Color Bar */}
//   //                 <div className={`h-2 bg-gradient-to-r ${collection.gradient}`}></div>
                  
//   //                 <div className="p-4">
//   //                   <div className="flex items-start justify-between mb-3">
//   //                     <div className="flex items-center gap-3">
//   //                       <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
//   //                         <Layers size={18} />
//   //                       </div>
//   //                       <div>
//   //                         <h3 className="font-semibold text-gray-800">{collection.name}</h3>
//   //                         <p className="text-xs text-gray-500">{collection.productCount} products</p>
//   //                       </div>
//   //                     </div>
//   //                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//   //                       <button
//   //                         onClick={() => handleEditCollection(collection.id)}
//   //                         className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
//   //                         title="Edit"
//   //                       >
//   //                         <Edit size={14} />
//   //                       </button>
//   //                       <button
//   //                         onClick={() => handleDeleteCollection(collection.id)}
//   //                         className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
//   //                         title="Delete"
//   //                       >
//   //                         <Trash2 size={14} />
//   //                       </button>
//   //                     </div>
//   //                   </div>
                    
//   //                   {collection.description && (
//   //                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">{collection.description}</p>
//   //                   )}
                    
//   //                   <div className="flex gap-2">
//   //                     <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
//   //                       <Eye size={12} />
//   //                       View Products
//   //                     </button>
//   //                     <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
//   //                       <Trash2 size={12} />
//   //                       Delete
//   //                     </button>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             ))
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }
//   // ============================================
// // RENDER COLLECTIONS PAGE (Separate Page) - UPDATED
// // ============================================
// if (showCollectionsPage) {
//   return (
//     <div className="inventory-page">
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleBackFromCollections}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft size={20} className="text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Collections</h1>
//                 <p className="text-xs sm:text-sm text-gray-500">Manage product collections</p>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 setNewCollectionName('');
//                 setNewCollectionDescription('');
//                 setEditingCollectionId(null);
//                 document.getElementById('collection-form')?.scrollIntoView({ behavior: 'smooth' });
//               }}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
//             >
//               <Plus size={18} />
//               New Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-3 sm:p-6 max-w-full">
//         {/* Add Collection Form */}
//         <div id="collection-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             {editingCollectionId ? 'Edit Collection' : 'Create New Collection'}
//           </h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Collection Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={editingCollectionId ? editCollectionForm.name || '' : newCollectionName}
//                 onChange={(e) => {
//                   if (editingCollectionId) {
//                     setEditCollectionForm({ ...editCollectionForm, name: e.target.value });
//                   } else {
//                     setNewCollectionName(e.target.value);
//                   }
//                 }}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
//                 placeholder="Enter collection name"
//               />
//             </div>

//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 value={editingCollectionId ? editCollectionForm.description || '' : newCollectionDescription}
//                 onChange={(e) => {
//                   if (editingCollectionId) {
//                     setEditCollectionForm({ ...editCollectionForm, description: e.target.value });
//                   } else {
//                     setNewCollectionDescription(e.target.value);
//                   }
//                 }}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-y"
//                 rows={2}
//                 placeholder="Enter collection description"
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
//             <button
//               onClick={editingCollectionId ? handleSaveCollectionEdit : handleAddCollection}
//               disabled={collectionLoading}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50"
//             >
//               {collectionLoading ? 'Saving...' : (editingCollectionId ? 'Update Collection' : 'Create Collection')}
//             </button>
//             <button
//               onClick={() => {
//                 if (editingCollectionId) {
//                   setEditingCollectionId(null);
//                   setEditCollectionForm({});
//                 } else {
//                   setNewCollectionName('');
//                   setNewCollectionDescription('');
//                 }
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search collections..."
//               value={collectionSearchTerm}
//               onChange={(e) => setCollectionSearchTerm(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
//             />
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
//               {filteredCollections.length} found
//             </span>
//           </div>
//         </div>

//         {/* Collections Grid - UPDATED WITH PROFESSIONAL WHITE CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//           {filteredCollections.length === 0 ? (
//             <div className="col-span-full text-center py-12 text-gray-500">
//               <Layers size={48} className="mx-auto text-gray-300 mb-3" />
//               <p className="text-lg font-medium text-gray-600">No collections found</p>
//               <p className="text-sm text-gray-400">Create your first collection above</p>
//             </div>
//           ) : (
//             filteredCollections.map((collection) => (
//               <div
//                 key={collection.id}
//                 className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 overflow-hidden flex flex-col"
//               >
//                 {/* Clean white header with subtle accent */}
//                 <div className="p-4 sm:p-5 flex-1">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex items-center gap-3 min-w-0">
//                       {/* Professional icon with subtle gradient */}
//                       <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 flex-shrink-0 shadow-sm">
//                         <Layers size={18} className="sm:w-5 sm:h-5" />
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{collection.name}</h3>
//                         <p className="text-xs text-gray-500">
//                           {collection.productCount} product{collection.productCount !== 1 ? 's' : ''}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
//                       <button
//                         onClick={() => handleEditCollection(collection.id)}
//                         className="p-1.5 hover:bg-indigo-50 rounded-md text-gray-400 hover:text-indigo-600 transition-colors"
//                         title="Edit"
//                       >
//                         <Edit size={14} className="sm:w-4 sm:h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCollection(collection.id)}
//                         className="p-1.5 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-600 transition-colors"
//                         title="Delete"
//                       >
//                         <Trash2 size={14} className="sm:w-4 sm:h-4" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   {collection.description && (
//                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">{collection.description}</p>
//                   )}
//                 </div>
                
//                 {/* Action buttons with clean design */}
//                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex gap-2">
//                   <button className="flex-1 px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-gray-200 hover:border-indigo-200 flex items-center justify-center gap-1.5 font-medium">
//                     <Eye size={14} className="sm:w-4 sm:h-4" />
//                     View Products
//                   </button>
//                   <button className="px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-gray-200 hover:border-red-200 flex items-center justify-center gap-1.5 font-medium">
//                     <Trash2 size={14} className="sm:w-4 sm:h-4" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//   // ============================================
//   // RENDER OPTION TYPES PAGE
//   // ============================================
//   if (showOptionTypesPage) {
//     return (
//       <div className="inventory-page">
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleBackToInventory}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <ArrowLeft size={20} className="text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Option Types</h1>
//                   <p className="text-xs sm:text-sm text-gray-500">Manage product variations</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => {
//                   resetOptionForm();
//                   setEditingOptionId(null);
//                   document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
//                 }}
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
//               >
//                 <Plus size={18} />
//                 New Option Type
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 sm:p-6 max-w-full">
//           <div id="option-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               {editingOptionId ? 'Edit Option Type' : 'Create New Option Type'}
//             </h2>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={editingOptionId ? editOptionForm.name || '' : optionFormData.name}
//                   onChange={(e) => {
//                     if (editingOptionId) {
//                       setEditOptionForm({ ...editOptionForm, name: e.target.value });
//                     } else {
//                       setOptionFormData({ ...optionFormData, name: e.target.value });
//                     }
//                   }}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
//                     optionErrors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="e.g., color"
//                   disabled={!!editingOptionId}
//                 />
//                 {optionErrors.name && <p className="text-red-500 text-xs mt-1">{optionErrors.name}</p>}
//                 <p className="text-xs text-gray-400 mt-1">Unique identifier (lowercase, no spaces)</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Display Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={editingOptionId ? editOptionForm.displayName || '' : optionFormData.displayName}
//                   onChange={(e) => {
//                     if (editingOptionId) {
//                       setEditOptionForm({ ...editOptionForm, displayName: e.target.value });
//                     } else {
//                       setOptionFormData({ ...optionFormData, displayName: e.target.value });
//                     }
//                   }}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
//                     optionErrors.displayName ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="e.g., Color"
//                 />
//                 {optionErrors.displayName && <p className="text-red-500 text-xs mt-1">{optionErrors.displayName}</p>}
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Values <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={editingOptionId ? (editOptionForm.values || []).join(', ') : optionFormData.values}
//                   onChange={(e) => {
//                     const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
//                     if (editingOptionId) {
//                       setEditOptionForm({ ...editOptionForm, values });
//                     } else {
//                       setOptionFormData({ ...optionFormData, values: e.target.value });
//                     }
//                   }}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
//                     optionErrors.values ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="e.g., Red, Blue, Green"
//                 />
//                 {optionErrors.values && <p className="text-red-500 text-xs mt-1">{optionErrors.values}</p>}
//                 <p className="text-xs text-gray-400 mt-1">Comma separated values</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">On Hold</label>
//                 <input
//                   type="number"
//                   value={editingOptionId ? editOptionForm.onHold || 0 : optionFormData.onHold}
//                   onChange={(e) => {
//                     const value = parseInt(e.target.value) || 0;
//                     if (editingOptionId) {
//                       setEditOptionForm({ ...editOptionForm, onHold: value });
//                     } else {
//                       setOptionFormData({ ...optionFormData, onHold: value });
//                     }
//                   }}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
//                   min="0"
//                   placeholder="0"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={editingOptionId ? editOptionForm.status || 'Active' : optionFormData.status}
//                   onChange={(e) => {
//                     const value = e.target.value as 'Active' | 'Draft' | 'Inactive';
//                     if (editingOptionId) {
//                       setEditOptionForm({ ...editOptionForm, status: value });
//                     } else {
//                       setOptionFormData({ ...optionFormData, status: value });
//                     }
//                   }}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Draft">Draft</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
//               <button
//                 onClick={editingOptionId ? handleUpdateOption : handleAddOption}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
//               >
//                 {editingOptionId ? 'Update Option Type' : 'Create Option Type'}
//               </button>
//               <button
//                 onClick={() => {
//                   if (editingOptionId) {
//                     setEditingOptionId(null);
//                     setEditOptionForm({});
//                     setOptionErrors({});
//                   } else {
//                     resetOptionForm();
//                   }
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISPLAY NAME</th>
//                     <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VALUES</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ON HOLD</th>
//                     <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {optionTypes.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No option types found</td>
//                     </tr>
//                   ) : (
//                     optionTypes.map((option) => (
//                       <tr key={option.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3 text-sm font-medium text-gray-800">
//                           <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{option.name}</span>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{option.displayName}</td>
//                         <td className="hidden md:table-cell px-4 py-3">
//                           <div className="flex flex-wrap gap-1">
//                             {option.values.slice(0, 3).map((val, idx) => (
//                               <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center gap-1 group">
//                                 {val}
//                                 <button
//                                   onClick={() => handleRemoveValue(option.id, val)}
//                                   className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                                 >
//                                   <X size={12} />
//                                 </button>
//                               </span>
//                             ))}
//                             {option.values.length > 3 && (
//                               <span className="text-xs text-gray-400">+{option.values.length - 3} more</span>
//                             )}
//                             <button
//                               onClick={() => handleAddValue(option.id)}
//                               className="px-2 py-0.5 text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors flex items-center gap-0.5 border border-dashed border-purple-300"
//                             >
//                               <Plus size={12} />
//                               Add Value
//                             </button>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{option.onHold}</td>
//                         <td className="hidden sm:table-cell px-4 py-3">
//                           <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(option.status)}`}>
//                             {option.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-right">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               onClick={() => {
//                                 setEditingOptionId(option.id);
//                                 setEditOptionForm({
//                                   name: option.name,
//                                   displayName: option.displayName,
//                                   values: option.values,
//                                   onHold: option.onHold,
//                                   status: option.status
//                                 });
//                                 document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
//                               }}
//                               className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
//                               title="Edit"
//                             >
//                               <Edit size={16} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteOption(option.id)}
//                               className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ============================================
//   // RENDER CATEGORIES TAB CONTENT (No Modal)
//   // ============================================
//   const renderCategoriesContent = () => {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div className="relative flex-1 max-w-full sm:max-w-xs">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search categories..."
//               value={categorySearchTerm}
//               onChange={(e) => setCategorySearchTerm(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//             />
//           </div>
//           <button
//             onClick={() => setShowCategoryAddForm(!showCategoryAddForm)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
//           >
//             <Plus size={16} />
//             Add Category
//           </button>
//         </div>

//         {showCategoryAddForm && (
//           <div className="p-3 sm:p-4 bg-blue-50 border-b border-blue-100">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="text"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 placeholder="Enter category name..."
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleAddCategory}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowCategoryAddForm(false);
//                     setNewCategoryName('');
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
//                 <th className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredCategories.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No categories found</td>
//                 </tr>
//               ) : (
//                 filteredCategories.map((category) => (
//                   <tr key={category.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-3 sm:px-4 py-2 sm:py-3">
//                       {editingCategoryId === category.id ? (
//                         <input
//                           type="text"
//                           value={editCategoryForm.name || ''}
//                           onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
//                           className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                           autoFocus
//                         />
//                       ) : (
//                         <span className="text-sm font-medium text-gray-800">{category.name}</span>
//                       )}
//                     </td>
//                     <td className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-600">{category.productCount}</td>
//                     <td className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-500">{category.createdAt}</td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3">
//                       {editingCategoryId === category.id ? (
//                         <select
//                           value={editCategoryForm.status || 'Active'}
//                           onChange={(e) => setEditCategoryForm({ ...editCategoryForm, status: e.target.value as 'Active' | 'Inactive' })}
//                           className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                         >
//                           <option value="Active">Active</option>
//                           <option value="Inactive">Inactive</option>
//                         </select>
//                       ) : (
//                         <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                           category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
//                         }`}>
//                           {category.status}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
//                       <div className="flex items-center justify-end gap-1">
//                         {editingCategoryId === category.id ? (
//                           <>
//                             <button
//                               onClick={handleSaveCategoryEdit}
//                               className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//                               title="Save"
//                             >
//                               <Save size={14} />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setEditingCategoryId(null);
//                                 setEditCategoryForm({});
//                               }}
//                               className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
//                               title="Cancel"
//                             >
//                               <X size={14} />
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => handleEditCategory(category.id)}
//                               className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
//                               title="Edit"
//                             >
//                               <Edit size={14} className="sm:w-4 sm:h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleCategoryStatusToggle(category.id)}
//                               className="p-1.5 hover:bg-yellow-100 rounded-md text-yellow-600 hover:text-yellow-800 transition-colors"
//                               title="Toggle Status"
//                             >
//                               <Sliders size={14} className="sm:w-4 sm:h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteCategory(category.id)}
//                               className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 size={14} className="sm:w-4 sm:h-4" />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   // ============================================
//   // RENDER MAIN INVENTORY CONTENT
//   // ============================================
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'categories':
//         return renderCategoriesContent();
//       case 'collections':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Collections</h2>
//                 <p className="text-sm text-gray-500">Manage your product collections</p>
//               </div>
//               <button
//                 onClick={handleCollections}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
//               >
//                 <Layers size={16} />
//                 Manage Collections
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {collections.slice(0, 3).map((collection) => (
//                 <div key={collection.id} className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200">
//                   <div className="flex items-start gap-3">
//                     <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
//                       <Layers size={18} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-800 truncate">{collection.name}</h3>
//                       <p className="text-xs text-gray-400">{collection.productCount} products</p>
//                     </div>
//                   </div>
//                   <div className="mt-3 flex gap-2">
//                     <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                       <Eye size={12} className="inline mr-1" />
//                       View Products
//                     </button>
//                     <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
//                       <Trash2 size={12} className="inline mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'stock':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Management</h2>
//             <p className="text-gray-500">Stock management features coming soon...</p>
//           </div>
//         );
//       case 'settings':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Settings</h2>
//             <div className="space-y-4">
//               {productSettings.map((setting) => (
//                 <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3">
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{setting.name}</p>
//                     <p className="text-xs text-gray-400">Configure this setting</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                       {setting.value}
//                     </span>
//                     <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                       Change
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return (
//           <>
//             <InventoryFilters 
//               onFilterChange={handleFilterChange}
//               onOptionTypes={handleOptionTypes}
//               onCollections={handleCollections}
//               onProductSettings={handleProductSettings}
//               onInventoryClick={handleInventoryClick}
//             />

//             {selectedIds.length > 0 && (
//               <div className="bg-blue-50 px-4 py-2 mb-4 rounded-lg flex items-center justify-between border border-blue-100">
//                 <span className="text-sm text-blue-700">
//                   {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
//                 </span>
//                 <button
//                   onClick={handleBulkDelete}
//                   className="text-sm text-red-600 hover:text-red-800 font-medium"
//                 >
//                   Delete Selected
//                 </button>
//               </div>
//             )}

//             <InventoryTable 
//               products={products}
//               onEdit={handleEdit}
//               onView={handleView}
//               onDelete={handleDelete}
//               onAddStock={handleAddStock}
//               onProductClick={handleProductClick} 
//               onRemoveStock={handleRemoveStock}
//               onManageStock={handleManageStock}
//               selectedIds={selectedIds}
//               onSelectProduct={handleSelectProduct}
//               onSelectAll={handleSelectAll}
//             />

//             <InventoryPagination
//               currentPage={controller.getPagination().currentPage}
//               rowsPerPage={controller.getPagination().rowsPerPage}
//               totalItems={controller.getPagination().totalItems}
//               onPageChange={handlePageChange}
//               onRowsPerPageChange={handleRowsPerPageChange}
//             />
//           </>
//         );
//     }
//   };

//   // ============================================
//   // MAIN RENDER
//   // ============================================
//   return (
//     <div className="inventory-page">
//       <InventoryHeader 
//         onNewProduct={handleNewProduct}
//         onManageStock={() => alert('Manage Stock')}
//         currentSection={activeTab}
//         onExport={() => alert('Export')}
//         onImport={() => alert('Import')}
//       />
      
//       {renderContent()}

//       {/* Add Stock Modal */}
//       <AddStockModal
//         isOpen={isAddStockModalOpen}
//         onClose={() => setIsAddStockModalOpen(false)}
//         onConfirm={handleConfirmAddStock}
//         productName={selectedProduct?.name}
//       />

//       {/* Remove Stock Modal */}
//       <RemoveStockModal
//         isOpen={isRemoveStockModalOpen}
//         onClose={() => setIsRemoveStockModalOpen(false)}
//         onConfirm={handleConfirmRemoveStock}
//         productName={selectedProduct?.name}
//         currentStock={selectedProduct?.available || 0}
//       />

//       {/* Edit Product Modal */}
//       <EditProductModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleConfirmEdit}
//         product={selectedProduct}
//       />

//       {/* View Product Modal */}
//       <ViewProductModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//         product={selectedProduct}
//         onEdit={handleEdit}
//         onAddStock={handleAddStock}
//       />

//       {/* Delete Product Modal */}
//       <DeleteProductModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={handleConfirmDelete}
//         productName={selectedProduct?.name}
//       />

//       {/* Product Settings Modal */}
//       {showProductSettingsModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4 pb-3 border-b">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <Settings size={20} className="text-gray-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">Product Settings</h2>
//                   <p className="text-xs text-gray-500">Configure product preferences</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowProductSettingsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <X size={22} />
//               </button>
//             </div>
            
//             <div className="space-y-3 mt-2">
//               {productSettings.map((setting) => (
//                 <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{setting.name}</p>
//                     <p className="text-xs text-gray-400">Configure this setting</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                       {setting.value}
//                     </span>
//                     <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                       Change
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-4 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowProductSettingsModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Close
//               </button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
//                 <Settings size={16} />
//                 Save Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryPage;
=======
>>>>>>> 9d3a758017a499f301efdcdccacad43ddaadcaef
import React, { useState, useEffect } from 'react';
import { 
  X, Package, Tag, Layers, Plus, Trash2, Sliders, Settings, Edit, Eye,
  BarChart3, TrendingUp, Clock, Users, DollarSign, AlertCircle, CheckCircle,
  ArrowUp, ArrowDown, Search, Filter, MoreVertical, Save, ArrowLeft
} from 'lucide-react';
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
import { Product, FilterOptions, CreateProductDTO, Category } from '../../types/Inventory.types';
import { useNavigate } from 'react-router-dom';

interface InventoryPageProps {
  section?: string;
}

// Option Types Interface
interface OptionType {
  id: string;
  name: string;
  displayName: string;
  values: string[];
  onHold: number;
  status: 'Active' | 'Draft' | 'Inactive';
  createdAt: string;
}

// Collection Interface
interface Collection {
  id: string;
  name: string;
  productCount: number;
  color: string;
  gradient: string;
  borderColor: string;
  createdAt: string;
  description?: string;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({ section = 'products' }) => {
  const navigate = useNavigate();
  const [controller] = useState(() => new InventoryController());
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>(section || 'products');
  
  // Modal states
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isRemoveStockModalOpen, setIsRemoveStockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Quick action states
  const [showProductSettingsModal, setShowProductSettingsModal] = useState(false);

  // New Product Page State
  const [showNewProductPage, setShowNewProductPage] = useState(false);
  
  // Option Types Page State
  const [showOptionTypesPage, setShowOptionTypesPage] = useState(false);
  
  // Collections Page State
  const [showCollectionsPage, setShowCollectionsPage] = useState(false);
  
  // New Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    sku: '',
    category: '',
    digital: 'No' as 'Yes' | 'No',
    onHand: 0,
    available: 0,
    onHold: 0,
    status: 'Draft' as 'Active' | 'Draft' | 'Inactive',
    price: 0,
    cost: 0,
    description: ''
  });
  const [newProductErrors, setNewProductErrors] = useState<Record<string, string>>({});
  const [newProductLoading, setNewProductLoading] = useState(false);

  // Option Types State
  const [optionTypes, setOptionTypes] = useState<OptionType[]>([
    { id: '1', name: 'color', displayName: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'], onHold: 740, status: 'Active', createdAt: '2024-01-15' },
    { id: '2', name: 'size', displayName: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'], onHold: 12345, status: 'Active', createdAt: '2024-01-20' },
    { id: '3', name: 'material', displayName: 'Material', values: ['Cotton', 'Polyester', 'Wool', 'Silk'], onHold: 583, status: 'Draft', createdAt: '2024-02-01' },
  ]);

  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  const [editOptionForm, setEditOptionForm] = useState<Partial<OptionType>>({});
  const [optionFormData, setOptionFormData] = useState({
    name: '',
    displayName: '',
    values: '',
    onHold: 0,
    status: 'Active' as 'Active' | 'Draft' | 'Inactive'
  });
  const [optionErrors, setOptionErrors] = useState<Record<string, string>>({});

  // Collections State
  const [collections, setCollections] = useState<Collection[]>([
    { id: '1', name: 'Summer Collection', productCount: 0, color: 'orange', gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200', createdAt: '2024-06-01', description: 'Summer season products' },
    { id: '2', name: 'Winter Collection', productCount: 0, color: 'blue', gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200', createdAt: '2024-06-01', description: 'Winter season products' },
    { id: '3', name: 'Limited Edition', productCount: 0, color: 'purple', gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200', createdAt: '2024-06-01', description: 'Limited edition products' },
    { id: '4', name: 'Premium Collection', productCount: 0, color: 'emerald', gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200', createdAt: '2024-06-01', description: 'Premium quality products' },
  ]);
  const [collectionSearchTerm, setCollectionSearchTerm] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [editCollectionForm, setEditCollectionForm] = useState<Partial<Collection>>({});
  const [collectionLoading, setCollectionLoading] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Electronics', productCount: 45, status: 'Active', createdAt: '2024-01-15' },
    { id: '2', name: 'Clothing', productCount: 32, status: 'Active', createdAt: '2024-01-20' },
    { id: '3', name: 'Books', productCount: 28, status: 'Active', createdAt: '2024-02-01' },
    { id: '4', name: 'Home & Garden', productCount: 15, status: 'Inactive', createdAt: '2024-02-15' },
    { id: '5', name: 'Toys', productCount: 20, status: 'Active', createdAt: '2024-03-01' },
  ]);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState<Partial<Category>>({});
  const [showCategoryAddForm, setShowCategoryAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // ✅ FIXED: Type-safe category status toggle helper
  const toggleCategoryStatus = (status: 'Active' | 'Inactive'): 'Active' | 'Inactive' => {
    return status === 'Active' ? 'Inactive' : 'Active';
  };

  // Generate SKU
  const generateSKU = () => {
    const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setNewProductForm({ ...newProductForm, sku });
  };

  // New Product Handlers
  const handleNewProductSubmit = () => {
    const errors: Record<string, string> = {};
    if (!newProductForm.name.trim()) errors.name = 'Product name is required';
    if (!newProductForm.sku.trim()) errors.sku = 'SKU is required';
    if (newProductForm.sku.length !== 12) errors.sku = 'SKU must be exactly 12 digits';
    if (!newProductForm.category) errors.category = 'Category is required';

    if (Object.keys(errors).length > 0) {
      setNewProductErrors(errors);
      return;
    }

    setNewProductLoading(true);
    
    setTimeout(() => {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: newProductForm.name,
        digital: newProductForm.digital,
        sku: newProductForm.sku,
        onHand: newProductForm.onHand,
        available: newProductForm.available || newProductForm.onHand,
        onHold: newProductForm.onHold,
        status: newProductForm.status,
        category: newProductForm.category,
        createdAt: new Date().toISOString(),
        price: newProductForm.price,
        cost: newProductForm.cost,
        description: newProductForm.description
      };
      
      setProducts([newProduct, ...products]);
      setNewProductLoading(false);
      setShowNewProductPage(false);
      resetNewProductForm();
    }, 500);
  };

  // ============================================
  // PRODUCT CLICK HANDLER - Navigate to Product Details Page
  // ============================================
  const handleProductClick = (product: Product) => {
    navigate(`/inventory/product/${product.id}`, { 
      state: { product } // Pass the entire product object
    });
  };

  const resetNewProductForm = () => {
    setNewProductForm({
      name: '',
      sku: '',
      category: '',
      digital: 'No',
      onHand: 0,
      available: 0,
      onHold: 0,
      status: 'Draft',
      price: 0,
      cost: 0,
      description: ''
    });
    setNewProductErrors({});
  };

  const handleNewProductCancel = () => {
    setShowNewProductPage(false);
    resetNewProductForm();
  };

  // ============================================
  // COLLECTION HANDLERS
  // ============================================

  const handleCollections = () => {
    setShowCollectionsPage(true);
  };

  const handleBackFromCollections = () => {
    setShowCollectionsPage(false);
    resetCollectionForm();
  };

  const resetCollectionForm = () => {
    setNewCollectionName('');
    setNewCollectionDescription('');
    setEditingCollectionId(null);
    setEditCollectionForm({});
    setCollectionSearchTerm('');
  };

  const handleAddCollection = () => {
    if (!newCollectionName.trim()) {
      alert('Collection name is required');
      return;
    }
    
    setCollectionLoading(true);
    
    const colors = ['orange', 'blue', 'purple', 'emerald', 'red', 'pink', 'indigo', 'teal'];
    const colorMap: Record<string, { gradient: string; borderColor: string }> = {
      orange: { gradient: 'from-orange-400 to-orange-500', borderColor: 'border-orange-200' },
      blue: { gradient: 'from-blue-400 to-blue-500', borderColor: 'border-blue-200' },
      purple: { gradient: 'from-purple-400 to-purple-500', borderColor: 'border-purple-200' },
      emerald: { gradient: 'from-emerald-400 to-emerald-500', borderColor: 'border-emerald-200' },
      red: { gradient: 'from-red-400 to-red-500', borderColor: 'border-red-200' },
      pink: { gradient: 'from-pink-400 to-pink-500', borderColor: 'border-pink-200' },
      indigo: { gradient: 'from-indigo-400 to-indigo-500', borderColor: 'border-indigo-200' },
      teal: { gradient: 'from-teal-400 to-teal-500', borderColor: 'border-teal-200' },
    };
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setTimeout(() => {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        productCount: 0,
        color: randomColor,
        gradient: colorMap[randomColor].gradient,
        borderColor: colorMap[randomColor].borderColor,
        createdAt: new Date().toISOString().split('T')[0],
        description: newCollectionDescription.trim() || undefined
      };
      
      setCollections([newCollection, ...collections]);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setCollectionLoading(false);
    }, 300);
  };

  const handleEditCollection = (id: string) => {
    const collection = collections.find(c => c.id === id);
    if (collection) {
      setEditingCollectionId(id);
      setEditCollectionForm({ 
        name: collection.name,
        description: collection.description || ''
      });
    }
  };

  const handleSaveCollectionEdit = () => {
    if (!editingCollectionId || !editCollectionForm.name?.trim()) return;
    
    setCollectionLoading(true);
    setTimeout(() => {
      const updated = collections.map(c =>
        c.id === editingCollectionId 
          ? { 
              ...c, 
              name: editCollectionForm.name || c.name,
              description: editCollectionForm.description || c.description
            } 
          : c
      );
      setCollections(updated);
      setEditingCollectionId(null);
      setEditCollectionForm({});
      setCollectionLoading(false);
    }, 300);
  };

  const handleDeleteCollection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollectionLoading(true);
      setTimeout(() => {
        setCollections(collections.filter(c => c.id !== id));
        setCollectionLoading(false);
      }, 300);
    }
  };

  const filteredCollections = collections.filter(c =>
    c.name.toLowerCase().includes(collectionSearchTerm.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
  );

  // ============================================
  // CATEGORY HANDLERS
  // ============================================

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      productCount: 0,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories([newCategory, ...categories]);
    setNewCategoryName('');
    setShowCategoryAddForm(false);
  };

  const handleEditCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setEditingCategoryId(id);
      setEditCategoryForm({ ...category });
    }
  };

  const handleSaveCategoryEdit = () => {
    if (!editingCategoryId) return;
    const updated = categories.map(c =>
      c.id === editingCategoryId ? { ...c, ...editCategoryForm } : c
    );
    setCategories(updated);
    setEditingCategoryId(null);
    setEditCategoryForm({});
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleCategoryStatusToggle = (id: string) => {
    const updated = categories.map(c =>
      c.id === id 
        ? { ...c, status: toggleCategoryStatus(c.status) } 
        : c
    );
    setCategories(updated);
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  // ============================================
  // OPTION TYPES HANDLERS
  // ============================================

  const handleAddOption = () => {
    const errors: Record<string, string> = {};
    if (!optionFormData.name.trim()) errors.name = 'Name is required';
    if (!optionFormData.displayName.trim()) errors.displayName = 'Display name is required';
    if (!optionFormData.values.trim()) errors.values = 'At least one value is required';

    if (Object.keys(errors).length > 0) {
      setOptionErrors(errors);
      return;
    }

    const newOption: OptionType = {
      id: Date.now().toString(),
      name: optionFormData.name.trim().toLowerCase().replace(/\s+/g, '_'),
      displayName: optionFormData.displayName.trim(),
      values: optionFormData.values.split(',').map(v => v.trim()).filter(v => v),
      onHold: optionFormData.onHold || 0,
      status: optionFormData.status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOptionTypes([newOption, ...optionTypes]);
    resetOptionForm();
  };

  const handleUpdateOption = () => {
    if (!editingOptionId) return;
    const errors: Record<string, string> = {};
    if (!editOptionForm.displayName?.trim()) errors.displayName = 'Display name is required';
    if (!editOptionForm.values?.length) errors.values = 'At least one value is required';

    if (Object.keys(errors).length > 0) {
      setOptionErrors(errors);
      return;
    }

    const updated = optionTypes.map(opt =>
      opt.id === editingOptionId
        ? {
            ...opt,
            displayName: editOptionForm.displayName || opt.displayName,
            values: editOptionForm.values || opt.values,
            onHold: editOptionForm.onHold !== undefined ? editOptionForm.onHold : opt.onHold,
            status: (editOptionForm.status as 'Active' | 'Draft' | 'Inactive') || opt.status
          }
        : opt
    );
    setOptionTypes(updated);
    setEditingOptionId(null);
    setEditOptionForm({});
    setOptionErrors({});
  };

  const handleDeleteOption = (id: string) => {
    if (window.confirm('Are you sure you want to delete this option type?')) {
      setOptionTypes(optionTypes.filter(o => o.id !== id));
    }
  };

  const handleRemoveValue = (optionId: string, valueToRemove: string) => {
    const updated = optionTypes.map(opt =>
      opt.id === optionId ? { ...opt, values: opt.values.filter(v => v !== valueToRemove) } : opt
    );
    setOptionTypes(updated);
  };

  const handleAddValue = (optionId: string) => {
    const newValue = prompt('Enter new value:');
    if (newValue && newValue.trim()) {
      const updated = optionTypes.map(opt =>
        opt.id === optionId ? { ...opt, values: [...opt.values, newValue.trim()] } : opt
      );
      setOptionTypes(updated);
    }
  };

  const resetOptionForm = () => {
    setOptionFormData({ name: '', displayName: '', values: '', onHold: 0, status: 'Active' });
    setOptionErrors({});
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // ============================================
  // INVENTORY CRUD OPERATIONS
  // ============================================

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

  const handleView = (id: string) => {
    setSelectedProductId(id);
    setIsViewModalOpen(true);
  };

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

  const handleManageStock = (id: string) => {
    setSelectedProductId(id);
    setIsAddStockModalOpen(true);
  };

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

  const handleBulkDelete = async () => {
    if (selectedIds.length > 0 && window.confirm(`Delete ${selectedIds.length} selected products?`)) {
      await controller.handleBulkDelete(selectedIds);
      await loadProducts();
      setSelectedIds([]);
    }
  };

  // ============================================
  // QUICK ACTION HANDLERS
  // ============================================

  const handleNewProduct = () => {
    setShowNewProductPage(true);
    resetNewProductForm();
  };

  const handleOptionTypes = () => {
    setShowOptionTypesPage(true);
  };

  const handleBackToInventory = () => {
    setShowOptionTypesPage(false);
  };

  const handleProductSettings = () => {
    setShowProductSettingsModal(true);
  };

  const handleInventoryClick = () => {
    setActiveTab('products');
    loadProducts();
    setShowCollectionsPage(false);
    setShowProductSettingsModal(false);
    setShowNewProductPage(false);
  };

  const productSettings = [
    { id: 1, name: 'Default Tax Rate', value: '18%' },
    { id: 2, name: 'Default Currency', value: 'USD' },
    { id: 3, name: 'Stock Alert Threshold', value: '10 units' },
    { id: 4, name: 'Auto-approve Products', value: 'Enabled' },
    { id: 5, name: 'Enable Reviews', value: 'Yes' },
  ];

  // ============================================
  // RENDER NEW PRODUCT PAGE
  // ============================================
  if (showNewProductPage) {
    return (
      <div className="inventory-page">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleNewProductCancel}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Product</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Fill in the details to create a new product</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
                    newProductErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {newProductErrors.name && <p className="text-red-500 text-xs mt-1">{newProductErrors.name}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value.replace(/\D/g, '') })}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
                      newProductErrors.sku ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 12-digit SKU"
                    maxLength={12}
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
                {newProductErrors.sku && <p className="text-red-500 text-xs mt-1">{newProductErrors.sku}</p>}
                <p className="text-xs text-gray-400 mt-1">Enter exactly 12 digits (e.g., 123456789012)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={newProductForm.category}
                  onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
                    newProductErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Toys">Toys</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                </select>
                {newProductErrors.category && <p className="text-red-500 text-xs mt-1">{newProductErrors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Product</label>
                <div className="flex gap-4 pt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="No"
                      checked={newProductForm.digital === 'No'}
                      onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Yes"
                      checked={newProductForm.digital === 'Yes'}
                      onChange={(e) => setNewProductForm({ ...newProductForm, digital: e.target.value as 'Yes' | 'No' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={newProductForm.cost}
                    onChange={(e) => setNewProductForm({ ...newProductForm, cost: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantities</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">On Hand</label>
                    <input
                      type="number"
                      value={newProductForm.onHand}
                      onChange={(e) => setNewProductForm({ ...newProductForm, onHand: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Available</label>
                    <input
                      type="number"
                      value={newProductForm.available}
                      onChange={(e) => setNewProductForm({ ...newProductForm, available: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">On Hold</label>
                    <input
                      type="number"
                      value={newProductForm.onHold}
                      onChange={(e) => setNewProductForm({ ...newProductForm, onHold: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProductForm.status}
                  onChange={(e) => setNewProductForm({ ...newProductForm, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-y"
                  rows={3}
                  placeholder="Enter product description (max 2000 characters)"
                  maxLength={2000}
                />
                <p className="text-xs text-gray-400 mt-1">{newProductForm.description.length}/2000 characters</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleNewProductSubmit}
                disabled={newProductLoading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {newProductLoading ? 'Creating...' : 'Create Product'}
              </button>
              <button
                onClick={handleNewProductCancel}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER COLLECTIONS PAGE
  // ============================================
  if (showCollectionsPage) {
    return (
      <div className="inventory-page">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackFromCollections}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Collections</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage product collections</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNewCollectionName('');
                  setNewCollectionDescription('');
                  setEditingCollectionId(null);
                  document.getElementById('collection-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={18} />
                New Collection
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6 max-w-full">
          <div id="collection-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingCollectionId ? 'Edit Collection' : 'Create New Collection'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingCollectionId ? editCollectionForm.name || '' : newCollectionName}
                  onChange={(e) => {
                    if (editingCollectionId) {
                      setEditCollectionForm({ ...editCollectionForm, name: e.target.value });
                    } else {
                      setNewCollectionName(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  placeholder="Enter collection name"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingCollectionId ? editCollectionForm.description || '' : newCollectionDescription}
                  onChange={(e) => {
                    if (editingCollectionId) {
                      setEditCollectionForm({ ...editCollectionForm, description: e.target.value });
                    } else {
                      setNewCollectionDescription(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-y"
                  rows={2}
                  placeholder="Enter collection description"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={editingCollectionId ? handleSaveCollectionEdit : handleAddCollection}
                disabled={collectionLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {collectionLoading ? 'Saving...' : (editingCollectionId ? 'Update Collection' : 'Create Collection')}
              </button>
              <button
                onClick={() => {
                  if (editingCollectionId) {
                    setEditingCollectionId(null);
                    setEditCollectionForm({});
                  } else {
                    setNewCollectionName('');
                    setNewCollectionDescription('');
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search collections..."
                value={collectionSearchTerm}
                onChange={(e) => setCollectionSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {filteredCollections.length} found
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredCollections.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Layers size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-lg font-medium text-gray-600">No collections found</p>
                <p className="text-sm text-gray-400">Create your first collection above</p>
              </div>
            ) : (
              filteredCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="p-4 sm:p-5 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 flex-shrink-0 shadow-sm">
                          <Layers size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{collection.name}</h3>
                          <p className="text-xs text-gray-500">
                            {collection.productCount} product{collection.productCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                        <button
                          onClick={() => handleEditCollection(collection.id)}
                          className="p-1.5 hover:bg-indigo-50 rounded-md text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCollection(collection.id)}
                          className="p-1.5 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {collection.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{collection.description}</p>
                    )}
                  </div>
                  
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-gray-200 hover:border-indigo-200 flex items-center justify-center gap-1.5 font-medium">
                      <Eye size={14} className="sm:w-4 sm:h-4" />
                      View Products
                    </button>
                    <button className="px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-gray-200 hover:border-red-200 flex items-center justify-center gap-1.5 font-medium">
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER OPTION TYPES PAGE
  // ============================================
  if (showOptionTypesPage) {
    return (
      <div className="inventory-page">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToInventory}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Option Types</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage product variations</p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetOptionForm();
                  setEditingOptionId(null);
                  document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={18} />
                New Option Type
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-full">
          <div id="option-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingOptionId ? 'Edit Option Type' : 'Create New Option Type'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingOptionId ? editOptionForm.name || '' : optionFormData.name}
                  onChange={(e) => {
                    if (editingOptionId) {
                      setEditOptionForm({ ...editOptionForm, name: e.target.value });
                    } else {
                      setOptionFormData({ ...optionFormData, name: e.target.value });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
                    optionErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., color"
                  disabled={!!editingOptionId}
                />
                {optionErrors.name && <p className="text-red-500 text-xs mt-1">{optionErrors.name}</p>}
                <p className="text-xs text-gray-400 mt-1">Unique identifier (lowercase, no spaces)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingOptionId ? editOptionForm.displayName || '' : optionFormData.displayName}
                  onChange={(e) => {
                    if (editingOptionId) {
                      setEditOptionForm({ ...editOptionForm, displayName: e.target.value });
                    } else {
                      setOptionFormData({ ...optionFormData, displayName: e.target.value });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
                    optionErrors.displayName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Color"
                />
                {optionErrors.displayName && <p className="text-red-500 text-xs mt-1">{optionErrors.displayName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Values <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingOptionId ? (editOptionForm.values || []).join(', ') : optionFormData.values}
                  onChange={(e) => {
                    const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
                    if (editingOptionId) {
                      setEditOptionForm({ ...editOptionForm, values });
                    } else {
                      setOptionFormData({ ...optionFormData, values: e.target.value });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${
                    optionErrors.values ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Red, Blue, Green"
                />
                {optionErrors.values && <p className="text-red-500 text-xs mt-1">{optionErrors.values}</p>}
                <p className="text-xs text-gray-400 mt-1">Comma separated values</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">On Hold</label>
                <input
                  type="number"
                  value={editingOptionId ? editOptionForm.onHold || 0 : optionFormData.onHold}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (editingOptionId) {
                      setEditOptionForm({ ...editOptionForm, onHold: value });
                    } else {
                      setOptionFormData({ ...optionFormData, onHold: value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  min="0"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingOptionId ? editOptionForm.status || 'Active' : optionFormData.status}
                  onChange={(e) => {
                    const value = e.target.value as 'Active' | 'Draft' | 'Inactive';
                    if (editingOptionId) {
                      setEditOptionForm({ ...editOptionForm, status: value });
                    } else {
                      setOptionFormData({ ...optionFormData, status: value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={editingOptionId ? handleUpdateOption : handleAddOption}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                {editingOptionId ? 'Update Option Type' : 'Create Option Type'}
              </button>
              <button
                onClick={() => {
                  if (editingOptionId) {
                    setEditingOptionId(null);
                    setEditOptionForm({});
                    setOptionErrors({});
                  } else {
                    resetOptionForm();
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISPLAY NAME</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VALUES</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ON HOLD</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {optionTypes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No option types found</td>
                    </tr>
                  ) : (
                    optionTypes.map((option) => (
                      <tr key={option.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{option.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{option.displayName}</td>
                        <td className="hidden md:table-cell px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {option.values.slice(0, 3).map((val, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center gap-1 group">
                                {val}
                                <button
                                  onClick={() => handleRemoveValue(option.id, val)}
                                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))}
                            {option.values.length > 3 && (
                              <span className="text-xs text-gray-400">+{option.values.length - 3} more</span>
                            )}
                            <button
                              onClick={() => handleAddValue(option.id)}
                              className="px-2 py-0.5 text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors flex items-center gap-0.5 border border-dashed border-purple-300"
                            >
                              <Plus size={12} />
                              Add Value
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{option.onHold}</td>
                        <td className="hidden sm:table-cell px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(option.status)}`}>
                            {option.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingOptionId(option.id);
                                setEditOptionForm({
                                  name: option.name,
                                  displayName: option.displayName,
                                  values: option.values,
                                  onHold: option.onHold,
                                  status: option.status
                                });
                                document.getElementById('option-form')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteOption(option.id)}
                              className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER CATEGORIES TAB CONTENT
  // ============================================
  const renderCategoriesContent = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1 max-w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search categories..."
              value={categorySearchTerm}
              onChange={(e) => setCategorySearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowCategoryAddForm(!showCategoryAddForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        {showCategoryAddForm && (
          <div className="p-3 sm:p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowCategoryAddForm(false);
                    setNewCategoryName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No categories found</td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      {editingCategoryId === category.id ? (
                        <input
                          type="text"
                          value={editCategoryForm.name || ''}
                          onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-800">{category.name}</span>
                      )}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-600">{category.productCount}</td>
                    <td className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-500">{category.createdAt}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      {editingCategoryId === category.id ? (
                        <select
                          value={editCategoryForm.status || 'Active'}
                          onChange={(e) => setEditCategoryForm({ ...editCategoryForm, status: e.target.value as 'Active' | 'Inactive' })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {category.status}
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {editingCategoryId === category.id ? (
                          <>
                            <button
                              onClick={handleSaveCategoryEdit}
                              className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              title="Save"
                            >
                              <Save size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingCategoryId(null);
                                setEditCategoryForm({});
                              }}
                              className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditCategory(category.id)}
                              className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit"
                            >
                              <Edit size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleCategoryStatusToggle(category.id)}
                              className="p-1.5 hover:bg-yellow-100 rounded-md text-yellow-600 hover:text-yellow-800 transition-colors"
                              title="Toggle Status"
                            >
                              <Sliders size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER MAIN INVENTORY CONTENT
  // ============================================
  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return renderCategoriesContent();
      case 'collections':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Collections</h2>
                <p className="text-sm text-gray-500">Manage your product collections</p>
              </div>
              <button
                onClick={handleCollections}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Layers size={16} />
                Manage Collections
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.slice(0, 3).map((collection) => (
                <div key={collection.id} className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                      <Layers size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{collection.name}</h3>
                      <p className="text-xs text-gray-400">{collection.productCount} products</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye size={12} className="inline mr-1" />
                      View Products
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'stock':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Management</h2>
            <p className="text-gray-500">Stock management features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Settings</h2>
            <div className="space-y-4">
              {productSettings.map((setting) => (
                <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3">
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
          </div>
        );
      default:
        return (
          <>
            <InventoryFilters 
              onFilterChange={handleFilterChange}
              onOptionTypes={handleOptionTypes}
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
              onProductClick={handleProductClick}
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

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="inventory-page">
      <InventoryHeader 
        onNewProduct={handleNewProduct}
        onManageStock={() => alert('Manage Stock')}
        currentSection={activeTab}
        onExport={() => alert('Export')}
        onImport={() => alert('Import')}
      />
      
      {renderContent()}

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

      {/* Product Settings Modal */}
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
              <button onClick={() => setShowProductSettingsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={22} />
              </button>
            </div>
            
            <div className="space-y-3 mt-2">
              {productSettings.map((setting) => (
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