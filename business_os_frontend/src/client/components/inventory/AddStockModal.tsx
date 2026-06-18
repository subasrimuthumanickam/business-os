import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  productName?: string;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName = 'Product',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    if (quantity > 10000) {
      setError('Quantity cannot exceed 10,000');
      return;
    }
    setError('');
    onConfirm(quantity);
    setQuantity(1);
  };

  const handleClose = () => {
    setError('');
    setQuantity(1);
    onClose();
  };

  const handleQuantityChange = (value: string) => {
    const num = Number(value);
    if (value === '' || isNaN(num)) {
      setQuantity(0);
      return;
    }
    setQuantity(Math.floor(num));
  };

  const quickAdd = (amount: number) => {
    setQuantity(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Stock</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Adding stock for: <span className="font-medium">{productName}</span>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity to Add
            </label>
            <input
              type="number"
              value={quantity || ''}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
              step="1"
              placeholder="Enter quantity"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              type="button"
              onClick={() => quickAdd(10)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              +10
            </button>
            <button
              type="button"
              onClick={() => quickAdd(25)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              +25
            </button>
            <button
              type="button"
              onClick={() => quickAdd(50)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              +50
            </button>
            <button
              type="button"
              onClick={() => quickAdd(100)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              +100
            </button>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
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
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};