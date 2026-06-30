// import React, { useState } from "react";
// import InvoiceList from "../components/billing/InvoiceList";
// import PaymentList from "../components/billing/PaymentList";
// import ExpenseList from "../components/billing/ExpenseList";
// import CreateInvoice from "../components/billing/CreateInvoice";

// type BillingTab = "invoices" | "payments" | "expenses" | "create-invoice";

// const BillingView: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<BillingTab>("invoices");

//   const tabs = [
//     { id: "invoices", label: "Invoices" },
//     { id: "payments", label: "Payments" },
//     { id: "expenses", label: "Expenses" },
//   ];

//   return (
//     <div className="w-full h-full bg-white">
//       {/* 1. Simplified Header (Matching "Active Items" style) */}
//       <div className="flex justify-between items-center p-6 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-800">Billing</h1>
//         <button
//           onClick={() => setActiveTab("create-invoice")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
//         >
//           <span>+</span> New
//         </button>
//       </div>

//       {/* 2. Compact Tabs */}
//       <div className="flex gap-6 px-6 border-b border-gray-200">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as BillingTab)}
//             className={`py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === tab.id
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* 3. Main Content Area (Lists only, no cards) */}
//       <div className="p-0">
//         {activeTab === "invoices" && <InvoiceList onInvoiceUpdate={() => {}} />}
//         {activeTab === "payments" && <PaymentList />}
//         {activeTab === "expenses" && <ExpenseList />}
//         {activeTab === "create-invoice" && (
//           <CreateInvoice
//             customer={{} as any}
//             onClose={() => setActiveTab("invoices")}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BillingView;

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

  const tabs = [
    { id: "invoices", label: "Invoices" },
    { id: "payments", label: "Payments" },
    { id: "expenses", label: "Expenses" },
  ];

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
      <div className="border-b bg-white px-6">

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

      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">

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
  );
};

export default BillingView;