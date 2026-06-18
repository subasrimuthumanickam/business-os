import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName = 'Product',
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-medium">{productName}</span>?
            </p>
            <p className="text-sm text-gray-500 mt-1">
              This action cannot be undone. All associated data will be permanently removed.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};