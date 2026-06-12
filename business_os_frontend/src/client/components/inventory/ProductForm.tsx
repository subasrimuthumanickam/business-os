import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  status: string;
}

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || 'Electronics',
    price: product?.price || 0,
    stock: product?.stock || 0,
    reorderLevel: product?.reorderLevel || 5,
    description: '',
  });

  const categories = ['Electronics', 'Accessories', 'Furniture', 'Clothing', 'Books', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.price) {
      alert('Please fill all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter product name"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>SKU *</label>
              <input 
                type="text" 
                required
                value={formData.sku} 
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                placeholder="Enter SKU"
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input 
                type="number" 
                required
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label>Current Stock *</label>
              <input 
                type="number" 
                required
                value={formData.stock} 
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Reorder Level</label>
            <input 
              type="number" 
              value={formData.reorderLevel} 
              onChange={(e) => setFormData({...formData, reorderLevel: parseInt(e.target.value)})}
              placeholder="Alert when stock reaches this level"
            />
            <small>You will be alerted when stock falls below this level</small>
          </div>
          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea 
              rows={3} 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter product description"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{product ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;