import React, { useEffect, useState, useRef } from "react";

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

interface PayableInvoice {
  id: number;
  invoice_number: string;
  total: number;
  status?: string;
}

interface PaymentData {
  id: number;
  payment_number: string;
  payment_date: string;
  amount: number;
  payment_method: string;
  reference_number?: string;
  notes?: string;
}

interface CreatePaymentProps {
  customer: any;
  invoice?: PayableInvoice | null;
  payment?: PaymentData | null;
  onClose: () => void;
}

const PAYMENT_MODES = ["Cash", "Bank Transfer", "UPI", "Cheque", "Card", "Other"];

// Format a numeric sequence into PMT-0001, PMT-0002, ... style
const formatPaymentNumber = (n: number) => `PMT-${String(n).padStart(4, "0")}`;

const CreatePayment: React.FC<CreatePaymentProps> = ({ customer, invoice, payment, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(getTodayDate());
  const [amount, setAmount] = useState<number>(Number(invoice?.total) || 0);
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
    // Only auto-generate a fresh sequential number when creating a NEW payment.
    // If we're editing an existing payment, its number is set from the `payment` prop effect below.
    if (!payment) {
      generatePaymentNumber();
    }

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

  useEffect(() => {
    if (payment) {
      setPaymentNumber(payment.payment_number || "");
      setPaymentDate(payment.payment_date ? payment.payment_date.split("T")[0] : getTodayDate());
      setAmount(payment.amount || 0);
      setPaymentMode(payment.payment_method || PAYMENT_MODES[0]);
      setReferenceNumber(payment.reference_number || "");
      setNotes(payment.notes || "");
    }
  }, [payment]);

  // Generates the next sequential payment number (PMT-0001, PMT-0002, ...)
  // by asking the backend for the last payment number on record and incrementing it.
  // Requires a backend endpoint that returns the most recent payment_number, e.g.
  // GET /api/payments/last -> { success: true, data: { payment_number: "PMT-0007" } }
  const generatePaymentNumber = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments/last");
      const data = await res.json();

      const lastNumber =
        data?.success && data?.data?.payment_number
          ? parseInt(String(data.data.payment_number).replace(/\D/g, ""), 10)
          : 0;

      const nextNumber = Number.isFinite(lastNumber) ? lastNumber + 1 : 1;
      setPaymentNumber(formatPaymentNumber(nextNumber));
    } catch (err) {
      console.error("Could not fetch last payment number, defaulting to PMT-0001:", err);
      setPaymentNumber(formatPaymentNumber(1));
    }
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
      invoice_id: invoice ? invoice.id : null,
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
        await generatePaymentNumber();
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

  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg text-sm font-inherit outline-none transition-colors box-border focus:border-blue-600";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900">Customer Payment</h1>
        <button
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold cursor-pointer transition-colors hover:bg-gray-100"
          onClick={onClose}
        >
          Back to Details
        </button>
      </div>

      <div className="bg-white rounded-xl p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.06)] max-w-[820px]">
        {/* Invoice context — only shown when paying a specific invoice */}
        {invoice && (
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3.5 mb-6">
            <span className="text-xl">🧾</span>
            <div>
              <strong className="block text-blue-900 text-[15px]">
                Paying Invoice {invoice.invoice_number}
              </strong>
              <span className="text-blue-600 text-[13px] font-semibold">
                Outstanding ₹{(Number(invoice.total) || 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Row 1: Number / Date / Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              Payment Number
            </label>
            <input className={`${inputClasses} bg-gray-50 text-gray-500 font-semibold`} value={paymentNumber} readOnly />
          </div>
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              Payment Date
            </label>
            <input
              type="date"
              className={inputClasses}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              Payment Mode
            </label>
            <select
              className={inputClasses}
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              {PAYMENT_MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Customer Search */}
        <div className="relative mb-5" ref={searchRef}>
          <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
            Customer Name
            {customerId && (
              <span className="text-[11px] text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                ✅ ID: {customerId}
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="Search customer by name..."
            value={customerSearch}
            onChange={(e) => handleCustomerSearch(e.target.value)}
            autoComplete="off"
            className={`${inputClasses} ${
              !customerId && customerSearch ? "border-amber-500 bg-amber-50" : ""
            }`}
          />

          {showDropdown && customerOptions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 list-none mt-1 py-1 max-h-[220px] overflow-y-auto">
              {customerOptions.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="flex flex-col px-3.5 py-2.5 cursor-pointer gap-0.5 transition-colors hover:bg-blue-50"
                >
                  <span className="text-sm font-medium text-gray-900">{c.display_name}</span>
                  <span className="text-xs text-gray-400">{c.email}</span>
                </li>
              ))}
            </ul>
          )}

          {showDropdown && customerOptions.length === 0 && customerSearch.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 list-none mt-1 py-1 max-h-[220px] overflow-y-auto">
              <li className="px-3.5 py-2.5 cursor-default text-gray-300 text-[13px]">
                No customers found
              </li>
            </ul>
          )}
        </div>

        {/* Row 3: Amount + Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              Amount Received (₹)
            </label>
            <input
              type="number"
              className={`${inputClasses} text-xl font-bold text-gray-900`}
              value={amount}
              min={0}
              placeholder="0.00"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              Reference Number
            </label>
            <input
              type="text"
              className={inputClasses}
              value={referenceNumber}
              placeholder="UTR / Cheque No / Txn ID"
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Row 4: Notes */}
        <div className="relative mb-5">
          <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
            Notes
          </label>
          <textarea
            className={`${inputClasses} min-h-[90px] resize-y`}
            value={notes}
            placeholder="Add a note about this payment (optional)"
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Footer: Summary + Save */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 sm:gap-0 mt-2 pt-5 border-t border-gray-200">
          <div className="flex items-baseline gap-2.5">
            <span className="text-gray-500 text-sm">Amount Received</span>
            <span className="text-2xl font-bold text-gray-900">₹{amount.toFixed(2)}</span>
          </div>
          <button
            className="w-full sm:w-auto px-7 py-3 bg-green-600 text-white border-none rounded-lg cursor-pointer text-[15px] font-semibold transition-colors hover:bg-green-700"
            onClick={handleSave}
          >
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;