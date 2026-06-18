import React, { useState, useEffect } from 'react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'failed';
  plan: string;
  clientEmail?: string;
  items?: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
}

interface InvoiceListProps {
  invoices?: Invoice[];
  onInvoiceUpdate?: (invoices: Invoice[]) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ 
  invoices: propInvoices, 
  onInvoiceUpdate 
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(propInvoices || []);
  const [searchTerm, setSearchTerm] = useState('');
  // const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Simulate API fetch
  useEffect(() => {
    if (!propInvoices) {
      fetchInvoices();
    }
  }, []);

  const fetchInvoices = async () => {
    // setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          invoiceNumber: '#011',
          clientName: 'Tech Solutions Inc.',
          clientEmail: 'tech@example.com',
          amount: 25.00,
          date: '2026-06-25',
          dueDate: '2026-07-25',
          status: 'paid',
          plan: 'Basic',
          items: [
            { description: 'Monthly Subscription', quantity: 1, rate: 25, amount: 25 }
          ]
        },
        {
          id: '2',
          invoiceNumber: '#010',
          clientName: 'Design Studio LLC',
          clientEmail: 'design@example.com',
          amount: 35.00,
          date: '2026-05-25',
          dueDate: '2026-06-25',
          status: 'paid',
          plan: 'Pro',
          items: [
            { description: 'Pro Plan - Monthly', quantity: 1, rate: 35, amount: 35 }
          ]
        },
        {
          id: '3',
          invoiceNumber: '#009',
          clientName: 'Marketing Agency',
          clientEmail: 'marketing@example.com',
          amount: 40.00,
          date: '2026-04-25',
          dueDate: '2026-05-25',
          status: 'failed',
          plan: 'Premium',
          items: [
            { description: 'Premium Plan', quantity: 1, rate: 40, amount: 40 }
          ]
        },
        {
          id: '4',
          invoiceNumber: '#008',
          clientName: 'Consulting Group',
          clientEmail: 'consulting@example.com',
          amount: 30.00,
          date: '2026-03-25',
          dueDate: '2026-04-25',
          status: 'overdue',
          plan: 'Pro',
          items: [
            { description: 'Pro Plan - Quarterly', quantity: 1, rate: 30, amount: 30 }
          ]
        },
        {
          id: '5',
          invoiceNumber: '#007',
          clientName: 'Startup Labs',
          clientEmail: 'startup@example.com',
          amount: 20.00,
          date: '2026-02-25',
          dueDate: '2026-03-25',
          status: 'pending',
          plan: 'Basic',
          items: [
            { description: 'Basic Plan', quantity: 1, rate: 20, amount: 20 }
          ]
        },
      ];
      setInvoices(mockInvoices);
      if (onInvoiceUpdate) onInvoiceUpdate(mockInvoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      // setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'overdue':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case 'paid':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'overdue':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredInvoices = invoices.filter((invoice: Invoice) => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter((inv: Invoice) => inv.status === 'paid').length;
  const pendingAmount = invoices
    .filter((inv: Invoice) => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);

  const handleDelete = async (id: string) => {
    try {
      // Simulate API delete
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedInvoices = invoices.filter(inv => inv.id !== id);
      setInvoices(updatedInvoices);
      if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Invoice['status']) => {
    try {
      const updatedInvoices = invoices.map(inv => 
        inv.id === id ? { ...inv, status: newStatus } : inv
      );
      setInvoices(updatedInvoices);
      if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs text-green-600 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-medium">Paid Invoices</p>
          <p className="text-2xl font-bold text-gray-800">{paidInvoices}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-xs text-yellow-600 font-medium">Pending Amount</p>
          <p className="text-2xl font-bold text-gray-800">${pendingAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Invoice
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice: Invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {invoice.clientName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {invoice.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={invoice.status}
                      onChange={(e) => handleStatusChange(invoice.id, e.target.value as Invoice['status'])}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowViewModal(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Invoice</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete invoice {selectedInvoice.invoiceNumber} for {selectedInvoice.clientName}?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedInvoice.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Invoice Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice Number</p>
                  <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{selectedInvoice.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">{selectedInvoice.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{new Date(selectedInvoice.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p>{new Date(selectedInvoice.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-blue-600">${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              
              {selectedInvoice.items && selectedInvoice.items.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Items</p>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Rate</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2">{item.description}</td>
                          <td className="px-3 py-2">{item.quantity}</td>
                          <td className="px-3 py-2">${item.rate.toFixed(2)}</td>
                          <td className="px-3 py-2 font-medium">${item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;