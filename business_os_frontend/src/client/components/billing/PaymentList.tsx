// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';   

// interface Payment {
//   id: number;
//   payment_number: string;
//   customer_id?: number;         
//   customer_name: string;
//   customer_email?: string;
//   amount: number;
//   payment_date: string;
//   payment_method: string;
//   reference_number?: string;
//   notes?: string;
//   invoice_id?: number;
//   invoice_number?: string;
//   status?: string;
// }

// interface PaymentListProps {
//   onNewPayment?: () => void;
//   onViewReceipt?: (payment: Payment) => void;   

// }

// const API = 'http://localhost:5000/api';

// const STATUS_TABS = [
//   { label: 'All', value: 'all' },
//   { label: 'Completed', value: 'completed' },
//   { label: 'Pending', value: 'pending' },
//   { label: 'Failed', value: 'failed' },
// ];

// const METHOD_ICONS: Record<string, string> = {
//   'upi': '',
//   'cash': '',
//   'card': '',
//   'bank transfer': '',
//   'cheque': '',
// };

// const PaymentList: React.FC<PaymentListProps> = ({ onNewPayment, onViewReceipt }) => {
//   const navigate = useNavigate();  
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [methodFilter, setMethodFilter] = useState('all');

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const fetchPayments = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/payments`);
//       const raw = res.data.data;
//       const dataArray = Array.isArray(raw) ? raw : raw ? [raw] : [];
//       const formatted = dataArray.map((p: any) => ({
//         id: p.id,
//         payment_number: p.payment_number,
//         customer_id: p.customer_id,        
//         customer_name: p.customer_name || p.display_name || '—',
//         customer_email: p.customer_email || p.email || '',
//         amount: Number(p.amount) || 0,
//         payment_date: p.payment_date,
//         payment_method: p.payment_method || '—',
//         reference_number: p.reference_number || '',
//         notes: p.notes || '',
//         invoice_id: p.invoice_id,
//         invoice_number: p.invoice_number || '',
//         status: (p.status || 'completed').toLowerCase(),
//       }));
//       setPayments(formatted);
//     } catch (err) {
//       console.error('Failed to fetch payments:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this payment?')) return;
//     try {
//       await axios.delete(`${API}/payments/${id}`);
//       setPayments((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       alert('Failed to delete payment');
//     }
//   };

//   const handleExportPayments = () => {
//   let csvContent =
//     "data:text/csv;charset=utf-8,Payment ID,Date,Customer Name,Customer Email,Amount,Payment Method,Reference,Status,Invoice Number\n";

//   filteredPayments.forEach((p) => {
//     csvContent += `${p.payment_number},"${formatDateTime(p.payment_date)}","${p.customer_name}","${p.customer_email || ''}",${p.amount},"${p.payment_method}","${p.reference_number || ''}","${p.status || ''}","${p.invoice_number || ''}"\n`;
//   });

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "business_os_payments.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return '—';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     }) + ', ' + date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'completed':
//         return (
//           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
//             <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
//             Completed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
//             <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
//             Pending
//           </span>
//         );
//       case 'failed':
//         return (
//           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
//             <span className="✕ text-red-500 text-[10px]" />
//             Failed
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
//             <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
//             {status || 'Completed'}
//           </span>
//         );
//     }
//   };

//   const filteredPayments = payments.filter((p) => {
//     const matchesTab = activeTab === 'all' || p.status === activeTab;
//     const matchesSearch =
//       !searchTerm ||
//       p.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.payment_number.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesMethod =
//       methodFilter === 'all' ||
//       p.payment_method.toLowerCase() === methodFilter.toLowerCase();
//     return matchesTab && matchesSearch && matchesMethod;
//   });

//   const uniqueMethods = ['all', ...Array.from(new Set(payments.map((p) => p.payment_method.toLowerCase())))];

//   return (
//     <div className="h-screen bg-white flex flex-col">

//       {/* Top toolbar */}
//       <div className="border-b px-6 py-4 bg-white flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={fetchPayments}
//             className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
//             title="Refresh"
//           >
//             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M23 4v6h-6M1 20v-6h6" />
//               <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
//             </svg>
//           </button>
//           <button
//   onClick={handleExportPayments}
//   className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
// >
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
//   </svg>
//   Export
// </button>
//         </div>
//       </div>

//       {/* Status filter tabs */}
//       <div className="border-b px-6 bg-white">
//         <div className="flex gap-6">
//           {STATUS_TABS.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveTab(tab.value)}
//               className={`py-3 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === tab.value
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               {tab.label}
//               {tab.value !== 'all' && (
//                 <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500">
//                   {payments.filter((p) => p.status === tab.value).length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Search + Filter row */}
//       <div className="border-b px-6 py-3 bg-white flex items-center gap-3">
//         <div className="relative">
//           <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search by name, email, payment number..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm w-72 outline-none focus:border-blue-500"
//           />
//         </div>

//         <select
//           value={methodFilter}
//           onChange={(e) => setMethodFilter(e.target.value)}
//           className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none"
//         >
//           <option value="all">Payment Method — All</option>
//           {uniqueMethods.filter((m) => m !== 'all').map((m) => (
//             <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
//             Loading payments...
//           </div>
//         ) : filteredPayments.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-48 text-gray-400">
//             <svg className="w-10 h-10 mb-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
//             </svg>
//             <p className="text-sm">No payments found</p>
//           </div>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
//               <tr>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date &amp; Time ↓
//                 </th>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer Details
//                 </th>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Payment Method
//                 </th>
//                 <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Payment ID
//                 </th>
//                 <th className="px-6 py-3" />
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {filteredPayments.map((payment) => (
//                 <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                     {formatDateTime(payment.payment_date)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-semibold text-gray-900">
//                       ₹{payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                     </span>
//                     <span className="ml-1 text-xs text-gray-400">INR</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getStatusBadge(payment.status || 'completed')}
//                   </td>
//                   <td className="px-6 py-4">
//   <p
//     className="text-sm font-medium text-gray-800 cursor-pointer hover:text-blue-600 hover:underline"
//     onClick={() => payment.customer_id && navigate(`/client/customers/${payment.customer_id}`)}
//   >
//     {payment.customer_name}
//   </p>
//   {payment.customer_email && (
//     <p className="text-xs text-gray-500 mt-0.5">{payment.customer_email}</p>
//   )}
// </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
//                       <span>{METHOD_ICONS[payment.payment_method.toLowerCase()] || ''}</span>
//                       {payment.payment_method}
//                     </span>
//                   </td>
//                   {/* <td className="px-6 py-4">
//                     <span className="text-sm text-blue-600 font-medium">
//                       {payment.payment_number}
//                     </span>
//                     {payment.invoice_number && (
//                       <p className="text-xs text-gray-400 mt-0.5">INV: {payment.invoice_number}</p>
//                     )}
//                   </td> */}
//                   <td className="px-6 py-4">
//   <span
//     className="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
//     onClick={() => onViewReceipt && onViewReceipt(payment)}
//   >
//     {payment.payment_number}
//   </span>
//   {payment.invoice_number && (
//     <p className="text-xs text-gray-400 mt-0.5">INV: {payment.invoice_number}</p>
//   )}
// </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => handleDelete(payment.id)}
//                       className="text-gray-400 hover:text-red-500 transition-colors p-1"
//                       title="Delete"
//                     >
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Footer count */}
//       {filteredPayments.length > 0 && (
//         <div className="border-t px-6 py-3 bg-white text-xs text-gray-500">
//           Showing {filteredPayments.length} of {payments.length} payments
//         </div>
//       )}
//     </div>
//   );
// };


// export default PaymentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Payment {
  id: number;
  payment_number: string;
  customer_id?: number;
  customer_name: string;
  customer_email?: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
  invoice_id?: number;
  invoice_number?: string;
  status?: string;
}

interface PaymentListProps {
  onNewPayment?: () => void;
  onViewReceipt?: (payment: Payment) => void;
}

const API = 'http://localhost:5000/api';

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const METHOD_ICONS: Record<string, string> = {
  'upi': '',
  'cash': '',
  'card': '',
  'bank transfer': '',
  'cheque': '',
};

const PaymentList: React.FC<PaymentListProps> = ({ onNewPayment, onViewReceipt }) => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/payments`);
      const raw = res.data.data;
      const dataArray = Array.isArray(raw) ? raw : raw ? [raw] : [];
      const formatted = dataArray.map((p: any) => ({
        id: p.id,
        payment_number: p.payment_number,
        customer_id: p.customer_id,
        customer_name: p.customer_name || p.display_name || '—',
        customer_email: p.customer_email || p.email || '',
        amount: Number(p.amount) || 0,
        payment_date: p.payment_date,
        payment_method: p.payment_method || '—',
        reference_number: p.reference_number || '',
        notes: p.notes || '',
        invoice_id: p.invoice_id,
        invoice_number: p.invoice_number || '',
        status: (p.status || 'completed').toLowerCase(),
      }));
      setPayments(formatted);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    try {
      await axios.delete(`${API}/payments/${id}`);
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete payment');
    }
  };

  const handleExportPayments = () => {
    let csvContent =
      "data:text/csv;charset=utf-8,Payment ID,Date,Customer Name,Customer Email,Amount,Payment Method,Reference,Status,Invoice Number\n";

    filteredPayments.forEach((p) => {
      csvContent += `${p.payment_number},"${formatDateTime(p.payment_date)}","${p.customer_name}","${p.customer_email || ''}",${p.amount},"${p.payment_method}","${p.reference_number || ''}","${p.status || ''}","${p.invoice_number || ''}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "business_os_payments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
            <span className="✕ text-red-500 text-[10px]" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
            {status || 'Completed'}
          </span>
        );
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch =
      !searchTerm ||
      p.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.payment_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod =
      methodFilter === 'all' ||
      p.payment_method.toLowerCase() === methodFilter.toLowerCase();
    return matchesTab && matchesSearch && matchesMethod;
  });

  const uniqueMethods = ['all', ...Array.from(new Set(payments.map((p) => p.payment_method.toLowerCase())))];

  return (
    <div className="h-screen bg-white flex flex-col">

      {/* Top toolbar */}
      <div className="border-b px-4 sm:px-6 py-3 sm:py-4 bg-white flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Payments</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPayments}
            className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
          <button
            onClick={handleExportPayments}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Status filter tabs — horizontal scroll on mobile */}
      <div className="border-b px-4 sm:px-6 bg-white overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div className="flex gap-4 sm:gap-6 w-max">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500">
                  {payments.filter((p) => p.status === tab.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Filter row */}
      <div className="border-b px-4 sm:px-6 py-3 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 sm:flex-none">
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, payment number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-72 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none w-full sm:w-auto"
        >
          <option value="all">Payment Method — All</option>
          {uniqueMethods.filter((m) => m !== 'all').map((m) => (
            <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table — horizontal scroll wrapper for mobile */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            Loading payments...
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <svg className="w-10 h-10 mb-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
            <p className="text-sm">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Date &amp; Time ↓
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Customer Details
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Payment ID
                  </th>
                  <th className="px-4 sm:px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDateTime(payment.payment_date)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="ml-1 text-xs text-gray-400">INR</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {getStatusBadge(payment.status || 'completed')}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p
                        className="text-sm font-medium text-gray-800 cursor-pointer hover:text-blue-600 hover:underline whitespace-nowrap"
                        onClick={() => payment.customer_id && navigate(`/client/customers/${payment.customer_id}`)}
                      >
                        {payment.customer_name}
                      </p>
                      {payment.customer_email && (
                        <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">{payment.customer_email}</p>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-700 whitespace-nowrap">
                        <span>{METHOD_ICONS[payment.payment_method.toLowerCase()] || ''}</span>
                        {payment.payment_method}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className="text-sm text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                        onClick={() => onViewReceipt && onViewReceipt(payment)}
                      >
                        {payment.payment_number}
                      </span>
                      {payment.invoice_number && (
                        <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">INV: {payment.invoice_number}</p>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(payment.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer count */}
      {filteredPayments.length > 0 && (
        <div className="border-t px-4 sm:px-6 py-3 bg-white text-xs text-gray-500">
          Showing {filteredPayments.length} of {payments.length} payments
        </div>
      )}
    </div>
  );
};

export default PaymentList;