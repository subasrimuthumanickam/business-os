import React, { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  status: 'active' | 'inactive';
}

interface CustomerFormProps {
  customer?: Customer | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    gstNumber: customer?.gstNumber || '',
    address: customer?.address || '',
    city: customer?.city || '',
    state: customer?.state || '',
    pincode: customer?.pincode || '',
    status: customer?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{customer ? 'Edit Customer' : 'Add New Customer'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name *</label>
            <input 
              type="text" 
              required
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                required
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                required
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="form-group">
            <label>GST Number</label>
            <input 
              type="text" 
              value={formData.gstNumber} 
              onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
              placeholder="Enter GST number"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea 
              rows={2} 
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter address"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                value={formData.city} 
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input 
                type="text" 
                value={formData.state} 
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input 
                type="text" 
                value={formData.pincode} 
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                placeholder="Pincode"
              />
            </div>
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
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{customer ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;