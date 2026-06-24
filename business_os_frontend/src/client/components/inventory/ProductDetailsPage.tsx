// ProductDetailsPage.tsx
import React from 'react';
import { ArrowLeft, Edit, Trash2, Package, Tag, Layers } from 'lucide-react';
import { Product } from '../../types/Inventory.types';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ 
  product, 
  onBack, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header with Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                product.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : product.status === 'inactive' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.status}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500 font-mono">SKU: {product.sku}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
          >
            <Edit size={16} />
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Package size={20} className="text-gray-400 mt-0.5" />
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</label>
              <p className="text-sm font-medium text-gray-900">{product.category}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Tag size={20} className="text-gray-400 mt-0.5" />
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</label>
              <p className="text-sm font-medium text-gray-900 font-mono">{product.sku}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Stock Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">On Hand</label>
              <p className="text-lg font-bold text-blue-700">{product.onHand || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Available</label>
              <p className="text-lg font-bold text-green-700">{product.available || 0}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-center">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">On Hold</label>
              <p className="text-lg font-bold text-orange-700">{product.onHold || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.price !== undefined && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Price</label>
                <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
              </div>
            )}
            {product.cost !== undefined && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Cost</label>
                <p className="text-lg font-bold text-gray-900">${product.cost.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Description</label>
          <p className="mt-1 text-sm text-gray-700">{product.description}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-400">
        {product.createdAt && (
          <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
        )}
        {product.updatedAt && (
          <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
        <button 
          onClick={() => {
            // Add stock logic
            alert(`Add stock to ${product.name}`);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5"
        >
          <Package size={16} />
          Add Stock
        </button>
        <button 
          onClick={() => {
            // Remove stock logic
            alert(`Remove stock from ${product.name}`);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-1.5"
        >
          <Package size={16} />
          Remove Stock
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;