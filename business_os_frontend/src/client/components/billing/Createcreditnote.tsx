import React, { useEffect, useState, useRef } from "react";

interface CreditNoteItem {
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

interface CreateCreditNoteProps {
  customer: any;
  onClose: () => void;
}

const CREDIT_REASONS = [
  "Sales Return",
  "Damaged Goods",
  "Order Cancelled",
  "Pricing Error",
  "Other",
];

const fieldInput =
  "w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600 transition-colors";
const fieldLabel = "block mb-2 text-gray-700 font-semibold text-sm";

const CreateCreditNote: React.FC<CreateCreditNoteProps> = ({ customer, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [creditNoteNumber, setCreditNoteNumber] = useState("");
  const [creditNoteDate, setCreditNoteDate] = useState(getTodayDate());
  const [reason, setReason] = useState(CREDIT_REASONS[0]);

  // Customer search state
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<CreditNoteItem[]>([
    { item_name: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  useEffect(() => {
    generateCreditNoteNumber();

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

  const generateCreditNoteNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setCreditNoteNumber(`CN-${random}`);
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

  const handleSelectCustomer = (customer: CustomerOption) => {
    setCustomerSearch(customer.display_name);
    setCustomerId(customer.id);
    setCustomerOptions([]);
    setShowDropdown(false);
  };

  const handleItemChange = (
    index: number,
    field: keyof CreditNoteItem,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "item_name" ? value : Number(value),
    };
    updatedItems[index].amount =
      updatedItems[index].quantity * updatedItems[index].rate;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { item_name: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((total, item) => total + item.amount, 0);
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;

  const handleSave = async () => {
    if (!customerId) {
      alert("Please select a valid customer from the dropdown.");
      return;
    }

    const payload = {
      customer_id: customerId,
      credit_note_number: creditNoteNumber,
      credit_note_date: creditNoteDate,
      reason,
      status: "Draft",
      subtotal,
      tax,
      total: grandTotal,
      items,
    };

    try {
      const response = await fetch("http://localhost:5000/api/credit-notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Credit Note Created Successfully!");
        generateCreditNoteNumber();
        setCustomerSearch("");
        setCustomerId(null);
        setReason(CREDIT_REASONS[0]);
        setItems([{ item_name: "", quantity: 1, rate: 0, amount: 0 }]);
      } else {
        alert(data.message || "Failed to Save Credit Note");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 truncate">
          Create Credit Note
        </h1>
        <button
          className="px-3.5 sm:px-4.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold cursor-pointer hover:bg-gray-100 transition-colors text-xs sm:text-sm shrink-0"
          onClick={onClose}
        >
          Back to Details
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
          <div>
            <label className={fieldLabel}>Credit Note Number</label>
            <input value={creditNoteNumber} readOnly className={`${fieldInput} bg-gray-50`} />
          </div>
          <div>
            <label className={fieldLabel}>Credit Note Date</label>
            <input
              type="date"
              value={creditNoteDate}
              onChange={(e) => setCreditNoteDate(e.target.value)}
              className={fieldInput}
            />
          </div>
          <div>
            <label className={fieldLabel}>Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className={fieldInput}>
              {CREDIT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer Search with Autocomplete */}
        <div className="mb-6 relative" ref={searchRef}>
          <label className={fieldLabel}>
            Customer Name
            {customerId && (
              <span className="text-[11px] text-green-600 font-medium ml-2 bg-green-100 px-2 py-0.5 rounded-full">
                {" "}
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
            className={`${fieldInput} ${
              !customerId && customerSearch ? "border-amber-500 bg-amber-50" : ""
            }`}
          />

          {showDropdown && customerOptions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 list-none mt-1 py-1 max-h-56 overflow-y-auto">
              {customerOptions.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="flex flex-col px-3.5 py-2.5 gap-0.5 cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{c.display_name}</span>
                  <span className="text-xs text-gray-500">{c.email}</span>
                </li>
              ))}
            </ul>
          )}

          {showDropdown && customerOptions.length === 0 && customerSearch.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 list-none mt-1 py-1">
              <li className="px-3.5 py-2.5 text-gray-400 text-[13px] cursor-default">No customers found</li>
            </ul>
          )}
        </div>

        {/* Items Table - horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full border-collapse mt-5 min-w-[560px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold rounded-tl-lg min-w-[180px]">
                  Item Name
                </th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold w-20">Qty</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold w-24">Rate</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold w-28">Amount</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold rounded-tr-lg w-24">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      value={item.item_name}
                      placeholder="Product Name"
                      onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                      className="w-full px-2.5 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600 text-sm"
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="w-full px-2.5 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600 text-sm"
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      className="w-full px-2.5 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600 text-sm"
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200 text-sm">₹{item.amount.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      className="px-3.5 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors text-xs sm:text-sm whitespace-nowrap"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="mt-4 px-4.5 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm"
          onClick={addItem}
        >
          + Add Item
        </button>

        {/* Totals */}
        <div className="w-full md:w-80 md:ml-auto mt-7 bg-gray-50 p-4 sm:p-4.5 rounded-lg">
          <div className="flex justify-between mb-3 text-gray-700 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700 text-sm sm:text-base">
            <span>GST (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-3 mt-3 text-lg sm:text-xl font-bold text-gray-900">
            <span>Total Credit</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="mt-6 w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors text-sm font-semibold"
          onClick={handleSave}
        >
          Save Credit Note
        </button>
      </div>
    </div>
  );
};

export default CreateCreditNote;