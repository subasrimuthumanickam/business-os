import React from 'react';

// ⚠️ CRITICAL: This must match EXACTLY with ProductList.tsx
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;           // ← This was missing!
  stock: number;
  reorderLevel: number;
  status: 'active' | 'inactive';  // ← This was missing!
}

interface StockAlertProps {
  products: Product[];
  onReorder: (product: Product) => void;
}

const StockAlert: React.FC<StockAlertProps> = ({ products, onReorder }) => {
  const lowStockProducts = products.filter(p => p.stock <= p.reorderLevel && p.stock > 0);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="stock-alerts-container">
      <h3>⚠️ Stock Alerts</h3>
      {outOfStockProducts.length > 0 && (
        <div className="alert-section danger">
          <h4>Out of Stock ({outOfStockProducts.length})</h4>
          {outOfStockProducts.map(product => (
            <div key={product.id} className="alert-item">
              <span className="alert-icon">❌</span>
              <div className="alert-details">
                <div className="alert-name">{product.name}</div>
                <div className="alert-sku">{product.sku}</div>
                <div className="alert-stock">Stock: {product.stock}</div>
              </div>
              <button className="alert-btn" onClick={() => onReorder(product)}>Reorder</button>
            </div>
          ))}
        </div>
      )}
      {lowStockProducts.length > 0 && (
        <div className="alert-section warning">
          <h4>Low Stock ({lowStockProducts.length})</h4>
          {lowStockProducts.map(product => (
            <div key={product.id} className="alert-item">
              <span className="alert-icon">⚠️</span>
              <div className="alert-details">
                <div className="alert-name">{product.name}</div>
                <div className="alert-sku">{product.sku}</div>
                <div className="alert-stock">Stock: {product.stock} (Reorder at {product.reorderLevel})</div>
              </div>
              <button className="alert-btn" onClick={() => onReorder(product)}>Reorder</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockAlert;