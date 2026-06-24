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

interface BillingStats {
  totalRevenue: number;
  paidInvoices: number;
  pendingAmount: number;
  totalInvoices: number;
}

const BillingView: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<BillingTab>("invoices");

  const [stats] = useState<BillingStats>({
    totalRevenue: 45890,
    paidInvoices: 45,
    pendingAmount: 12800,
    totalInvoices: 62,
  });

  const tabs = [
    { id: "invoices", label: "Invoices" },
    { id: "payments", label: "Payments" },
    { id: "expenses", label: "Expenses" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Billing
            </h1>
            <p className="text-gray-500 mt-1">
              Manage invoices, payments and expenses.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
              Export
            </button>

            <button
              onClick={() => setActiveTab("create-invoice")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              + New Invoice
            </button>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="col-span-12 lg:col-span-3">

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

            <div className="p-5 border-b">
              <h2 className="font-semibold text-lg">
                Overview
              </h2>
            </div>

            <div className="divide-y">

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  Total Revenue
                </p>
                <h3 className="text-3xl font-bold mt-1">
                  ${stats.totalRevenue.toLocaleString()}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  Pending Amount
                </p>
                <h3 className="text-3xl font-bold text-orange-600 mt-1">
                  ${stats.pendingAmount.toLocaleString()}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  Paid Invoices
                </p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">
                  {stats.paidInvoices}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">
                  Total Invoices
                </p>
                <h3 className="text-3xl font-bold mt-1">
                  {stats.totalInvoices}
                </h3>
              </div>

            </div>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-12 lg:col-span-9">

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

            {/* Tabs */}
            <div className="border-b px-6">
              <div className="flex gap-8">

                {tabs.map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-medium border-b-2 transition-all
                    ${
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

            {/* Filters */}
            {activeTab !== "create-invoice" && (
              <div className="p-6 border-b">

                <div className="flex flex-col lg:flex-row gap-4 justify-between">

                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="flex gap-3">

                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                      <option>All Status</option>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>

                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                      <option>Last 30 Days</option>
                      <option>This Month</option>
                      <option>This Year</option>
                    </select>

                  </div>

                </div>

              </div>
            )}

            {/* CONTENT */}
            <div className="p-6">

              {activeTab === "invoices" && (
                <InvoiceList onInvoiceUpdate={() => {}} />
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
        </div>

      </div>
    </div>
  );
};

export default BillingView;