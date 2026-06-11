import React, { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm';

interface Invoice {
  id: string;
  number: string;
  customerName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setInvoices([
        { id: '1', number: 'INV-001', customerName: 'ABC Corp', date: '2024-01-15', dueDate: '2024-02-15', amount: 25000, status: 'paid' },
        { id: '2', number: 'INV-002', customerName: 'XYZ Ltd', date: '2024-02-10', dueDate: '2024-03-10', amount: 15000, status: 'pending' },
        { id: '3', number: 'INV-003', customerName: 'PQR Pvt Ltd', date: '2024-01-05', dueDate: '2024-02-05', amount: 35000, status: 'overdue' },
        { id: '4', number: 'INV-004', customerName: 'LMN Corp', date: '2024-02-20', dueDate: '2024-03-20', amount: 5000, status: 'draft' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return { bg: '#d1fae5', color: '#065f46' };
      case 'pending': return { bg: '#fed7aa', color: '#92400e' };
      case 'overdue': return { bg: '#fee2e2', color: '#991b1b' };
      case 'draft': return { bg: '#f3f4f6', color: '#374151' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const filteredInvoices = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);

  // Table styles
  const tableStyles = {
    container: { overflowX: 'auto' as const },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: { 
      padding: '14px 16px', 
      textAlign: 'left' as const, 
      borderBottom: '2px solid #e5e7eb', 
      background: '#f8fafc', 
      fontWeight: 600, 
      color: '#1e293b',
      fontSize: '13px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    td: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb' },
  };

  if (loading) return <div className="loading">Loading invoices...</div>;

  return (
    <div className="billing-list">
      <div className="list-header">
        <h2 style={{ color: '#1e293b' }}>Invoices</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Create Invoice</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'paid', 'pending', 'overdue', 'draft'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              background: filter === status ? '#4f46e5' : '#f1f5f9',
              color: filter === status ? 'white' : '#475569',
              transition: 'all 0.3s'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Total Invoices</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{invoices.length}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Total Amount</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>₹{invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Paid</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>₹{invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Pending + Overdue</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>₹{invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Invoice Table */}
      <div style={tableStyles.container}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>INVOICE #</th>
              <th style={tableStyles.th}>CUSTOMER</th>
              <th style={tableStyles.th}>DATE</th>
              <th style={tableStyles.th}>DUE DATE</th>
              <th style={tableStyles.th}>AMOUNT</th>
              <th style={tableStyles.th}>STATUS</th>
              <th style={tableStyles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(invoice => {
              const statusColor = getStatusColor(invoice.status);
              return (
                <tr key={invoice.id}>
                  <td style={{ ...tableStyles.td, color: '#1e293b', fontWeight: 500 }}>{invoice.number}</td>
                  <td style={{ ...tableStyles.td, color: '#475569' }}>{invoice.customerName}</td>
                  <td style={{ ...tableStyles.td, color: '#64748b' }}>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td style={{ ...tableStyles.td, color: invoice.status === 'overdue' ? '#ef4444' : '#64748b', fontWeight: invoice.status === 'overdue' ? 500 : 'normal' }}>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td style={{ ...tableStyles.td, color: '#4f46e5', fontWeight: 600 }}>₹{invoice.amount.toLocaleString()}</td>
                  <td style={tableStyles.td}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: statusColor.bg,
                      color: statusColor.color
                    }}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    <button style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', marginRight: '8px', fontSize: '12px' }}>View</button>
                    <button style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', marginRight: '8px', fontSize: '12px' }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>PDF</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && <InvoiceForm onClose={() => setShowModal(false)} onSave={() => {}} />}
    </div>
  );
};

export default InvoiceList;