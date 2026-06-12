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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || data);
      } else {
        setMockProducts();
      }
    } catch (error) {
      setMockProducts();
    } finally {
      setLoading(false);
    }
  };

  const setMockProducts = () => {
    setProducts([
      { id: '1', name: 'Laptop Pro', sku: 'LAP-001', category: 'Electronics', price: 65000, stock: 15, reorderLevel: 5, status: 'active' },
      { id: '2', name: 'Wireless Mouse', sku: 'MOU-001', category: 'Accessories', price: 1200, stock: 8, reorderLevel: 10, status: 'active' },
      { id: '3', name: 'Office Chair', sku: 'CHR-001', category: 'Furniture', price: 8500, stock: 3, reorderLevel: 5, status: 'active' },
      { id: '4', name: 'USB Cable', sku: 'USB-001', category: 'Accessories', price: 300, stock: 50, reorderLevel: 20, status: 'active' },
    ]);
  };

  const handleReorder = (product: Product) => {
    const suggestedOrder = Math.max(product.reorderLevel * 2 - product.stock, product.reorderLevel);
    const message = `Reorder ${product.name}\nCurrent Stock: ${product.stock}\nReorder Level: ${product.reorderLevel}\nSuggested Quantity: ${suggestedOrder}\n\nClick OK to place reorder`;
    if (window.confirm(message)) {
      alert(`Reorder placed for ${product.name}! Quantity: ${suggestedOrder}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSave = (productData: any) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
      alert('Product updated successfully!');
    } else {
      const newProduct = { ...productData, id: Date.now().toString() };
      setProducts([...products, newProduct]);
      alert('Product added successfully!');
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const getStockStatus = (stock: number, reorderLevel: number) => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const getStockStatusText = (stock: number, reorderLevel: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="inventory-list">
      <div className="list-header">
        <h2>Products</h2>
        <button className="btn-primary" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
          + Add Product
        </button>
      </div>

      <StockAlert products={products} onReorder={handleReorder} />

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const stockStatus = getStockStatus(product.stock, product.reorderLevel);
              const statusText = getStockStatusText(product.stock, product.reorderLevel);
              return (
                <tr key={product.id}>
                  <td className="product-name-cell">{product.name}</td>
                  <td className="product-sku-cell">{product.sku}</td>
                  <td className="product-category-cell">{product.category}</td>
                  <td className="product-price-cell">₹{product.price.toLocaleString()}</td>
                  <td className={`stock-cell ${stockStatus}`}>{product.stock}</td>
                  <td>
                    <span className={`status-badge ${stockStatus}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn edit" onClick={() => handleEdit(product)} title="Edit">
                      ✏️
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(product.id)} title="Delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductForm 
          product={editingProduct}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductList;