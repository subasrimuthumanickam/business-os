// import React, { useState } from 'react';
// import { Product } from '../../types/Inventory.types';
// import { getStatusBadgeClass } from '../../utils/inventory.utils';
// import { 
//   Edit, 
//   Eye, 
//   Trash2, 
//   Package,
//   Plus,
//   Minus,
//   MoreVertical
// } from 'lucide-react';

// interface InventoryTableProps {
//   products: Product[];
//   onEdit: (id: string) => void;
//   onView: (id: string) => void;
//   onDelete: (id: string) => void;
//   onAddStock: (id: string) => void;
//   onRemoveStock: (id: string) => void;
//   onManageStock: (id: string) => void;
//   selectedIds?: string[];
//   onSelectProduct?: (id: string, checked: boolean) => void;
//   onSelectAll?: (checked: boolean) => void;
// }

// export const InventoryTable: React.FC<InventoryTableProps> = ({
//   products,
//   onEdit,
//   onView,
//   onDelete,
//   onAddStock,
//   onRemoveStock,
//   onManageStock,
//   selectedIds = [],
//   onSelectProduct,
//   onSelectAll,
// }) => {
//   const [showMenu, setShowMenu] = useState<string | null>(null);

//   if (products.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//         <Package size={48} className="mx-auto text-gray-300 mb-4" />
//         <p className="text-gray-500 text-lg">No products found</p>
//         <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or add a new product</p>
//       </div>
//     );
//   }

//   const handleSelectAll = (checked: boolean) => {
//     if (onSelectAll) onSelectAll(checked);
//   };

//   const handleSelectRow = (id: string, checked: boolean) => {
//     if (onSelectProduct) onSelectProduct(id, checked);
//   };

//   const allSelected = products.length > 0 && products.every(p => selectedIds.includes(p.id));

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 w-10">
//                 <input
//                   type="checkbox"
//                   checked={allSelected}
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
//               {/* ❌ On Hand column removed */}
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Hold</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr 
//                 key={product.id} 
//                 className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(product.id) ? 'bg-blue-50' : ''}`}
//               >
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(product.id)}
//                     onChange={(e) => handleSelectRow(product.id, e.target.checked)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-900 font-medium">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
//                       {product.name.charAt(0)}
//                     </div>
//                     <span>{product.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   <span className={`px-2 py-1 text-xs rounded ${
//                     product.digital === 'Yes' 
//                       ? 'bg-blue-100 text-blue-800' 
//                       : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {product.digital}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600 font-mono">{product.sku}</td>
//                 {/* ❌ On Hand column data removed */}
//                 <td className="px-4 py-3 text-sm text-gray-600 font-medium">{product.available}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600 font-medium">{product.onHold}</td>
//                 <td className="px-4 py-3">
//                   <span className={getStatusBadgeClass(product.status)}>
//                     {product.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-right">
//                   <div className="flex items-center justify-end gap-1">
//                     {/* Edit Button */}
//                     <button
//                       onClick={() => onEdit(product.id)}
//                       className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
//                       title="Edit"
//                     >
//                       <Edit size={16} />
//                     </button>

//                     {/* View Button */}
//                     <button
//                       onClick={() => onView(product.id)}
//                       className="p-1.5 hover:bg-green-100 rounded-md text-green-600 hover:text-green-800 transition-colors"
//                       title="View"
//                     >
//                       <Eye size={16} />
//                     </button>

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => onDelete(product.id)}
//                       className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 size={16} />
//                     </button>

//                     {/* More Actions Dropdown */}
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowMenu(showMenu === product.id ? null : product.id)}
//                         className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
//                         title="More actions"
//                       >
//                         <MoreVertical size={16} />
//                       </button>

//                       {showMenu === product.id && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
//                           <button
//                             onClick={() => {
//                               onAddStock(product.id);
//                               setShowMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <Plus size={16} className="text-green-600" />
//                             Add Stock
//                           </button>
//                           <button
//                             onClick={() => {
//                               onRemoveStock(product.id);
//                               setShowMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <Minus size={16} className="text-red-600" />
//                             Remove Items
//                           </button>
//                           <div className="border-t border-gray-100 my-1"></div>
//                           <button
//                             onClick={() => {
//                               onManageStock(product.id);
//                               setShowMenu(null);
//                             }}
//                             className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <Package size={16} className="text-blue-600" />
//                             Manage Stock
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Product } from '../../types/Inventory.types';
import { getStatusBadgeClass } from '../../utils/inventory.utils';
import {
  Edit,
  Eye,
  Trash2,
  Package,
  Plus,
  Minus,
  MoreVertical
} from 'lucide-react';

interface InventoryTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onAddStock: (id: string) => void;
  onRemoveStock: (id: string) => void;
  onManageStock: (id: string) => void;
  selectedIds?: string[];
  onSelectProduct?: (id: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onView,
  onDelete,
  onAddStock,
  onRemoveStock,
  onManageStock,
  selectedIds = [],
  onSelectProduct,
  onSelectAll,
}) => {
  const [showMenu, setShowMenu] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or add a new product</p>
      </div>
    );
  }

  const handleSelectAll = (checked: boolean) => {
    if (onSelectAll) onSelectAll(checked);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (onSelectProduct) onSelectProduct(id, checked);
  };

  const allSelected = products.length > 0 && products.every(p => selectedIds.includes(p.id));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                    onChange={(e) => handleSelectRow(product.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      {product.name.charAt(0)}
                    </div>
                    <span>{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 font-mono">{product.sku}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{product.category_name || 'Uncategorized'}</td>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">₹{Number(product.price).toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                  {product.stock_quantity} <span className="text-gray-400 text-xs">{product.unit}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={getStatusBadgeClass(product.status)}>
                    {product.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit(product.id)}
                      className="p-1.5 hover:bg-blue-100 rounded-md text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>

                    {/* View Button */}
                    <button
                      onClick={() => onView(product.id)}
                      className="p-1.5 hover:bg-green-100 rounded-md text-green-600 hover:text-green-800 transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-1.5 hover:bg-red-100 rounded-md text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* More Actions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowMenu(showMenu === product.id ? null : product.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                        title="More actions"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {showMenu === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                          <button
                            onClick={() => {
                              onAddStock(product.id);
                              setShowMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={16} className="text-green-600" />
                            Add Stock
                          </button>
                          <button
                            onClick={() => {
                              onRemoveStock(product.id);
                              setShowMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={16} className="text-red-600" />
                            Remove Items
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              onManageStock(product.id);
                              setShowMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Package size={16} className="text-blue-600" />
                            Manage Stock
                          </button>
                        </div>
                      )}
                    </div>
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