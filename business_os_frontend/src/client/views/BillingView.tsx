import React, { useState } from 'react';
import InvoiceList from '../components/billing/InvoiceList';
import PaymentList from '../components/billing/PaymentList';
import ExpenseList from '../components/billing/ExpenseList';
import InvoiceForm from '../components/billing/InvoiceForm';

type BillingTab = 'invoices' | 'payments' | 'expenses' | 'create-invoice';

interface BillingStats {
  totalRevenue: number;
  paidInvoices: number;
  pendingAmount: number;
  totalInvoices: number;
}

const BillingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BillingTab>('invoices');
  const [stats, setStats] = useState<BillingStats>({
    totalRevenue: 0,
    paidInvoices: 0,
    pendingAmount: 0,
    totalInvoices: 0
  });

  const tabs: { id: BillingTab; label: string; icon: string }[] = [
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'expenses', label: 'Expenses', icon: '📊' },
    { id: 'create-invoice', label: 'Create Invoice', icon: '➕' },
  ];

  const handleInvoiceUpdate = (invoices: any[]) => {
    const totalRevenue = invoices.reduce((sum: number, inv: any) => sum + inv.amount, 0);
    const paidInvoices = invoices.filter((inv: any) => inv.status === 'paid').length;
    const pendingAmount = invoices
      .filter((inv: any) => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((sum: number, inv: any) => sum + inv.amount, 0);
    
    setStats({
      totalRevenue,
      paidInvoices,
      pendingAmount,
      totalInvoices: invoices.length
    });
  };

  const handleInvoiceSubmit = (data: any) => {
    console.log('Invoice submitted:', data);
    setActiveTab('invoices');
    // Here you would typically make an API call to save the invoice
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Billing Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage invoices, payments, and expenses efficiently
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">💰</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid Invoices</p>
              <p className="text-2xl font-bold text-gray-800">{stats.paidInvoices}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">✅</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Amount</p>
              <p className="text-2xl font-bold text-yellow-600">${stats.pendingAmount.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-lg">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalInvoices}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-lg">📋</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex -mb-px">
            {tabs.map((tab: { id: BillingTab; label: string; icon: string }) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'invoices' && (
            <InvoiceList onInvoiceUpdate={handleInvoiceUpdate} />
          )}
          {activeTab === 'payments' && <PaymentList />}
          {activeTab === 'expenses' && <ExpenseList />}
          {activeTab === 'create-invoice' && (
            <InvoiceForm 
              onSubmit={handleInvoiceSubmit}
              onCancel={() => setActiveTab('invoices')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingView;