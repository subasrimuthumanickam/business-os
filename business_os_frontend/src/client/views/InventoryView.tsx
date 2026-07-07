import React from 'react';
import { useLocation } from 'react-router-dom';
import InventoryPage from '../components/inventory/InventoryPage';

const InventoryView: React.FC = () => {
  const location = useLocation();
  
  const getSection = (): string => {
    const path = location.pathname;
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/collections')) return 'collections';
    if (path.includes('/stock')) return 'stock';
    if (path.includes('/settings')) return 'settings';
    return 'products';
  };

  // Using type assertion to fix the TypeScript error
  return <InventoryPage {...({ section: getSection() } as any)} />;
};

export default InventoryView;