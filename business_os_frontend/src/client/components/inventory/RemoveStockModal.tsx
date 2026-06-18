import React, { useState } from 'react';
import { X, AlertCircle, Minus, Package } from 'lucide-react';

interface RemoveStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  productName?: string;
  currentStock?: number;
}

export const RemoveStockModal: React.FC<RemoveStockModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName = 'Product',
  currentStock = 0,
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
    if (quantity > currentStock) {
      setError(`Cannot remove more than current stock (${currentStock})`);
      return;
    }
    setError('');
    onConfirm(quantity);
    setQuantity(1);
    onClose();
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

  const quickRemove = (amount: number) => {
    if (amount <= currentStock) {
      setQuantity(amount);
      setError('');
    } else {
      setError(`Cannot remove more than current stock (${currentStock})`);
    }
  };

  const maxQuickRemove = Math.min(25, currentStock);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Minus size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Remove Stock</h2>
              <p className="text-xs text-gray-500">Decrease inventory quantity</p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{productName}</p>
              <p className="text-xs text-gray-500">
                Current stock: <span className="font-semibold text-gray-700">{currentStock}</span> units
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Quantity to Remove <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={quantity || ''}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className={`flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition ${
                  error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                }`}
                min="1"
                max={currentStock}
                step="1"
                placeholder="Enter quantity"
                autoFocus
              />
              <span className="flex items-center px-3 text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                / {currentStock}
              </span>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Quick Remove Buttons */}
          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-2">Quick remove</label>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => quickRemove(1)}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                -1
              </button>
              <button
                type="button"
                onClick={() => quickRemove(5)}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => quickRemove(10)}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => quickRemove(maxQuickRemove)}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                -{maxQuickRemove}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={quantity <= 0 || quantity > currentStock}
              className={`px-5 py-2 bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                quantity <= 0 || quantity > currentStock
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-700'
              }`}
            >
              <Minus size={16} />
              Remove Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};