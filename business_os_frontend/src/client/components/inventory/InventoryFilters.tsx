import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Tag, Layers, Settings, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FilterOptions } from '../../types/Inventory.types';
import { InventoryService } from '../../services/inventory.service';

interface InventoryFiltersProps {
  onFilterChange: (filters: any) => void;
  onClearFilters?: () => void;
  onOptionTypes?: () => void;
  onCollections?: () => void;
  onProductSettings?: () => void;
  onInventoryClick?: () => void;
}

interface CategoryOption {
  id: number;
  name: string;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onFilterChange,
  onClearFilters,
  onOptionTypes,
  onCollections,
  onProductSettings,
  onInventoryClick,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [activeButton, setActiveButton] = useState('inventory');
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const service = InventoryService.getInstance();
    service
      .getCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  const statusOptions = ['All', 'active', 'inactive'];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, category, status });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ searchTerm, category: value, status });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ searchTerm, category, status: value });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setStatus('All');
    onFilterChange({ searchTerm: '', category: 'All', status: 'All' });
    if (onClearFilters) onClearFilters();
  };

  const hasActiveFilters = searchTerm || category !== 'All' || status !== 'All';

  const handleButtonClick = (buttonName: string, action?: () => void) => {
    setActiveButton(buttonName);
    if (action) action();
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search product name or SKU"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 bg-gray-100 px-2 sm:px-3 py-1.5 rounded-md">
            <Filter size={14} className="text-gray-600" />
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-transparent outline-none text-xs sm:text-sm font-medium text-gray-700 cursor-pointer max-w-[80px] sm:max-w-none"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
              ))}
            </select>
          </div>

          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-gray-100 px-2 sm:px-3 py-1.5 rounded-md outline-none text-xs sm:text-sm font-medium text-gray-700 border-0 cursor-pointer"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt === 'All' ? 'All Status' : opt === 'active' ? 'Active' : 'Inactive'}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium flex items-center gap-1 px-2 py-1"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-1 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => handleButtonClick('inventory', onInventoryClick)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'inventory'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Package size={15} /> Inventory
        </button>

        <div className="h-5 w-px bg-gray-300"></div>

        <button
          onClick={() => handleButtonClick('options', onOptionTypes)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'options'
              ? 'bg-purple-50 text-purple-700 border border-purple-200'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Tag size={15} /> Option Types
        </button>

        <div className="h-5 w-px bg-gray-300"></div>

        <button
          onClick={() => handleButtonClick('collections', onCollections)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'collections'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Layers size={15} /> Collections
        </button>

        <div className="h-5 w-px bg-gray-300"></div>

        <button
          onClick={() => handleButtonClick('settings', onProductSettings)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'settings'
              ? 'bg-gray-200 text-gray-800 border border-gray-300'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Settings size={15} /> Product Settings
        </button>
      </div>
    </div>
  );
};