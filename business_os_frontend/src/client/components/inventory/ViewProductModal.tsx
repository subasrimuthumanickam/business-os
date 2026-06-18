import React from 'react';
import { X, Package, Tag, Hash, Box, Calendar, Eye, Edit, Plus, CheckCircle, Clock, Layers } from 'lucide-react';
import { Product } from '../../types/Inventory.types';
import { getStatusBadgeClass } from '../../utils/inventory.utils';

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onEdit?: (id: string) => void;
  onAddStock?: (id: string) => void;
}

export const ViewProductModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onEdit,
  onAddStock,
}) => {
  if (!isOpen || !product) return null;

  const InfoRow = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-0">
      <div className="w-6 flex items-center justify-start flex-shrink-0">
        <Icon size={14} className="text-gray-400" />
      </div>
      <span className="text-xs text-gray-500 w-20 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 font-medium truncate">{value || 'N/A'}</span>
    </div>
  );

  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className={`p-2.5 ${color} rounded-lg border text-center`}>
      <div className="flex items-center justify-center gap-1">
        <Icon size={13} className={color.replace('bg-', 'text-').replace('50', '600')} />
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-5 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header - Reduced padding */}
        <div className="flex justify-between items-center mb-3 pb-2 border-b">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Eye size={18} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">Product Details</h2>
              <p className="text-[10px] text-gray-500">View product information</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Name Header - Reduced spacing */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
            {product.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                product.status === 'Active' ? 'bg-green-100 text-green-800' :
                product.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {product.status}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                product.digital === 'Yes' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {product.digital === 'Yes' ? 'Digital' : 'Physical'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards - 3 columns with reduced padding */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <StatCard 
            label="Available" 
            value={product.available} 
            icon={Package}
            color="bg-green-50 border-green-200"
          />
          <StatCard 
            label="On Hold" 
            value={product.onHold} 
            icon={Clock}
            color="bg-yellow-50 border-yellow-200"
          />
          <StatCard 
            label="Total" 
            value={product.available + product.onHold} 
            icon={CheckCircle}
            color="bg-blue-50 border-blue-200"
          />
        </div>

        {/* Details Section - Reduced padding */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Layers size={13} className="text-gray-400" />
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Information</span>
          </div>
          
          <InfoRow label="SKU" value={product.sku} icon={Hash} />
          <InfoRow label="Category" value={product.category || 'Uncategorized'} icon={Tag} />
          <InfoRow label="Type" value={product.digital === 'Yes' ? 'Digital' : 'Physical'} icon={Box} />
          <InfoRow 
            label="Created" 
            value={product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'} 
            icon={Calendar}
          />
        </div>

        {/* Quick Actions - Reduced padding */}
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => {
                onEdit(product.id);
                onClose();
              }}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Edit size={14} />
              Edit Product
            </button>
          )}
          {onAddStock && (
            <button
              onClick={() => {
                onAddStock(product.id);
                onClose();
              }}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Plus size={14} />
              Add Stock
            </button>
          )}
        </div>

        {/* Close button */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={onClose}
            className="px-3 py-0.5 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};