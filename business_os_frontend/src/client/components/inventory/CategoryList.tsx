 
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  parentName: string | null;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  subCategories?: Category[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setTimeout(() => {
      const mockCategories: Category[] = [
        { 
          id: '1', name: 'Electronics', description: 'Electronic products and gadgets', parentId: null, parentName: null, 
          productCount: 45, status: 'active', createdAt: '2024-01-10', subCategories: [
            { id: '11', name: 'Laptops', description: 'Portable computers', parentId: '1', parentName: 'Electronics', productCount: 12, status: 'active', createdAt: '2024-01-11' },
            { id: '12', name: 'Mobiles', description: 'Smartphones and tablets', parentId: '1', parentName: 'Electronics', productCount: 18, status: 'active', createdAt: '2024-01-11' },
            { id: '13', name: 'Accessories', description: 'Chargers, cables, cases', parentId: '1', parentName: 'Electronics', productCount: 25, status: 'active', createdAt: '2024-01-12' },
          ]
        },
        { 
          id: '2', name: 'Furniture', description: 'Office and home furniture', parentId: null, parentName: null, 
          productCount: 28, status: 'active', createdAt: '2024-01-10', subCategories: [
            { id: '21', name: 'Chairs', description: 'Office chairs, gaming chairs', parentId: '2', parentName: 'Furniture', productCount: 10, status: 'active', createdAt: '2024-01-11' },
            { id: '22', name: 'Desks', description: 'Office desks, tables', parentId: '2', parentName: 'Furniture', productCount: 8, status: 'active', createdAt: '2024-01-11' },
          ]
        },
        { 
          id: '3', name: 'Clothing', description: 'Apparel and fashion', parentId: null, parentName: null, 
          productCount: 52, status: 'inactive', createdAt: '2024-01-12', subCategories: [
            { id: '31', name: 'Men', description: 'Men\'s clothing', parentId: '3', parentName: 'Clothing', productCount: 25, status: 'inactive', createdAt: '2024-01-13' },
            { id: '32', name: 'Women', description: 'Women\'s clothing', parentId: '3', parentName: 'Clothing', productCount: 27, status: 'inactive', createdAt: '2024-01-13' },
          ]
        },
      ];
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, description: formData.description, status: formData.status }
          : cat
      ));
      alert('Category updated successfully!');
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        parentId: formData.parentId || null,
        parentName: formData.parentId ? categories.find(c => c.id === formData.parentId)?.name || null : null,
        productCount: 0,
        status: formData.status,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setCategories([...categories, newCategory]);
      alert('Category created successfully!');
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
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Category deleted successfully!');
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategoryTree = (categoriesList: Category[], level: number = 0) => {
    return categoriesList.map(category => (
      <React.Fragment key={category.id}>
        <tr style={{ backgroundColor: level > 0 ? '#f9fafb' : 'white' }}>
          <td style={{ paddingLeft: `${level * 30 + 12}px` }}>
            {category.subCategories && category.subCategories.length > 0 && (
              <button 
                className="expand-btn"
                onClick={() => toggleExpand(category.id)}
                style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '14px' }}
              >
                {expandedCategories.has(category.id) ? '▼' : '▶'}
              </button>
            )}
            {!category.subCategories || category.subCategories.length === 0 && (
              <span style={{ marginLeft: '24px' }}>📁</span>
            )}
            {category.name}
          </td>
          <td>{category.description}</td>
          <td>{category.parentName || '-'}</td>
          <td>{category.productCount}</td>
          <td>
            <span className={`status-badge ${category.status}`}>
              {category.status}
            </span>
          </td>
          <td>{category.createdAt}</td>
          <td>
            <button className="action-btn edit" onClick={() => handleEdit(category)}>Edit</button>
            <button className="action-btn delete" onClick={() => handleDelete(category.id)}>Delete</button>
          </td>
        </tr>
        {expandedCategories.has(category.id) && category.subCategories && (
          renderCategoryTree(category.subCategories, level + 1)
        )}
      </React.Fragment>
    ));
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status === 'active').length;
  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="category-list">
      <div className="list-header">
        <h2>Product Categories</h2>
        <button className="btn-primary" onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '', parentId: '', status: 'active' }); setShowModal(true); }}>
          + Add Category
        </button>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Categories</span>
            <span className="stats-card-icon">📁</span>
          </div>
          <div className="stats-card-value">{totalCategories}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Active</span>
            <span className="stats-card-icon">✅</span>
          </div>
          <div className="stats-card-value">{activeCategories}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Inactive</span>
            <span className="stats-card-icon">❌</span>
          </div>
          <div className="stats-card-value">{totalCategories - activeCategories}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Products</span>
            <span className="stats-card-icon">📦</span>
          </div>
          <div className="stats-card-value">{totalProducts}</div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3>Category Hierarchy</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Parent Category</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.filter(cat => cat.parentId === null).map(cat => (
                <React.Fragment key={cat.id}>
                  <tr>
                    <td style={{ paddingLeft: '12px' }}>
                      {cat.subCategories && cat.subCategories.length > 0 && (
                        <button 
                          className="expand-btn"
                          onClick={() => toggleExpand(cat.id)}
                          style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '14px' }}
                        >
                          {expandedCategories.has(cat.id) ? '▼' : '▶'}
                        </button>
                      )}
                      {(!cat.subCategories || cat.subCategories.length === 0) && (
                        <span style={{ marginLeft: '24px' }}>📁</span>
                      )}
                      {cat.name}
                    </td>
                    <td>{cat.description}</td>
                    <td>{cat.parentName || '-'}</td>
                    <td>{cat.productCount}</td>
                    <td>
                      <span className={`status-badge ${cat.status}`}>
                        {cat.status}
                      </span>
                    </td>
                    <td>{cat.createdAt}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEdit(cat)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDelete(cat.id)}>Delete</button>
                    </td>
                  </tr>
                  {expandedCategories.has(cat.id) && cat.subCategories && cat.subCategories.map(subCat => (
                    <tr key={subCat.id} style={{ backgroundColor: '#f9fafb' }}>
                      <td style={{ paddingLeft: '42px' }}>📁 {subCat.name}</td>
                      <td>{subCat.description}</td>
                      <td>{cat.name}</td>
                      <td>{subCat.productCount}</td>
                      <td>
                        <span className={`status-badge ${subCat.status}`}>
                          {subCat.status}
                        </span>
                      </td>
                      <td>{subCat.createdAt}</td>
                      <td>
                        <button className="action-btn edit" onClick={() => handleEdit(subCat)}>Edit</button>
                        <button className="action-btn delete" onClick={() => handleDelete(subCat.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              {filteredCategories.filter(cat => cat.parentId === null).length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center' }}>No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter category description"
                />
              </div>
              <div className="form-group">
                <label>Parent Category</label>
                <select 
                  value={formData.parentId} 
                  onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                >
                  <option value="">None (Top Level)</option>
                  {categories.filter(c => c.parentId === null).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                >
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