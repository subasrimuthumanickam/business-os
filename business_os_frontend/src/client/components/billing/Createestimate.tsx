import React, { useEffect, useState, useRef } from "react";

interface EstimateItem {
  product_id?: number | null;
  item_name: string;
  description: string;
  quantity: number;
  rate: number;
  discount_percent: number;
  tax_rate_id: number | null;
  amount: number;
}

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

interface SalespersonOption {
  id: number;
  name: string;
}

interface ProjectOption {
  id: number;
  name: string;
}

interface PriceListOption {
  id: number;
  name: string;
}

interface TaxRateOption {
  id: number;
  name: string;
  rate_percent: number;
}

interface CreateEstimateProps {
  customer: any;
  onClose: () => void;
}

const API = "http://localhost:5000/api";

const emptyItem = (): EstimateItem => ({
  product_id: null,
  item_name: "",
  description: "",
  quantity: 1,
  rate: 0,
  discount_percent: 0,
  tax_rate_id: null,
  amount: 0,
});

const inputBase =
  "w-full border border-gray-300 rounded px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition-colors";

const CreateEstimate: React.FC<CreateEstimateProps> = ({ customer, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [estimateNumber, setEstimateNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [estimateDate, setEstimateDate] = useState(getTodayDate());
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [termsConditions, setTermsConditions] = useState("");

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [salespersons, setSalespersons] = useState<SalespersonOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [priceLists, setPriceLists] = useState<PriceListOption[]>([]);
  const [taxRates, setTaxRates] = useState<TaxRateOption[]>([]);

  const [salespersonId, setSalespersonId] = useState<number | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [priceListId, setPriceListId] = useState<number | null>(null);

  const [shippingCharges, setShippingCharges] = useState(0);

  const [items, setItems] = useState<EstimateItem[]>([emptyItem()]);

  useEffect(() => {
    fetchNextEstimateNumber();
    loadDropdownData();

    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (customer) {
      setCustomerSearch(customer.name);
      setCustomerId(Number(customer.id));
    }
  }, [customer]);

  const loadDropdownData = async () => {
    try {
      const [employeesRes, projectsRes, priceListsRes, taxRatesRes] = await Promise.all([
        fetch(`${API}/employees`),
        fetch(`${API}/projects`),
        fetch(`${API}/price-lists`),
        fetch(`${API}/tax-rates`),
      ]);

      const employeesData = await employeesRes.json();
      const projectsData = await projectsRes.json();
      const priceListsData = await priceListsRes.json();
      const taxRatesData = await taxRatesRes.json();

      if (employeesData.success) {
        const normalized = (employeesData.data || []).map((emp: any) => ({
          id: emp.id,
          name:
            emp.name ||
            emp.full_name ||
            [emp.first_name, emp.last_name].filter(Boolean).join(" ") ||
            `Employee #${emp.id}`,
        }));
        setSalespersons(normalized);
      }
      if (projectsData.success) setProjects(projectsData.data || []);
      if (priceListsData.success) setPriceLists(priceListsData.data || []);
      if (taxRatesData.success) setTaxRates(taxRatesData.data || []);
    } catch (err) {
      console.error("Failed to load dropdown data:", err);
    }
  };

  const fetchNextEstimateNumber = async () => {
    try {
      const res = await fetch(`${API}/estimates/next-number`);
      const data = await res.json();
      if (data.success) {
        setEstimateNumber(data.data.estimate_number);
      } else {
        setEstimateNumber("EST-00001");
      }
    } catch (err) {
      console.error("Failed to fetch next estimate number:", err);
      setEstimateNumber("EST-00001");
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
      const res = await fetch(`${API}/customers/search?q=${encodeURIComponent(value)}`);
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

  const computeLineAmount = (item: EstimateItem) => {
    const base = item.quantity * item.rate;
    const afterDiscount = base - (base * (item.discount_percent || 0)) / 100;
    return afterDiscount;
  };

  const handleItemChange = (
    index: number,
    field: keyof EstimateItem,
    value: string | number | null
  ) => {
    const updatedItems = [...items];
    const numericFields: (keyof EstimateItem)[] = ["quantity", "rate", "discount_percent"];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: numericFields.includes(field) ? Number(value) : value,
    } as EstimateItem;

    updatedItems[index].amount = computeLineAmount(updatedItems[index]);
    setItems(updatedItems);
  };

  const handleItemTaxChange = (index: number, taxRateId: string) => {
    const updatedItems = [...items];
    updatedItems[index].tax_rate_id = taxRateId ? Number(taxRateId) : null;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, emptyItem()]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((total, item) => total + item.amount, 0);

  const totalTax = items.reduce((total, item) => {
    const rate = taxRates.find((t) => t.id === item.tax_rate_id);
    const pct = rate ? rate.rate_percent : 0;
    return total + (item.amount * pct) / 100;
  }, 0);

  const grandTotal = subtotal + totalTax + (Number(shippingCharges) || 0);

  const resetForm = () => {
    fetchNextEstimateNumber();
    setReferenceNumber("");
    setCustomerSearch("");
    setCustomerId(null);
    setSalespersonId(null);
    setProjectId(null);
    setPriceListId(null);
    setShippingCharges(0);
    setNotes("");
    setTermsConditions("");
    setExpiryDate("");
    setItems([emptyItem()]);
  };

  const buildPayload = (status: string) => ({
    customer_id: customerId,
    estimate_number: estimateNumber,
    reference_number: referenceNumber || null,
    salesperson_id: salespersonId,
    project_id: projectId,
    price_list_id: priceListId,
    estimate_date: estimateDate,
    expiry_date: expiryDate || null,
    status,
    subtotal,
    tax: totalTax,
    shipping_charges: shippingCharges,
    total: grandTotal,
    notes,
    items: items.map((item) => ({
      product_id: item.product_id || null,
      item_name: item.item_name,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      discount_percent: item.discount_percent,
      tax_rate_id: item.tax_rate_id,
      amount: item.amount,
    })),
  });

  const submitEstimate = async (status: string) => {
    if (!customerId) {
      alert("Please select a valid customer from the dropdown.");
      return;
    }

    try {
      const response = await fetch(`${API}/estimates/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(status)),
      });

      const data = await response.json();

      if (response.ok) {
        alert(status === "Draft" ? "Estimate saved as draft!" : "Estimate Created Successfully!");
        resetForm();
      } else {
        alert(data.message || "Failed to Save Estimate");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-serif p-3 sm:p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white border border-gray-200 px-4 sm:px-6 py-4 rounded-t-lg">
        <h1 className="flex items-center text-xl sm:text-2xl md:text-3xl font-normal text-gray-900">
          <span className="mr-2 sm:mr-3">⛁</span>
          <span className="truncate">New Estimate</span>
        </h1>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden sm:inline text-blue-500 cursor-pointer text-sm">💡 Page Tips</span>
          <button
            className="border-none bg-transparent text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* MAIN SHEET */}
      <div className="bg-white border border-t-0 border-gray-200 p-4 sm:p-6 md:p-8">
        {/* Customer */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5 after:content-['*'] after:text-red-600 after:ml-0.5">
            Customer Name
          </label>
          <div className="w-full">
            <div className="relative flex items-center max-w-full md:max-w-xl" ref={searchRef}>
              <input
                type="text"
                placeholder="Search or select a customer"
                value={customerSearch}
                onChange={(e) => handleCustomerSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-l px-3.5 py-2.5 text-sm outline-none focus:border-blue-600"
              />
              <button
                type="button"
                className="w-12 h-[42px] shrink-0 border-none bg-[#d84a2f] text-white cursor-pointer"
              >
                🔍
              </button>
              <span className="ml-2.5 bg-green-600 text-white text-[11px] px-2 py-1 rounded shrink-0">
                {customer?.currency || "INR"}
              </span>

              {showDropdown && customerOptions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50 list-none max-h-64 overflow-y-auto">
                  {customerOptions.map((opt) => (
                    <li
                      key={opt.id}
                      className="p-3 cursor-pointer hover:bg-blue-50 flex flex-col"
                      onClick={() => handleSelectCustomer(opt)}
                    >
                      <span className="font-semibold text-sm">{opt.display_name}</span>
                      <span className="text-gray-500 text-xs">{opt.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-blue-600 mt-4 text-sm">
              <span className="cursor-pointer">📄 Unpaid Invoices</span>
              <span className="text-gray-300">|</span>
              <span className="cursor-pointer">👤 View Customer Details</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-24 mt-6">
              <div>
                <span className="block text-gray-500 text-xs mb-2">BILLING ADDRESS</span>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 no-underline hover:underline text-sm">
                  Add new address
                </a>
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-2">SHIPPING ADDRESS</span>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 no-underline hover:underline text-sm">
                  Add new address
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-0 border-t border-gray-100 my-7" />

        {/* Estimate # */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5 after:content-['*'] after:text-red-600 after:ml-0.5">
            Estimate#
          </label>
          <div className="flex items-center gap-2.5">
            <input value={estimateNumber} readOnly className={`${inputBase} max-w-full md:max-w-[420px] bg-gray-50`} />
            <span className="text-blue-600 text-lg cursor-pointer shrink-0" title="Configure number series">
              ⚙
            </span>
          </div>
        </div>

        {/* Reference # */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5">Reference#</label>
          <div>
            <input
              type="text"
              placeholder="Optional reference number"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className={`${inputBase} max-w-full md:max-w-[420px]`}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <div className="hidden md:block" />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 font-medium mb-2 after:content-['*'] after:text-red-600 after:ml-0.5">
                Estimate Date
              </label>
              <input
                type="date"
                value={estimateDate}
                onChange={(e) => setEstimateDate(e.target.value)}
                className={inputBase}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 font-medium mb-2">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className={inputBase}
              />
            </div>
          </div>
        </div>

        <hr className="border-0 border-t border-gray-100 my-7" />

        {/* Salesperson */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5">Salesperson</label>
          <div>
            <select
              value={salespersonId ?? ""}
              onChange={(e) => setSalespersonId(e.target.value ? Number(e.target.value) : null)}
              className={`${inputBase} max-w-full md:max-w-[420px]`}
            >
              <option value="">Select or Add Salesperson</option>
              {salespersons.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-7">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5">Project Name</label>
          <div>
            <select
              value={projectId ?? ""}
              onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : null)}
              className={`${inputBase} max-w-full md:max-w-[420px]`}
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="border-0 border-t border-gray-100 my-7" />

        {/* Price List */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-6 mb-5">
          <label className="text-sm text-gray-700 font-medium md:pt-2.5">Price List</label>
          <div>
            <select
              value={priceListId ?? ""}
              onChange={(e) => setPriceListId(e.target.value ? Number(e.target.value) : null)}
              className={`${inputBase} max-w-full md:max-w-xs`}
            >
              <option value="">Select a price list</option>
              {priceLists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ITEMS TABLE - scrollable on mobile */}
        <div className="overflow-x-auto mt-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium min-w-[200px]">
                  Item Details
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium w-24">
                  Quantity
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium w-28">
                  Rate
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium w-32">
                  Discount
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium w-40">
                  Tax
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 text-left text-sm font-medium w-28">
                  Amount
                </th>
                <th className="bg-gray-50 border border-gray-200 p-3.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2.5">
                    <input
                      placeholder="Type or click to select an item."
                      value={item.item_name}
                      onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                      className="w-full border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-600"
                    />
                  </td>
                  <td className="border border-gray-200 p-2.5">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="w-full border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-600"
                    />
                  </td>
                  <td className="border border-gray-200 p-2.5">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      className="w-full border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-600"
                    />
                  </td>
                  <td className="border border-gray-200 p-2.5">
                    <div className="flex">
                      <input
                        type="number"
                        value={item.discount_percent}
                        onChange={(e) => handleItemChange(index, "discount_percent", e.target.value)}
                        className="w-full border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-600"
                      />
                      <span className="bg-gray-100 px-2.5 py-2 border border-l-0 border-gray-300 text-sm">%</span>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-2.5">
                    <select
                      value={item.tax_rate_id ?? ""}
                      onChange={(e) => handleItemTaxChange(index, e.target.value)}
                      className="w-full border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-600"
                    >
                      <option value="">Select a Tax</option>
                      {taxRates.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-200 p-2.5 text-right font-semibold text-sm">
                    {item.amount.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 p-2.5 text-center">
                    {items.length > 1 && (
                      <button
                        className="border-none bg-red-500 text-white w-7 h-7 rounded-full cursor-pointer hover:bg-red-600"
                        onClick={() => removeItem(index)}
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="mt-4 bg-white border border-gray-300 px-4 sm:px-5 py-2.5 cursor-pointer text-sm hover:bg-gray-50 rounded"
          onClick={addItem}
        >
          Add another line ▾
        </button>

        <hr className="border-0 border-t border-gray-100 my-7" />

        {/* BOTTOM: Notes + Totals */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10 mt-8">
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-2">Customer Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Looking forward to your business"
                className={inputBase}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-2">Terms &amp; Conditions</label>
              <textarea
                rows={3}
                value={termsConditions}
                onChange={(e) => setTermsConditions(e.target.value)}
                className={inputBase}
              />
            </div>
          </div>

          <div className="border border-gray-200 p-5 sm:p-6 rounded-md bg-gray-50 h-fit">
            <div className="flex justify-between items-center mb-5 text-sm sm:text-base">
              <span>Sub Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-5 text-sm sm:text-base">
              <span>Tax</span>
              <span>{totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-5 gap-3">
              <span className="text-sm sm:text-base flex items-center gap-1">
                Shipping Charges{" "}
                <span className="text-gray-400 cursor-help" title="Additional shipping cost">
                  ⓘ
                </span>
              </span>
              <input
                type="number"
                className="w-24 sm:w-32 border border-gray-300 rounded px-2.5 py-1.5 text-sm outline-none focus:border-blue-600"
                value={shippingCharges}
                onChange={(e) => setShippingCharges(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between items-center border-t-2 border-gray-300 pt-5 text-lg sm:text-2xl font-bold">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            className="px-6 py-3 rounded border border-gray-300 bg-white text-sm cursor-pointer hover:bg-gray-50 order-2 sm:order-1"
            onClick={() => submitEstimate("Draft")}
          >
            Save as Draft
          </button>
          <button
            className="px-6 py-3 rounded border-none bg-[#d84a2f] text-white text-sm cursor-pointer hover:bg-[#c23f26] order-1 sm:order-2"
            onClick={() => submitEstimate("Sent")}
          >
            Save and Send
          </button>
          <button
            className="px-6 py-3 rounded border-none bg-gray-100 text-sm cursor-pointer hover:bg-gray-200 order-3"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimate;