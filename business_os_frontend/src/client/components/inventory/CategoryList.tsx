import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || data);
      } else {
        setMockCategories();
      }
    } catch (error) {
      setMockCategories();
    } finally {
      setLoading(false);
    }
  };

  const setMockCategories = () => {
    setCategories([
      { id: '1', name: 'Electronics', description: 'Electronic products', parentId: null, productCount: 45, status: 'active', createdAt: '2024-01-10' },
      { id: '2', name: 'Accessories', description: 'Gadget accessories', parentId: null, productCount: 28, status: 'active', createdAt: '2024-01-10' },
      { id: '3', name: 'Furniture', description: 'Office furniture', parentId: null, productCount: 15, status: 'active', createdAt: '2024-01-11' },
      { id: '11', name: 'Laptops', description: 'Laptop computers', parentId: '1', productCount: 12, status: 'active', createdAt: '2024-01-12' },
      { id: '12', name: 'Mobiles', description: 'Smartphones', parentId: '1', productCount: 18, status: 'active', createdAt: '2024-01-12' },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
      alert('Category updated!');
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        parentId: formData.parentId || null,
        productCount: 0,
        status: formData.status,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setCategories([...categories, newCategory]);
      alert('Category created!');
    }
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', parentId: '', status: 'active' });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      parentId: category.parentId || '',
      status: category.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
      alert('Category deleted');
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parentCategories = categories.filter(c => c.parentId === null);

  if (loading) return <div className="loading">Loading categories...</div>;

  return (
    <div className="category-list">
      <div className="list-header">
        <h2>Product Categories</h2>
        <button className="btn-primary" onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '', parentId: '', status: 'active' }); setShowModal(true); }}>
          + Add Category
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Parent</th>
              <th>Products</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.filter(c => c.parentId === null).map(category => (
              <React.Fragment key={category.id}>
                <tr>
                  <td><strong>{category.name}</strong></td>
                  <td>{category.description}</td>
                  <td>-</td>
                  <td>{category.productCount}</td>
                  <td><span className={`status-badge ${category.status}`}>{category.status}</span></td>
                  <td>{category.createdAt}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => handleEdit(category)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(category.id)}>Delete</button>
                  </td>
                </tr>
                {categories.filter(c => c.parentId === category.id).map(subCat => (
                  <tr key={subCat.id} style={{ background: '#f9fafb' }}>
                    <td style={{ paddingLeft: '32px' }}>↳ {subCat.name}</td>
                    <td>{subCat.description}</td>
                    <td>{category.name}</td>
                    <td>{subCat.productCount}</td>
                    <td><span className={`status-badge ${subCat.status}`}>{subCat.status}</span></td>
                    <td>{subCat.createdAt}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEdit(subCat)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDelete(subCat.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={2} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Parent Category</label>
                <select value={formData.parentId} onChange={(e) => setFormData({...formData, parentId: e.target.value})}>
                  <option value="">None (Top Level)</option>
                  {parentCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingCategory ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;