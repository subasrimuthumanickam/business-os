import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  // const [showViewModal, setShowViewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  

  // Simulate API fetch
  useEffect(() => {
    if (!propInvoices) {
      fetchInvoices();
    }
  }, []);

const fetchInvoices = async () => {

  try {

    const response = await axios.get(
  "http://localhost:5000/api/invoices"
);

    const data = response.data.data;

    // const formattedInvoices = data.map((inv: any) => ({
    //   id: inv.id,
    //   invoiceNumber: inv.invoice_number,
    //   clientName: inv.customer_name,
    //   clientEmail: inv.customer_email,
    //   amount: inv.total,
    //   date: inv.invoice_date,
    //   dueDate: inv.due_date,
    //   status: inv.status,
    //   items: inv.items || [],
    //   plan: ""
    // }));
    const formattedInvoices = data.map((inv: any) => ({
  id: inv.id,
  invoiceNumber: inv.invoice_number,
  clientName: inv.customer_name,
  clientEmail: inv.customer_email,
  amount: Number(inv.total), // Change here
  date: inv.invoice_date,
  dueDate: inv.due_date,
  status: inv.status,
  items: inv.items || [],
  plan: ""
}));
    setInvoices(formattedInvoices);

    if (formattedInvoices.length > 0) {
      setSelectedInvoice(formattedInvoices[0]);
    }

  } catch (error) {

    console.log(error);

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

      <div className="flex h-[80vh] border rounded-xl overflow-hidden bg-white">

  {/* LEFT SIDE */}

  <div className="w-[32%] border-r overflow-y-auto">

    {filteredInvoices.map((invoice) => (

      <div
        key={invoice.id}
        onClick={() => setSelectedInvoice(invoice)}
        className={`p-4 border-b cursor-pointer transition-all
        ${
          selectedInvoice?.id === invoice.id
            ? "bg-blue-50 border-l-4 border-blue-600"
            : "hover:bg-gray-50"
        }`}
      >

        <div className="flex justify-between items-start">

          <div>

            <h3 className="font-semibold text-gray-800">
              {invoice.clientName}
            </h3>

            <p className="text-blue-600 text-sm mt-1">
              {invoice.invoiceNumber}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(invoice.date).toLocaleDateString()}
            </p>

          </div>

          <div className="text-right">

            <h4 className="font-semibold">
              ${Number(invoice.amount).toFixed(2)}
            </h4>

            <span
              className={`inline-flex mt-2 px-2 py-1 rounded-full text-xs border ${getStatusColor(
                invoice.status
              )}`}
            >
              {invoice.status.toUpperCase()}
            </span>

          </div>

        </div>

      </div>

    ))}

  </div>



  {/* RIGHT SIDE */}

  <div className="flex-1 overflow-y-auto bg-gray-100 p-8">

    {selectedInvoice ? (

      <div className="bg-white shadow rounded-lg p-10 max-w-4xl mx-auto">

        {/* Header */}

        <div className="flex justify-between mb-10">

          <div>
            <h1 className="text-5xl font-light text-red-600">
              INVOICE
            </h1>

            <p className="text-gray-500 mt-2">
              {selectedInvoice.invoiceNumber}
            </p>
          </div>

          <div className="text-right">

            <h3 className="font-bold text-xl">
              {selectedInvoice.clientName}
            </h3>

            <p className="text-gray-600">
              {selectedInvoice.clientEmail}
            </p>

          </div>

        </div>


        {/* Dates */}

        <div className="grid grid-cols-3 gap-10 mb-10">

          <div>
            <p className="text-gray-500 text-sm">
              Invoice Date
            </p>

            <h4 className="font-semibold mt-2">
              {new Date(
                selectedInvoice.date
              ).toLocaleDateString()}
            </h4>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Due Date
            </p>

            <h4 className="font-semibold mt-2">
              {new Date(
                selectedInvoice.dueDate
              ).toLocaleDateString()}
            </h4>
          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Balance Due
            </p>

            <h2 className="text-3xl text-red-600 font-bold mt-2">
              ${Number(selectedInvoice.amount).toFixed(2)}
            </h2>

          </div>

        </div>



        {/* Items Table */}

        <table className="w-full border">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-4 py-3">
                Description
              </th>

              <th className="px-4 py-3">
                Qty
              </th>

              <th className="px-4 py-3">
                Rate
              </th>

              <th className="px-4 py-3 text-right">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {selectedInvoice.items?.map((item, index) => (

              <tr key={index} className="border-t">

                <td className="px-4 py-4">
                  {item.description}
                </td>

                <td className="text-center">
                  {item.quantity}
                </td>

                <td className="text-center">
                    ${Number(item.amount).toFixed(2)}

                </td>

                <td className="text-right px-4">
                    ${Number(item.amount).toFixed(2)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {/* Total */}

        <div className="mt-10 flex justify-end">

          <div className="w-72">

            <div className="flex justify-between py-3 border-t">

              <span className="font-semibold">
                Total
              </span>

              <span className="font-bold text-xl">
                ${Number(selectedInvoice.amount).toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

    ) : (

      <div className="flex justify-center items-center h-full text-gray-500">
        Select an Invoice
      </div>

    )}

  </div>

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

      
    </div>
  );
};

export default InvoiceList;