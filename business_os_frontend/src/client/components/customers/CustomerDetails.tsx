 import React from 'react';

interface CustomerDetailsProps {
  customer: any;
  onClose: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
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
              <div><strong>Status:</strong> <span className={`status-badge ${customer.status}`}>{customer.status}</span></div>
              <div><strong>Customer Since:</strong> {new Date(customer.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="details-section">
            <h4>Address</h4>
            <p>{customer.address || 'No address provided'}</p>
          </div>
          <div className="details-section">
            <h4>Purchase History</h4>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-label">Total Purchases</div>
                <div className="stat-value">₹{customer.totalPurchases?.toLocaleString() || 0}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Total Invoices</div>
                <div className="stat-value">{customer.invoiceCount || 0}</div>
              </div>
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
