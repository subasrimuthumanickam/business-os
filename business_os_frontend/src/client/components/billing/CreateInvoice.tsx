import React, { useEffect, useState, useRef } from "react";

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

// Shared Tailwind class fragments
const labelClass = "block mb-2 text-gray-700 font-semibold text-sm";
const inputClass =
  "w-full p-3 border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:border-blue-600";
const inputWarn = "!border-amber-500 !bg-amber-50";
const dropdownClass =
  "absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-[0_6px_20px_rgba(0,0,0,0.10)] z-[999] list-none mt-1 py-1 max-h-[220px] overflow-y-auto";
const dropdownItemClass =
  "flex flex-col px-3.5 py-2.5 cursor-pointer gap-0.5 transition-colors hover:bg-blue-50";

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
        const normalizedItems: InvoiceItem[] = invoice.items.map((it: any) => ({
          product_id: it.product_id ?? null,
          item_name: it.item_name ?? "",
          quantity: Number(it.quantity) || 1,
          rate: Number(it.rate) || 0,
          amount: Number(it.amount) || 0,
        }));
        setItems(normalizedItems);
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

  const generateInvoiceNumber = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/invoices/next-number", {
        headers: getAuthHeaders(),
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && data.invoiceNumber) {
        setInvoiceNumber(data.invoiceNumber);
        return;
      }
      throw new Error("Next-number endpoint returned no number");
    } catch (err) {
      console.error("Sequential invoice number fetch failed, falling back to random:", err);
      const random = Math.floor(10000 + Math.random() * 90000);
      setInvoiceNumber(`INV-${random}`);
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
    <div className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6 font-['Times_New_Roman',Times,serif]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create Invoice</h1>
        <button
          className="px-4 py-2 border border-gray-300 bg-white rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-100 transition-colors w-fit"
          onClick={onClose}
        >
          Back to Details
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input className={`${inputClass} bg-gray-50`} value={invoiceNumber} readOnly />
          </div>
          <div>
            <label className={labelClass}>Invoice Date</label>
            <input
              type="date"
              className={inputClass}
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input
              type="date"
              className={inputClass}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ Customer Search with Autocomplete */}
        <div className="mb-6 relative" ref={searchRef}>
          <label className={labelClass}>
            Customer Name
            {customerId && (
              <span className="text-[11px] text-green-600 font-medium ml-2 bg-green-100 px-2 py-0.5 rounded-full">
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
            className={`${inputClass} ${!customerId && customerSearch ? inputWarn : ""}`}
          />

          {/* Dropdown */}
          {showDropdown && customerOptions.length > 0 && (
            <ul className={dropdownClass}>
              {customerOptions.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className={dropdownItemClass}
                >
                  <span className="text-sm font-medium text-gray-900">{c.display_name}</span>
                  <span className="text-xs text-gray-500">{c.email}</span>
                </li>
              ))}
            </ul>
          )}

          {/* No results */}
          {showDropdown && customerOptions.length === 0 && customerSearch.length > 0 && (
            <ul className={dropdownClass}>
              <li className="cursor-default text-gray-400 text-[13px] px-3.5 py-2.5">No customers found</li>
            </ul>
          )}
        </div>

        <div className="mb-6">
          <label className={labelClass}>Sales Person</label>
          <select
            className={inputClass}
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
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 min-w-[640px]">
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
                  <td className="p-3 border-b border-gray-200 relative">

                    <input
                      type="text"
                      value={productSearchTerms[index] ?? item.item_name ?? ""}
                      placeholder="Search product by name or SKU..."
                      onChange={(e) => handleProductSearch(index, e.target.value)}
                      autoComplete="off"
                      className={`w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600 ${
                        !item.product_id && (productSearchTerms[index] ?? item.item_name ?? "").trim() !== "" ? inputWarn : ""
                      }`}
                    />

                    {productDropdownOpen[index] &&
                     productOptions[index]?.length > 0 && (
                      <ul className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded-lg z-[9999999] max-h-[220px] overflow-y-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        {productOptions[index].map((product) => (
                          <li
                            key={product.id}
                            onClick={() => handleSelectProduct(index, product)}
                            className="p-2.5 cursor-pointer border-b border-gray-100 hover:bg-blue-50"
                          >
                            <div>
                              <strong className="text-sm">{product.name}</strong>
                            </div>

                            <div className="text-xs text-gray-500">
                              {product.sku} • ₹{product.price}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {productDropdownOpen[index] &&
                      (productOptions[index]?.length ?? 0) === 0 &&
                      (productSearchTerms[index]?.length ?? 0) > 0 && (
                        <ul className={dropdownClass}>
                          <li className="cursor-default text-gray-400 text-[13px] px-3.5 py-2.5">No products found</li>
                        </ul>
                    )}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                      value={item.quantity ?? 1}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-600"
                      value={item.rate ?? 0}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200 whitespace-nowrap">₹{item.amount.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      className="px-3.5 py-2 bg-red-500 text-white rounded-md cursor-pointer text-sm hover:bg-red-600 transition-colors"
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
          className="mt-4 px-[18px] py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"
          onClick={addItem}
        >
          + Add Item
        </button>

        {/* Totals */}
        <div className="w-full md:w-[320px] md:ml-auto mt-8 bg-gray-50 p-[18px] rounded-xl">
          <div className="flex justify-between mb-3 text-gray-700 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700 text-sm">
            <span>GST (18%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-3 mt-3 text-lg sm:text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg cursor-pointer text-[15px] font-semibold hover:bg-green-700 transition-colors w-full sm:w-auto"
          onClick={handleSave}
        >
          Save Invoice
        </button>

      </div>
    </div>
  );
};

export default CreateInvoice;