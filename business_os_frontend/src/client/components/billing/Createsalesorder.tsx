import React, { useEffect, useState, useRef } from "react";
import "./Createsalesorder.css";

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

  const generateOrderNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(`SO-${random}`);
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
        generateOrderNumber();
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

  return (
    <div className="create-sales-order-page">
      <div className="sales-order-title-bar">
        <h1>Create Sales Order</h1>
        <button className="close-btn" onClick={onClose}>
          Back to Details
        </button>
      </div>

      <div className="sales-order-card">
        {/* Header */}
        <div className="sales-order-header">
          <div>
            <label>Sales Order Number</label>
            <input value={orderNumber} readOnly />
          </div>
          <div>
            <label>Order Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div>
            <label>Expected Shipment Date</label>
            <input
              type="date"
              value={shipmentDate}
              onChange={(e) => setShipmentDate(e.target.value)}
            />
          </div>
        </div>

        {/* Customer Search with Autocomplete */}
        <div className="form-group" ref={searchRef} style={{ position: "relative" }}>
          <label>
            Customer Name
            {customerId && (
              <span className="customer-id-badge"> ✅ ID: {customerId}</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Search customer by name..."
            value={customerSearch}
            onChange={(e) => handleCustomerSearch(e.target.value)}
            autoComplete="off"
            className={!customerId && customerSearch ? "input-warn" : ""}
          />

          {showDropdown && customerOptions.length > 0 && (
            <ul className="customer-dropdown">
              {customerOptions.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="customer-dropdown-item"
                >
                  <span className="dropdown-name">{c.display_name}</span>
                  <span className="dropdown-email">{c.email}</span>
                </li>
              ))}
            </ul>
          )}

          {showDropdown && customerOptions.length === 0 && customerSearch.length > 0 && (
            <ul className="customer-dropdown">
              <li className="customer-dropdown-item no-result">No customers found</li>
            </ul>
          )}
        </div>

        {/* Items Table */}
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.item_name}
                    placeholder="Product Name"
                    onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                  />
                </td>
                <td>₹{item.amount.toFixed(2)}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-item-btn" onClick={addItem}>
          + Add Item
        </button>

        {/* Totals */}
        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>GST (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Sales Order
        </button>
      </div>
    </div>
  );
};

export default CreateSalesOrder;