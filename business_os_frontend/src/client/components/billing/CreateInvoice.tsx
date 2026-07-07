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
  salesperson_id?: number | null;   

}

interface InvoiceItem {
  product_id?: number | null; // links this line item back to Inventory
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

// NEW — product search result shape, returned by GET /api/products/search?q=
interface ProductOption {
  id: number;
  name: string;
  sku: string;
  price: number;
  unit: string;
}

// Mirrors api.service.ts's getAuthHeaders — this component uses raw fetch()
// instead of apiService, so it needs its own copy of the same auth header
// logic. Without this, every fetch here was silently hitting protected
// routes with no token and getting "Missing authorization token." back.
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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
    { product_id: null, item_name: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  // NEW — per-row product search state. Keyed by row index since each
  // line item has its own independent search box + dropdown, same idea
  // as the single customer search above but repeated per row.
  const [productSearchTerms, setProductSearchTerms] = useState<Record<number, string>>({});
  const [productOptions, setProductOptions] = useState<Record<number, ProductOption[]>>({});
  const [productDropdownOpen, setProductDropdownOpen] = useState<Record<number, boolean>>({});


  const [salespersonId, setSalespersonId] = useState<number | null>(null);
const [employees, setEmployees] = useState<{ id: number; name: string }[]>([]);

  // Combined Initialization Effect
  useEffect(() => {
    if (invoice) {
      setInvoiceNumber(invoice.invoice_number);
      setInvoiceDate(invoice.invoice_date.split("T")[0]);
      setDueDate(invoice.due_date.split("T")[0]);
      setSalespersonId(invoice.salesperson_id ?? null);
      if (invoice.items && invoice.items.length > 0) {
        // Normalize every field before it reaches a controlled input.
        // Older invoice_items rows (saved before product_id existed, or
        // with NULL quantity/rate from a partial insert) would otherwise
        // pass `undefined` straight into value={...}, which is exactly
        // what triggers React's "controlled input becoming uncontrolled"
        // warning.
        const normalizedItems: InvoiceItem[] = invoice.items.map((it: any) => ({
          product_id: it.product_id ?? null,
          item_name: it.item_name ?? "",
          quantity: Number(it.quantity) || 1,
          rate: Number(it.rate) || 0,
          amount: Number(it.amount) || 0,
        }));
        setItems(normalizedItems);
        // Pre-fill each row's search box with its existing item name so
        // editing an invoice doesn't show blank search fields.
        const initialSearches: Record<number, string> = {};
        normalizedItems.forEach((it, idx) => {
          initialSearches[idx] = it.item_name;
        });
        setProductSearchTerms(initialSearches);
      }
    } else {
      generateInvoiceNumber();
    }

    if (customer) {
      setCustomerSearch(customer.name);
      setCustomerId(Number(customer.id));
    }
  }, [customer, invoice]);


  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hrms/employees", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (err) {
      console.error("Employee fetch failed:", err);
    }
  };
  fetchEmployees();
}, []);
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
      const res = await fetch(
        `http://localhost:5000/api/customers/search?q=${encodeURIComponent(value)}`,
        { headers: getAuthHeaders() }
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

  // NEW — product search for a specific line item row, mirrors
  // handleCustomerSearch but scoped to one row index at a time.
  // const handleProductSearch = async (index: number, value: string) => {
  //   setProductSearchTerms((prev) => ({ ...prev, [index]: value }));

  //   // Typing invalidates any previously-selected product for this row —
  //   // the line item is no longer linked until a new option is picked.
  //   const updatedItems = [...items];
  //   updatedItems[index] = { ...updatedItems[index], product_id: null, item_name: value };
  //   setItems(updatedItems);

  //   if (value.trim().length < 1) {
  //     setProductOptions((prev) => ({ ...prev, [index]: [] }));
  //     setProductDropdownOpen((prev) => ({ ...prev, [index]: false }));
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/products/search?q=${encodeURIComponent(value)}`,
  //       { headers: getAuthHeaders() }
  //     );
  //     const data = await res.json();

  //         console.log("Product API Response:", data); // 👈 Add this


  //     if (data.success) {
  //       setProductOptions((prev) => ({ ...prev, [index]: data.data }));
  //       setProductDropdownOpen((prev) => ({ ...prev, [index]: true }));
  //     }
  //   } catch (err) {
  //     console.error("Product search failed:", err);
  //   }
  // };

  const handleProductSearch = async (index: number, value: string) => {
  setProductSearchTerms((prev) => ({
    ...prev,
    [index]: value,
  }));

  const updatedItems = [...items];
  updatedItems[index] = {
    ...updatedItems[index],
    product_id: null,
    item_name: value,
  };
  setItems(updatedItems);

  if (value.trim().length < 1) {
    setProductOptions((prev) => ({
      ...prev,
      [index]: [],
    }));

    setProductDropdownOpen((prev) => ({
      ...prev,
      [index]: false,
    }));

    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/search?q=${encodeURIComponent(
        value
      )}`,
      {
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();

    console.log("Product API Response:", data);

    if (data.success) {
      // Normalize backend response
      const normalizedProducts = data.data.map((product: any) => ({
        id: product.id,
        name:
          product.name ||
          product.product_name ||
          product.item_name ||
          "",

        sku: product.sku || "",

        price:
          Number(
            product.price ||
              product.selling_price ||
              product.rate ||
              0
          ),

        unit: product.unit || "pcs",
      }));

      console.log("Normalized Products:", normalizedProducts);

      setProductOptions((prev) => ({
        ...prev,
        [index]: normalizedProducts,
      }));

      setProductDropdownOpen((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  } catch (error) {
    console.error("Product search failed:", error);
  }
};
  // NEW — selecting a product fills item_name + rate + product_id, and
  // recalculates that row's amount, same as a manual rate edit would.
  // const handleSelectProduct = (index: number, product: ProductOption) => {
  //   const updatedItems = [...items];
  //   const quantity = updatedItems[index].quantity || 1;
  //   updatedItems[index] = {
  //     ...updatedItems[index],
  //     product_id: product.id,
  //     item_name: product.name,
  //     rate: product.price,
  //     amount: quantity * product.price,
  //   };
  //   setItems(updatedItems);

  //   setProductSearchTerms((prev) => ({ ...prev, [index]: product.name }));
  //   setProductOptions((prev) => ({ ...prev, [index]: [] }));
  //   setProductDropdownOpen((prev) => ({ ...prev, [index]: false }));
  // };

  const handleSelectProduct = (
  index: number,
  product: ProductOption
) => {
  const updatedItems = [...items];

  updatedItems[index] = {
    ...updatedItems[index],
    product_id: product.id,
    item_name: product.name,
    rate: Number(product.price),
    amount:
      updatedItems[index].quantity *
      Number(product.price),
  };

  setItems(updatedItems);

  setProductSearchTerms((prev) => ({
    ...prev,
    [index]: product.name,
  }));

  setProductDropdownOpen((prev) => ({
    ...prev,
    [index]: false,
  }));
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

  const addItem = () => {
    setItems([...items, { product_id: null, item_name: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    // Clean up this row's search state so indices don't carry stale data
    // if rows are removed from the middle of the list.
    setProductSearchTerms((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const subtotal = items.reduce((total, item) => total + item.amount, 0);
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;



  const handleSave = async () => {
    if (!customerId) {
      alert("Please select a valid customer.");
      return;
    }

    // Every line item must now be linked to a real product — this is the
    // change that makes Inventory's Transactions tab actually work for
    // invoices, instead of relying on free-text item_name matching.
    const unlinkedRow = items.findIndex((item) => !item.product_id);
    if (unlinkedRow !== -1) {
      alert(`Please select a product from the dropdown for row ${unlinkedRow + 1}.`);
      return;
    }

    const payload = {
      customer_id: customerId,
        salesperson_id: salespersonId,

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
        headers: getAuthHeaders(),
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

        <div className="form-group">
  <label>Sales Person</label>
  <select
    value={salespersonId ?? ""}
    onChange={(e) => setSalespersonId(e.target.value ? Number(e.target.value) : null)}
  >
    <option value="">-- Select Sales Person --</option>
    {employees.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.name}
      </option>
    ))}
  </select>
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
                <td style={{ position: "relative", overflow: "visible" }}>

                  {/* Item Name is now a product search box, not free text.
                      A row is only "complete" once product_id is set via
                      a dropdown selection below. */}
                  <input
                    type="text"
                    value={productSearchTerms[index] ?? item.item_name ?? ""}
                    placeholder="Search product by name or SKU..."
                    onChange={(e) => handleProductSearch(index, e.target.value)}
                    autoComplete="off"
                    className={!item.product_id && (productSearchTerms[index] ?? item.item_name ?? "").trim() !== "" ? "input-warn" : ""}
                  />

                  {/* {productDropdownOpen[index] && (productOptions[index]?.length ?? 0) > 0 && ( */}
                    {/* {(productOptions[index]?.length ?? 0) > 0 && (
                    <ul className="customer-dropdown"
    style={{
      display: "block",
      position: "absolute",
      top: "100%",
      left: 0,
      width: "300px",
      background: "#fff",
      border: "1px solid #ddd",
      zIndex: 999999,
    }}
                    
                    >
                      {productOptions[index].map((p) => (
                        <li
                          key={p.id}
                          onClick={() => handleSelectProduct(index, p)}
                          className="customer-dropdown-item"
                        >
                          <span className="dropdown-name">{p.name}</span>
                          <span className="dropdown-email">
                            {p.sku} · ₹{Number(p.price).toFixed(2)} / {p.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )} */}

                  {/* {productDropdownOpen[index] &&
  productOptions[index] &&
  productOptions[index].length > 0 && (
    <ul
      className="customer-dropdown"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        zIndex: 999999,
        maxHeight: "220px",
        overflowY: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {productOptions[index].map((product) => (
        <li
          key={product.id}
          className="customer-dropdown-item"
          onClick={() =>
            handleSelectProduct(index, product)
          }
        >
          <span className="dropdown-name">
            {product.name}
          </span>

          <span className="dropdown-email">
            {product.sku} • ₹
            {Number(product.price).toFixed(2)} /{" "}
            {product.unit}
          </span>
        </li>
      ))}
    </ul>
)} */}

{productDropdownOpen[index] &&
 productOptions[index]?.length > 0 && (
  <ul
    className="product-dropdown"
    style={{
      position: "absolute",
      top: "45px",
      left: "0",
      width: "100%",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      zIndex: 9999999,
      maxHeight: "220px",
      overflowY: "auto",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}
  >
    {productOptions[index].map((product) => (
      <li
        key={product.id}
        onClick={() => handleSelectProduct(index, product)}
        style={{
          padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #eee"
        }}
      >
        <div>
          <strong>{product.name}</strong>
        </div>

        <div style={{ fontSize: "12px", color: "#666" }}>
          {product.sku} • ₹{product.price}
        </div>
      </li>
    ))}
  </ul>
)}

                  {productDropdownOpen[index] &&
                    (productOptions[index]?.length ?? 0) === 0 &&
                    (productSearchTerms[index]?.length ?? 0) > 0 && (
                      <ul className="customer-dropdown">
                        <li className="customer-dropdown-item no-result">No products found</li>
                      </ul>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity ?? 1}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate ?? 0}
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