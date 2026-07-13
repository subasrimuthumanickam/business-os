import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
import InvoiceView from "../billing/InvoiceView";
import { downloadInvoicePDF } from "../../utils/invoicePdf";
import ReceiptView from "../billing/ReceiptView";

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
  onEdit?: () => void;
}

interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  // NEW — matches CreateInvoice.tsx's InvoiceItem.product_id. Optional here
  // (not required like in CreateInvoice) because invoices fetched from the
  // backend may predate the 2026_06_25_add_product_id_to_invoice_items
  // migration and simply won't have it. CreateInvoice itself still
  // normalizes this to `null` when missing before using it internally.
  product_id?: number | null;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
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
  items?: InvoiceItem[];
}

interface Payment {
  id: number;
  payment_number: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
}

interface OverviewStats {
  receivables: number;
  unusedCredits: number;
  totalIncome: number;
  invoiceCount: number;
}

// Minimal invoice context passed into CreatePayment when paying a specific invoice
interface PayableInvoice {
  id: number;
  invoice_number: string;
  total: number;
  status: string;
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

const ACTION_MENU_WIDTH = 190;

// =============================================
// Component
// =============================================

const CustomerDetails: React.FC<CustomerProps> = ({ customer, onEdit }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [showSalesOrderForm, setShowSalesOrderForm] = useState(false);
  const [showCreditNoteForm, setShowCreditNoteForm] = useState(false);

  const [payingInvoice, setPayingInvoice] = useState<PayableInvoice | null>(null);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);

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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);

  const [autoDownload, setAutoDownload] = useState(false);

  const [viewReceipt, setViewReceipt] = useState<Payment | null>(null);

  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  useEffect(() => {
    fetchAllData();

    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [customer.id]);

  useEffect(() => {
    if (openMenu === null) return;

    const closeMenu = () => {
      setOpenMenu(null);
      setMenuCoords(null);
    };

    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".cd-action-menu") || target.closest(".cd-action-btn")) return;
      closeMenu();
    };

    document.addEventListener("mousedown", handleDocClick);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("resize", closeMenu);

    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("resize", closeMenu);
    };
  }, [openMenu]);

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
        const invList: Invoice[] = (data.data || []).map((inv: any) => ({
          ...inv,
          subtotal: Number(inv.subtotal) || 0,
          tax: Number(inv.tax) || 0,
          total: Number(inv.total) || 0,
        }));
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
        const payList: Payment[] = (data.data || []).map((pay: any) => ({
          ...pay,
          amount: Number(pay.amount) || 0,
        }));
        setPayments(payList);
      }
    } catch (err) {
      console.error("Payment fetch error:", err);
    }
  };

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>, invId: number) => {
    e.stopPropagation();

    if (openMenu === invId) {
      setOpenMenu(null);
      setMenuCoords(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuCoords({
      top: rect.bottom + 6,
      left: Math.max(8, rect.right - ACTION_MENU_WIDTH),
    });
    setOpenMenu(invId);
  };

  const handleViewInvoice = async (invoiceId: number) => {
    try {
      const res = await fetch(`${API}/invoices/${invoiceId}`);
      const data = await res.json();

      if (data.success) {
        setViewInvoice(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditInvoice = async (invoice: Invoice) => {
    setOpenMenu(null);

    try {
      const res = await fetch(`${API}/invoices/${invoice.id}`);
      const data = await res.json();

      console.log("Invoice Edit Data =>", data.data);

      if (data.success) {
        setEditingInvoice(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInvoice = async (id: number, invNumber: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Invoice ${invNumber}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`${API}/invoices/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Invoice deleted successfully!");
        await fetchInvoices();
      } else {
        alert("Failed to delete invoice");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting invoice");
    }
  };

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

  const handleTransaction = (type: string) => {
    setDropdownOpen(false);

    switch (type) {
      case "invoice":
        setShowInvoiceForm(true);
        break;
      case "payment":
        setPayingInvoice(null);
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

  const handlePayInvoice = (inv: Invoice) => {
    setOpenMenu(null);
    setPayingInvoice({
      id: inv.id,
      invoice_number: inv.invoice_number,
      total: inv.total,
      status: inv.status,
    });
    setShowPaymentForm(true);
  };

  // Tailwind badge classes (base + status color), replaces .badge / .badge--* CSS
  const getStatusClass = (status: string) => {
    const base =
      "inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize";
    switch (status?.toLowerCase()) {
      case "paid":
        return `${base} bg-green-100 text-green-700`;
      case "draft":
        return `${base} bg-gray-100 text-gray-600`;
      case "pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "overdue":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const formatCurrency = (amount: number, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const handleSendInvoice = async (invoiceId: number, invNumber: string) => {
    setOpenMenu(null);
    try {
      const res = await fetch(`${API}/invoices/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId, email: customer.email, invNumber }),
      });
      if (res.ok) alert("Invoice sent successfully!");
    } catch (err) {
      alert("Failed to send email");
    }
  };

  const downloadPdf = async (url: string, filename: string, failMessage: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("PDF request failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert(failMessage);
    }
  };

  const handleDownloadInvoice = async (invoiceId: number) => {
    setOpenMenu(null);

    try {
      const res = await fetch(`${API}/invoices/${invoiceId}`);
      const data = await res.json();

      if (data.success) {
        setAutoDownload(true);
        setViewInvoice(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadReceipt = (paymentId: number, paymentNumber?: string) => {
    downloadPdf(
      `${API}/payments/${paymentId}/receipt`,
      `${paymentNumber || "receipt-" + paymentId}.pdf`,
      "Failed to download receipt"
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleOpenInvoice = async (invoiceId: number) => {
    try {
      const res = await fetch(`${API}/invoices/${invoiceId}`);
      const data = await res.json();

      if (data.success) {
        setViewInvoice(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenReceipt = async (paymentId: number) => {
    try {
      const res = await fetch(`${API}/payments/${paymentId}`);

      const data = await res.json();

      if (data.success) {
        setViewReceipt(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (viewReceipt) {
    return (
      <ReceiptView
        payment={viewReceipt}
        customer={customer}
        onClose={() => setViewReceipt(null)}
      />
    );
  }

  const handleEditPayment = async (paymentId: number) => {
    try {
      const res = await fetch(`${API}/payments/${paymentId}`);

      const data = await res.json();

      if (data.success) {
        setEditingPayment({
          ...data.data,
          amount: Number(data.data.amount) || 0,
        });

        setShowPaymentForm(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePayment = async (paymentId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/payments/${paymentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        alert("Payment deleted successfully");
        fetchPayments();
        fetchInvoices();
      } else {
        alert("Failed to delete payment: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("An error occurred while deleting the payment. Check the console for details.");
    }
  };

  if (editingInvoice) {
    return (
      <CreateInvoice
        customer={customer}
        invoice={editingInvoice}
        onClose={() => {
          setEditingInvoice(null);
          fetchAllData();
        }}
      />
    );
  }

  if (viewInvoice) {
    return (
      <InvoiceView
        invoice={viewInvoice}
        customer={customer}
        autoDownload={autoDownload}
        onClose={() => {
          setViewInvoice(null);
          setAutoDownload(false);
        }}
        onPay={() => {
          setPayingInvoice({
            id: viewInvoice.id,
            invoice_number: viewInvoice.invoice_number,
            total: viewInvoice.total,
            status: viewInvoice.status,
          });

          setViewInvoice(null);
          setShowPaymentForm(true);
        }}
      />
    );
  }

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
        invoice={payingInvoice}
        payment={
          editingPayment
            ? {
                ...editingPayment,
                payment_number: editingPayment.payment_number || "",
              }
            : null
        }
        onClose={() => {
          setShowPaymentForm(false);
          setPayingInvoice(null);
          setEditingPayment(null);
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

  const activeMenuInvoice = openMenu !== null ? invoices.find((i) => i.id === openMenu) : undefined;

  return (
    <div className="p-3 sm:p-5 bg-[#f5f7fb] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{customer.name}</h2>

        <div className="flex gap-2.5">
          <button
            className="px-4 py-2 border border-gray-300 bg-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-100 text-sm"
            onClick={onEdit}
          >
            ✏ Edit
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-blue-600 text-white px-3.5 py-2 rounded-md cursor-pointer text-sm font-normal"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              New Transaction
              <span className="ml-2 text-[10px]">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 top-[42px] bg-white border border-gray-200 rounded-lg w-[200px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] list-none py-1.5 z-[1000]">
                <li
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-100"
                  onClick={() => handleTransaction("invoice")}
                >
                  Invoice
                </li>
                <li
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-100"
                  onClick={() => handleTransaction("payment")}
                >
                  Customer Payment
                </li>
                <li
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-100"
                  onClick={() => handleTransaction("estimate")}
                >
                  Estimate
                </li>
                <li
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-100"
                  onClick={() => handleTransaction("sales-order")}
                >
                  Sales Order
                </li>
                <li
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-100"
                  onClick={() => handleTransaction("credit-note")}
                >
                  Credit Note
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-5 border-b border-gray-200 mb-5 overflow-x-auto whitespace-nowrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`bg-transparent border-none py-3 cursor-pointer font-medium relative shrink-0 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-5">
        {activeTab === "overview" && (
          <div className="w-full md:w-[280px] shrink-0 md:sticky md:top-5 h-fit">
            <div className="bg-white rounded-xl p-[18px] mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="w-[60px] h-[60px] rounded-full bg-blue-600 text-white flex justify-center items-center text-2xl font-bold mb-3">
                {customer.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="m-0 text-gray-900 text-lg font-semibold">{customer.name}</h3>
              <p className="text-gray-500 mt-1 break-words text-sm">{customer.email}</p>
            </div>

            <div className="bg-white rounded-xl p-[18px] mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <h4 className="mb-4 text-gray-900 text-[15px] font-semibold">Address</h4>
              <div className="mb-3">
                <span className="block text-xs text-gray-500 mb-1">Billing</span>
                <p className="m-0 text-gray-900 text-sm">{customer.billing_address || "Not Added"}</p>
              </div>
              <div className="mb-3">
                <span className="block text-xs text-gray-500 mb-1">Shipping</span>
                <p className="m-0 text-gray-900 text-sm">{customer.shipping_address || "Not Added"}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-[18px] mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <h4 className="mb-4 text-gray-900 text-[15px] font-semibold">Other Details</h4>
              <div className="mb-3">
                <span className="block text-xs text-gray-500 mb-1">Type</span>
                <p className="m-0 text-gray-900 text-sm">{customer.customer_type || "Business"}</p>
              </div>
              <div className="mb-3">
                <span className="block text-xs text-gray-500 mb-1">Currency</span>
                <p className="m-0 text-gray-900 text-sm">{customer.currency || "INR"}</p>
              </div>
              <div className="mb-3">
                <span className="block text-xs text-gray-500 mb-1">Phone</span>
                <p className="m-0 text-gray-900 text-sm">{customer.phone_work || "-"}</p>
              </div>
              {customer.location && (
                <div className="mb-3">
                  <span className="block text-xs text-gray-500 mb-1">Location</span>
                  <p className="m-0 text-gray-900 text-sm">{customer.location}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {loading && (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              Loading customer data...
            </div>
          )}

          {!loading && activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                <div className="bg-white rounded-xl p-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <h4 className="text-gray-500 mb-2.5 text-sm font-normal">Receivables</h4>
                  <h2 className="m-0 text-gray-900 text-xl font-semibold">
                    {formatCurrency(stats.receivables, customer.currency)}
                  </h2>
                </div>
                <div className="bg-white rounded-xl p-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <h4 className="text-gray-500 mb-2.5 text-sm font-normal">Unused Credits</h4>
                  <h2 className="m-0 text-gray-900 text-xl font-semibold">
                    {formatCurrency(stats.unusedCredits, customer.currency)}
                  </h2>
                </div>
                <div className="bg-white rounded-xl p-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <h4 className="text-gray-500 mb-2.5 text-sm font-normal">Total Income</h4>
                  <h2 className="m-0 text-gray-900 text-xl font-semibold">
                    {formatCurrency(stats.totalIncome, customer.currency)}
                  </h2>
                </div>
                <div className="bg-white rounded-xl p-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <h4 className="text-gray-500 mb-2.5 text-sm font-normal">Invoices</h4>
                  <h2 className="m-0 text-gray-900 text-xl font-semibold">{stats.invoiceCount}</h2>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 min-h-[300px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                <h3 className="mb-5 text-gray-900 text-base font-semibold">Income Overview</h3>
                {chartData.length > 0 && chartData[0].month !== "No Data" ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(val: any) => formatCurrency(val, customer.currency)} />
                      <Area type="monotone" dataKey="amount" stroke="#2563eb" fill="#93c5fd" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[220px] border-2 border-dashed border-gray-300 rounded-[10px] flex justify-center items-center text-gray-400">
                    No invoice data yet
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-xl mt-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                <h3 className="text-gray-900 text-base font-semibold mb-3">Recent Activity</h3>
                {invoices.length === 0 ? (
                  <p className="text-gray-500 text-sm">No activity yet</p>
                ) : (
                  invoices.slice(0, 5).map((inv) => (
                    <div
                      key={inv.id}
                      className="border-l-[3px] border-blue-600 pl-[15px] mb-[15px] text-gray-700 last:mb-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <strong>{inv.invoice_number}</strong> created —{" "}
                          <span className={getStatusClass(inv.status)}>{inv.status}</span>
                        </div>
                        <span className="text-xs text-gray-400">{inv.invoice_date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {!loading && activeTab === "transactions" && (
            <div className="bg-white rounded-xl p-5 overflow-x-auto shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <h3 className="text-gray-900 text-base font-semibold mb-3">Invoices</h3>
              {invoices.length === 0 ? (
                <div className="bg-white p-10 rounded-xl text-center text-gray-500">
                  No invoices found for this customer
                </div>
              ) : (
                <table className="w-full border-collapse min-w-[640px]">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Invoice No</th>
                      <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Date</th>
                      <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Due Date</th>
                      <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Status</th>
                      <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Amount</th>
                      <th className="px-3 py-3 border-b border-gray-200 text-center bg-gray-50 font-semibold w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">
                          <strong
                            onClick={() => handleOpenInvoice(inv.id)}
                            title="Click to view invoice"
                            className="text-blue-600 cursor-pointer underline"
                          >
                            {inv.invoice_number}
                          </strong>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">{formatDate(inv.invoice_date)}</td>
                        <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">{formatDate(inv.due_date)}</td>
                        <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">
                          <span className={getStatusClass(inv.status)}>{inv.status}</span>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">
                          {formatCurrency(inv.total, customer.currency)}
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 text-center w-20">
                          <button
                            className="border-none bg-transparent text-[22px] cursor-pointer px-2 py-0.5 leading-none rounded-md text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleToggleMenu(e, inv.id)}
                          >
                            ⋯
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {payments.length > 0 && (
                <>
                  <h3 className="text-gray-900 text-base font-semibold mb-3 mt-6">Payments</h3>
                  <table className="w-full border-collapse min-w-[640px]">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Date</th>
                        <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Mode</th>
                        <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Reference</th>
                        <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Amount</th>
                        <th className="px-3 py-3 border-b border-gray-200 text-left bg-gray-50 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((pay) => (
                        <tr key={pay.id}>
                          <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">{formatDate(pay.payment_date)}</td>
                          <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">{pay.payment_method}</td>
                          <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">{pay.reference_number || "-"}</td>
                          <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">
                            {formatCurrency(pay.amount, customer.currency)}
                          </td>
                          <td className="px-3 py-3 border-b border-gray-200 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                className="px-2.5 py-1.5 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                                onClick={() => handleOpenReceipt(pay.id)}
                              >
                                View
                              </button>

                              <button
                                className="px-2.5 py-1.5 text-xs rounded-md border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                onClick={() => handleEditPayment(pay.id)}
                              >
                                Edit
                              </button>

                              <button
                                className="px-2.5 py-1.5 text-xs rounded-md border border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                                onClick={() => handleDeletePayment(pay.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              No comments available
            </div>
          )}
          {activeTab === "related" && (
            <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              Related records will appear here
            </div>
          )}
          {activeTab === "mails" && (
            <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              Email history will appear here
            </div>
          )}
          {activeTab === "statement" && (
            <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              Customer statement will appear here
            </div>
          )}
        </div>
      </div>

      {activeMenuInvoice &&
        menuCoords &&
        createPortal(
          <div
            className="cd-action-menu w-[190px] bg-white border border-gray-200 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.15)] z-[9999] overflow-hidden"
            style={{ position: "fixed", top: menuCoords.top, left: menuCoords.left }}
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100"
              onClick={() => handleEditInvoice(activeMenuInvoice)}
            >
              Edit
            </div>
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100"
              onClick={() => handleDeleteInvoice(activeMenuInvoice.id, activeMenuInvoice.invoice_number)}
            >
              Delete
            </div>
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100"
              onClick={() => handleSendInvoice(activeMenuInvoice.id, activeMenuInvoice.invoice_number)}
            >
              Send Invoice
            </div>
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100"
              onClick={() => handleDownloadInvoice(activeMenuInvoice.id)}
            >
              Download Invoice
            </div>
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100"
              onClick={() => handlePayInvoice(activeMenuInvoice)}
            >
              Pay Invoice
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomerDetails;