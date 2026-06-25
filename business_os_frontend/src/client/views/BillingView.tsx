import React, { useState } from "react";
import InvoiceList from "../components/billing/InvoiceList";
import PaymentList from "../components/billing/PaymentList";
import ExpenseList from "../components/billing/ExpenseList";
import CreateInvoice from "../components/billing/CreateInvoice";

type BillingTab = "invoices" | "payments" | "expenses" | "create-invoice";

const BillingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BillingTab>("invoices");

  const tabs = [
    { id: "invoices", label: "Invoices" },
    { id: "payments", label: "Payments" },
    { id: "expenses", label: "Expenses" },
  ];

  return (
    <div className="w-full h-full bg-white">
      {/* Top Header Section */}
      <div className="border-b border-gray-200 px-6 pt-6">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Billing</h1>
          <div className="flex gap-3">
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Export
            </button>
            <button
              onClick={() => setActiveTab("create-invoice")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm"
            >
              + New Invoice
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BillingTab)}
              className={`pb-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - No Sidebar */}
      <div className="p-6">
        {activeTab === "invoices" && <InvoiceList onInvoiceUpdate={() => {}} />}
        {activeTab === "payments" && <PaymentList />}
        {activeTab === "expenses" && <ExpenseList />}
        {activeTab === "create-invoice" && (
          <CreateInvoice
            customer={{} as any}
            onClose={() => setActiveTab("invoices")}
          />
        )}
      </div>
    </div>
  );
};

export default BillingView;