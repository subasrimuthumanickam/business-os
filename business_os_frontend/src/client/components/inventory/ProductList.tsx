import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import StockAlert from './StockAlert';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  status: 'active' | 'inactive';
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Laptop Pro', sku: 'LAP-001', category: 'Electronics', price: 65000, stock: 15, reorderLevel: 5, status: 'active' },
        { id: '2', name: 'Wireless Mouse', sku: 'MOU-001', category: 'Accessories', price: 1200, stock: 8, reorderLevel: 10, status: 'active' },
        { id: '3', name: 'Office Chair', sku: 'CHR-001', category: 'Furniture', price: 8500, stock: 3, reorderLevel: 5, status: 'active' },
        { id: '4', name: 'USB Cable', sku: 'USB-001', category: 'Accessories', price: 300, stock: 50, reorderLevel: 20, status: 'active' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStockStatus = (stock: number, reorderLevel: number) => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const getStockColor = (stock: number, reorderLevel: number) => {
    if (stock === 0) return '#ef4444'; // Red
    if (stock <= reorderLevel) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getStatusStyle = (stock: number, reorderLevel: number) => {
    const isLowStock = stock <= reorderLevel;
    return {
      backgroundColor: isLowStock ? '#fed7aa' : '#d1fae5',
      color: isLowStock ? '#92400e' : '#065f46',
    };
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading products...</div>;

  // Custom table styles
  const tableStyles = {
    container: { overflowX: 'auto' as const },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: { padding: '12px 16px', textAlign: 'left' as const, borderBottom: '1px solid #e5e7eb', background: '#f9fafb', fontWeight: 600, color: '#374151' },
    td: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb' },
  };

  return (
    <div className="inventory-list">
      <div className="list-header">
        <h2 style={{ color: '#1a1a2e' }}>Products</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Product</button>
      </div>
      
      <StockAlert products={products} />
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '30px', border: '1px solid #d1d5db', width: '300px' }}
        />
      </div>
      
      <div style={tableStyles.container}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>PRODUCT NAME</th>
              <th style={tableStyles.th}>SKU</th>
              <th style={tableStyles.th}>CATEGORY</th>
              <th style={tableStyles.th}>PRICE</th>
              <th style={tableStyles.th}>STOCK</th>
              <th style={tableStyles.th}>STATUS</th>
              <th style={tableStyles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td style={{ ...tableStyles.td, color: '#1a1a2e', fontWeight: 500 }}>{product.name}</td>
                <td style={{ ...tableStyles.td, color: '#6b7280' }}>{product.sku}</td>
                <td style={{ ...tableStyles.td, color: '#4b5563' }}>{product.category}</td>
                <td style={{ ...tableStyles.td, color: '#4f46e5', fontWeight: 600 }}>₹{product.price.toLocaleString()}</td>
                <td style={{ ...tableStyles.td, color: getStockColor(product.stock, product.reorderLevel), fontWeight: 500 }}>
                  {product.stock} {product.stock <= product.reorderLevel && '⚠️'}
                </td>
                <td style={tableStyles.td}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 500,
                    ...getStatusStyle(product.stock, product.reorderLevel)
                  }}>
                    {getStockStatus(product.stock, product.reorderLevel).replace('-', ' ')}
                  </span>
                </td>
                <td style={tableStyles.td}>
                  <button style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                  <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showModal && <ProductForm onClose={() => setShowModal(false)} onSave={() => {}} />}
    </div>
  );
};

export default ProductList;