import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer_id?: number;
  clientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'failed' | 'draft';
  plan: string;
  clientEmail?: string;
  subtotal?: number;
  tax?: number;
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
  onNewInvoice?: () => void;
  onEditInvoice?: (invoice: Invoice) => void;
  onViewInvoice?: (invoice: Invoice) => void;
  onPdfInvoice?: (invoice: Invoice) => void;
  onRecordPayment?: (invoice: Invoice) => void;
}

const STATUS_FILTERS = [
  { label: 'All Status', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
];

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices: propInvoices,
  onInvoiceUpdate,
  onNewInvoice,
  onEditInvoice,
  onViewInvoice,
  onPdfInvoice,
  onRecordPayment,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(propInvoices || []);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mobile master-detail toggle — show detail panel over the list on small screens
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  // Send Invoice / Mark as Sent
  const [sendingInvoice, setSendingInvoice] = useState(false);
  const [sendBannerMessage, setSendBannerMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!propInvoices) {
      fetchInvoices();
    }
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/invoices");
      const data = response.data.data;
      const formattedInvoices = data.map((inv: any) => ({
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        clientName: inv.customer_name,
        clientEmail: inv.customer_email,
        amount: Number(inv.total),
        date: inv.invoice_date,
        dueDate: inv.due_date,
        status: inv.status?.toLowerCase() as Invoice['status'],
        items: inv.items || [],
        plan: "",
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
    switch (status?.toLowerCase()) {
      case 'paid': return 'text-green-700 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'overdue': return 'text-red-700 bg-red-50 border-red-200';
      case 'failed': return 'text-red-700 bg-red-50 border-red-200';
      case 'draft': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filterStatus === 'all') return true;
    return invoice.status?.toLowerCase() === filterStatus;
  });

  const handleSelectInvoice = async (invoice: Invoice) => {
    setSendBannerMessage(null);
    setShowDetailMobile(true); // on mobile, switch to detail view
    try {
      const res = await fetch(`http://localhost:5000/api/invoices/${invoice.id}`);
      const data = await res.json();
      if (data.success) {
        const mappedItems = (data.data.items || []).map((item: any) => ({
          description: item.item_name || item.description || '—',
          quantity: item.quantity,
          rate: Number(item.rate),
          amount: Number(item.amount),
        }));

        setSelectedInvoice({
          ...invoice,
          id: String(data.data.id ?? invoice.id),
          customer_id: data.data.customer_id,
          invoiceNumber: data.data.invoice_number ?? invoice.invoiceNumber,
          clientName: data.data.customer_name ?? invoice.clientName,
          clientEmail: data.data.customer_email ?? invoice.clientEmail,
          amount: Number(data.data.total) || invoice.amount,
          date: data.data.invoice_date ?? invoice.date,
          dueDate: data.data.due_date ?? invoice.dueDate,
          status: (data.data.status?.toLowerCase() ?? invoice.status) as Invoice['status'],
          items: mappedItems,
          subtotal: Number(data.data.subtotal) || 0,
          tax: Number(data.data.tax) || 0,
        });
      }
    } catch (err) {
      console.error('Failed to fetch full invoice:', err);
      setSelectedInvoice(invoice);
    }
  };

  const handleSendInvoice = async () => {
    if (!selectedInvoice) return;
    setSendingInvoice(true);
    setSendBannerMessage(null);
    try {
      const res = await fetch('http://localhost:5000/api/invoices/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: selectedInvoice.id,
          email: selectedInvoice.clientEmail,
          invNumber: selectedInvoice.invoiceNumber,
        }),
      });
      if (res.ok) {
        const updatedInvoices = invoices.map((inv) =>
          inv.id === selectedInvoice.id ? { ...inv, status: 'pending' as const } : inv
        );
        setInvoices(updatedInvoices);
        setSelectedInvoice({ ...selectedInvoice, status: 'pending' });
        if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
      } else {
        setSendBannerMessage('Failed to send invoice. Please try again.');
      }
    } catch (error) {
      console.error('Send invoice error:', error);
      setSendBannerMessage('Failed to send invoice. Please try again.');
    } finally {
      setSendingInvoice(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">

      {/* Top toolbar */}
      <div className="border-b px-4 sm:px-5 py-3 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">All Invoices</h2>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 sm:flex-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none hover:border-blue-400 focus:border-blue-500 cursor-pointer"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <button
            onClick={onNewInvoice}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shrink-0"
          >
            + New
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 relative overflow-hidden">

        {/* LEFT PANEL — list */}
        <div
          className={`w-full md:w-[32%] lg:w-[28%] border-r overflow-y-auto bg-white absolute md:static inset-0 transition-transform duration-200 ${
            showDetailMobile ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
          }`}
        >
          {filteredInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
              No invoices found
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => handleSelectInvoice(invoice)}
                className={`p-4 border-b cursor-pointer transition-all ${
                  selectedInvoice?.id === invoice.id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
              >
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {invoice.clientName}
                    </h3>
                    <p className="text-sm mt-1">
                      <span className="text-blue-600 font-medium">{invoice.invoiceNumber}</span>
                      <span className="text-gray-400 mx-1">|</span>
                      <span className="text-gray-500">{new Date(invoice.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">
                      ₹{Number(invoice.amount).toFixed(2)}
                    </p>
                    <span className={`inline-flex mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border uppercase ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT PANEL — detail */}
        <div
         className={`w-full md:flex-1 bg-[#f7f7f7] overflow-y-auto absolute md:static inset-0 transition-transform duration-200 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ${
    showDetailMobile ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
  }`}
        >
          {selectedInvoice ? (
            <>
              {/* Action toolbar */}
              <div className="bg-white border-b px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Back button — mobile only */}
                  <button
                    onClick={() => setShowDetailMobile(false)}
                    className="md:hidden p-1.5 -ml-1 text-gray-500 hover:text-gray-800 shrink-0"
                    title="Back to list"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <h2 className="text-lg sm:text-xl font-medium text-gray-700 truncate">
                    {selectedInvoice.invoiceNumber}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onEditInvoice?.(selectedInvoice)}
                    className="border px-3 sm:px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onPdfInvoice?.(selectedInvoice)}
                    className="border px-3 sm:px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => onViewInvoice?.(selectedInvoice)}
                    className="border px-3 sm:px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Print
                  </button>
                  {selectedInvoice.status?.toLowerCase() !== 'paid' && (
                    <button
                      onClick={() => onRecordPayment?.(selectedInvoice)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Record Payment
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white border-b px-4 sm:px-6 overflow-x-auto">
                <div className="flex gap-6 sm:gap-8 w-max min-w-full">
                  <button className="py-3 text-sm border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
                    WHAT'S NEXT
                  </button>
                  <button className="py-3 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap">
                    COMMENTS & HISTORY
                  </button>
                  <button className="py-3 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap">
                    PAYMENTS
                  </button>
                </div>
              </div>

              {/* Send Invoice banner — Draft only */}
              {selectedInvoice.status === 'draft' && (
                <div className="mx-4 sm:mx-6 mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 6l-10 7L2 6" />
                        <path d="M2 6h20v12H2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Send the invoice</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Invoice has been created. You can email it to your customer or mark it as sent.
                      </p>
                      {sendBannerMessage && (
                        <p className="text-xs text-red-600 mt-1">{sendBannerMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={handleSendInvoice}
                      disabled={sendingInvoice}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60"
                    >
                      {sendingInvoice ? 'Sending...' : 'Send Invoice'}
                    </button>
                    <button
                      onClick={handleSendInvoice}
                      disabled={sendingInvoice}
                      className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
                    >
                      Mark as Sent
                    </button>
                  </div>
                </div>
              )}

              {/* Invoice Preview */}
              <div className="p-3 sm:p-6 lg:p-8">
                <div className="relative bg-white border border-gray-200 rounded-sm p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto overflow-hidden">

                  {/* Diagonal status ribbon */}
                  {/* Diagonal status ribbon */}
{['draft', 'paid', 'pending', 'overdue'].includes(selectedInvoice.status?.toLowerCase()) && (
  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden pointer-events-none">
    <div className={`absolute top-[12px] sm:top-[18px] left-[-32px] sm:left-[-38px] w-[130px] sm:w-[160px] -rotate-45 text-white text-[9px] sm:text-[11px] font-semibold tracking-wide text-center py-0.5 sm:py-1 shadow-sm capitalize ${
      selectedInvoice.status?.toLowerCase() === 'paid'
        ? 'bg-green-500'
        : selectedInvoice.status?.toLowerCase() === 'pending'
        ? 'bg-blue-500'
        : selectedInvoice.status?.toLowerCase() === 'overdue'
        ? 'bg-red-500'
        : 'bg-slate-400'
    }`}>
      {selectedInvoice.status}
    </div>
  </div>
)}

                  {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10 pl-8 sm:pl-0">
  <div>
    <h3 className="font-bold text-lg text-gray-800">BusinessOS</h3>
    <p className="text-gray-500 text-sm mt-1">Business Management Software</p>
  </div>
  <div className="text-left sm:text-right">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">INVOICE</h1>
  </div>
</div>

                  <hr className="border-gray-200 mb-8" />

                  {/* Bill To + Invoice Meta */}
                  <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 sm:mb-10">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Bill To</p>
                      <p className="font-bold text-gray-900 text-base">{selectedInvoice.clientName}</p>
                      <p className="text-gray-600 text-sm mt-1">{selectedInvoice.clientEmail}</p>
                    </div>
                    <div className="text-left sm:text-right space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Invoice No</p>
                        <p className="font-bold text-gray-900">{selectedInvoice.invoiceNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Invoice Date</p>
                        <p className="font-bold text-gray-900">
                          {new Date(selectedInvoice.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className="font-bold text-gray-900">
                          {new Date(selectedInvoice.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table — horizontal scroll on small screens */}
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] border border-gray-200 rounded">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">#</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">Item Name</th>
                          <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">Qty</th>
                          <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">Rate</th>
                          <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                          selectedInvoice.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                              <td className="px-4 py-3 text-sm text-gray-800">{item.description}</td>
                              <td className="text-center px-4 py-3 text-sm text-blue-600 font-medium">{item.quantity}</td>
                              <td className="text-center px-4 py-3 text-sm text-gray-700">₹{Number(item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="text-right px-4 py-3 text-sm text-gray-800">₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">No items</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="mt-8 flex justify-end">
                    <div className="w-full sm:w-80 space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{Number(selectedInvoice.amount * 100 / 118).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Tax</span>
                        <span>₹{Number(selectedInvoice.amount - selectedInvoice.amount * 100 / 118).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between font-bold text-lg text-gray-900 pt-1">
                        <span>Total</span>
                        <span>₹{Number(selectedInvoice.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 px-4 text-center">
              Select an Invoice
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;