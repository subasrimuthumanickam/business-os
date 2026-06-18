import React, { useEffect, useState, useRef } from "react";
import "./Createpayment.css";

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

interface CreatePaymentProps {
  customer: any;
  onClose: () => void;
}

const PAYMENT_MODES = ["Cash", "Bank Transfer", "UPI", "Cheque", "Card", "Other"];

const CreatePayment: React.FC<CreatePaymentProps> = ({ customer, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(getTodayDate());
  const [amount, setAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [notes, setNotes] = useState("");

  // Customer search state
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generatePaymentNumber();

    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Auto-fill customer from props
  useEffect(() => {
    if (customer) {
      setCustomerSearch(customer.name);
      setCustomerId(Number(customer.id));
    }
  }, [customer]);

  const generatePaymentNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setPaymentNumber(`PMT-${random}`);
  };

  const handleCustomerSearch = async (value: string) => {
    setCustomerSearch(value);
    setCustomerId(null);

    if (value.trim().length < 1) {
      setCustomerOptions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/customers/search?q=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      if (data.success) {
        setCustomerOptions(data.data);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Customer search failed:", err);
    }
  };

  const handleSelectCustomer = (c: CustomerOption) => {
    setCustomerSearch(c.display_name);
    setCustomerId(c.id);
    setCustomerOptions([]);
    setShowDropdown(false);
  };

  const handleSave = async () => {
    if (!customerId) {
      alert("Please select a valid customer from the dropdown.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount received.");
      return;
    }

    const payload = {
      customer_id: customerId,
      payment_number: paymentNumber,
      payment_date: paymentDate,
      amount,
      payment_mode: paymentMode,
      reference_number: referenceNumber || null,
      notes: notes || null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Payment Recorded Successfully!");
        generatePaymentNumber();
        setCustomerSearch("");
        setCustomerId(null);
        setAmount(0);
        setPaymentMode(PAYMENT_MODES[0]);
        setReferenceNumber("");
        setNotes("");
      } else {
        alert(data.message || "Failed to Save Payment");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div className="pay-page">
      <div className="pay-titlebar">
        <h1>Customer Payment</h1>
        <button className="pay-close-btn" onClick={onClose}>
          Back to Details
        </button>
      </div>

      <div className="pay-card">
        {/* Row 1: Number / Date / Mode */}
        <div className="pay-header-grid">
          <div className="pay-field">
            <label>Payment Number</label>
            <input className="pay-readonly" value={paymentNumber} readOnly />
          </div>
          <div className="pay-field">
            <label>Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div className="pay-field">
            <label>Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              {PAYMENT_MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Customer Search */}
        <div className="pay-field pay-customer-field" ref={searchRef}>
          <label>
            Customer Name
            {customerId && <span className="pay-id-badge">✅ ID: {customerId}</span>}
          </label>
          <input
            type="text"
            placeholder="Search customer by name..."
            value={customerSearch}
            onChange={(e) => handleCustomerSearch(e.target.value)}
            autoComplete="off"
            className={!customerId && customerSearch ? "pay-input-warn" : ""}
          />

          {showDropdown && customerOptions.length > 0 && (
            <ul className="pay-dropdown">
              {customerOptions.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="pay-dropdown-item"
                >
                  <span className="pay-dropdown-name">{c.display_name}</span>
                  <span className="pay-dropdown-email">{c.email}</span>
                </li>
              ))}
            </ul>
          )}

          {showDropdown && customerOptions.length === 0 && customerSearch.length > 0 && (
            <ul className="pay-dropdown">
              <li className="pay-dropdown-item pay-no-result">No customers found</li>
            </ul>
          )}
        </div>

        {/* Row 3: Amount + Reference */}
        <div className="pay-amount-grid">
          <div className="pay-field pay-amount-field">
            <label>Amount Received (₹)</label>
            <input
              type="number"
              value={amount}
              min={0}
              placeholder="0.00"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="pay-field">
            <label>Reference Number</label>
            <input
              type="text"
              value={referenceNumber}
              placeholder="UTR / Cheque No / Txn ID"
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Row 4: Notes */}
        <div className="pay-field">
          <label>Notes</label>
          <textarea
            value={notes}
            placeholder="Add a note about this payment (optional)"
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Footer: Summary + Save */}
        <div className="pay-footer">
          <div className="pay-summary">
            <span className="pay-summary-label">Amount Received</span>
            <span className="pay-summary-amount">₹{amount.toFixed(2)}</span>
          </div>
          <button className="pay-save-btn" onClick={handleSave}>
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;