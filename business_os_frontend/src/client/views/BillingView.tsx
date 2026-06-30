import React, { useState } from "react";
import InvoiceList from "../components/billing/InvoiceList";
import PaymentList from "../components/billing/PaymentList";
import ExpenseList from "../components/billing/ExpenseList";
import CreateInvoice from "../components/billing/CreateInvoice";

type BillingTab =
  | "invoices"
  | "payments"
  | "expenses"
  | "create-invoice";

const BillingView: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<BillingTab>("invoices");

  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  return (
    <div className="h-screen bg-white flex flex-col">

      {/* Top Toolbar */}
      {/* <div className="h-14 border-b flex items-center justify-between px-6 bg-white">

        <div className="flex items-center gap-4">

          <select className="text-lg font-medium outline-none border-none bg-transparent">
            <option>All Invoices</option>
          </select>

        </div>

        <button
          onClick={() => setActiveTab("create-invoice")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded text-sm font-medium"
        >
          + New
        </button>

      </div> */}

      {/* Tabs */}
      {/* <div className="border-b bg-white px-6">

        <div className="flex gap-8">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as BillingTab)
              }
              className={`py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

      </div> */}

      {/* Content */}
      <div className="flex-1 overflow-hidden">

        {activeTab === "invoices" && (
  <InvoiceList
    onInvoiceUpdate={() => {}}
    onNewInvoice={() => setActiveTab("create-invoice")}
    
  />
)}

        {activeTab === "payments" && (
          <PaymentList />
        )}

        {activeTab === "expenses" && (
          <ExpenseList />
        )}

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