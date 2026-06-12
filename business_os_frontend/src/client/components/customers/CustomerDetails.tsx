// import React from 'react';

// interface Customer {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   gstNumber?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
//   status: string;
//   totalPurchases: number;
//   createdAt: string;
// }

// interface CustomerDetailsProps {
//   customer: Customer;
//   onClose: () => void;
// }

// const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onClose }) => {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>Customer Details</h3>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
//         <div className="customer-details">
//           <div className="details-section">
//             <h4>Basic Information</h4>
//             <div className="details-grid">
//               <div><strong>Name:</strong> {customer.name}</div>
//               <div><strong>Email:</strong> {customer.email}</div>
//               <div><strong>Phone:</strong> {customer.phone}</div>
//               <div><strong>GST Number:</strong> {customer.gstNumber || 'N/A'}</div>
//               <div><strong>Status:</strong> 
//                 <span className={`status-badge ${customer.status === 'active' ? 'status-active' : 'status-inactive'}`}>
//                   {customer.status}
//                 </span>
//               </div>
//               <div><strong>Customer Since:</strong> {new Date(customer.createdAt).toLocaleDateString()}</div>
//             </div>
//           </div>
//           <div className="details-section">
//             <h4>Address Information</h4>
//             <div className="details-grid">
//               <div><strong>Address:</strong> {customer.address || 'N/A'}</div>
//               <div><strong>City:</strong> {customer.city || 'N/A'}</div>
//               <div><strong>State:</strong> {customer.state || 'N/A'}</div>
//               <div><strong>Pincode:</strong> {customer.pincode || 'N/A'}</div>
//             </div>
//           </div>
//           <div className="details-section">
//             <h4>Purchase History</h4>
//             <div className="details-grid">
//               <div><strong>Total Purchases:</strong> ₹{customer.totalPurchases.toLocaleString()}</div>
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <button className="btn-secondary" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;
import React, { useState } from 'react';
import './CustomerDetails.css';

interface CustomerDetailsProps {
  customer: {
    id: string;
    name: string;
    email: string;
    location: string;
    orders: number | null;
    amountSpent: number;
  };
}

interface Invoice {
  id: string;
  date: string;
  code: string;
  value: number;
  afterTax: number;
  status: 'pending' | 'paid';
  paymentDate?: string;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  // Simulating localized system ERP invoices for this specific client space
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '1', date: '2017-07-07', code: 'ABIS 00001', value: 1380.77, afterTax: 1247.16, status: 'pending' },
    { id: '2', date: '2017-07-07', code: 'ABIS 00002', value: 1380.77, afterTax: 1247.16, status: 'pending' },
    { id: '3', date: '2017-07-07', code: 'ABIS 00003', value: 1380.77, afterTax: 1247.16, status: 'pending' },
    { id: '4', date: '2017-07-07', code: 'ABIS 00004', value: 1380.77, afterTax: 1247.16, status: 'paid', paymentDate: '2017-07-01' },
    { id: '5', date: '2017-07-07', code: 'ABIS 00005', value: 1380.77, afterTax: 1247.16, status: 'paid', paymentDate: '2017-07-01' },
  ]);

  // Handler to toggle simulated actions inside individual lines
  const handleFixPayment = (id: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: 'paid', paymentDate: '2026-06-12' } : inv
    ));
  };

  const handleCancelPayment = (id: string) => {
    if(window.confirm("Revert payment processing timeline status back to pending state?")) {
      setInvoices(invoices.map(inv => 
        inv.id === id ? { ...inv, status: 'pending', paymentDate: undefined } : inv
      ));
    }
  };

  // Computations for KPI cards based on local state items
  const totalInvoiceValue = invoices.reduce((sum, inv) => sum + inv.value, 0);
  const unpaidValue = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.value, 0);
  const invoiceCount = invoices.length;

  return (
    <div className="erp-view-wrapper">
      
      {/* SECTION 1: Summary Banner Metric Block (Image 5) */}
      <div className="erp-profile-card">
        <div className="profile-card-header">
          <h2 className="company-title">{customer.name} {customer.name === 'Yoga' ? 'Yoga' : ''}</h2>
          <div className="header-action-buttons">
            <button className="btn-create-invoice">+ Create an invoice</button>
            <button className="btn-circle-dots">•••</button>
          </div>
        </div>

        {/* Financial KPI Dashboard Cards Grid */}
        <div className="erp-metrics-grid">
          <div className="metric-box">
            <span className="metric-icon">📄</span>
            <div className="metric-info">
              <span className="metric-number">{invoiceCount}</span>
              <span className="metric-label">Invoices</span>
            </div>
          </div>
          <div className="metric-box">
            <span className="metric-icon">❓</span>
            <div className="metric-info">
              <span className="metric-number">{unpaidValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              <span className="metric-label">Unpaid</span>
            </div>
          </div>
          <div className="metric-box">
            <span className="metric-icon">💵</span>
            <div className="metric-info">
              <span className="metric-number">{totalInvoiceValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              <span className="metric-label">Invoice value</span>
            </div>
          </div>
        </div>

        {/* Detailed Tenant Business Metadata Panel */}
        <div className="metadata-details-panel">
          <div className="meta-column">
            <div className="meta-field">
              <span className="meta-label">Company name</span>
              <span className="meta-value">{customer.name} Group Corp</span>
            </div>
            <div className="meta-field">
              <span className="meta-label">Company code</span>
              <span className="meta-value">10231{customer.id}</span>
            </div>
            <div className="meta-field">
              <span className="meta-label">Phone number</span>
              <span className="meta-value">+37062134856</span>
            </div>
          </div>
          <div className="meta-column">
            <div className="meta-field">
              <span className="meta-label">Address</span>
              <span className="meta-value">{customer.location || 'Tomu g. 15'}</span>
            </div>
            <div className="meta-field">
              <span className="meta-label">VAT code</span>
              <span className="meta-value">91249812359</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Filterable Invoice History Feed Segment (Image 6) */}
      <div className="invoice-history-section">
        <div className="history-header-row">
          <h3>Invoice History</h3>
          <div className="history-filters">
            <select className="dropdown-select"><option>All</option></select>
            <select className="dropdown-select"><option>2017 y.</option></select>
            <select className="dropdown-select"><option>Whole period</option></select>
          </div>
        </div>

        {/* Clean Line Feed List Structure */}
        <div className="invoice-feed-container">
          {invoices.map((inv) => (
            <div className="invoice-feed-row" key={inv.id}>
              <div className="feed-left-block">
                <button className="btn-pdf-download" onClick={() => alert(`Downloading PDF structure file data stream for ${inv.code}...`)}>
                  PDF ⬇
                </button>
                <div className="invoice-code-block">
                  <span className="invoice-date">{inv.date}</span>
                  <span className="invoice-code">{inv.code}</span>
                </div>
              </div>

              <div className="feed-metrics-block">
                <div className="feed-amount-item">
                  <span className="amount-val">{inv.value.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  <span className="amount-lbl">Invoice value</span>
                </div>
                <div className="feed-amount-item">
                  <span className="amount-val">{inv.afterTax.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  <span className="amount-lbl">After tax</span>
                </div>
              </div>

              <div className="feed-actions-block">
                {inv.status === 'pending' ? (
                  <>
                    <button className="btn-fix-payment" onClick={() => handleFixPayment(inv.id)}>
                      + Fix payment
                    </button>
                    <button className="btn-circle-dots-sm">•••</button>
                  </>
                ) : (
                  <>
                    <div className="badge-paid-timeline">
                      ✓ {inv.paymentDate}
                    </div>
                    <button className="btn-revert-cross" onClick={() => handleCancelPayment(inv.id)}>
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CustomerDetails;