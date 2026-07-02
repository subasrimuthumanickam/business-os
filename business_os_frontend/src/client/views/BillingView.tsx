import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceList from "../components/billing/InvoiceList";
import PaymentList from "../components/billing/PaymentList";
import ExpenseList from "../components/billing/ExpenseList";
import CreateInvoice from "../components/billing/CreateInvoice";
import InvoiceView from "../components/billing/InvoiceView";
import CreatePayment from "../components/billing/Createpayment";
import ReceiptView from "../components/billing/ReceiptView";
import CreateExpense from "../components/billing/CreateExpense";

const BillingView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive active section from URL path — so sidebar NavLinks work directly.
  // /client/billing/invoices → "invoices"
  // /client/billing/payments → "payments"
  // /client/billing/expenses → "expenses"
  // /client/billing           → "invoices" (default)
  const getSection = () => {
    if (location.pathname.includes('/payments')) return 'payments';
    if (location.pathname.includes('/expenses')) return 'expenses';
    return 'invoices';
  };

  const activeSection = getSection();

  // Invoice editing
  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  // InvoiceView — for view / PDF / print
  const [viewingInvoice, setViewingInvoice] = useState<any>(null);
  const [autoDownload, setAutoDownload] = useState(false);

  // CreatePayment
  const [payingInvoice, setPayingInvoice] = useState<any>(null);
  const [payingCustomer, setPayingCustomer] = useState<any>(null);

  // CreateInvoice (new)
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);

  // CreatePayment (new, from payments tab)
  const [showCreatePayment, setShowCreatePayment] = useState(false);

  const [viewingReceipt, setViewingReceipt] = useState<any>(null);

  const [showCreateExpense, setShowCreateExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  // Clear all overlay states when URL/section changes
  // (e.g. user clicks Payments in sidebar while an invoice is open)
  useEffect(() => {
    setEditingInvoice(null);
    setViewingInvoice(null);
    setPayingInvoice(null);
    setPayingCustomer(null);
    setAutoDownload(false);
    setShowCreateInvoice(false);
    setShowCreatePayment(false);
    setViewingReceipt(null);
    setShowCreateExpense(false);
  setEditingExpense(null);
  }, [location.pathname]);

  const API = "http://localhost:5000/api";

  const fetchInvoice = async (invoiceId: string | number) => {
    const res = await fetch(`${API}/invoices/${invoiceId}`);
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error(data.message || "Failed to fetch invoice");
  };

  const handleEdit = async (invoice: any) => {
    try {
      const full = await fetchInvoice(invoice.id);
      setEditingInvoice(full);
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  const handleViewInvoice = async (invoice: any) => {
    try {
      const full = await fetchInvoice(invoice.id);
      setViewingInvoice(full);
      setAutoDownload(false);
    } catch (err) {
      console.error("View fetch error:", err);
    }
  };

  const handlePdf = async (invoice: any) => {
    try {
      const full = await fetchInvoice(invoice.id);
      setViewingInvoice(full);
      setAutoDownload(true);
    } catch (err) {
      console.error("PDF fetch error:", err);
    }
  };

  const handleRecordPayment = (invoice: any) => {
    setPayingInvoice({
      id: invoice.id,
      invoice_number: invoice.invoiceNumber,
      total: invoice.amount,
      status: invoice.status,
    });
    setPayingCustomer({
      id: invoice.customer_id ?? "",
      name: invoice.clientName ?? "",
      email: invoice.clientEmail ?? "",
    });
  };

  // ─── Early-return swap pattern ───────────────────────────────────────────

  // CreatePayment (from Invoice Record Payment)
  if (payingInvoice) {
    return (
      <CreatePayment
        customer={payingCustomer ?? { id: "", name: "", email: "" }}
        invoice={payingInvoice}
        payment={null}
        onClose={() => {
          setPayingInvoice(null);
          setPayingCustomer(null);
        }}
      />
    );
  }

  // CreatePayment (new, from Payments tab + New)
  if (showCreatePayment) {
    return (
      <CreatePayment
        customer={{ id: "", name: "", email: "" }}
        invoice={null}
        payment={null}
        onClose={() => setShowCreatePayment(false)}
      />
    );
  }

  // InvoiceView (view / PDF / print)
  if (viewingInvoice) {
    return (
      <InvoiceView
        invoice={viewingInvoice}
        customer={{
          name: viewingInvoice.customer_name,
          email: viewingInvoice.customer_email,
          phone_work: viewingInvoice.customer_phone,
          currency: "INR",
        }}
        autoDownload={autoDownload}
        onClose={() => {
          setViewingInvoice(null);
          setAutoDownload(false);
        }}
        onPay={() => {
          setPayingInvoice({
            id: viewingInvoice.id,
            invoice_number: viewingInvoice.invoice_number,
            total: viewingInvoice.total,
            status: viewingInvoice.status,
          });
          setPayingCustomer({
            id: viewingInvoice.customer_id ?? "",
            name: viewingInvoice.customer_name ?? "",
            email: viewingInvoice.customer_email ?? "",
          });
          setViewingInvoice(null);
        }}
      />
    );
  }

  // CreateInvoice (edit existing)
  if (editingInvoice) {
    return (
      <CreateInvoice
        customer={{} as any}
        invoice={editingInvoice}
        onClose={() => setEditingInvoice(null)}
      />
    );
  }

  // CreateInvoice (new)
  if (showCreateInvoice) {
    return (
      <CreateInvoice
        customer={{} as any}
        onClose={() => setShowCreateInvoice(false)}
      />
    );
  }

  if (viewingReceipt) {
  return (
    <ReceiptView
      payment={viewingReceipt}
      customer={{
        name: viewingReceipt.customer_name,
        email: viewingReceipt.customer_email,
        currency: "INR",
      }}
      onClose={() => setViewingReceipt(null)}
    />
  );
}

if (showCreateExpense || editingExpense) {
  return (
    <CreateExpense
      expense={editingExpense}
      onClose={() => {
        setShowCreateExpense(false);
        setEditingExpense(null);
      }}
    />
  );
}

  // ─── Main layout ─────────────────────────────────────────────────────────

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex-1 overflow-hidden">

        {activeSection === "invoices" && (
          <InvoiceList
            onInvoiceUpdate={() => {}}
            onNewInvoice={() => setShowCreateInvoice(true)}
            onEditInvoice={handleEdit}
            onViewInvoice={handleViewInvoice}
            onPdfInvoice={handlePdf}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {activeSection === "payments" && (
          <PaymentList
            onNewPayment={() => setShowCreatePayment(true)}
            onViewReceipt={(payment) => setViewingReceipt(payment)}
          />
        )}

        {activeSection === "expenses" && <ExpenseList 
         onNewExpense={() => setShowCreateExpense(true)}
    onEditExpense={(expense) => setEditingExpense(expense)}
        />}

      </div>
    </div>
  );
};

export default BillingView;