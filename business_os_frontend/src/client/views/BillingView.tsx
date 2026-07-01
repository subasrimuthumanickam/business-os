import React, { useState } from "react";
import InvoiceList from "../components/billing/InvoiceList";
import PaymentList from "../components/billing/PaymentList";
import ExpenseList from "../components/billing/ExpenseList";
import CreateInvoice from "../components/billing/CreateInvoice";
import InvoiceView from "../components/billing/InvoiceView";
import CreatePayment from "../components/billing/Createpayment";

type BillingTab =
  | "invoices"
  | "payments"
  | "expenses"
  | "create-invoice";

const BillingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BillingTab>("invoices");

  // Invoice editing — full invoice object fetched before opening CreateInvoice
  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  // InvoiceView — for clicking invoice number, PDF, Print
  const [viewingInvoice, setViewingInvoice] = useState<any>(null);
  const [autoDownload, setAutoDownload] = useState(false);

  // CreatePayment — for Record Payment button
  const [payingInvoice, setPayingInvoice] = useState<any>(null);

  const API = "http://localhost:5000/api";

  // Fetch full invoice (with items + customer details) before opening Edit or View
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
  };

  // ─── Early-return swap pattern (same as CustomerDetails.tsx) ────────────

  // CreatePayment
  if (payingInvoice) {
    return (
      <CreatePayment
        customer={{
          id: viewingInvoice?.customer_id ?? "",
          name: viewingInvoice?.customer_name ?? "",
          email: viewingInvoice?.customer_email ?? "",
        }}
        invoice={payingInvoice}
        payment={null}
        onClose={() => {
          setPayingInvoice(null);
          setViewingInvoice(null);
        }}
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
        onClose={() => {
          setEditingInvoice(null);
        }}
      />
    );
  }

  // CreateInvoice (new)
  if (activeTab === "create-invoice") {
    return (
      <CreateInvoice
        customer={{} as any}
        onClose={() => setActiveTab("invoices")}
      />
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex-1 overflow-hidden">

        {activeTab === "invoices" && (
          <InvoiceList
            onInvoiceUpdate={() => {}}
            onNewInvoice={() => setActiveTab("create-invoice")}
            onEditInvoice={handleEdit}
            onViewInvoice={handleViewInvoice}
            onPdfInvoice={handlePdf}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {activeTab === "payments" && <PaymentList />}

        {activeTab === "expenses" && <ExpenseList />}

      </div>
    </div>
  );
};

export default BillingView;