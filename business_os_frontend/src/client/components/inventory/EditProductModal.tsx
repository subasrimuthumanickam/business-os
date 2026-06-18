import React, { useState, useEffect } from 'react';
import { X, Edit, Save, Package, Tag, Hash, Box, AlertCircle } from 'lucide-react';
import { Product } from '../../types/Inventory.types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    digital: 'No',
    sku: '',
    available: 0,
    onHold: 0,
    status: 'Draft',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name || '',
        digital: product.digital || 'No',
        sku: product.sku || '',
        available: product.available || 0,
        onHold: product.onHold || 0,
        status: product.status || 'Draft',
        category: product.category || '',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.sku?.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^\d{12}$/.test(formData.sku)) {
      newErrors.sku = 'SKU must be exactly 12 digits';
    }
    
    if ((formData.available || 0) < 0) {
      newErrors.available = 'Available cannot be negative';
    }
    
    if ((formData.onHold || 0) < 0) {
      newErrors.onHold = 'On hold cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const generateSKU = () => {
    const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setFormData({ ...formData, sku });
    if (errors.sku) {
      setErrors({ ...errors, sku: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Edit Product</h2>
              <p className="text-xs text-gray-500">Update product details</p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Package size={15} className="text-gray-400" />
                    Product Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Hash size={15} className="text-gray-400" />
                    SKU <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.replace(/\D/g, '') })}
                    className={`flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.sku ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 12-digit SKU"
                    maxLength={12}
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
                {errors.sku && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.sku}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">Enter exactly 12 digits</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Tag size={15} className="text-gray-400" />
                    Category
                  </span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Books">Books</option>
                  <option value="Toys">Toys</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Digital Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Box size={15} className="text-gray-400" />
                    Digital Product
                  </span>
                </label>
                <div className="flex gap-5 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="No"
                      checked={formData.digital === 'No'}
                      onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Yes"
                      checked={formData.digital === 'Yes'}
                      onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>

              {/* Stock Quantities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock Quantities
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Available</label>
                    <input
                      type="number"
                      value={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: Number(e.target.value) })}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        errors.available ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                      }`}
                      min="0"
                    />
                    {errors.available && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.available}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">On Hold</label>
                    <input
                      type="number"
                      value={formData.onHold}
                      onChange={(e) => setFormData({ ...formData, onHold: Number(e.target.value) })}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        errors.onHold ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                      }`}
                      min="0"
                    />
                    {errors.onHold && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.onHold}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Save size={16} />
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};