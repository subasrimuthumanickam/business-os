// // // import React from 'react';
// // // import { Package, Plus, Download, Upload, Tag, Layers } from 'lucide-react';

// // // interface InventoryHeaderProps {
// // //   onNewProduct: () => void;
// // //   onManageStock: () => void;
// // //   onExport?: () => void;
// // //   onImport?: () => void;
// // //   currentSection?: string;
// // //   onCategories?: () => void;
// // //   onCollections?: () => void;
// // // }

// // // export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
// // //   onNewProduct,
// // //   onManageStock,
// // //   onExport,
// // //   onImport,
// // //   currentSection = 'products',
// // //   onCategories,
// // //   onCollections,
// // // }) => {
// // //   return (
// // //     <div className="bg-white border-b border-gray-200">
// // //       <div className="px-6 py-4">
// // //         {/* Top Row: Title + Action Buttons */}
// // //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <h1 className="text-2xl font-bold text-gray-800">INVENTORY</h1>
// // //             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
// // //               {currentSection === 'products' ? 'Products' : 
// // //                currentSection === 'categories' ? 'Categories' :
// // //                currentSection === 'collections' ? 'Collections' :
// // //                currentSection === 'stock' ? 'Stock Management' : 'Settings'}
// // //             </span>
// // //           </div>
          
// // //           {/* Right side - Action Buttons */}
// // //           <div className="flex flex-wrap items-center gap-2">
// // //             <button
// // //               onClick={onManageStock}
// // //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
// // //             >
// // //               <Package size={16} /> Manage Stock
// // //             </button>
            
// // //             <button
// // //               onClick={onNewProduct}
// // //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
// // //             >
// // //               <Plus size={16} /> New Product
// // //             </button>

// // //             <div className="h-6 w-px bg-gray-300"></div>

// // //             {onExport && (
// // //               <button
// // //                 onClick={onExport}
// // //                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// // //               >
// // //                 <Download size={16} /> Export
// // //               </button>
// // //             )}
            
// // //             {onImport && (
// // //               <button
// // //                 onClick={onImport}
// // //                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// // //               >
// // //                 <Upload size={16} /> Import
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Bottom Row: Categories & Collections Navigation */}
// // //         <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-gray-100">
// // //           <button
// // //             onClick={onCategories}
// // //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// // //           >
// // //             <Tag size={15} /> Categories
// // //           </button>

// // //           <button
// // //             onClick={onCollections}
// // //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// // //           >
// // //             <Layers size={15} /> Collections
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // import React from 'react';
// // import { Package, Plus, Download, Upload, Tag, Layers, Trash2, Sliders, Settings } from 'lucide-react';

// // interface InventoryHeaderProps {
// //   onNewProduct: () => void;
// //   onManageStock: () => void;
// //   onExport?: () => void;
// //   onImport?: () => void;
// //   currentSection?: string;
// //   onCategories?: () => void;
// //   onCollections?: () => void;
// //   onRemoveItems?: () => void;
// //   onOptionTypes?: () => void;
// //   onProductSettings?: () => void;
// // }

// // export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
// //   onNewProduct,
// //   onManageStock,
// //   onExport,
// //   onImport,
// //   currentSection = 'products',
// //   onCategories,
// //   onCollections,
// //   onRemoveItems,
// //   onOptionTypes,
// //   onProductSettings,
// // }) => {
// //   return (
// //     <div className="bg-white border-b border-gray-200">
// //       <div className="px-6 py-4">
// //         {/* Top Row: Title + Action Buttons */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //           <div className="flex items-center gap-3">
// //             <h1 className="text-2xl font-bold text-gray-800">INVENTORY</h1>
// //             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
// //               {currentSection === 'products' ? 'Products' : 
// //                currentSection === 'categories' ? 'Categories' :
// //                currentSection === 'collections' ? 'Collections' :
// //                currentSection === 'stock' ? 'Stock Management' : 'Settings'}
// //             </span>
// //           </div>
          
// //           {/* Right side - Action Buttons */}
// //           <div className="flex flex-wrap items-center gap-2">
// //             <button
// //               onClick={onManageStock}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
// //             >
// //               <Package size={16} /> Manage Stock
// //             </button>
            
// //             <button
// //               onClick={onNewProduct}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
// //             >
// //               <Plus size={16} /> New Product
// //             </button>

// //             <div className="h-6 w-px bg-gray-300"></div>

// //             {onExport && (
// //               <button
// //                 onClick={onExport}
// //                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// //               >
// //                 <Download size={16} /> Export
// //               </button>
// //             )}
            
// //             {onImport && (
// //               <button
// //                 onClick={onImport}
// //                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// //               >
// //                 <Upload size={16} /> Import
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Bottom Row: Navigation Tabs */}
// //         <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-gray-100">
// //           <button
// //             onClick={onRemoveItems}
// //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// //           >
// //             <Trash2 size={15} /> Remove items
// //           </button>

// //           <button
// //             onClick={onOptionTypes}
// //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// //           >
// //             <Sliders size={15} /> Option Types
// //           </button>

// //           <button
// //             onClick={onCategories}
// //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// //           >
// //             <Tag size={15} /> Categories
// //           </button>

// //           <button
// //             onClick={onCollections}
// //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// //           >
// //             <Layers size={15} /> Collections
// //           </button>

// //           <button
// //             onClick={onProductSettings}
// //             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
// //           >
// //             <Settings size={15} /> Product settings
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// import React from 'react';
// import { Package, Plus, Download, Upload, Tag, Layers, Trash2, Sliders, Settings } from 'lucide-react';

// interface InventoryHeaderProps {
//   onNewProduct: () => void;
//   onManageStock: () => void;
//   onExport?: () => void;
//   onImport?: () => void;
//   currentSection?: string;
//   onCategories?: () => void;
//   onCollections?: () => void;
//   onRemoveItems?: () => void;
//   onOptionTypes?: () => void;
//   onProductSettings?: () => void;
// }

// export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
//   onNewProduct,
//   onManageStock,
//   onExport,
//   onImport,
//   currentSection = 'products',
//   onCategories,
//   onCollections,
//   onRemoveItems,
//   onOptionTypes,
//   onProductSettings,
// }) => {
//   return (
//     <div className="bg-white border-b border-gray-200">
//       <div className="px-6 py-4">
//         {/* Top Row: Title + Action Buttons */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <h1 className="text-2xl font-bold text-gray-800">INVENTORY</h1>
//             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               {currentSection === 'products' ? 'Products' : 
//                currentSection === 'categories' ? 'Categories' :
//                currentSection === 'collections' ? 'Collections' :
//                currentSection === 'stock' ? 'Stock Management' : 'Settings'}
//             </span>
//           </div>
          
//           {/* Right side - Action Buttons */}
//           <div className="flex flex-wrap items-center gap-2">
//             <button
//               onClick={onManageStock}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
//             >
//               <Package size={16} /> Manage Stock
//             </button>
            
//             <button
//               onClick={onNewProduct}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
//             >
//               <Plus size={16} /> New Product
//             </button>

//             <div className="h-6 w-px bg-gray-300"></div>

//             {onExport && (
//               <button
//                 onClick={onExport}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
//               >
//                 <Download size={16} /> Export
//               </button>
//             )}
            
//             {onImport && (
//               <button
//                 onClick={onImport}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
//               >
//                 <Upload size={16} /> Import
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Bottom Row: Quick Action Navigation Buttons */}
//         <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-gray-100">
//           <button
//             onClick={onRemoveItems}
//             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//           >
//             <Trash2 size={15} /> Remove items
//           </button>

//           <div className="h-5 w-px bg-gray-300"></div>

//           <button
//             onClick={onOptionTypes}
//             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//           >
//             <Sliders size={15} /> Option Types
//           </button>

//           <div className="h-5 w-px bg-gray-300"></div>

//           <button
//             onClick={onCategories}
//             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//           >
//             <Tag size={15} /> Categories
//           </button>

//           <div className="h-5 w-px bg-gray-300"></div>

//           <button
//             onClick={onCollections}
//             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//           >
//             <Layers size={15} /> Collections
//           </button>

//           <div className="h-5 w-px bg-gray-300"></div>

//           <button
//             onClick={onProductSettings}
//             className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
//           >
//             <Settings size={15} /> Product settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import { Package, Plus, Download, Upload } from 'lucide-react';

interface InventoryHeaderProps {
  onNewProduct: () => void;
  onManageStock: () => void;
  onExport?: () => void;
  onImport?: () => void;
  currentSection?: string;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onNewProduct,
  onManageStock,
  onExport,
  onImport,
  currentSection = 'products',
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        {/* Only Top Row: Title + Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">INVENTORY</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {currentSection === 'products' ? 'Products' : 
               currentSection === 'categories' ? 'Categories' :
               currentSection === 'collections' ? 'Collections' :
               currentSection === 'stock' ? 'Stock Management' : 'Settings'}
            </span>
          </div>
          
          {/* Right side - Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onManageStock}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
            >
              <Package size={16} /> Manage Stock
            </button>
            
            <button
              onClick={onNewProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
            >
              <Plus size={16} /> New Product
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            {onExport && (
              <button
                onClick={onExport}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <Download size={16} /> Export
              </button>
            )}
            
            {onImport && (
              <button
                onClick={onImport}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <Upload size={16} /> Import
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};