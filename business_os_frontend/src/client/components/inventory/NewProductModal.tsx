// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { CreateProductDTO } from '../../types/Inventory.types';

// interface NewProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: CreateProductDTO) => void;
// }

// export const NewProductModal: React.FC<NewProductModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState<CreateProductDTO>({
//     name: '',
//     digital: 'No',
//     sku: '',
//     onHand: 0,
//     available: 0,
//     onHold: 0,
//     status: 'Draft',
//     category: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   if (!isOpen) return null;

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Product name is required';
//     }
    
//     if (!formData.sku.trim()) {
//       newErrors.sku = 'SKU is required';
//     } else if (!/^\d{12}$/.test(formData.sku)) {
//       newErrors.sku = 'SKU must be exactly 12 digits';
//     }
    
//     if (formData.onHand < 0) {
//       newErrors.onHand = 'On hand cannot be negative';
//     }
    
//     if (formData.available < 0) {
//       newErrors.available = 'Available cannot be negative';
//     }
    
//     if (formData.onHold < 0) {
//       newErrors.onHold = 'On hold cannot be negative';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(formData);
//       onClose();
//       // Reset form
//       setFormData({
//         name: '',
//         digital: 'No',
//         sku: '',
//         onHand: 0,
//         available: 0,
//         onHold: 0,
//         status: 'Draft',
//         category: '',
//       });
//     }
//   };

//   const handleClose = () => {
//     setErrors({});
//     onClose();
//   };

//   // Generate a random 12-digit SKU
//   const generateSKU = () => {
//     const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
//     setFormData({ ...formData, sku });
//     // Clear error if any
//     if (errors.sku) {
//       setErrors({ ...errors, sku: '' });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">New Product</h2>
//           <button 
//             onClick={handleClose} 
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Left Column */}
//             <div className="space-y-4">
//               {/* Product Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                     errors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter product name"
//                   required
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               {/* SKU */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   SKU <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={formData.sku}
//                     onChange={(e) => setFormData({ ...formData, sku: e.target.value.replace(/\D/g, '') })}
//                     className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                       errors.sku ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter 12-digit SKU"
//                     maxLength={12}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={generateSKU}
//                     className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
//                   >
//                     Generate
//                   </button>
//                 </div>
//                 {errors.sku && (
//                   <p className="text-red-500 text-xs mt-1">{errors.sku}</p>
//                 )}
//                 <p className="text-gray-400 text-xs mt-1">Enter exactly 12 digits (e.g., 123456789012)</p>
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 >
//                   <option value="">Select category</option>
//                   <option value="Electronics">Electronics</option>
//                   <option value="Fashion">Fashion</option>
//                   <option value="Home">Home</option>
//                   <option value="Books">Books</option>
//                   <option value="Toys">Toys</option>
//                   <option value="Beauty">Beauty</option>
//                 </select>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               {/* Digital Product */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Digital Product
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="No"
//                       checked={formData.digital === 'No'}
//                       onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
//                       className="text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">No</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="Yes"
//                       checked={formData.digital === 'Yes'}
//                       onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
//                       className="text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Yes</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Stock Quantities - 3 columns */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Stock Quantities
//                 </label>
//                 <div className="grid grid-cols-3 gap-2">
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">On Hand</label>
//                     <input
//                       type="number"
//                       value={formData.onHand}
//                       onChange={(e) => setFormData({ ...formData, onHand: Number(e.target.value) })}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                         errors.onHand ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       min="0"
//                     />
//                     {errors.onHand && (
//                       <p className="text-red-500 text-xs mt-1">{errors.onHand}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Available</label>
//                     <input
//                       type="number"
//                       value={formData.available}
//                       onChange={(e) => setFormData({ ...formData, available: Number(e.target.value) })}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                         errors.available ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       min="0"
//                     />
//                     {errors.available && (
//                       <p className="text-red-500 text-xs mt-1">{errors.available}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">On Hold</label>
//                     <input
//                       type="number"
//                       value={formData.onHold}
//                       onChange={(e) => setFormData({ ...formData, onHold: Number(e.target.value) })}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
//                         errors.onHold ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       min="0"
//                     />
//                     {errors.onHold && (
//                       <p className="text-red-500 text-xs mt-1">{errors.onHold}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Draft">Draft</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>
//           </div>
          
//           {/* Footer Buttons */}
//           <div className="mt-6 flex justify-end gap-3 sticky bottom-0 bg-white py-3 border-t">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Create Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// src/client/components/inventory/ProductList/NewProductModal.tsx

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateProductDTO {
  name: string;
  digital: 'Yes' | 'No';
  sku: string;
  onHand: number;
  available: number;
  onHold: number;
  status: 'Active' | 'Draft' | 'Inactive';
  category: string;
}

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: CreateProductDTO) => void;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CreateProductDTO>({
    name: '',
    digital: 'No',
    sku: '',
    onHand: 0,
    available: 0,
    onHold: 0,
    status: 'Draft',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^\d{12}$/.test(formData.sku)) {
      newErrors.sku = 'SKU must be exactly 12 digits';
    }
    
    if (formData.onHand < 0) {
      newErrors.onHand = 'On hand cannot be negative';
    }
    
    if (formData.available < 0) {
      newErrors.available = 'Available cannot be negative';
    }
    
    if (formData.onHold < 0) {
      newErrors.onHold = 'On hold cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        digital: 'No',
        sku: '',
        onHand: 0,
        available: 0,
        onHold: 0,
        status: 'Draft',
        category: '',
      });
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  // Generate a random 12-digit SKU
  const generateSKU = () => {
    const sku = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setFormData({ ...formData, sku });
    if (errors.sku) {
      setErrors({ ...errors, sku: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 border-b">
          <h2 className="text-xl font-semibold text-gray-800">New Product</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.replace(/\D/g, '') })}
                    className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.sku ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 12-digit SKU"
                    maxLength={12}
                    required
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
                {errors.sku && (
                  <p className="text-red-500 text-xs mt-1">{errors.sku}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">Enter exactly 12 digits (e.g., 123456789012)</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Digital Product
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="No"
                      checked={formData.digital === 'No'}
                      onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Yes"
                      checked={formData.digital === 'Yes'}
                      onChange={(e) => setFormData({ ...formData, digital: e.target.value as 'Yes' | 'No' })}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>

              {/* Stock Quantities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantities
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">On Hand</label>
                    <input
                      type="number"
                      value={formData.onHand}
                      onChange={(e) => setFormData({ ...formData, onHand: Number(e.target.value) })}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.onHand ? 'border-red-500' : 'border-gray-300'
                      }`}
                      min="0"
                    />
                    {errors.onHand && (
                      <p className="text-red-500 text-xs mt-1">{errors.onHand}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Available</label>
                    <input
                      type="number"
                      value={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: Number(e.target.value) })}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.available ? 'border-red-500' : 'border-gray-300'
                      }`}
                      min="0"
                    />
                    {errors.available && (
                      <p className="text-red-500 text-xs mt-1">{errors.available}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">On Hold</label>
                    <input
                      type="number"
                      value={formData.onHold}
                      onChange={(e) => setFormData({ ...formData, onHold: Number(e.target.value) })}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.onHold ? 'border-red-500' : 'border-gray-300'
                      }`}
                      min="0"
                    />
                    {errors.onHold && (
                      <p className="text-red-500 text-xs mt-1">{errors.onHold}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Footer Buttons */}
          <div className="mt-6 flex justify-end gap-3 sticky bottom-0 bg-white py-3 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;