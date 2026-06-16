import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

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
  };
}

const incomeData = [
  { month: "Jan", amount: 1500 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 4500 },
  { month: "Apr", amount: 6000 },
  { month: "May", amount: 8500 },
  { month: "Jun", amount: 12000 }
];

const invoices = [
  {
    invoiceNo: "INV-001",
    date: "2026-06-01",
    status: "Paid",
    amount: "$1200"
  },
  {
    invoiceNo: "INV-002",
    date: "2026-06-10",
    status: "Pending",
    amount: "$950"
  }
];

const activities = [
  "Customer Created",
  "Invoice Generated",
  "Payment Received",
  "Sales Order Created"
];

const CustomerDetails: React.FC<CustomerProps> = ({ customer }) => {

    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="customer-details-page">

      {/* Header */}
      <div className="customer-topbar">
        <h2>{customer.name}</h2>

        <div className="topbar-actions">
          <button className="btn-outline">Edit</button>

          {/* <select className="transaction-dropdown">
            <option>New Transaction</option>
            <option>Invoice</option>
            <option>Customer Payment</option>
            <option>Estimate</option>
            <option>Sales Order</option>
            <option>Credit Note</option>
          </select> */}
          <select
  className="transaction-dropdown"
  onChange={(e) => {
    const value = e.target.value;

    if (value === "invoice") {
      navigate("/billing/create-invoice", {
        state: {
          customerId: customer.id,
          customerName: customer.name
        }
      });
    }
  }}
>
  <option value="">
    New Transaction
  </option>

  <option value="invoice">
    Invoice
  </option>

  <option value="payment">
    Customer Payment
  </option>

  <option value="estimate">
    Estimate
  </option>

  <option value="sales-order">
    Sales Order
  </option>

  <option value="credit-note">
    Credit Note
  </option>
</select>
        </div>
      </div>

      {/* Tabs */}
      <div className="customer-tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "comments" ? "active" : ""}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>

        <button
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>

        <button
          className={activeTab === "related" ? "active" : ""}
          onClick={() => setActiveTab("related")}
        >
          Related Lists
        </button>

        <button
          className={activeTab === "mails" ? "active" : ""}
          onClick={() => setActiveTab("mails")}
        >
          Mails
        </button>

        <button
          className={activeTab === "statement" ? "active" : ""}
          onClick={() => setActiveTab("statement")}
        >
          Statement
        </button>
      </div>

      <div className="customer-content">

        {/* Sidebar */}
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
              <span>Customer Type</span>
              <p>{customer.customer_type || "Business"}</p>
            </div>

            <div className="info-row">
              <span>Currency</span>
              <p>{customer.currency || "USD"}</p>
            </div>

            <div className="info-row">
              <span>Phone</span>
              <p>{customer.phone_work || "-"}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="customer-main">

          {activeTab === "overview" && (
            // <>
            //   <div className="summary-grid">

            //     <div className="summary-card">
            //       <h4>Receivables</h4>
            //       <h2>$0.00</h2>
            //     </div>

            //     <div className="summary-card">
            //       <h4>Unused Credits</h4>
            //       <h2>$0.00</h2>
            //     </div>

            //     <div className="summary-card">
            //       <h4>Total Income</h4>
            //       <h2>$0.00</h2>
            //     </div>

            //     <div className="summary-card">
            //       <h4>Invoices</h4>
            //       <h2>0</h2>
            //     </div>

            //   </div>

            //   <div className="chart-card">
            //     <h3>Income Overview</h3>
            //     <div className="chart-placeholder">
            //       Income chart will be loaded here
            //     </div>
            //   </div>
            // </>
            <>
  <div className="summary-grid">

    <div className="summary-card">
      <h4>Receivables</h4>
      <h2>$14,500</h2>
    </div>

    <div className="summary-card">
      <h4>Unused Credits</h4>
      <h2>$1,200</h2>
    </div>

    <div className="summary-card">
      <h4>Total Income</h4>
      <h2>$52,400</h2>
    </div>

    <div className="summary-card">
      <h4>Invoices</h4>
      <h2>12</h2>
    </div>

  </div>

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
          <td>USD</td>
          <td>$14,500</td>
        </tr>

        <tr>
          <td>INR</td>
          <td>₹2,50,000</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="chart-card">

    <h3>Income Overview</h3>

    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={incomeData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#2563eb"
          fill="#93c5fd"
        />
      </AreaChart>
    </ResponsiveContainer>

  </div>

  <div className="activity-card">

    <h3>Recent Activity</h3>

    {activities.map((activity, index) => (
      <div key={index} className="timeline-item">
        {activity}
      </div>
    ))}

  </div>
</>
          )}

          {activeTab === "transactions" && (
            <div className="table-card">
              <h3>Transactions</h3>

              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.map((invoice, index) => (
                  <tr key={index}>
                  <td>{invoice.date}</td>
                  <td>{invoice.invoiceNo}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.amount}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="empty-card">
              No comments available
            </div>
          )}

          {activeTab === "related" && (
            <div className="empty-card">
              Related records will appear here
            </div>
          )}

          {activeTab === "mails" && (
            <div className="empty-card">
              Email history will appear here
            </div>
          )}

          {activeTab === "statement" && (
            <div className="empty-card">
              Customer statement will appear here
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;