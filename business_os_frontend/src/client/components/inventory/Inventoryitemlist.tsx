import React from 'react';
import { Search, Plus, Package, CheckCircle, Archive } from 'lucide-react';
import { Product } from '../../types/Inventory.types';

interface InventoryItemListProps {
  products: Product[];
  selectedProductId: string | null;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectProduct: (product: Product) => void;
  onNewItem: () => void;
}

/**
 * Left pane of the Zoho-style master-detail Inventory layout.
 * Shows a compact, scrollable list of items. Clicking an item
 * loads its full detail into the right pane (ItemDetailPane).
 *
 * Richer than Zoho's bare name-only row by design (per Yoga's call):
 * each row shows name, SKU, and a stock badge so the list stays
 * useful without opening every item.
 */
export const InventoryItemList: React.FC<InventoryItemListProps> = ({
  products,
  selectedProductId,
  searchTerm,
  onSearchChange,
  onSelectProduct,
  onNewItem,
}) => {
  const getStockBadge = (product: Product) => {
    const qty = product.stock_quantity ?? product.onHand ?? 0;

    if (product.type === 'service') {
      return <span className="text-[11px] text-gray-400">Service</span>;
    }
    if (qty <= 0) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-red-600">
          <Archive size={10} /> Out of stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
        <Package size={10} /> {qty} in stock
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      {/* Header: New button */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">Active Items</span>
        <button
          onClick={onNewItem}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={14} /> New
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {products.length === 0 ? (
          <div className="text-center py-10 px-4">
            <Package size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No items found</p>
          </div>
        ) : (
          <ul>
            {products.map((product) => {
              const isSelected = product.id === selectedProductId;
              return (
                <li key={product.id}>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className={`w-full text-left px-3 py-2.5 border-b border-gray-100 transition-colors ${
                      isSelected ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-gray-50 border-l-2 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${isSelected ? 'font-semibold text-blue-700' : 'font-medium text-gray-800'}`}>
                        {product.name}
                      </span>
                      {product.status === 'active' && (
                        <CheckCircle size={12} className="text-green-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[11px] font-mono text-gray-400 truncate">{product.sku}</span>
                      {getStockBadge(product)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InventoryItemList;