import React, { useState, useEffect } from 'react';
import { 
  X, Package, Tag, Layers, Plus, Trash2, Sliders, Settings, Edit, Eye,
  BarChart3, TrendingUp, Clock, Users, DollarSign, AlertCircle, CheckCircle,
  ArrowUp, ArrowDown, Search, Filter, MoreVertical, Save, ArrowLeft
} from 'lucide-react';
// Old grid-based components — no longer rendered now that Inventory uses
// the two-pane Zoho-style layout (InventoryItemList + ItemDetailPane).
// Left commented (not deleted) in case you want to revert or repurpose them.
// import { InventoryHeader } from './InventoryHeader';
// import { InventoryFilters } from './InventoryFilters';
// import InventoryTable from './InventoryTable';
import { InventoryPagination } from './InventoryPagination';
import { NewProductModal } from './NewProductModal';
import { AddStockModal } from './AddStockModal';
import { RemoveStockModal } from './RemoveStockModal';
import { DeleteProductModal } from './DeleteProductModal';
import { EditProductModal } from './EditProductModal';
import { ViewProductModal } from './ViewProductModal';
import { InventoryController } from '../../controllers/inventory.controller';
import { InventoryItemList } from './Inventoryitemlist';
import { ItemDetailPane } from './Itemdetailpane';
import { NewItemForm, NewItemFormState } from './Newitemform';
import { Product, FilterOptions, Category, CreateProductDTO } from '../../types/Inventory.types';
import { useNavigate } from 'react-router-dom';
import CreateVendor from '../billing/CreateVendor';           // adjust path
import CreatePurchaseOrder from '../billing/CreatePurchaseOrder'; // adjust path
import { vendorService, purchaseOrderService } from '../../services/api.service'; // adjust path

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quick action states
  const [showProductSettingsModal, setShowProductSettingsModal] = useState(false);
  const [showNewProductPage, setShowNewProductPage] = useState(false);
  const [showOptionTypesPage, setShowOptionTypesPage] = useState(false);
  const [showCollectionsPage, setShowCollectionsPage] = useState(false);

  // New Item Form State (Zoho-style: type, sales/purchase info, tax preference)
  const [newItemForm, setNewItemForm] = useState<NewItemFormState>({
    type: 'goods',
    name: '',
    unit: 'pcs',
    sku: '',
    category: '',
    price: 0,
    sales_account: 'Sales',
    cost: 0,
    purchase_account: 'Cost of Goods Sold',
    description: '',
    purchase_description: '',
    tax_preference: 'taxable',
  });
  const [newProductErrors, setNewProductErrors] = useState<Record<string, string>>({});
  const [newProductLoading, setNewProductLoading] = useState(false);

  // Left-pane (item list) search term for the two-pane layout
  const [listSearchTerm, setListSearchTerm] = useState('');

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

  // Product Settings
  const productSettings = [
    { id: 1, name: 'Default Tax Rate', value: '18%' },
    { id: 2, name: 'Default Currency', value: 'USD' },
    { id: 3, name: 'Stock Alert Threshold', value: '10 units' },
    { id: 4, name: 'Auto-approve Products', value: 'Enabled' },
    { id: 5, name: 'Enable Reviews', value: 'Yes' },
  ];

  // Purchase Order / Manage Stock view
  const [showPurchaseOrdersPage, setShowPurchaseOrdersPage] = useState(false);
  const [showCreateVendorForm, setShowCreateVendorForm] = useState(false);
  const [showCreatePOForm, setShowCreatePOForm] = useState(false);
  const [vendorsList, setVendorsList] = useState<any[]>([]);
  const [purchaseOrdersList, setPurchaseOrdersList] = useState<any[]>([]);
  const [poLoading, setPoLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ============================================
  // TOGGLE HELPERS
  // ============================================
  const toggleCategoryStatus = (status: 'Active' | 'Inactive'): 'Active' | 'Inactive' => {
    return status === 'Active' ? 'Inactive' : 'Active';
  };

  // ============================================
  // SKU GENERATOR
  // ============================================
  const generateSKU = () => {
    const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setNewItemForm({ ...newItemForm, sku });
  };

  // Generic field setter passed to NewItemForm as `onChange`
  const handleNewItemFieldChange = (field: keyof NewItemFormState, value: any) => {
    setNewItemForm({ ...newItemForm, [field]: value });
  };

  // Left-pane search — filters the visible product list client-side
  const handleListSearchChange = (value: string) => {
    setListSearchTerm(value);
    handleFilterChange({ searchTerm: value });
  };

  // ============================================
  // PRODUCT HANDLERS
  // ============================================
  const handleProductClick = (product: Product) => {
    setSelectedProductId(product.id);
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setSelectedProductId(null);
  };

  const handleNewProduct = () => {
    setShowNewProductPage(true);
    resetNewProductForm();
  };

  const handleNewProductCancel = () => {
    setShowNewProductPage(false);
    resetNewProductForm();
  };

  const resetNewProductForm = () => {
    setNewItemForm({
      type: 'goods',
      name: '',
      unit: 'pcs',
      sku: '',
      category: '',
      price: 0,
      sales_account: 'Sales',
      cost: 0,
      purchase_account: 'Cost of Goods Sold',
      description: '',
      purchase_description: '',
      tax_preference: 'taxable',
    });
    setNewProductErrors({});
  };

  const handleNewProductSubmit = async () => {
    const errors: Record<string, string> = {};
    if (!newItemForm.name.trim()) errors.name = 'Item name is required';
    if (!newItemForm.sku.trim()) errors.sku = 'SKU is required';
    if (newItemForm.sku.length !== 12) errors.sku = 'SKU must be exactly 12 digits';
    if (!newItemForm.category) errors.category = 'Category is required';

    if (Object.keys(errors).length > 0) {
      setNewProductErrors(errors);
      return;
    }

    setNewProductLoading(true);

    try {
      const dto: CreateProductDTO = {
        name: newItemForm.name,
        sku: newItemForm.sku,
        category_id: parseInt(newItemForm.category, 10), // form.category holds the category's id as a string
        type: newItemForm.type,
        price: newItemForm.price,
        cost: newItemForm.cost,
        tax_preference: newItemForm.tax_preference,
        stock_quantity: 0,
        unit: newItemForm.unit || 'pcs',
        description: newItemForm.description,
        status: 'active',
        // Zoho-style fields — backend doesn't have columns for these yet,
        // so they'll be silently dropped server-side until that's wired.
        // See note on Inventory.types.ts / ItemDetailPane.tsx.
        sales_account: newItemForm.sales_account,
        purchase_account: newItemForm.purchase_account,
      };

      await controller.handleCreateProduct(dto);
      await loadProducts(); // re-pull from DB so the list reflects the real saved row
      setShowNewProductPage(false);
      resetNewProductForm();
    } catch (error) {
      console.error('Failed to create product:', error);
      setNewProductErrors({ submit: 'Failed to save item. Please try again.' });
    } finally {
      setNewProductLoading(false);
    }
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
  // PURCHASE ORDER / MANAGE STOCK HANDLERS
  // ============================================
  const loadVendorsAndPOs = async () => {
    setPoLoading(true);
    try {
      const [vendors, pos] = await Promise.all([
        vendorService.getAll(),
        purchaseOrderService.getAll(),
      ]);
      setVendorsList(vendors as any[]);
      setPurchaseOrdersList(pos as any[]);
    } catch (error) {
      console.error('Failed to load vendors/POs:', error);
    } finally {
      setPoLoading(false);
    }
  };

  const handleManageStockClick = () => {
    setShowPurchaseOrdersPage(true);
    loadVendorsAndPOs();
  };

  const handleBackFromPurchaseOrders = () => {
    setShowPurchaseOrdersPage(false);
    setShowCreateVendorForm(false);
    setShowCreatePOForm(false);
  };

  const handleReceivePO = async (poId: number) => {
    if (!window.confirm('Mark this Purchase Order as Received? This will update stock.')) return;
    try {
      await purchaseOrderService.receive(poId);
      await loadVendorsAndPOs();
      await loadProducts(); // refresh stock in main inventory list too
    } catch (error: any) {
      alert(error.message || 'Failed to receive purchase order');
    }
  };

  // ---- Export / Import (CSV) ----
  const handleExportProducts = () => {
    const headers = ['id', 'name', 'sku', 'category_id', 'price', 'cost', 'stock_quantity', 'unit'];
    const rows = products.map((p: any) =>
      headers.map((h) => (p[h] !== undefined && p[h] !== null ? String(p[h]).replace(/,/g, '') : '')).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());
    const rows = lines.slice(1);

    let successCount = 0;
    let failCount = 0;

    for (const line of rows) {
      const values = line.split(',');
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx]?.trim() ?? '';
      });

      if (!row.name || !row.sku) {
        failCount++;
        continue;
      }

      try {
        await controller.handleCreateProduct({
          name: row.name,
          sku: row.sku,
          category_id: row.category_id ? parseInt(row.category_id, 10) : undefined,
          type: 'goods',
          price: Number(row.price) || 0,
          cost: Number(row.cost) || 0,
          tax_preference: 'taxable',
          stock_quantity: Number(row.stock_quantity) || 0,
          unit: row.unit || 'pcs',
          status: 'active',
        } as CreateProductDTO);
        successCount++;
      } catch (err) {
        console.error('Import row failed:', row, err);
        failCount++;
      }
    }

    await loadProducts();
    alert(`Import complete: ${successCount} added, ${failCount} failed.`);
    e.target.value = ''; // reset file input so the same file can be re-selected later
  };

  // ============================================
  // CRUD OPERATIONS
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

  const foundProduct = selectedProductId 
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

  // ============================================
  // RENDER CATEGORIES CONTENT
  // ============================================
  const renderCategoriesContent = () => {
    return (
      <div className="bg-white overflow-hidden">

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
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleCategoryStatusToggle(category.id)}
                              className="p-1.5 hover:bg-yellow-100 rounded-md text-yellow-600 hover:text-yellow-800 transition-colors"
                              title="Toggle Status"
                            >
                              <Sliders size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
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
  // RENDER MAIN CONTENT
  // ============================================
  const renderContent = () => {
    // New Product page check
    if (showNewProductPage) {
      return (
        <NewItemForm
          form={newItemForm}
          errors={newProductErrors}
          categories={categories.map(c => ({ id: c.id, name: c.name }))}
          loading={newProductLoading}
          onChange={handleNewItemFieldChange}
          onCancel={handleNewProductCancel}
          onSubmit={handleNewProductSubmit}
        />
      );
    }

    // Check if collections page should be shown
    if (showCollectionsPage) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
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

          <div id="collection-form" className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
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

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search collections..."
              value={collectionSearchTerm}
              onChange={(e) => setCollectionSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            />
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
                        <div className={`w-10 h-10 bg-gradient-to-br ${collection.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                          <Layers size={18} />
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
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCollection(collection.id)}
                          className="p-1.5 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {collection.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{collection.description}</p>
                    )}
                  </div>
                  
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-gray-200 hover:border-indigo-200 flex items-center justify-center gap-1.5 font-medium">
                      <Eye size={14} />
                      View Products
                    </button>
                    <button className="px-3 py-1.5 text-xs sm:text-sm bg-gray-50 text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-gray-200 hover:border-red-200 flex items-center justify-center gap-1.5 font-medium">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    // Check if option types page should be shown
    if (showOptionTypesPage) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
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

          <div id="option-form" className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
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
      );
    }

    // Purchase Orders / Manage Stock page
    if (showPurchaseOrdersPage) {
      if (showCreateVendorForm) {
        return (
          <CreateVendor
            onClose={() => setShowCreateVendorForm(false)}
            onCreated={loadVendorsAndPOs}
          />
        );
      }

      if (showCreatePOForm) {
        return (
          <CreatePurchaseOrder
            onClose={() => setShowCreatePOForm(false)}
            onCreated={loadVendorsAndPOs}
          />
        );
      }

      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackFromPurchaseOrders}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Purchase Orders</h1>
                <p className="text-xs sm:text-sm text-gray-500">Vendors, purchase orders & stock receiving</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateVendorForm(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Plus size={14} /> New Vendor
              </button>
              <button
                onClick={() => setShowCreatePOForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5"
              >
                <Plus size={14} /> New Purchase Order
              </button>
            </div>
          </div>

          {poLoading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Vendors ({vendorsList.length})</h2>
              <div className="overflow-x-auto rounded-lg border mb-6">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {vendorsList.length === 0 ? (
                      <tr><td colSpan={3} className="px-4 py-6 text-center text-sm text-gray-400">No vendors yet</td></tr>
                    ) : (
                      vendorsList.map((v) => (
                        <tr key={v.id}>
                          <td className="px-4 py-2 text-sm">{v.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{v.email || '-'}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{v.phone || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <h2 className="text-sm font-semibold text-gray-700 mb-2">Purchase Orders ({purchaseOrdersList.length})</h2>
              <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">PO Number</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Vendor</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Status</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {purchaseOrdersList.length === 0 ? (
                      <tr><td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">No purchase orders yet</td></tr>
                    ) : (
                      purchaseOrdersList.map((po) => (
                        <tr key={po.id}>
                          <td className="px-4 py-2 text-sm font-medium">{po.po_number}</td>
                          <td className="px-4 py-2 text-sm">{po.vendor_name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{po.po_date?.split?.('T')?.[0] ?? po.po_date}</td>
                          <td className="px-4 py-2 text-sm text-right">₹{Number(po.total).toLocaleString()}</td>
                          <td className="px-4 py-2 text-center">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              po.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {po.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            {po.status !== 'Received' && (
                              <button
                                onClick={() => handleReceivePO(po.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Mark Received
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      );
    }

    // Default - Main Inventory View (Two-pane Zoho-style layout)
    return (
      <div className="bg-white border-gray-200 overflow-hidden">
        {/* Merged header row: Active Items (left, matching the list pane's width) + Manage Stock/Export/Import (right) — Zoho-style single row */}
        <div className="flex items-center border-b border-gray-200">
          <div className="w-[280px] sm:w-[320px] shrink-0 flex items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-sm font-semibold text-gray-700">Active Items</span>
            <button
              onClick={handleNewProduct}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={14} /> New
            </button>
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 px-4 sm:px-6 py-2">
            <button
              onClick={handleManageStockClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <Package size={15} /> Purchase Orders
            </button>
            <div className="h-5 w-px bg-gray-300"></div>
            <button
              onClick={handleExportProducts}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
            >
              Export
            </button>
            <button
              onClick={handleImportClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
            >
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleImportFile}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Two-pane master-detail: item list (left) + item detail (right) */}
        <div className="flex h-[calc(100vh-260px)] min-h-[480px]">
          {/* List pane — full width on mobile when nothing selected, hidden on mobile once an item is selected. Always visible + fixed width from md breakpoint up. */}
          <div className={`${foundProduct ? 'hidden md:block' : 'block'} w-full md:w-[280px] lg:w-[320px] shrink-0`}>
            <InventoryItemList
              products={products}
              selectedProductId={selectedProductId}
              searchTerm={listSearchTerm}
              onSearchChange={handleListSearchChange}
              onSelectProduct={handleProductClick}
              onNewItem={handleNewProduct}
            />
          </div>

          {/* Detail pane — full width on mobile when an item IS selected, hidden on mobile otherwise. Always visible from md breakpoint up. */}
          <div className={`${foundProduct ? 'block' : 'hidden md:block'} flex-1 min-w-0`}>
            {foundProduct ? (
              <ItemDetailPane
                product={foundProduct}
                onEdit={() => handleEdit(foundProduct.id)}
                onDelete={() => handleDelete(foundProduct.id)}
                onAddStock={() => handleAddStock(foundProduct.id)}
                onRemoveStock={() => handleRemoveStock(foundProduct.id)}
                onBack={handleBackToList}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <Package size={40} className="text-gray-300 mb-3" />
                <h3 className="text-base font-medium text-gray-600">Select an item</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Choose an item from the list, or create a new one to see its details here.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination inside card */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-200">
          <InventoryPagination
            currentPage={controller.getPagination().currentPage}
            rowsPerPage={controller.getPagination().rowsPerPage}
            totalItems={controller.getPagination().totalItems}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="inventory-page">
      {renderContent()}

      {/* Modals */}
      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onConfirm={handleConfirmAddStock}
        productName={selectedProduct?.name}
      />

      <RemoveStockModal
        isOpen={isRemoveStockModalOpen}
        onClose={() => setIsRemoveStockModalOpen(false)}
        onConfirm={handleConfirmRemoveStock}
        productName={selectedProduct?.name}
        currentStock={selectedProduct?.available || 0}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleConfirmEdit}
        product={foundProduct}
      />

      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        product={foundProduct}
        onEdit={handleEdit}
        onAddStock={handleAddStock}
      />

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