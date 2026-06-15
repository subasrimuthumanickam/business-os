import React, { useState, useEffect } from 'react';
import './billing.css';

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface Invoice {
  id: number;
  date: string;
  invoiceNo: string;
  amount: number;
  status: string;
}

interface PlanData {
  name: string;
  price: number;
  features: string[];
}

const BillingSettings: React.FC = () => {
  const [plan, setPlan] = useState<PlanData>({ name: '', price: 0, features: [] });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoiceLimit, setInvoiceLimit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const [planRes, paymentRes, invoiceRes] = await Promise.all([
        fetch('/api/billing/plan', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        fetch('/api/billing/payment-methods', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        fetch('/api/billing/invoices', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      ]);
      
      if (planRes.ok) setPlan(await planRes.json());
      if (paymentRes.ok) setPaymentMethods(await paymentRes.json());
      if (invoiceRes.ok) setInvoices(await invoiceRes.json());
      else setMockData();
    } catch (error) {
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    setPlan({ name: 'Professional', price: 149, features: ['25 users', 'All features included', 'Priority support'] });
    setPaymentMethods([
      { id: 1, type: 'Visa', last4: '1234', expiry: '12/2026', isDefault: true },
      { id: 2, type: 'Mastercard', last4: '5678', expiry: '08/2025', isDefault: false }
    ]);
    setInvoices([
      { id: 1, date: '01/06/2024', invoiceNo: 'INV-001', amount: 149, status: 'Paid' },
      { id: 2, date: '01/05/2024', invoiceNo: 'INV-002', amount: 149, status: 'Paid' },
      { id: 3, date: '01/04/2024', invoiceNo: 'INV-003', amount: 149, status: 'Paid' },
      { id: 4, date: '01/03/2024', invoiceNo: 'INV-004', amount: 149, status: 'Paid' },
      { id: 5, date: '01/02/2024', invoiceNo: 'INV-005', amount: 149, status: 'Paid' },
      { id: 6, date: '01/01/2024', invoiceNo: 'INV-006', amount: 149, status: 'Paid' }
    ]);
  };

  const handleUpgrade = () => {
    alert('Redirecting to upgrade plan page');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      alert('Subscription cancelled successfully');
    }
  };

  const handleAddPayment = () => {
    const newId = paymentMethods.length + 1;
    setPaymentMethods([...paymentMethods, { 
      id: newId, type: 'New Card', last4: '0000', expiry: '12/2028', isDefault: false 
    }]);
    alert('New payment method added');
  };

  const handleEditPayment = (id: number) => {
    alert(`Edit payment method ${id}`);
  };

  const handleRemovePayment = (id: number) => {
    if (window.confirm('Remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter(p => p.id !== id));
      alert('Payment method removed');
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(paymentMethods.map(p => ({ ...p, isDefault: p.id === id })));
    alert('Default payment method updated');
  };

  const handleDownloadInvoice = (invoiceNo: string) => {
    alert(`Downloading invoice ${invoiceNo}`);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setInvoiceLimit(invoiceLimit + 3);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) return <div className="text-center py-8 text-gray-700">Loading...</div>;

  return (
    <div className="billing-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Billing & Subscription</h2>
      <p className="text-sm text-gray-600 mb-6">Manage your subscription and payment methods</p>
      
      <div className="billing-card">
        <div className="plan-info">
          <h3>Current Plan: {plan.name}</h3>
          <p className="plan-price">${plan.price} <span>/ month</span></p>
          <p className="text-sm opacity-90 mt-1">{plan.features.join(' • ')}</p>
        </div>
        <div className="plan-actions">
          <button className="btn-upgrade" onClick={handleUpgrade}>Upgrade Plan</button>
          <button className="btn-cancel-plan" onClick={handleCancel}>Cancel Plan</button>
        </div>
      </div>

      <div className="payment-methods">
        <h3>Payment Methods</h3>
        {paymentMethods.map(method => (
          <div key={method.id} className="payment-card">
            <div className="payment-info">
              <span className="payment-icon">💳</span>
              <span className="payment-details">{method.type} ending in {method.last4}</span>
              <span className="payment-expiry">Expires {method.expiry}</span>
              {method.isDefault && <span className="payment-default">Default</span>}
            </div>
            <div className="payment-actions">
              {!method.isDefault && (
                <button className="btn-set-default" onClick={() => handleSetDefault(method.id)}>Set Default</button>
              )}
              <button className="btn-payment-edit" onClick={() => handleEditPayment(method.id)}>Edit</button>
              <button className="btn-payment-delete" onClick={() => handleRemovePayment(method.id)}>Remove</button>
            </div>
          </div>
        ))}
        <button className="btn-add-payment" onClick={handleAddPayment}>+ Add Payment Method</button>
      </div>

      <div className="billing-history">
        <h3>Billing History</h3>
        <div className="overflow-x-auto">
          <table className="billing-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice #</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, invoiceLimit).map(invoice => (
                <tr key={invoice.id}>
                  <td className="text-gray-800 font-medium">{invoice.date}</td>
                  <td className="text-gray-800 font-medium">{invoice.invoiceNo}</td>
                  <td className="text-gray-800 font-semibold">${invoice.amount}</td>
                  <td>
                    <span className="status-paid">{invoice.status}</span>
                  </td>
                  <td>
                    <button className="btn-download" onClick={() => handleDownloadInvoice(invoice.invoiceNo)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoiceLimit < invoices.length && (
          <div className="load-more-container">
            <button className="btn-load-more" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSettings;