// // import React, { useState } from 'react';
// // import { Search, Filter, X } from 'lucide-react';
// // // import { FilterOptions } from '../../types/inventory.types';
// // // import { FilterOptions } from '../../types/Inventory.types';
// // import { FilterOptions } from '../../types/Inventory.types';
// // interface InventoryFiltersProps {
// //   onFilterChange: (filters: Partial<FilterOptions>) => void;
// //   onClearFilters?: () => void;
// // }

// // export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
// //   onFilterChange,
// //   onClearFilters,
// // }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [category, setCategory] = useState('All');
// //   const [digital, setDigital] = useState('All');
// //   const [status, setStatus] = useState('All');
// //   const [showDeleted, setShowDeleted] = useState(false);

// //   const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Toys', 'Beauty'];
// //   const digitalOptions = ['All', 'Yes', 'No'];
// //   const statusOptions = ['All', 'Active', 'Draft', 'Inactive'];

// //   const handleFilterChange = () => {
// //     onFilterChange({ searchTerm, category, digital, status, showDeleted });
// //   };

// //   const handleSearch = (value: string) => {
// //     setSearchTerm(value);
// //     onFilterChange({ searchTerm: value, category, digital, status, showDeleted });
// //   };

// //   const handleCategoryChange = (value: string) => {
// //     setCategory(value);
// //     onFilterChange({ searchTerm, category: value, digital, status, showDeleted });
// //   };

// //   const handleDigitalChange = (value: string) => {
// //     setDigital(value);
// //     onFilterChange({ searchTerm, category, digital: value, status, showDeleted });
// //   };

// //   const handleStatusChange = (value: string) => {
// //     setStatus(value);
// //     onFilterChange({ searchTerm, category, digital, status: value, showDeleted });
// //   };

// //   const handleShowDeletedToggle = () => {
// //     const newValue = !showDeleted;
// //     setShowDeleted(newValue);
// //     onFilterChange({ searchTerm, category, digital, status, showDeleted: newValue });
// //   };

// //   const handleClearFilters = () => {
// //     setSearchTerm('');
// //     setCategory('All');
// //     setDigital('All');
// //     setStatus('All');
// //     setShowDeleted(false);
// //     onFilterChange({ searchTerm: '', category: 'All', digital: 'All', status: 'All', showDeleted: false });
// //     if (onClearFilters) onClearFilters();
// //   };

// //   const hasActiveFilters = searchTerm || category !== 'All' || digital !== 'All' || status !== 'All' || showDeleted;

// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //         {/* Search */}
// //         <div className="relative flex-1 max-w-md">
// //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //           <input
// //             type="text"
// //             placeholder="Search product name, category or SKU"
// //             value={searchTerm}
// //             onChange={(e) => handleSearch(e.target.value)}
// //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
// //           />
// //         </div>

// //         {/* Filters */}
// //         <div className="flex flex-wrap items-center gap-3">
// //           <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
// //             <Filter size={16} className="text-gray-600" />
// //             <select
// //               value={category}
// //               onChange={(e) => handleCategoryChange(e.target.value)}
// //               className="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer"
// //             >
// //               {categories.map(cat => (
// //                 <option key={cat} value={cat}>{cat}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <select
// //             value={digital}
// //             onChange={(e) => handleDigitalChange(e.target.value)}
// //             className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
// //           >
// //             {digitalOptions.map(opt => (
// //               <option key={opt} value={opt}>
// //                 {opt === 'All' ? 'All Types' : opt === 'Yes' ? 'Digital' : 'Non-Digital'}
// //               </option>
// //             ))}
// //           </select>

// //           <select
// //             value={status}
// //             onChange={(e) => handleStatusChange(e.target.value)}
// //             className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
// //           >
// //             {statusOptions.map(opt => (
// //               <option key={opt} value={opt}>{opt}</option>
// //             ))}
// //           </select>

// //           <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer whitespace-nowrap">
// //             <input
// //               type="checkbox"
// //               checked={showDeleted}
// //               onChange={handleShowDeletedToggle}
// //               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //             />
// //             Show Deleted
// //           </label>

// //           {hasActiveFilters && (
// //             <button
// //               onClick={handleClearFilters}
// //               className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 px-2 py-1"
// //             >
// //               <X size={16} /> Clear
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* Quick Action Buttons */}
// //       <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Inventory
// //         </button>
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Remove items
// //         </button>
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Option Types
// //         </button>
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Categories
// //         </button>
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Collections
// //         </button>
// //         <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">
// //           Product settings
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
// import React, { useState } from 'react';
// import { Search, Filter, X, Trash2, Sliders, Tag, Layers, Settings } from 'lucide-react';
// import { FilterOptions } from '../../types/Inventory.types';

// interface InventoryFiltersProps {
//   onFilterChange: (filters: Partial<FilterOptions>) => void;
//   onClearFilters?: () => void;
//   onRemoveItems?: () => void;
//   onOptionTypes?: () => void;
//   onCategories?: () => void;
//   onCollections?: () => void;
//   onProductSettings?: () => void;
// }

// export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
//   onFilterChange,
//   onClearFilters,
//   onRemoveItems,
//   onOptionTypes,
//   onCategories,
//   onCollections,
//   onProductSettings,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('All');
//   const [digital, setDigital] = useState('All');
//   const [status, setStatus] = useState('All');
//   const [showDeleted, setShowDeleted] = useState(false);

//   const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Toys', 'Beauty'];
//   const digitalOptions = ['All', 'Yes', 'No'];
//   const statusOptions = ['All', 'Active', 'Draft', 'Inactive'];

//   const handleFilterChange = () => {
//     onFilterChange({ searchTerm, category, digital, status, showDeleted });
//   };

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//     onFilterChange({ searchTerm: value, category, digital, status, showDeleted });
//   };

//   const handleCategoryChange = (value: string) => {
//     setCategory(value);
//     onFilterChange({ searchTerm, category: value, digital, status, showDeleted });
//   };

//   const handleDigitalChange = (value: string) => {
//     setDigital(value);
//     onFilterChange({ searchTerm, category, digital: value, status, showDeleted });
//   };

//   const handleStatusChange = (value: string) => {
//     setStatus(value);
//     onFilterChange({ searchTerm, category, digital, status: value, showDeleted });
//   };

//   const handleShowDeletedToggle = () => {
//     const newValue = !showDeleted;
//     setShowDeleted(newValue);
//     onFilterChange({ searchTerm, category, digital, status, showDeleted: newValue });
//   };

//   const handleClearFilters = () => {
//     setSearchTerm('');
//     setCategory('All');
//     setDigital('All');
//     setStatus('All');
//     setShowDeleted(false);
//     onFilterChange({ searchTerm: '', category: 'All', digital: 'All', status: 'All', showDeleted: false });
//     if (onClearFilters) onClearFilters();
//   };

//   const hasActiveFilters = searchTerm || category !== 'All' || digital !== 'All' || status !== 'All' || showDeleted;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//       {/* Search Bar */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search product name, category or SKU"
//             value={searchTerm}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
//             <Filter size={16} className="text-gray-600" />
//             <select
//               value={category}
//               onChange={(e) => handleCategoryChange(e.target.value)}
//               className="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <select
//             value={digital}
//             onChange={(e) => handleDigitalChange(e.target.value)}
//             className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
//           >
//             {digitalOptions.map(opt => (
//               <option key={opt} value={opt}>
//                 {opt === 'All' ? 'All Types' : opt === 'Yes' ? 'Digital' : 'Non-Digital'}
//               </option>
//             ))}
//           </select>

//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
//           >
//             {statusOptions.map(opt => (
//               <option key={opt} value={opt}>{opt}</option>
//             ))}
//           </select>

//           <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer whitespace-nowrap">
//             <input
//               type="checkbox"
//               checked={showDeleted}
//               onChange={handleShowDeletedToggle}
//               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             Show Deleted
//           </label>

//           {hasActiveFilters && (
//             <button
//               onClick={handleClearFilters}
//               className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 px-2 py-1"
//             >
//               <X size={16} /> Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Quick Action Buttons - Below Search Bar */}
//       <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-gray-100">
//         <button
//           onClick={onRemoveItems}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Trash2 size={15} /> Inventory
//         </button>

//         <div className="h-5 w-px bg-gray-300"></div>

//         <button
//           onClick={onRemoveItems}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Trash2 size={15} /> Remove items
//         </button>

//         <div className="h-5 w-px bg-gray-300"></div>

//         <button
//           onClick={onOptionTypes}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Sliders size={15} /> Option Types
//         </button>

//         <div className="h-5 w-px bg-gray-300"></div>

//         <button
//           onClick={onCategories}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Tag size={15} /> Categories
//         </button>

//         <div className="h-5 w-px bg-gray-300"></div>

//         <button
//           onClick={onCollections}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Layers size={15} /> Collections
//         </button>

//         <div className="h-5 w-px bg-gray-300"></div>

//         <button
//           onClick={onProductSettings}
//           className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//         >
//           <Settings size={15} /> Product settings
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Search, Filter, X, Trash2, Sliders, Tag, Layers, Settings, Package } from 'lucide-react';
import { FilterOptions } from '../../types/Inventory.types';

interface InventoryFiltersProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onClearFilters?: () => void;
  onRemoveItems?: () => void;
  onOptionTypes?: () => void;
  onCategories?: () => void;
  onCollections?: () => void;
  onProductSettings?: () => void;
  onInventoryClick?: () => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onFilterChange,
  onClearFilters,
  onRemoveItems,
  onOptionTypes,
  onCategories,
  onCollections,
  onProductSettings,
  onInventoryClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [digital, setDigital] = useState('All');
  const [status, setStatus] = useState('All');
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeButton, setActiveButton] = useState('inventory');

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Toys', 'Beauty'];
  const digitalOptions = ['All', 'Yes', 'No'];
  const statusOptions = ['All', 'Active', 'Draft', 'Inactive'];

  const handleFilterChange = () => {
    onFilterChange({ searchTerm, category, digital, status, showDeleted });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, category, digital, status, showDeleted });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ searchTerm, category: value, digital, status, showDeleted });
  };

  const handleDigitalChange = (value: string) => {
    setDigital(value);
    onFilterChange({ searchTerm, category, digital: value, status, showDeleted });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ searchTerm, category, digital, status: value, showDeleted });
  };

  const handleShowDeletedToggle = () => {
    const newValue = !showDeleted;
    setShowDeleted(newValue);
    onFilterChange({ searchTerm, category, digital, status, showDeleted: newValue });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setDigital('All');
    setStatus('All');
    setShowDeleted(false);
    onFilterChange({ searchTerm: '', category: 'All', digital: 'All', status: 'All', showDeleted: false });
    if (onClearFilters) onClearFilters();
  };

  const hasActiveFilters = searchTerm || category !== 'All' || digital !== 'All' || status !== 'All' || showDeleted;

  const handleButtonClick = (buttonName: string, action?: () => void) => {
    setActiveButton(buttonName);
    if (action) action();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search product name, category or SKU"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md">
            <Filter size={16} className="text-gray-600" />
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <select
            value={digital}
            onChange={(e) => handleDigitalChange(e.target.value)}
            className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
          >
            {digitalOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All Types' : opt === 'Yes' ? 'Digital' : 'Non-Digital'}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-gray-100 px-3 py-1.5 rounded-md outline-none text-sm font-medium text-gray-700 border-0 cursor-pointer"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={handleShowDeletedToggle}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show Deleted
          </label>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 px-2 py-1"
            >
              <X size={16} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Buttons - Below Search Bar */}
      <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-gray-100">
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
          onClick={() => handleButtonClick('remove', onRemoveItems)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'remove' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Trash2 size={15} /> Remove items
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
          <Sliders size={15} /> Option Types
        </button>

        <div className="h-5 w-px bg-gray-300"></div>

        <button
          onClick={() => handleButtonClick('categories', onCategories)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
            activeButton === 'categories' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Tag size={15} /> Categories
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
          <Settings size={15} /> Product settings
        </button>
      </div>
    </div>
  );
};