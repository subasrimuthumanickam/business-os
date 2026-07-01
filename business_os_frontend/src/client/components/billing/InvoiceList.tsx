// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Invoice {
//   id: string;
//   invoiceNumber: string;
//   clientName: string;
//   amount: number;
//   date: string;
//   dueDate: string;
//   status: 'paid' | 'pending' | 'overdue' | 'failed' | 'draft';
//   plan: string;
//   clientEmail?: string;
//   items?: Array<{
//     description: string;
//     quantity: number;
//     rate: number;
//     amount: number;
//   }>;
// }

// interface InvoiceListProps {
//   invoices?: Invoice[];
//   onInvoiceUpdate?: (invoices: Invoice[]) => void;
//   // NEW — lets the parent (BillingView) switch to the CreateInvoice form
//   // when "+ New" is clicked, same way ItemDetailPane's onBack pattern
//   // hands control back up to its parent.
//   onNewInvoice?: () => void;
// }

// const InvoiceList: React.FC<InvoiceListProps> = ({
//   invoices: propInvoices,
//   onInvoiceUpdate,
//   onNewInvoice,
// }) => {
//   const [invoices, setInvoices] = useState<Invoice[]>(propInvoices || []);
//   // const [loading, setLoading] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // const [showViewModal, setShowViewModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState<string>('all');

//   // Send Invoice / Mark as Sent — both hit the same backend endpoint
//   // already used in CustomerDetails.tsx (handleSendInvoice).
//   const [sendingInvoice, setSendingInvoice] = useState(false);
//   const [sendBannerMessage, setSendBannerMessage] = useState<string | null>(null);

//   // Simulate API fetch
//   useEffect(() => {
//     if (!propInvoices) {
//       fetchInvoices();
//     }
//   }, []);

// const fetchInvoices = async () => {

//   try {

//     const response = await axios.get(
//   "http://localhost:5000/api/invoices"
// );

//     const data = response.data.data;

//     const formattedInvoices = data.map((inv: any) => ({
//   id: inv.id,
//   invoiceNumber: inv.invoice_number,
//   clientName: inv.customer_name,
//   clientEmail: inv.customer_email,
//   amount: Number(inv.total), // Change here
//   date: inv.invoice_date,
//   dueDate: inv.due_date,
//   status: inv.status,
//   items: inv.items || [],
//   plan: ""
// }));
//     setInvoices(formattedInvoices);

//     if (formattedInvoices.length > 0) {
//       setSelectedInvoice(formattedInvoices[0]);
//     }

//   } catch (error) {

//     console.log(error);

//   }

// };
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'paid':
//         return 'text-green-700 bg-green-50 border-green-200';
//       case 'pending':
//         return 'text-yellow-700 bg-yellow-50 border-yellow-200';
//       case 'overdue':
//         return 'text-red-700 bg-red-50 border-red-200';
//       case 'failed':
//         return 'text-red-700 bg-red-50 border-red-200';
//       case 'draft':
//         return 'text-gray-600 bg-gray-100 border-gray-200';
//       default:
//         return 'text-gray-700 bg-gray-50 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string): React.ReactNode => {
//     switch (status) {
//       case 'paid':
//         return (
//           <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
//             <polyline points="20 6 9 17 4 12" />
//           </svg>
//         );
//       case 'pending':
//         return (
//           <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="12" cy="12" r="10" />
//             <polyline points="12 6 12 12 16 14" />
//           </svg>
//         );
//       case 'overdue':
//         return (
//           <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="12" cy="12" r="10" />
//             <line x1="12" y1="8" x2="12" y2="12" />
//             <line x1="12" y1="16" x2="12.01" y2="16" />
//           </svg>
//         );
//       case 'failed':
//         return (
//           <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="12" cy="12" r="10" />
//             <line x1="15" y1="9" x2="9" y2="15" />
//             <line x1="9" y1="9" x2="15" y2="15" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const filteredInvoices = invoices.filter((invoice: Invoice) => {
//     const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
//     return matchesStatus;
//   });

//   const totalRevenue = invoices.reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);
//   const paidInvoices = invoices.filter((inv: Invoice) => inv.status === 'paid').length;
//   const pendingAmount = invoices
//     .filter((inv: Invoice) => inv.status === 'pending' || inv.status === 'overdue')
//     .reduce((sum: number, inv: Invoice) => sum + inv.amount, 0);

//   const handleDelete = async (id: string) => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       const updatedInvoices = invoices.filter(inv => inv.id !== id);
//       setInvoices(updatedInvoices);
//       if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error('Error deleting invoice:', error);
//     }
//   };

//   const handleStatusChange = async (id: string, newStatus: Invoice['status']) => {
//     try {
//       const updatedInvoices = invoices.map(inv => 
//         inv.id === id ? { ...inv, status: newStatus } : inv
//       );
//       setInvoices(updatedInvoices);
//       if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
//     } catch (error) {
//       console.error('Error updating invoice status:', error);
//     }
//   };

//   // Shared by both "Send Invoice" and "Mark as Sent" — same backend route
//   // as CustomerDetails.tsx's handleSendInvoice. After a successful send,
//   // optimistically bump the invoice out of "draft" into "pending" so the
//   // banner disappears without needing a full refetch.
//   const handleSendInvoice = async () => {
//     if (!selectedInvoice) return;

//     setSendingInvoice(true);
//     setSendBannerMessage(null);

//     try {
//       const res = await fetch('http://localhost:5000/api/invoices/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           invoiceId: selectedInvoice.id,
//           email: selectedInvoice.clientEmail,
//           invNumber: selectedInvoice.invoiceNumber,
//         }),
//       });

//       if (res.ok) {
//         const updatedInvoices = invoices.map((inv) =>
//           inv.id === selectedInvoice.id ? { ...inv, status: 'pending' as const } : inv
//         );
//         setInvoices(updatedInvoices);
//         setSelectedInvoice({ ...selectedInvoice, status: 'pending' });
//         if (onInvoiceUpdate) onInvoiceUpdate(updatedInvoices);
//       } else {
//         setSendBannerMessage('Failed to send invoice. Please try again.');
//       }
//     } catch (error) {
//       console.error('Send invoice error:', error);
//       setSendBannerMessage('Failed to send invoice. Please try again.');
//     } finally {
//       setSendingInvoice(false);
//     }
//   };

//   return (
//   <div className="h-screen bg-white flex flex-col">

//     {/* Top toolbar — "All Invoices" label + Status filter + "+ New" button, all one row (Zoho-style) */}
//     <div className="border-b px-5 py-3 bg-white flex items-center justify-between">
//       <h2 className="text-lg font-semibold text-gray-800">All Invoices</h2>
//       <div className="flex items-center gap-2">
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="border rounded-md px-3 py-2 text-sm outline-none"
//         >
//           <option value="all">All Status</option>
//           <option value="paid">Paid</option>
//           <option value="pending">Pending</option>
//           <option value="overdue">Overdue</option>
//           <option value="failed">Failed</option>
//           <option value="draft">Draft</option>
//         </select>
//         <button
//           onClick={onNewInvoice}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm "
//         >
//           + New
//         </button>
//       </div>
//     </div>


//     <div className="flex flex-1 min-h-0">

//       {/* LEFT PANEL */}

//       <div className="w-[28%] border-r overflow-y-auto bg-white">

//         {filteredInvoices.map((invoice) => (

//           <div
//             key={invoice.id}
//             onClick={() => {
//               setSelectedInvoice(invoice);
//               setSendBannerMessage(null);
//             }}
//             className={`p-4 border-b cursor-pointer transition-all
//             ${
//               selectedInvoice?.id === invoice.id
//                 ? "bg-gray-100 border-l-4 border-blue-500"
//                 : "hover:bg-gray-50"
//             }`}
//           >

//             <div className="flex justify-between items-start">

//   <div className="flex gap-3">

//     <input
//       type="checkbox"
//       className="mt-1 h-4 w-4"
//     />

//     <div>
//       <h3 className="font-medium text-gray-800">
//         {invoice.clientName}
//       </h3>

//       <p className="text-sm text-blue-600 mt-1">
//         {invoice.invoiceNumber}
//       </p>

//       <p className="text-xs text-gray-500">
//         {new Date(invoice.date).toLocaleDateString()}
//       </p>
//     </div>

//   </div>

//   <div className="text-right">
//     <p className="font-semibold">
//       ₹{Number(invoice.amount).toFixed(2)}
//     </p>

//     <span
//       className={`inline-flex mt-2 px-2 py-1 rounded-full text-xs border ${getStatusColor(
//         invoice.status
//       )}`}
//     >
//       {invoice.status.toUpperCase()}
//     </span>
//   </div>

// </div>
//           </div>
//         ))}
//       </div>
//       {/* RIGHT PANEL */}
//       <div className="flex-1 bg-[#f7f7f7] overflow-y-auto">
//         {selectedInvoice ? (
//           <>
//             {/* Toolbar */}
//             <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
//               <h2 className="text-xl font-medium text-gray-700">
//                 {selectedInvoice.invoiceNumber}
//               </h2>
//               <div className="flex gap-2 flex-wrap">
//                 <button className="border px-3 py-2 rounded text-sm hover:bg-gray-50">
//                   Edit
//                 </button>
//                 <button className="border px-3 py-2 rounded text-sm hover:bg-gray-50">
//                   PDF
//                 </button>
//                 <button className="border px-3 py-2 rounded text-sm hover:bg-gray-50">
//                   Print
//                 </button>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
//                   Record Payment
//                 </button>
//               </div>
//             </div>
//             {/* Tabs */}
//             <div className="bg-white border-b px-6">
//               <div className="flex gap-8">
//                 <button className="py-3 text-sm border-b-2 border-blue-600 text-blue-600 font-medium">
//                   WHAT'S NEXT
//                 </button>
//                 <button className="py-3 text-sm text-gray-500">
//                   COMMENTS & HISTORY
//                 </button>
//                 <button className="py-3 text-sm text-gray-500">
//                   PAYMENTS
//                 </button>
//               </div>
//             </div>

//             {/* Send Invoice banner — Draft invoices only, Zoho-style */}
//             {selectedInvoice.status === 'draft' && (
//               <div className="mx-6 mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between gap-4">
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
//                     <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M22 6l-10 7L2 6" />
//                       <path d="M2 6h20v12H2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">Send the invoice</p>
//                     <p className="text-xs text-gray-500 mt-0.5">
//                       Invoice has been created. You can email it to your customer or mark it as sent.
//                     </p>
//                     {sendBannerMessage && (
//                       <p className="text-xs text-red-600 mt-1">{sendBannerMessage}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex gap-2 shrink-0">
//                   <button
//                     onClick={handleSendInvoice}
//                     disabled={sendingInvoice}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
//                   >
//                     {sendingInvoice ? 'Sending...' : 'Send Invoice'}
//                   </button>
//                   <button
//                     onClick={handleSendInvoice}
//                     disabled={sendingInvoice}
//                     className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
//                   >
//                     Mark as Sent
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Invoice Preview */}
//             <div className="p-8">
//               <div className="relative bg-white border shadow-sm p-12 max-w-4xl mx-auto overflow-hidden">

//                 {/* Diagonal "Draft" ribbon — top-left corner, Zoho-style */}
//                 {selectedInvoice.status === 'draft' && (
//                   <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
//                     <div className="absolute top-[18px] left-[-38px] w-[160px] -rotate-45 bg-slate-400 text-white text-[11px] font-semibold tracking-wide text-center py-1 shadow-sm">
//                       Draft
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-between mb-12">
//                   <div>
//                     <h3 className="font-bold text-lg text-gray-800">BusinessOS</h3>
//                     <p className="text-gray-500 text-sm mt-1">Business Management Software</p>
//                   </div>
//                   <div className="text-right">
//                     <h1 className="text-4xl font-light text-gray-800">
//                       INVOICE
//                     </h1>
//                     <p className="text-gray-500 mt-2">
//                       # {selectedInvoice.invoiceNumber}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mb-10">
//                   <p className="text-sm text-gray-500 mb-1">Bill To</p>
//                   <h3 className="font-semibold text-lg text-blue-700">
//                     {selectedInvoice.clientName}
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     {selectedInvoice.clientEmail}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-3 gap-10 mb-10">
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Invoice Date
//                     </p>
//                     <h4 className="font-semibold mt-2">
//                       {new Date(
//                         selectedInvoice.date
//                       ).toLocaleDateString()}
//                     </h4>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Due Date
//                     </p>
//                     <h4 className="font-semibold mt-2">
//                       {new Date(
//                         selectedInvoice.dueDate
//                       ).toLocaleDateString()}
//                     </h4>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Balance Due
//                     </p>
//                     <h2 className="text-3xl text-red-600 font-bold mt-2">
//                       ₹{Number(selectedInvoice.amount).toFixed(2)}
//                     </h2>
//                   </div>
//                 </div>
//                 {/* Items Table */}
//                 <table className="w-full border">
//                 <thead className="bg-gray-800 text-white">
//                     <tr>
//                       <th className="text-left px-4 py-3">
//                         Description
//                       </th>
//                       <th className="px-4 py-3">
//                         Qty
//                       </th>
//                       <th className="px-4 py-3">
//                         Rate
//                       </th>
//                   <th className="text-right px-4 py-3">
//                         Amount
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedInvoice.items?.map(
//                       (item, index) => (
//                         <tr
//                           key={index}
//                           className="border-t"
//                         >
//                           <td className="px-4 py-4">
//                             {item.description}
//                           </td>
//                           <td className="text-center">
//                             {item.quantity}
//                           </td>
//                           <td className="text-center">
//                             ₹{Number(item.rate).toFixed(2)}
//                           </td>
//                           <td className="text-right px-4">
//                             ₹{Number(item.amount).toFixed(2)}
//                           </td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>
//                 </table>
//                 <div className="mt-10 flex justify-end">
//                   <div className="w-72">
//                     <div className="flex justify-between border-t py-4">
//                       <span className="font-semibold">
//                         Total
//                       </span>
//                       <span className="text-xl font-bold">
//                         ₹{Number(
//                           selectedInvoice.amount
//                         ).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="h-full flex items-center justify-center text-gray-500">
//             Select an Invoice
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

// export default InvoiceList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'failed' | 'draft';
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

      {/* Top toolbar — "All Invoices" + status filter tabs + "+ New" */}
     {/* Top toolbar */}
<div className="border-b px-5 py-3 bg-white flex items-center justify-between gap-3">
  <h2 className="text-lg font-semibold text-gray-800">All Invoices</h2>
  <div className="flex items-center gap-3">
    {/* Status filter — dropdown */}
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none hover:border-blue-400 focus:border-blue-500 cursor-pointer"
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

      <div className="flex flex-1 min-h-0">

        {/* LEFT PANEL */}
        <div className="w-[28%] border-r overflow-y-auto bg-white">
          {filteredInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
              No invoices found
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => {
                  setSelectedInvoice(invoice);
                  setSendBannerMessage(null);
                }}
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
                    {/* Invoice number + date on same line, Zoho-style */}
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

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-[#f7f7f7] overflow-y-auto">
          {selectedInvoice ? (
            <>
              {/* Action toolbar */}
              <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-700">
                  {selectedInvoice.invoiceNumber}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditInvoice?.(selectedInvoice)}
                    className="border px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onPdfInvoice?.(selectedInvoice)}
                    className="border px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => onViewInvoice?.(selectedInvoice)}
                    className="border px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => onRecordPayment?.(selectedInvoice)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Record Payment
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white border-b px-6">
                <div className="flex gap-8">
                  <button className="py-3 text-sm border-b-2 border-blue-600 text-blue-600 font-medium">
                    WHAT'S NEXT
                  </button>
                  <button className="py-3 text-sm text-gray-500 hover:text-gray-700">
                    COMMENTS & HISTORY
                  </button>
                  <button className="py-3 text-sm text-gray-500 hover:text-gray-700">
                    PAYMENTS
                  </button>
                </div>
              </div>

              {/* Send Invoice banner — Draft only */}
              {selectedInvoice.status === 'draft' && (
                <div className="mx-6 mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between gap-4">
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
              <div className="p-8">
                <div className="relative bg-white border shadow-sm p-10 max-w-5xl mx-auto overflow-hidden">

                  {/* Diagonal "Draft" ribbon */}
                  {selectedInvoice.status === 'draft' && (
                    <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
                      <div className="absolute top-[18px] left-[-38px] w-[160px] -rotate-45 bg-slate-400 text-white text-[11px] font-semibold tracking-wide text-center py-1 shadow-sm">
                        Draft
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mb-12">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">BusinessOS</h3>
                      <p className="text-gray-500 text-sm mt-1">Business Management Software</p>
                    </div>
                    <div className="text-right">
                      <h1 className="text-4xl font-light text-gray-800">INVOICE</h1>
                      <p className="text-gray-500 mt-2"># {selectedInvoice.invoiceNumber}</p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-sm text-gray-500 mb-1">Bill To</p>
                    <h3
                      className="font-semibold text-lg text-blue-700 cursor-pointer hover:underline"
                      onClick={() => onViewInvoice?.(selectedInvoice)}
                    >
                      {selectedInvoice.clientName}
                    </h3>
                    <p className="text-gray-600 text-sm">{selectedInvoice.clientEmail}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-10 mb-10">
                    <div>
                      <p className="text-sm text-gray-500">Invoice Date</p>
                      <h4 className="font-semibold mt-2">
                        {new Date(selectedInvoice.date).toLocaleDateString()}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <h4 className="font-semibold mt-2">
                        {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance Due</p>
                      <h2 className="text-3xl text-red-600 font-bold mt-2">
                        ₹{Number(selectedInvoice.amount).toFixed(2)}
                      </h2>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table className="w-full border">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm">#</th>
                        <th className="text-left px-4 py-3 text-sm">Item & Description</th>
                        <th className="text-center px-4 py-3 text-sm">Qty</th>
                        <th className="text-center px-4 py-3 text-sm">Rate</th>
                        <th className="text-right px-4 py-3 text-sm">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                        selectedInvoice.items.map((item, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">{item.description}</td>
                            <td className="text-center px-4 py-3 text-sm">{item.quantity}</td>
                            <td className="text-center px-4 py-3 text-sm">₹{Number(item.rate).toFixed(2)}</td>
                            <td className="text-right px-4 py-3 text-sm">₹{Number(item.amount).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">No items</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="mt-10 flex justify-end">
                    <div className="w-72">
                      <div className="flex justify-between border-t py-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">₹{Number(selectedInvoice.amount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an Invoice
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;