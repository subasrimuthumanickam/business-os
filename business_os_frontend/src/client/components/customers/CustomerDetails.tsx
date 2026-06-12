import React from 'react';

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
  status: string;
  totalPurchases: number;
  createdAt: string;
}

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Customer Details</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="customer-details">
          <div className="details-section">
            <h4>Basic Information</h4>
            <div className="details-grid">
              <div><strong>Name:</strong> {customer.name}</div>
              <div><strong>Email:</strong> {customer.email}</div>
              <div><strong>Phone:</strong> {customer.phone}</div>
              <div><strong>GST Number:</strong> {customer.gstNumber || 'N/A'}</div>
              <div><strong>Status:</strong> 
                <span className={`status-badge ${customer.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                  {customer.status}
                </span>
              </div>
              <div><strong>Customer Since:</strong> {new Date(customer.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="details-section">
            <h4>Address Information</h4>
            <div className="details-grid">
              <div><strong>Address:</strong> {customer.address || 'N/A'}</div>
              <div><strong>City:</strong> {customer.city || 'N/A'}</div>
              <div><strong>State:</strong> {customer.state || 'N/A'}</div>
              <div><strong>Pincode:</strong> {customer.pincode || 'N/A'}</div>
            </div>
          </div>
          <div className="details-section">
            <h4>Purchase History</h4>
            <div className="details-grid">
              <div><strong>Total Purchases:</strong> ₹{customer.totalPurchases.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;