import React, { useState } from 'react';

interface ProductData {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  value: number;
  status: string;
}

const InventoryReport: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [products] = useState<ProductData[]>([
    { id: '1', name: 'Laptop Pro', sku: 'LAP-001', category: 'Electronics', stock: 15, price: 65000, value: 975000, status: 'In Stock' },
    { id: '2', name: 'Wireless Mouse', sku: 'MOU-001', category: 'Accessories', stock: 8, price: 1200, value: 9600, status: 'Low Stock' },
    { id: '3', name: 'Office Chair', sku: 'CHR-001', category: 'Furniture', stock: 3, price: 8500, value: 25500, status: 'Low Stock' },
    { id: '4', name: 'USB Cable', sku: 'USB-001', category: 'Accessories', stock: 50, price: 300, value: 15000, status: 'In Stock' },
    { id: '5', name: 'Monitor 24"', sku: 'MON-001', category: 'Electronics', stock: 0, price: 15000, value: 0, status: 'Out of Stock' },
  ]);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
  
  const totalProducts = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum, p) => sum + p.value, 0);
  const lowStockCount = filteredProducts.filter(p => p.status === 'Low Stock').length;
  const outOfStockCount = filteredProducts.filter(p => p.status === 'Out of Stock').length;

  const handleExport = () => {
    const csvContent = [
      ['Product Name', 'SKU', 'Category', 'Stock', 'Price', 'Total Value', 'Status'],
      ...filteredProducts.map(p => [p.name, p.sku, p.category, p.stock, p.price, p.value, p.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'In Stock': return 'status-instock';
      case 'Low Stock': return 'status-lowstock';
      case 'Out of Stock': return 'status-outofstock';
      default: return '';
    }
  };

  return (
    <div className="inventory-report">
      <div className="report-header">
        <h2>Inventory Report</h2>
        <div className="report-controls">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="period-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <button className="btn-export" onClick={handleExport}>Export Report</button>
        </div>
      </div>

      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="stat-label">TOTAL PRODUCTS</div>
          <div className="stat-value">{totalProducts}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">TOTAL VALUE</div>
          <div className="stat-value">₹{totalValue.toLocaleString()}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">LOW STOCK</div>
          <div className="stat-value">{lowStockCount}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">OUT OF STOCK</div>
          <div className="stat-value">{outOfStockCount}</div>
        </div>
      </div>

      <div className="report-table-container">
        <h3>Product Details</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>PRICE</th>
              <th>TOTAL VALUE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>₹{product.price.toLocaleString()}</td>
                <td>₹{product.value.toLocaleString()}</td>
                <td>
                  <span className={getStatusClass(product.status)}>{product.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryReport;