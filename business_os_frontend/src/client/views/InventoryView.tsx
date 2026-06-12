import React, { useState } from 'react';
import ProductList from '../components/inventory/ProductList';
import CategoryList from '../components/inventory/CategoryList';

const InventoryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  return (
    <div className="inventory-view">
      <div className="tab-header">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          📁 Categories
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'categories' && <CategoryList />}
      </div>
    </div>
  );
};

export default InventoryView;