
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ExpenseAccount {
  id: number;
  name: string;
}

interface PaymentAccount {
  id: number;
  name: string;
  account_type: string;
}

interface LineItem {
  key: string;
  expense_account_id: string;
  notes: string;
  tax_code: string;
  amount: string;
}

interface Props {
  customer?: { id: string; name: string; email?: string } | null;
  expense?: any | null;
  onClose: () => void;
}

const API = "http://localhost:5000/api";

const TAX_OPTIONS = [
  { code: "", label: "None", rate: 0 },
  { code: "GST0", label: "GST0 [0%]", rate: 0 },
  { code: "GST5", label: "GST5 [5%]", rate: 5 },
  { code: "GST12", label: "GST12 [12%]", rate: 12 },
  { code: "GST18", label: "GST18 [18%]", rate: 18 },
  { code: "GST28", label: "GST28 [28%]", rate: 28 },
  { code: "IGST0", label: "IGST0 [0%]", rate: 0 },
  { code: "IGST5", label: "IGST5 [5%]", rate: 5 },
  { code: "IGST12", label: "IGST12 [12%]", rate: 12 },
  { code: "IGST18", label: "IGST18 [18%]", rate: 18 },
  { code: "IGST28", label: "IGST28 [28%]", rate: 28 },
];

const GST_TREATMENTS = [
  "Registered Business - Regular",
  "Registered Business - Composition",
  "Unregistered Business",
  "Consumer",
  "Overseas",
  "Special Economic Zone",
  "Deemed Export",
  "Tax Deductor",
  "SEZ Developer",
];

const STATES = [
  "[AN] - Andaman and Nicobar Islands", "[AP] - Andhra Pradesh", "[AR] - Arunachal Pradesh",
  "[AS] - Assam", "[BR] - Bihar", "[CH] - Chandigarh", "[CT] - Chhattisgarh",
  "[DL] - Delhi", "[GA] - Goa", "[GJ] - Gujarat", "[HR] - Haryana",
  "[HP] - Himachal Pradesh", "[JK] - Jammu and Kashmir", "[JH] - Jharkhand",
  "[KA] - Karnataka", "[KL] - Kerala", "[MP] - Madhya Pradesh", "[MH] - Maharashtra",
  "[MN] - Manipur", "[ML] - Meghalaya", "[MZ] - Mizoram", "[NL] - Nagaland",
  "[OR] - Odisha", "[PB] - Punjab", "[RJ] - Rajasthan", "[SK] - Sikkim",
  "[TN] - Tamil Nadu", "[TG] - Telangana", "[TR] - Tripura", "[UP] - Uttar Pradesh",
  "[UK] - Uttarakhand", "[WB] - West Bengal",
];

const makeKey = () => Math.random().toString(36).slice(2);

const getTaxRate = (code: string) => TAX_OPTIONS.find((t) => t.code === code)?.rate || 0;

const CreateExpense: React.FC<Props> = ({ customer, expense, onClose }) => {
  const [expenseAccounts, setExpenseAccounts] = useState<ExpenseAccount[]>([]);
  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([]);
  const [saving, setSaving] = useState(false);

  const [isItemized, setIsItemized] = useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { key: makeKey(), expense_account_id: "", notes: "", tax_code: "", amount: "" },
  ]);
  const [openLineMenu, setOpenLineMenu] = useState<string | null>(null);

  const [form, setForm] = useState({
    expense_date: new Date().toISOString().split("T")[0],
    paid_by: "",
    expense_account_id: "",
    expense_type: "services" as "goods" | "services",
    sac_code: "",
    currency: "INR",
    amount: "",
    tax_code: "",
    paid_through_id: "",
    vendor_name: "",
    gst_treatment: "",
    vendor_gstin: "",
    destination_of_supply: "",
    reverse_charge: false,
    invoice_reference: "",
    reference_number: "",
    notes: "",
    customer_id: customer?.id || "",
    customer_name: customer?.name || "",
    is_billable: false,
    status: "pending" as "paid" | "pending" | "failed",
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (expense) {
      setForm({
        expense_date: expense.expense_date ? expense.expense_date.split("T")[0] : new Date().toISOString().split("T")[0],
        paid_by: expense.paid_by || "",
        expense_account_id: expense.expense_account_id ? String(expense.expense_account_id) : "",
        expense_type: expense.expense_type || "services",
        sac_code: expense.sac_code || "",
        currency: expense.currency || "INR",
        amount: expense.amount != null ? String(expense.amount) : "",
        tax_code: expense.tax_code || "",
        paid_through_id: expense.paid_through_id ? String(expense.paid_through_id) : "",
        vendor_name: expense.vendor_name || "",
        gst_treatment: expense.gst_treatment || "",
        vendor_gstin: expense.vendor_gstin || "",
        destination_of_supply: expense.destination_of_supply || "",
        reverse_charge: !!expense.reverse_charge,
        invoice_reference: expense.invoice_reference || "",
        reference_number: expense.reference_number || "",
        notes: expense.notes || "",
        customer_id: expense.customer_id || "",
        customer_name: expense.customer_name || "",
        is_billable: !!expense.is_billable,
        status: expense.status || "pending",
      });

      if (expense.is_itemized && Array.isArray(expense.items) && expense.items.length > 0) {
        setIsItemized(true);
        setLineItems(
          expense.items.map((item: any) => ({
            key: makeKey(),
            expense_account_id: String(item.expense_account_id),
            notes: item.notes || "",
            tax_code: item.tax_code || "",
            amount: String(item.amount),
          }))
        );
      }
    }
  }, [expense]);

  const fetchAccounts = async () => {
    try {
      const [expRes, payRes] = await Promise.all([
        axios.get(`${API}/expense-accounts`),
        axios.get(`${API}/payment-accounts`),
      ]);
      setExpenseAccounts(expRes.data?.data || []);
      setPaymentAccounts(payRes.data?.data || []);
    } catch (err) {
      console.error("Failed to load accounts:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ── Itemize helpers ──────────────────────────────────────────
  const addLine = () => {
    setLineItems((prev) => [
      ...prev,
      { key: makeKey(), expense_account_id: "", notes: "", tax_code: "", amount: "" },
    ]);
  };

  const removeLine = (key: string) => {
    setLineItems((prev) => (prev.length > 1 ? prev.filter((l) => l.key !== key) : prev));
    setOpenLineMenu(null);
  };

  const updateLine = (key: string, field: keyof LineItem, value: string) => {
    setLineItems((prev) => prev.map((l) => (l.key === key ? { ...l, [field]: value } : l)));
  };

  const moveLine = (key: string, dir: -1 | 1) => {
    setLineItems((prev) => {
      const idx = prev.findIndex((l) => l.key === key);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
    setOpenLineMenu(null);
  };

  // ── Totals ────────────────────────────────────────────────────
  const itemizedSubtotal = lineItems.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  const itemizedTax = lineItems.reduce(
    (sum, l) => sum + (Number(l.amount) || 0) * (getTaxRate(l.tax_code) / 100),
    0
  );
  const itemizedTotal = itemizedSubtotal + itemizedTax;

  const singleAmount = Number(form.amount) || 0;
  const singleTax = singleAmount * (getTaxRate(form.tax_code) / 100);
  const singleTotal = singleAmount + singleTax;

  const grandTotal = isItemized ? itemizedTotal : singleTotal;

  // ── Drag & drop receipt ──────────────────────────────────────
  const handleDrag = (e: React.DragEvent, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(active);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setReceiptFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setReceiptFile(e.target.files[0]);
    setShowAttachMenu(false);
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.paid_through_id) {
      alert("Please select Paid Through account.");
      return;
    }
    if (isItemized) {
      const invalid = lineItems.some((l) => !l.expense_account_id || !l.amount);
      if (invalid) {
        alert("Please fill Expense Account and Amount for all line items.");
        return;
      }
    } else if (!form.expense_account_id || !form.amount) {
      alert("Please fill Expense Account and Amount.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        expense_date: form.expense_date,
        paid_by: form.paid_by,
        expense_type: form.expense_type,
        sac_code: form.sac_code,
        currency: form.currency,
        paid_through_id: Number(form.paid_through_id),
        vendor_name: form.vendor_name,
        gst_treatment: form.gst_treatment,
        vendor_gstin: form.vendor_gstin,
        destination_of_supply: form.destination_of_supply,
        reverse_charge: form.reverse_charge,
        invoice_reference: form.invoice_reference,
        reference_number: form.reference_number,
        notes: form.notes,
        customer_id: form.customer_id || null,
        customer_name: form.customer_name || null,
        is_billable: form.is_billable,
        status: form.status,
        is_itemized: isItemized,
        ...(isItemized
          ? {
              amount: itemizedTotal,
              items: lineItems.map((l) => ({
                expense_account_id: Number(l.expense_account_id),
                notes: l.notes,
                tax_code: l.tax_code,
                tax_rate: getTaxRate(l.tax_code),
                amount: Number(l.amount),
              })),
            }
          : {
              amount: singleTotal,
              expense_account_id: Number(form.expense_account_id),
              tax_code: form.tax_code,
              tax_rate: getTaxRate(form.tax_code),
            }),
      };

      const res = expense?.id
        ? await axios.put(`${API}/expenses/${expense.id}`, payload)
        : await axios.post(`${API}/expenses`, payload);

      if (res.data?.success) {
        onClose();
      } else {
        alert(res.data?.message || "Failed to save expense");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-8">
          <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-red-500 pb-1">
            {expense?.id ? "Edit Expense" : "Record Expense"}
          </h2>
          <span className="text-sm text-blue-600 cursor-not-allowed opacity-50">Record Mileage</span>
        </div>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
          ✕ Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="flex gap-8 px-8 py-6 max-w-6xl">
          {/* Left column */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expense_date"
                required
                value={form.expense_date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">Paid By</label>
              <input
                type="text"
                name="paid_by"
                value={form.paid_by}
                onChange={handleChange}
                placeholder="Employee / person name"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              />
            </div>

            {/* ── Non-itemized view ── */}
            {!isItemized && (
              <>
                <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
                  <label className="text-sm text-gray-700">
                    Expense Account<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expense_account_id"
                    required={!isItemized}
                    value={form.expense_account_id}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                  >
                    <option value="">Select Account</option>
                    {expenseAccounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
                  <label className="text-sm text-gray-700">Expense Type</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-1.5 text-sm text-gray-700">
                      <input
                        type="radio"
                        checked={form.expense_type === "goods"}
                        onChange={() => setForm({ ...form, expense_type: "goods" })}
                      />
                      Goods
                    </label>
                    <label className="flex items-center gap-1.5 text-sm text-gray-700">
                      <input
                        type="radio"
                        checked={form.expense_type === "services"}
                        onChange={() => setForm({ ...form, expense_type: "services" })}
                      />
                      Services
                    </label>
                  </div>
                </div>

                {form.expense_type === "services" && (
                  <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
                    <label className="text-sm text-gray-700">SAC</label>
                    <input
                      type="text"
                      name="sac_code"
                      value={form.sac_code}
                      onChange={handleChange}
                      placeholder="xxxxxxxxxx"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div className="grid grid-cols-[160px_1fr] gap-x-4">
                  <div />
                  <button
                    type="button"
                    onClick={() => setIsItemized(true)}
                    className="text-sm text-blue-600 hover:underline text-left w-fit"
                  >
                    ⊞ Itemize
                  </button>
                </div>

                <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
                  <label className="text-sm text-gray-700">
                    Amount<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-l-md px-2 py-2 text-sm bg-gray-50 outline-none"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="amount"
                      required={!isItemized}
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* ── Itemized view ── */}
            {isItemized && (
              <div>
                <button
                  type="button"
                  onClick={() => setIsItemized(false)}
                  className="text-sm text-blue-600 hover:underline mb-3"
                >
                  ‹ Back to single expense view
                </button>

                <div className="border border-gray-200 rounded-md overflow-visible">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Expense Account*</th>
                        <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Tax</th>
                        <th className="text-right px-3 py-2 text-xs font-medium text-gray-500 uppercase">Amount*</th>
                        <th className="w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((line) => (
                        <tr key={line.key} className="border-b border-gray-100 align-top">
                          <td className="px-3 py-2">
                            <select
                              value={line.expense_account_id}
                              onChange={(e) => updateLine(line.key, "expense_account_id", e.target.value)}
                              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm w-full outline-none focus:border-blue-500"
                            >
                              <option value="">Select Account</option>
                              {expenseAccounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>{acc.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={line.notes}
                              onChange={(e) => updateLine(line.key, "notes", e.target.value)}
                              placeholder="Notes"
                              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm w-full outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select
                              value={line.tax_code}
                              onChange={(e) => updateLine(line.key, "tax_code", e.target.value)}
                              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm w-full outline-none focus:border-blue-500"
                            >
                              {TAX_OPTIONS.map((t) => (
                                <option key={t.code} value={t.code}>{t.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={line.amount}
                              onChange={(e) => updateLine(line.key, "amount", e.target.value)}
                              placeholder="0.00"
                              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm w-full text-right outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="px-2 py-2 relative text-center">
                            <button
                              type="button"
                              onClick={() => setOpenLineMenu(openLineMenu === line.key ? null : line.key)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ⋯
                            </button>
                            {openLineMenu === line.key && (
                              <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1 text-left">
                                <button type="button" onClick={() => moveLine(line.key, -1)} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                                  Move Up
                                </button>
                                <button type="button" onClick={() => moveLine(line.key, 1)} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                                  Move Down
                                </button>
                                <button type="button" onClick={() => removeLine(line.key)} className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-50">
                                  Remove
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={addLine}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  + Add another line
                </button>

                <div className="mt-3 flex justify-end gap-8 text-sm">
                  <span className="text-gray-500">Sub Total</span>
                  <span className="font-medium text-gray-800 w-28 text-right">
                    {form.currency} {itemizedSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end gap-8 text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium text-gray-800 w-28 text-right">
                    {form.currency} {itemizedTax.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">
                Paid Through<span className="text-red-500">*</span>
              </label>
              <select
                name="paid_through_id"
                required
                value={form.paid_through_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              >
                <option value="">Select Account</option>
                {paymentAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">Vendor</label>
              <input
                type="text"
                name="vendor_name"
                value={form.vendor_name}
                onChange={handleChange}
                placeholder="Enter vendor name"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">Payment Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <hr className="my-2" />

            {/* ── GST section ── */}
            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">
                GST Treatment<span className="text-red-500">*</span>
              </label>
              <select
                name="gst_treatment"
                value={form.gst_treatment}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              >
                <option value="">Select GST Treatment</option>
                {GST_TREATMENTS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">
                Vendor GSTIN<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="vendor_gstin"
                  value={form.vendor_gstin}
                  onChange={handleChange}
                  placeholder="xxxxxxxxxxxxxxx"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                />
                <button type="button" className="text-sm text-blue-600 hover:underline whitespace-nowrap">
                  Validate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">
                Destination Of Supply<span className="text-red-500">*</span>
              </label>
              <select
                name="destination_of_supply"
                value={form.destination_of_supply}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              >
                <option value="">Select State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-start gap-x-4">
              <label className="text-sm text-gray-700 pt-0.5">Reverse Charge</label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.reverse_charge}
                  onChange={(e) => setForm({ ...form, reverse_charge: e.target.checked })}
                />
                Is this transaction applicable for reverse charge?
              </label>
            </div>

            {!isItemized && (
              <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
                <label className="text-sm text-gray-700">
                  Tax<span className="text-red-500">*</span>
                </label>
                <select
                  name="tax_code"
                  value={form.tax_code}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                >
                  {TAX_OPTIONS.map((t) => (
                    <option key={t.code} value={t.code}>{t.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">Invoice#</label>
              <input
                type="text"
                name="invoice_reference"
                value={form.invoice_reference}
                onChange={handleChange}
                placeholder="INV-00015"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-[160px_1fr] items-start gap-x-4">
              <label className="text-sm text-gray-700 pt-2">Notes</label>
              <textarea
                name="notes"
                maxLength={500}
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Max 500 characters"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <hr className="my-2" />

            <div className="grid grid-cols-[160px_1fr] items-center gap-x-4">
              <label className="text-sm text-gray-700">Customer Name</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  placeholder="Search customer"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full outline-none focus:border-blue-500"
                />
                <label className="flex items-center gap-1.5 text-sm text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={form.is_billable}
                    onChange={(e) => setForm({ ...form, is_billable: e.target.checked })}
                  />
                  Billable
                </label>
              </div>
            </div>

            {/* Grand total preview */}
            <div className="flex justify-end gap-8 text-sm pt-2 border-t">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="font-semibold text-gray-900 w-28 text-right">
                {form.currency} {grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Right column - receipt upload */}
          <div className="w-72 shrink-0">
            <div
              onDragOver={(e) => handleDrag(e, true)}
              onDragLeave={(e) => handleDrag(e, false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md h-64 flex flex-col items-center justify-center text-center px-4 transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              {receiptFile ? (
                <p className="text-sm text-gray-700 break-all px-2">{receiptFile.name}</p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Drag &amp; drop file to upload</p>
                  <p className="text-xs text-gray-400 mt-1">(Maximum file size allowed is 7MB)</p>
                </>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachMenu((p) => !p)}
                className="w-full flex items-center justify-center gap-1 border rounded-b-md py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                📎 Attach Receipt ▾
              </button>
              {showAttachMenu && (
                <div className="absolute left-0 right-0 top-10 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1">
                  <label className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Attach from Desktop
                    <input type="file" className="hidden" onChange={handleFileSelect} />
                  </label>
                  <button type="button" className="w-full text-left px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                    Attach from Cloud
                  </button>
                  <button type="button" className="w-full text-left px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                    Attach from Documents
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t px-8 py-4 flex gap-3 bg-white sticky bottom-0">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpense;