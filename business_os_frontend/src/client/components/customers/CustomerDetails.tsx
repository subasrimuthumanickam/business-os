// import React, { useState, useEffect, useRef } from "react";
// import "./CustomerDetails.css";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import CreateInvoice from "../billing/CreateInvoice";

// // =============================================
// // Types
// // =============================================

// interface CustomerProps {
//   customer: {
//     id: string;
//     name: string;
//     email: string;
//     phone_work?: string;
//     phone_mobile?: string;
//     currency?: string;
//     billing_address?: string;
//     shipping_address?: string;
//     customer_type?: string;
//     location?: string;
//   };
//   onEdit?: () => void; // CustomerList-ல் edit trigger பண்ண
// }

// interface Invoice {
//   id: number;
//   invoice_number: string;
//   invoice_date: string;
//   due_date: string;
//   status: string;
//   total: number;
//   subtotal: number;
//   tax: number;
// }

// interface Payment {
//   id: number;
//   amount: number;
//   payment_date: string;
//   payment_mode: string;
//   reference_number?: string;
// }

// interface OverviewStats {
//   receivables: number;
//   unusedCredits: number;
//   totalIncome: number;
//   invoiceCount: number;
// }

// const API = "http://localhost:5000/api";

// const TABS = ["overview", "comments", "transactions", "related", "mails", "statement"];
// const TAB_LABELS: Record<string, string> = {
//   overview: "Overview",
//   comments: "Comments",
//   transactions: "Transactions",
//   related: "Related Lists",
//   mails: "Mails",
//   statement: "Statement",
// };

// // =============================================
// // Component
// // =============================================

// const CustomerDetails: React.FC<CustomerProps> = ({ customer, onEdit }) => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("overview");

//   const [showInvoiceForm, setShowInvoiceForm] = useState(false);

//   // ---- Data States ----
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [stats, setStats] = useState<OverviewStats>({
//     receivables: 0,
//     unusedCredits: 0,
//     totalIncome: 0,
//     invoiceCount: 0,
//   });
//   const [chartData, setChartData] = useState<{ month: string; amount: number }[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ---- Dropdown State ----
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // =============================================
//   // Fetch Data
//   // =============================================

//   useEffect(() => {
//     fetchAllData();

//     // Close dropdown outside click
//     const handleOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, [customer.id]);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([fetchInvoices(), fetchPayments()]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInvoices = async () => {
//     try {
//       const res = await fetch(`${API}/customers/${customer.id}/invoices`);
//       const data = await res.json();
//       if (data.success) {
//         const invList: Invoice[] = data.data || [];
//         setInvoices(invList);
//         computeStats(invList);
//         buildChartData(invList);
//       }
//     } catch (err) {
//       console.error("Invoice fetch error:", err);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       const res = await fetch(`${API}/customers/${customer.id}/payments`);
//       const data = await res.json();
//       if (data.success) {
//         setPayments(data.data || []);
//       }
//     } catch (err) {
//       console.error("Payment fetch error:", err);
//     }
//   };

//   // ---- Compute overview stats from invoices ----
//   const computeStats = (invList: Invoice[]) => {
//     const totalIncome = invList.reduce((sum, inv) => sum + (inv.total || 0), 0);
//     const receivables = invList
//       .filter((inv) => inv.status === "Draft" || inv.status === "Pending")
//       .reduce((sum, inv) => sum + (inv.total || 0), 0);

//     setStats({
//       receivables,
//       unusedCredits: 0,
//       totalIncome,
//       invoiceCount: invList.length,
//     });
//   };

//   // ---- Build chart data by month from invoices ----
//   const buildChartData = (invList: Invoice[]) => {
//     const monthMap: Record<string, number> = {};
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     invList.forEach((inv) => {
//       if (!inv.invoice_date) return;
//       const date = new Date(inv.invoice_date);
//       const month = monthNames[date.getMonth()];
//       monthMap[month] = (monthMap[month] || 0) + (inv.total || 0);
//     });

//     const chart = monthNames
//       .filter((m) => monthMap[m])
//       .map((m) => ({ month: m, amount: monthMap[m] }));

//     setChartData(chart.length > 0 ? chart : [{ month: "No Data", amount: 0 }]);
//   };

//   // =============================================
//   // Transaction Navigation
//   // =============================================
    
//   const handleTransaction = (type: string) => {
//     setDropdownOpen(false);
//     const state = { customerId: customer.id, customerName: customer.name };

//     switch (type) {
//       case "invoice":
//       setShowInvoiceForm(true); 
//       break;
//       case "payment":
//         navigate("/billing/payments/new", { state });
//         break;
//       case "estimate":
//         navigate("/billing/estimates/new", { state });
//         break;
//       case "sales-order":
//         navigate("/billing/sales-orders/new", { state });
//         break;
//       case "credit-note":
//         navigate("/billing/credit-notes/new", { state });
//         break;
//     }
//   };

//   // ---- Status badge color ----
//   const getStatusClass = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "paid": return "badge badge--paid";
//       case "draft": return "badge badge--draft";
//       case "pending": return "badge badge--pending";
//       case "overdue": return "badge badge--overdue";
//       default: return "badge badge--draft";
//     }
//   };

//   const formatCurrency = (amount: number, currency = "INR") => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: currency === "USD" ? "USD" : "INR",
//       maximumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   // =============================================
//   // Render
//   // =============================================

//   return (
//     <div className="customer-details-page">

//       {/* ---- Top Bar ---- */}
//       <div className="customer-topbar">
//         <h2>{customer.name}</h2>

//         <div className="topbar-actions">
//           {/* Edit Button */}
//           <button className="btn-outline" onClick={onEdit}>
//             ✏ Edit
//           </button>

//           {/* Custom Dropdown — Zoho Style */}
//           <div className="txn-dropdown-wrap" ref={dropdownRef}>
//             <button
//               className="txn-dropdown-btn"
//               onClick={() => setDropdownOpen((prev) => !prev)}
//             >
//               New Transaction
//               <span className="txn-arrow">{dropdownOpen ? "▲" : "▼"}</span>
//             </button>

//             {dropdownOpen && (
//               <ul className="txn-dropdown-menu">
//                 <li onClick={() => handleTransaction("invoice")}>📄 Invoice</li>
//                 <li onClick={() => handleTransaction("payment")}>💳 Customer Payment</li>
//                 <li onClick={() => handleTransaction("estimate")}>📋 Estimate</li>
//                 <li onClick={() => handleTransaction("sales-order")}>🛒 Sales Order</li>
//                 <li onClick={() => handleTransaction("credit-note")}>📝 Credit Note</li>
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ---- Tabs ---- */}
//       <div className="customer-tabs">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             className={activeTab === tab ? "active" : ""}
//             onClick={() => setActiveTab(tab)}
//           >
//             {TAB_LABELS[tab]}
//           </button>
//         ))}
//       </div>

//       <div className="customer-content">

//         {/* ---- Sidebar ---- */}
//         <div className="customer-sidebar">
//           <div className="profile-card">
//             <div className="avatar">
//               {customer.name?.charAt(0).toUpperCase()}
//             </div>
//             <h3>{customer.name}</h3>
//             <p>{customer.email}</p>
//           </div>

//           <div className="info-section">
//             <h4>Address</h4>
//             <div className="info-row">
//               <span>Billing</span>
//               <p>{customer.billing_address || "Not Added"}</p>
//             </div>
//             <div className="info-row">
//               <span>Shipping</span>
//               <p>{customer.shipping_address || "Not Added"}</p>
//             </div>
//           </div>

//           <div className="info-section">
//             <h4>Other Details</h4>
//             <div className="info-row">
//               <span>Type</span>
//               <p>{customer.customer_type || "Business"}</p>
//             </div>
//             <div className="info-row">
//               <span>Currency</span>
//               <p>{customer.currency || "INR"}</p>
//             </div>
//             <div className="info-row">
//               <span>Phone</span>
//               <p>{customer.phone_work || "-"}</p>
//             </div>
//             {customer.location && (
//               <div className="info-row">
//                 <span>Location</span>
//                 <p>{customer.location}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ---- Main Content ---- */}
//         <div className="customer-main">

//           {loading && (
//             <div className="loading-state">Loading customer data...</div>
//           )}

//           {/* Overview Tab */}
//           {!loading && activeTab === "overview" && (
//             <>
//               {/* Summary Cards */}
//               <div className="summary-grid">
//                 <div className="summary-card">
//                   <h4>Receivables</h4>
//                   <h2>{formatCurrency(stats.receivables, customer.currency)}</h2>
//                 </div>
//                 <div className="summary-card">
//                   <h4>Unused Credits</h4>
//                   <h2>{formatCurrency(stats.unusedCredits, customer.currency)}</h2>
//                 </div>
//                 <div className="summary-card">
//                   <h4>Total Income</h4>
//                   <h2>{formatCurrency(stats.totalIncome, customer.currency)}</h2>
//                 </div>
//                 <div className="summary-card">
//                   <h4>Invoices</h4>
//                   <h2>{stats.invoiceCount}</h2>
//                 </div>
//               </div>

//               {/* Receivables Table */}
//               {stats.receivables > 0 && (
//                 <div className="receivable-card">
//                   <h3>Receivables</h3>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Currency</th>
//                         <th>Outstanding</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>{customer.currency || "INR"}</td>
//                         <td>{formatCurrency(stats.receivables, customer.currency)}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* Chart */}
//               <div className="chart-card">
//                 <h3>Income Overview</h3>
//                 {chartData.length > 0 && chartData[0].month !== "No Data" ? (
//                   <ResponsiveContainer width="100%" height={280}>
//                     <AreaChart data={chartData}>
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip formatter={(val: any) => formatCurrency(val, customer.currency)} />
//                       <Area
//                         type="monotone"
//                         dataKey="amount"
//                         stroke="#2563eb"
//                         fill="#93c5fd"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div className="empty-chart">No invoice data yet</div>
//                 )}
//               </div>

//               {/* Recent Invoices as Activity */}
//               <div className="activity-card">
//                 <h3>Recent Activity</h3>
//                 {invoices.length === 0 ? (
//                   <p className="empty-text">No activity yet</p>
//                 ) : (
//                   invoices.slice(0, 5).map((inv) => (
//                     <div key={inv.id} className="timeline-item">
//                       <span className="timeline-dot" />
//                       <div>
//                         <strong>{inv.invoice_number}</strong> created —{" "}
//                         <span className={getStatusClass(inv.status)}>{inv.status}</span>
//                       </div>
//                       <span className="timeline-date">{inv.invoice_date}</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </>
//           )}

//           {/* Transactions Tab */}
//           {!loading && activeTab === "transactions" && (
//             <div className="table-card">
//               <h3>Invoices</h3>
//               {invoices.length === 0 ? (
//                 <div className="empty-card">No invoices found for this customer</div>
//               ) : (
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Invoice No</th>
//                       <th>Date</th>
//                       <th>Due Date</th>
//                       <th>Status</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoices.map((inv) => (
//                       <tr key={inv.id}>
//                         <td><strong>{inv.invoice_number}</strong></td>
//                         <td>{inv.invoice_date}</td>
//                         <td>{inv.due_date}</td>
//                         <td><span className={getStatusClass(inv.status)}>{inv.status}</span></td>
//                         <td>{formatCurrency(inv.total, customer.currency)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}

//               {payments.length > 0 && (
//                 <>
//                   <h3 style={{ marginTop: "24px" }}>Payments</h3>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Date</th>
//                         <th>Mode</th>
//                         <th>Reference</th>
//                         <th>Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {payments.map((pay) => (
//                         <tr key={pay.id}>
//                           <td>{pay.payment_date}</td>
//                           <td>{pay.payment_mode}</td>
//                           <td>{pay.reference_number || "-"}</td>
//                           <td>{formatCurrency(pay.amount, customer.currency)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </>
//               )}
//             </div>
//           )}

//           {/* Other Tabs */}
//           {activeTab === "comments" && (
//             <div className="empty-card">No comments available</div>
//           )}
//           {activeTab === "related" && (
//             <div className="empty-card">Related records will appear here</div>
//           )}
//           {activeTab === "mails" && (
//             <div className="empty-card">Email history will appear here</div>
//           )}
//           {activeTab === "statement" && (
//             <div className="empty-card">Customer statement will appear here</div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;

import React, { useState, useEffect, useRef } from "react";
import "./CustomerDetails.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import CreateInvoice from "../billing/CreateInvoice";
import CreatePayment from "../billing/Createpayment";
import CreateEstimate from "../billing/Createestimate";
import CreateSalesOrder from "../billing/Createsalesorder";
import CreateCreditNote from "../billing/Createcreditnote";

// =============================================
// Types
// =============================================

interface CustomerProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone_work?: string;
    phone_mobile?: string;
    currency?: string;
    billing_address?: string;
    shipping_address?: string;
    customer_type?: string;
    location?: string;
  };
  onEdit?: () => void; // CustomerList-ல் edit trigger பண்ண
}

interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
}

interface Payment {
  id: number;
  amount: number;
  payment_date: string;
  payment_mode: string;
  reference_number?: string;
}

interface OverviewStats {
  receivables: number;
  unusedCredits: number;
  totalIncome: number;
  invoiceCount: number;
}

const API = "http://localhost:5000/api";

const TABS = ["overview", "comments", "transactions", "related", "mails", "statement"];
const TAB_LABELS: Record<string, string> = {
  overview: "Overview",
  comments: "Comments",
  transactions: "Transactions",
  related: "Related Lists",
  mails: "Mails",
  statement: "Statement",
};

// =============================================
// Component
// =============================================

const CustomerDetails: React.FC<CustomerProps> = ({ customer, onEdit }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // ---- Transaction Form Toggles (inline swap, no routing) ----
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [showSalesOrderForm, setShowSalesOrderForm] = useState(false);
  const [showCreditNoteForm, setShowCreditNoteForm] = useState(false);

  // ---- Data States ----
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<OverviewStats>({
    receivables: 0,
    unusedCredits: 0,
    totalIncome: 0,
    invoiceCount: 0,
  });
  const [chartData, setChartData] = useState<{ month: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- Dropdown State ----
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // =============================================
  // Fetch Data
  // =============================================

  useEffect(() => {
    fetchAllData();

    // Close dropdown outside click
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [customer.id]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchInvoices(), fetchPayments()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API}/customers/${customer.id}/invoices`);
      const data = await res.json();
      if (data.success) {
        const invList: Invoice[] = data.data || [];
        setInvoices(invList);
        computeStats(invList);
        buildChartData(invList);
      }
    } catch (err) {
      console.error("Invoice fetch error:", err);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API}/customers/${customer.id}/payments`);
      const data = await res.json();
      if (data.success) {
        setPayments(data.data || []);
      }
    } catch (err) {
      console.error("Payment fetch error:", err);
    }
  };

  // ---- Compute overview stats from invoices ----
  const computeStats = (invList: Invoice[]) => {
    const totalIncome = invList.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const receivables = invList
      .filter((inv) => inv.status === "Draft" || inv.status === "Pending")
      .reduce((sum, inv) => sum + (inv.total || 0), 0);

    setStats({
      receivables,
      unusedCredits: 0,
      totalIncome,
      invoiceCount: invList.length,
    });
  };

  // ---- Build chart data by month from invoices ----
  const buildChartData = (invList: Invoice[]) => {
    const monthMap: Record<string, number> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    invList.forEach((inv) => {
      if (!inv.invoice_date) return;
      const date = new Date(inv.invoice_date);
      const month = monthNames[date.getMonth()];
      monthMap[month] = (monthMap[month] || 0) + (inv.total || 0);
    });

    const chart = monthNames
      .filter((m) => monthMap[m])
      .map((m) => ({ month: m, amount: monthMap[m] }));

    setChartData(chart.length > 0 ? chart : [{ month: "No Data", amount: 0 }]);
  };

  // =============================================
  // Transaction Form Triggers
  // =============================================

  const handleTransaction = (type: string) => {
    setDropdownOpen(false);

    switch (type) {
      case "invoice":
        setShowInvoiceForm(true);
        break;
      case "payment":
        setShowPaymentForm(true);
        break;
      case "estimate":
        setShowEstimateForm(true);
        break;
      case "sales-order":
        setShowSalesOrderForm(true);
        break;
      case "credit-note":
        setShowCreditNoteForm(true);
        break;
    }
  };

  // ---- Status badge color ----
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid": return "badge badge--paid";
      case "draft": return "badge badge--draft";
      case "pending": return "badge badge--pending";
      case "overdue": return "badge badge--overdue";
      default: return "badge badge--draft";
    }
  };

  const formatCurrency = (amount: number, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // =============================================
  // Inline Transaction Forms — swap in place of the
  // customer page, exactly like the existing Invoice flow.
  // No route, no navigation, no blank page.
  // =============================================

  if (showInvoiceForm) {
    return (
      <CreateInvoice
        customer={customer}
        onClose={() => {
          setShowInvoiceForm(false);
          fetchAllData();
        }}
      />
    );
  }

  if (showPaymentForm) {
    return (
      <CreatePayment
        customer={customer}
        onClose={() => {
          setShowPaymentForm(false);
          fetchAllData();
        }}
      />
    );
  }

  if (showEstimateForm) {
    return (
      <CreateEstimate
        customer={customer}
        onClose={() => setShowEstimateForm(false)}
      />
    );
  }

  if (showSalesOrderForm) {
    return (
      <CreateSalesOrder
        customer={customer}
        onClose={() => setShowSalesOrderForm(false)}
      />
    );
  }

  if (showCreditNoteForm) {
    return (
      <CreateCreditNote
        customer={customer}
        onClose={() => setShowCreditNoteForm(false)}
      />
    );
  }

  // =============================================
  // Render
  // =============================================

  return (
    <div className="customer-details-page">

      {/* ---- Top Bar ---- */}
      <div className="customer-topbar">
        <h2>{customer.name}</h2>

        <div className="topbar-actions">
          {/* Edit Button */}
          <button className="btn-outline" onClick={onEdit}>
            ✏ Edit
          </button>

          {/* Custom Dropdown — Zoho Style */}
          <div className="txn-dropdown-wrap" ref={dropdownRef}>
            <button
              className="txn-dropdown-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              New Transaction
              <span className="txn-arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <ul className="txn-dropdown-menu">
                <li onClick={() => handleTransaction("invoice")}>📄 Invoice</li>
                <li onClick={() => handleTransaction("payment")}>💳 Customer Payment</li>
                <li onClick={() => handleTransaction("estimate")}>📋 Estimate</li>
                <li onClick={() => handleTransaction("sales-order")}>🛒 Sales Order</li>
                <li onClick={() => handleTransaction("credit-note")}>📝 Credit Note</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <div className="customer-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="customer-content">

        {/* ---- Sidebar ---- */}
        <div className="customer-sidebar">
          <div className="profile-card">
            <div className="avatar">
              {customer.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{customer.name}</h3>
            <p>{customer.email}</p>
          </div>

          <div className="info-section">
            <h4>Address</h4>
            <div className="info-row">
              <span>Billing</span>
              <p>{customer.billing_address || "Not Added"}</p>
            </div>
            <div className="info-row">
              <span>Shipping</span>
              <p>{customer.shipping_address || "Not Added"}</p>
            </div>
          </div>

          <div className="info-section">
            <h4>Other Details</h4>
            <div className="info-row">
              <span>Type</span>
              <p>{customer.customer_type || "Business"}</p>
            </div>
            <div className="info-row">
              <span>Currency</span>
              <p>{customer.currency || "INR"}</p>
            </div>
            <div className="info-row">
              <span>Phone</span>
              <p>{customer.phone_work || "-"}</p>
            </div>
            {customer.location && (
              <div className="info-row">
                <span>Location</span>
                <p>{customer.location}</p>
              </div>
            )}
          </div>
        </div>

        {/* ---- Main Content ---- */}
        <div className="customer-main">

          {loading && (
            <div className="loading-state">Loading customer data...</div>
          )}

          {/* Overview Tab */}
          {!loading && activeTab === "overview" && (
            <>
              {/* Summary Cards */}
              <div className="summary-grid">
                <div className="summary-card">
                  <h4>Receivables</h4>
                  <h2>{formatCurrency(stats.receivables, customer.currency)}</h2>
                </div>
                <div className="summary-card">
                  <h4>Unused Credits</h4>
                  <h2>{formatCurrency(stats.unusedCredits, customer.currency)}</h2>
                </div>
                <div className="summary-card">
                  <h4>Total Income</h4>
                  <h2>{formatCurrency(stats.totalIncome, customer.currency)}</h2>
                </div>
                <div className="summary-card">
                  <h4>Invoices</h4>
                  <h2>{stats.invoiceCount}</h2>
                </div>
              </div>

              {/* Receivables Table */}
              {stats.receivables > 0 && (
                <div className="receivable-card">
                  <h3>Receivables</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Currency</th>
                        <th>Outstanding</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{customer.currency || "INR"}</td>
                        <td>{formatCurrency(stats.receivables, customer.currency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Chart */}
              <div className="chart-card">
                <h3>Income Overview</h3>
                {chartData.length > 0 && chartData[0].month !== "No Data" ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(val: any) => formatCurrency(val, customer.currency)} />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#2563eb"
                        fill="#93c5fd"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="empty-chart">No invoice data yet</div>
                )}
              </div>

              {/* Recent Invoices as Activity */}
              <div className="activity-card">
                <h3>Recent Activity</h3>
                {invoices.length === 0 ? (
                  <p className="empty-text">No activity yet</p>
                ) : (
                  invoices.slice(0, 5).map((inv) => (
                    <div key={inv.id} className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <strong>{inv.invoice_number}</strong> created —{" "}
                        <span className={getStatusClass(inv.status)}>{inv.status}</span>
                      </div>
                      <span className="timeline-date">{inv.invoice_date}</span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Transactions Tab */}
          {!loading && activeTab === "transactions" && (
            <div className="table-card">
              <h3>Invoices</h3>
              {invoices.length === 0 ? (
                <div className="empty-card">No invoices found for this customer</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td><strong>{inv.invoice_number}</strong></td>
                        <td>{inv.invoice_date}</td>
                        <td>{inv.due_date}</td>
                        <td><span className={getStatusClass(inv.status)}>{inv.status}</span></td>
                        <td>{formatCurrency(inv.total, customer.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {payments.length > 0 && (
                <>
                  <h3 style={{ marginTop: "24px" }}>Payments</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Reference</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((pay) => (
                        <tr key={pay.id}>
                          <td>{pay.payment_date}</td>
                          <td>{pay.payment_mode}</td>
                          <td>{pay.reference_number || "-"}</td>
                          <td>{formatCurrency(pay.amount, customer.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "comments" && (
            <div className="empty-card">No comments available</div>
          )}
          {activeTab === "related" && (
            <div className="empty-card">Related records will appear here</div>
          )}
          {activeTab === "mails" && (
            <div className="empty-card">Email history will appear here</div>
          )}
          {activeTab === "statement" && (
            <div className="empty-card">Customer statement will appear here</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;