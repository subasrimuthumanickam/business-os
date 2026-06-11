import React, { useState } from 'react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceFormProps {
  invoice?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onClose, onSave }) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);
  const [formData, setFormData] = useState({
    customerId: invoice?.customerId || '',
    invoiceDate: invoice?.invoiceDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    notes: invoice?.notes || '',
  });

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = updated.quantity * updated.unitPrice;
        return updated;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, items, subtotal, tax, total });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-xl">
        <div className="modal-header">
          <h3>{invoice ? 'Edit Invoice' : 'Create New Invoice'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Customer *</label>
              <select 
                required 
                value={formData.customerId} 
                onChange={(e) => setFormData({...formData, customerId: e.target.value})}
              >
                <option value="">Select Customer</option>
                <option value="1">ABC Corporation</option>
                <option value="2">XYZ Enterprises</option>
                <option value="3">PQR Pvt Ltd</option>
              </select>
            </div>
            <div className="form-group">
              <label>Invoice Date *</label>
              <input 
                type="date" 
                value={formData.invoiceDate} 
                onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Due Date *</label>
              <input 
                type="date" 
                value={formData.dueDate} 
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="invoice-items">
            <h4>Invoice Items</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ width: '100px' }}>Quantity</th>
                  <th style={{ width: '120px' }}>Unit Price</th>
                  <th style={{ width: '120px' }}>Total</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input 
                        type="text" 
                        value={item.description} 
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
                        placeholder="Item description" 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.unitPrice} 
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)} 
                      />
                    </td>
                    <td>₹{item.total.toLocaleString()}</td>
                    <td>
                      <button type="button" className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="btn-secondary btn-sm" onClick={addItem}>+ Add Item</button>
          </div>

          <div className="invoice-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Notes / Terms</label>
            <textarea 
              value={formData.notes} 
              onChange={(e) => setFormData({...formData, notes: e.target.value})} 
              rows={3} 
              placeholder="Payment terms, notes, etc." 
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;