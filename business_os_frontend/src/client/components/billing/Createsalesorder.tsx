import React, { useEffect, useState, useRef } from "react";

interface SalesOrderItem {
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

interface CreateSalesOrderProps {
  customer: any;
  onClose: () => void;
}

// Format a numeric sequence into SO-0001, SO-0002, ... style
const formatOrderNumber = (n: number) => `SO-${String(n).padStart(4, "0")}`;

const CreateSalesOrder: React.FC<CreateSalesOrderProps> = ({ customer, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getShipmentDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split("T")[0];
  };

  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState(getTodayDate());
  const [shipmentDate, setShipmentDate] = useState(getShipmentDate());

  // Customer search state
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<SalesOrderItem[]>([
    { item_name: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  useEffect(() => {
    generateOrderNumber();

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

  // Generates the next sequential order number (SO-0001, SO-0002, ...)
  // by asking the backend for the last order number on record and incrementing it.
  // Requires a backend endpoint that returns the most recent order_number, e.g.
  // GET /api/sales-orders/last -> { success: true, data: { order_number: "SO-0007" } }
  const generateOrderNumber = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sales-orders/last");
      const data = await res.json();

      const lastNumber =
        data?.success && data?.data?.order_number
          ? parseInt(String(data.data.order_number).replace(/\D/g, ""), 10)
          : 0;

      const nextNumber = Number.isFinite(lastNumber) ? lastNumber + 1 : 1;
      setOrderNumber(formatOrderNumber(nextNumber));
    } catch (err) {
      console.error("Could not fetch last order number, defaulting to SO-0001:", err);
      setOrderNumber(formatOrderNumber(1));
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

  const handleSelectCustomer = (customer: CustomerOption) => {
    setCustomerSearch(customer.display_name);
    setCustomerId(customer.id);
    setCustomerOptions([]);
    setShowDropdown(false);
  };

  const handleItemChange = (
    index: number,
    field: keyof SalesOrderItem,
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
      order_number: orderNumber,
      order_date: orderDate,
      expected_shipment_date: shipmentDate,
      status: "Draft",
      subtotal,
      tax,
      total: grandTotal,
      items,
    };

    try {
      const response = await fetch("http://localhost:5000/api/sales-orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sales Order Created Successfully!");
        await generateOrderNumber();
        setCustomerSearch("");
        setCustomerId(null);
        setItems([{ item_name: "", quantity: 1, rate: 0, amount: 0 }]);
      } else {
        alert(data.message || "Failed to Save Sales Order");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  const fieldInputClasses =
    "w-full p-3 border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:border-blue-600 box-border";
  const fieldLabelClasses = "block mb-2 text-gray-700 font-semibold text-sm";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900">Create Sales Order</h1>
        <button
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold cursor-pointer transition-colors hover:bg-gray-100"
          onClick={onClose}
        >
          Back to Details
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div>
            <label className={fieldLabelClasses}>Sales Order Number</label>
            <input className={`${fieldInputClasses} bg-gray-50 text-gray-500 font-semibold`} value={orderNumber} readOnly />
          </div>
          <div>
            <label className={fieldLabelClasses}>Order Date</label>
            <input
              type="date"
              className={fieldInputClasses}
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div>
            <label className={fieldLabelClasses}>Expected Shipment Date</label>
            <input
              type="date"
              className={fieldInputClasses}
              value={shipmentDate}
              onChange={(e) => setShipmentDate(e.target.value)}
            />
          </div>
        </div>

        {/* Customer Search with Autocomplete */}
        <div className="relative mb-6" ref={searchRef}>
          <label className={fieldLabelClasses}>
            Customer Name
            {customerId && (
              <span className="ml-2 text-[11px] text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
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
            className={`${fieldInputClasses} ${
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

        {/* Items Table — scrolls horizontally on small screens instead of squashing */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse min-w-[640px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold">Item Name</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold">Qty</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold">Rate</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold">Amount</th>
                <th className="p-3.5 text-left text-gray-700 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      className="w-full p-2.5 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-600"
                      value={item.item_name}
                      placeholder="Product Name"
                      onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-600"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-600"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">₹{item.amount.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      className="px-3.5 py-2 bg-red-500 text-white border-none rounded-md cursor-pointer hover:bg-red-600 transition-colors"
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
          className="mt-4 px-4.5 py-2.5 bg-blue-600 text-white border-none rounded-lg cursor-pointer transition-colors hover:bg-blue-700"
          onClick={addItem}
        >
          + Add Item
        </button>

        {/* Totals */}
        <div className="w-full lg:w-80 lg:ml-auto mt-7 bg-gray-50 p-4.5 rounded-lg">
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>GST (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-3 mt-3 text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="w-full sm:w-auto mt-6 px-6 py-3 bg-green-600 text-white border-none rounded-lg cursor-pointer text-[15px] font-semibold transition-colors hover:bg-green-700"
          onClick={handleSave}
        >
          Save Sales Order
        </button>
      </div>
    </div>
  );
};

export default CreateSalesOrder;