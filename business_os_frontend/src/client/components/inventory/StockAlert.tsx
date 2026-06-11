 import React from 'react';

interface Product {
  id: string;
  name: string;
  stock: number;
  reorderLevel: number;
}

interface StockAlertProps {
  products: Product[];
}

const StockAlert: React.FC<StockAlertProps> = ({ products }) => {
  const lowStockProducts = products.filter(p => p.stock <= p.reorderLevel && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="stock-alerts">
      <h3>Stock Alerts</h3>
      {outOfStockProducts.length > 0 && (
        <div className="alert-section danger">
          <h4>Out of Stock</h4>
          {outOfStockProducts.map(product => (
            <div key={product.id} className="alert-item">
              <span className="alert-icon">❌</span>
              <span>{product.name} - Out of stock</span>
              <button className="alert-btn">Reorder</button>
            </div>
          ))}
        </div>
      )}
      {lowStockProducts.length > 0 && (
        <div className="alert-section warning">
          <h4>Low Stock</h4>
          {lowStockProducts.map(product => (
            <div key={product.id} className="alert-item">
              <span className="alert-icon">⚠️</span>
              <span>{product.name} - Only {product.stock} left (Reorder at {product.reorderLevel})</span>
              <button className="alert-btn">Reorder</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockAlert;
