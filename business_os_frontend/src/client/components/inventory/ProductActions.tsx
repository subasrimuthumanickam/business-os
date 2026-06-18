import React, { useState, useRef, useEffect } from 'react';
import { 
  Edit, 
  Link, 
  Eye, 
  Copy, 
  Trash2, 
  Plus, 
  Minus, 
  MoreVertical,
  Package,
  Truck,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface ProductActionsProps {
  productId: string;
  productName: string;
  onEdit: (id: string) => void;
  onListOnChannel: (id: string) => void;
  onViewAllListings: (id: string) => void;
  onClone: (id: string) => void;
  onDelete: (id: string) => void;
  onAddStock: (id: string) => void;
  onRemoveItems: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onExport?: (id: string) => void;
  onPrint?: (id: string) => void;
  status?: 'Active' | 'Draft' | 'Inactive';
  stockStatus?: 'Low' | 'Medium' | 'High';
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  productName,
  onEdit,
  onListOnChannel,
  onViewAllListings,
  onClone,
  onDelete,
  onAddStock,
  onRemoveItems,
  onViewDetails,
  onExport,
  onPrint,
  status = 'Active',
  stockStatus = 'Medium',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getStatusColor = () => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Draft': return 'text-yellow-600';
      case 'Inactive': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatusColor = () => {
    switch (stockStatus) {
      case 'Low': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatusIcon = () => {
    switch (stockStatus) {
      case 'Low': return <AlertCircle size={14} />;
      case 'Medium': return <AlertCircle size={14} />;
      case 'High': return <CheckCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const actionButtons = [
    {
      id: 'add-stock',
      label: 'Add Stock',
      icon: <Plus size={16} />,
      onClick: () => onAddStock(productId),
      color: 'text-green-600 hover:bg-green-100',
      show: true
    },
    {
      id: 'remove-stock',
      label: 'Remove Items',
      icon: <Minus size={16} />,
      onClick: () => onRemoveItems(productId),
      color: 'text-red-600 hover:bg-red-100',
      show: true
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={16} />,
      onClick: () => onEdit(productId),
      color: 'text-blue-600 hover:bg-blue-100',
      show: true
    },
    {
      id: 'list-channel',
      label: 'List on Channel',
      icon: <Link size={16} />,
      onClick: () => onListOnChannel(productId),
      color: 'text-purple-600 hover:bg-purple-100',
      show: true
    },
    {
      id: 'view-listings',
      label: 'View All Listings',
      icon: <Eye size={16} />,
      onClick: () => onViewAllListings(productId),
      color: 'text-indigo-600 hover:bg-indigo-100',
      show: true
    },
    {
      id: 'clone',
      label: 'Clone',
      icon: <Copy size={16} />,
      onClick: () => onClone(productId),
      color: 'text-gray-600 hover:bg-gray-100',
      show: true
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={16} />,
      onClick: () => onDelete(productId),
      color: 'text-red-600 hover:bg-red-100',
      show: true
    },
  ];

  const dropdownActions = [
    {
      id: 'view-details',
      label: 'View Details',
      icon: <Eye size={16} />,
      onClick: () => onViewDetails?.(productId),
      show: !!onViewDetails
    },
    {
      id: 'export',
      label: 'Export',
      icon: <Package size={16} />,
      onClick: () => onExport?.(productId),
      show: !!onExport
    },
    {
      id: 'print',
      label: 'Print Label',
      icon: <Truck size={16} />,
      onClick: () => onPrint?.(productId),
      show: !!onPrint
    },
  ];

  const visibleDropdownActions = dropdownActions.filter(action => action.show);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-1">
        {/* Quick action buttons (always visible) */}
        {actionButtons.slice(0, 3).map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`p-1.5 rounded-md transition-colors ${action.color}`}
            title={action.label}
          >
            {action.icon}
          </button>
        ))}

        {/* More actions dropdown toggle */}
        <button
          onClick={toggleMenu}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          title="More actions"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
          {/* Stock status indicator */}
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Status:</span>
              <span className={`font-medium flex items-center gap-1 ${getStatusColor()}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Active' ? 'bg-green-500' : 
                  status === 'Draft' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></span>
                {status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-gray-500">Stock:</span>
              <span className={`font-medium flex items-center gap-1 ${getStockStatusColor()}`}>
                {getStockStatusIcon()}
                {stockStatus}
              </span>
            </div>
          </div>

          {/* Quick action buttons (remaining) */}
          {actionButtons.slice(3).map((action) => (
            <button
              key={action.id}
              onClick={() => {
                action.onClick();
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${action.color}`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}

          {/* Separator */}
          {visibleDropdownActions.length > 0 && actionButtons.length > 0 && (
            <div className="border-t border-gray-100 my-1"></div>
          )}

          {/* Additional dropdown actions */}
          {visibleDropdownActions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                action.onClick();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {action.icon}
              {action.label}
            </button>
          ))}

          {/* Product name at bottom */}
          <div className="border-t border-gray-100 mt-1 pt-1 px-3 py-1.5">
            <p className="text-xs text-gray-400 truncate" title={productName}>
              ID: {productId.substring(0, 8)}...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};