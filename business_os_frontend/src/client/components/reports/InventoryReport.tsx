 import React, { useState, useEffect } from 'react';

interface ProductData {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  value: number;
  reorderLevel: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

const InventoryReport: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [stockStatus, setStockStatus] = useState('all');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      const mockData: ProductData[] = [
        { id: '1', name: 'Laptop Pro', sku: 'LAP-001', category: 'Electronics', stock: 15, price: 65000, value: 975000, reorderLevel: 5, status: 'in_stock', lastUpdated: '2024-01-15' },
        { id: '2', name: 'Wireless Mouse', sku: 'MOU-001', category: 'Accessories', stock: 8, price: 1200, value: 9600, reorderLevel: 10, status: 'low_stock', lastUpdated: '2024-01-20' },
        { id: '3', name: 'Office Chair', sku: 'CHR-001', category: 'Furniture', stock: 3, price: 8500, value: 25500, reorderLevel: 5, status: 'low_stock', lastUpdated: '2024-01-18' },
        { id: '4', name: 'USB Cable', sku: 'USB-001', category: 'Accessories', stock: 50, price: 300, value: 15000, reorderLevel: 20, status: 'in_stock', lastUpdated: '2024-01-22' },
        { id: '5', name: 'Monitor 24"', sku: 'MON-001', category: 'Electronics', stock: 0, price: 15000, value: 0, reorderLevel: 3, status: 'out_of_stock', lastUpdated: '2024-01-10' },
        { id: '6', name: 'Keyboard', sku: 'KEY-001', category: 'Accessories', stock: 25, price: 800, value: 20000, reorderLevel: 15, status: 'in_stock', lastUpdated: '2024-01-19' },
      ];
      setProducts(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const statuses = ['all', 'in_stock', 'low_stock', 'out_of_stock'];

  const filteredProducts = products.filter(product => {
    const matchCategory = category === 'all' || product.category === category;
    const matchStatus = stockStatus === 'all' || product.status === stockStatus;
    return matchCategory && matchStatus;
  });

  const totalProducts = filteredProducts.length;
  const totalStockValue = filteredProducts.reduce((sum, p) => sum + p.value, 0);
  const lowStockCount = filteredProducts.filter(p => p.status === 'low_stock').length;
  const outOfStockCount = filteredProducts.filter(p => p.status === 'out_of_stock').length;
  const totalItems = filteredProducts.reduce((sum, p) => sum + p.stock, 0);

  const categoryStats = categories.filter(c => c !== 'all').map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
    totalValue: products.filter(p => p.category === cat).reduce((sum, p) => sum + p.value, 0),
    lowStock: products.filter(p => p.category === cat && p.status === 'low_stock').length
  }));

  const handleExport = () => {
    const csvContent = [
      ['Product Name', 'SKU', 'Category', 'Stock', 'Price', 'Total Value', 'Status', 'Last Updated'],
      ...filteredProducts.map(p => [p.name, p.sku, p.category, p.stock, p.price, p.value, p.status, p.lastUpdated])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="loading">Loading inventory report...</div>;
  }

  return (
    <div className="inventory-report">
      <div className="list-header">
        <h2>Inventory Report</h2>
        <button className="btn-primary" onClick={handleExport}>Export Report</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Products</span>
            <span className="stats-card-icon">📦</span>
          </div>
          <div className="stats-card-value">{totalProducts}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Items</span>
            <span className="stats-card-icon">🔢</span>
          </div>
          <div className="stats-card-value">{totalItems.toLocaleString()}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Inventory Value</span>
            <span className="stats-card-icon">💰</span>
          </div>
          <div className="stats-card-value">₹{totalStockValue.toLocaleString()}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Low/Out Stock</span>
            <span className="stats-card-icon">⚠️</span>
          </div>
          <div className="stats-card-value">{lowStockCount + outOfStockCount}</div>
        </div>
      </div>

      {/* Stock Alerts Summary */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="stock-alerts-summary">
          <div className="alert-section warning">
            <h4>⚠️ Low Stock Alerts ({lowStockCount})</h4>
            {filteredProducts.filter(p => p.status === 'low_stock').map(p => (
              <div key={p.id} className="alert-item">
                <span>{p.name}</span>
                <span>Stock: {p.stock} (Reorder at {p.reorderLevel})</span>
                <button className="alert-btn">Reorder</button>
              </div>
            ))}
          </div>
          <div className="alert-section danger">
            <h4>❌ Out of Stock ({outOfStockCount})</h4>
            {filteredProducts.filter(p => p.status === 'out_of_stock').map(p => (
              <div key={p.id} className="alert-item">
                <span>{p.name}</span>
                <span>Stock: 0</span>
                <button className="alert-btn">Order Now</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-bar">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
        <select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
          {statuses.map(s => (
            <option key={s} value={s}>
              {s === 'all' ? 'All Status' : s === 'in_stock' ? 'In Stock' : s === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
            </option>
          ))}
        </select>
      </div>

      {/* Category Summary */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Category Summary</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Products</th>
                <th>Total Value</th>
                <th>Low Stock Items</th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map(cat => (
                <tr key={cat.name}>
                  <td>{cat.name}</td>
                  <td>{cat.count}</td>
                  <td>₹{cat.totalValue.toLocaleString()}</td>
                  <td className={cat.lowStock > 0 ? 'warning-text' : ''}>{cat.lowStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Table */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Product Details</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td className={product.status === 'low_stock' ? 'warning-text' : product.status === 'out_of_stock' ? 'danger-text' : ''}>
                    {product.stock}
                  </td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>₹{product.value.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${product.status}`}>
                      {product.status === 'in_stock' ? 'In Stock' : product.status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>{product.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
