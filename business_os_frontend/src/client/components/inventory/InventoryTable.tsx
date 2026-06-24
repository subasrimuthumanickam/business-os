import React,{useState} from 'react';
import { Product } from '../../types/Inventory.types';
import { CheckCircle, Clock, Edit, Eye, Archive, Minus, Package, Plus, Trash2 } from 'lucide-react';

interface InventoryTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onAddStock: (id: string) => void;
  onRemoveStock: (id: string) => void;
  onManageStock: (id: string) => void;
  onProductClick?: (product: Product) => void;
  selectedIds: string[];
  onSelectProduct: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onView,
  onDelete,
  onAddStock,
  onRemoveStock,
  onManageStock,
  onProductClick,
  selectedIds,
  onSelectProduct,
  onSelectAll,
}) => {
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const allSelected = products.length > 0 && products.every((product) => selectedIds.includes(product.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
            <CheckCircle size={12} />
            Active
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
            <Clock size={12} />
            Draft
          </span>
        );
      case 'Inactive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            <Archive size={12} />
            Inactive
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">{status}</span>
        );
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No products found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or create a new product</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(product.id) ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={(e) => onSelectProduct(product.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onProductClick?.(product)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-left transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    {product.name}
                  </button>
                </td>
                <td className="hidden md:table-cell px-4 py-3">
                  <span className="font-mono text-xs text-gray-600">{product.sku}</span>
                </td>
                <td className="hidden sm:table-cell px-4 py-3">
                  <span className="text-sm text-gray-600">{product.category}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{product.onHand}</span>
                    {(product.onHold ?? 0) > 0 && (
                      <span className="text-xs text-yellow-600">({product.onHold} on hold)</span>
                    )}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-4 py-3">{getStatusBadge(product.status)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView(product.id)}
                      className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(product.id)}
                      className="p-1.5 hover:bg-green-100 rounded-md text-green-600 hover:text-green-800 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onAddStock(product.id)}
                      className="p-1.5 hover:bg-emerald-100 rounded-md text-emerald-600 hover:text-emerald-800 transition-colors"
                      title="Add Stock"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => onRemoveStock(product.id)}
                      className="p-1.5 hover:bg-orange-100 rounded-md text-orange-600 hover:text-orange-800 transition-colors"
                      title="Remove Stock"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => onManageStock(product.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 hover:text-slate-800 transition-colors"
                      title="Manage Stock"
                    >
                      <Package size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
