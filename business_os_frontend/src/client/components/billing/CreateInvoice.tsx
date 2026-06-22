import React, { useEffect, useState, useRef } from "react";
import "./CreateInvoice.css";

interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  items?: InvoiceItem[];
  status: string;
  total: number;
}

interface InvoiceItem {
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface CreateInvoiceProps {
  customer: any;
  invoice?: Invoice;
  onClose: () => void;
}

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({ customer, invoice, onClose }) => {

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(getTodayDate());
  const [dueDate, setDueDate] = useState(getDueDate());

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<InvoiceItem[]>([
    { item_name: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  // Combined Initialization Effect
  useEffect(() => {
    if (invoice) {
      setInvoiceNumber(invoice.invoice_number);
      setInvoiceDate(invoice.invoice_date.split("T")[0]);
      setDueDate(invoice.due_date.split("T")[0]);
      if (invoice.items && invoice.items.length > 0) {
        setItems(invoice.items);
      }
    } else {
      generateInvoiceNumber();
    }

    if (customer) {
      setCustomerSearch(customer.name);
      setCustomerId(Number(customer.id));
    }
  }, [customer, invoice]);

  const generateInvoiceNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setInvoiceNumber(`INV-${random}`);
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
      const res = await fetch(`http://localhost:5000/api/customers/search?q=${encodeURIComponent(value)}`);
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

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "item_name" ? value : Number(value),
    };
    updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    setItems(updatedItems);
  };

  const addItem = () => setItems([...items, { item_name: "", quantity: 1, rate: 0, amount: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((total, item) => total + item.amount, 0);
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;

  

  const handleSave = async () => {
    if (!customerId) {
      alert("Please select a valid customer.");
      return;
    }

    const payload = {
      customer_id: customerId,
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,
      due_date: dueDate,
      status: "Draft",
      subtotal,
      tax,
      total: grandTotal,
      items,
    };


    const isEditing = !!invoice;
    const url = isEditing ? `http://localhost:5000/api/invoices/${invoice?.id}` : "http://localhost:5000/api/invoices/create";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(isEditing ? "Invoice Updated!" : "Invoice Created!");
        onClose();
      } else {
        alert("Failed to save.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div className="create-invoice-page">
      <div className="invoice-title-bar">
        <h1>Create Invoice</h1>
        <button className="close-btn" onClick={onClose}>Back to Details</button>
      </div>

      <div className="invoice-card">

        {/* Header */}
        <div className="invoice-header">
          <div>
            <label>Invoice Number</label>
            <input value={invoiceNumber} readOnly />
          </div>
          <div>
            <label>Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ Customer Search with Autocomplete */}
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

          {/* Dropdown */}
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

          {/* No results */}
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
          Save Invoice
        </button>

      </div>
    </div>
  );
};

export default CreateInvoice;