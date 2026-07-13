import React, { useEffect, useMemo, useState } from "react";
import { Receipt, AlertCircle, Search } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface TransactionRow {
  type: "Invoice" | "Payment";
  reference: string;
  date: string;
  customer_id: number;
  customer_name: string;
  amount: number;
  status: string | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

const formatDate = (value: string | null) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function CustomerTransactions() {
  const [data, setData] = useState<TransactionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Invoice" | "Payment">("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await reportService.getCustomerTransactions();
        setData(Array.isArray(result) ? (result as TransactionRow[]) : []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    let list = data;
    if (typeFilter !== "All") list = list.filter((row) => row.type === typeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (row) =>
          row.customer_name?.toLowerCase().includes(q) || row.reference?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [data, search, typeFilter]);

  const totals = filteredData.reduce(
    (acc, row) => {
      if (row.type === "Invoice") acc.invoiced += row.amount;
      else acc.received += row.amount;
      return acc;
    },
    { invoiced: 0, received: 0 }
  );

  const wrapperStyle: React.CSSProperties = { fontFamily: "'Times New Roman', Times, serif" };

  if (loading) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Transactions</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading transactions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Transactions</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 py-20">
          <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700">Error Loading Report</h2>
          <p className="mt-2 text-center text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Transactions</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Receipt className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">No Transactions Yet</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Invoices and payments will show up here once recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6" style={wrapperStyle}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Customer Transactions</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex overflow-hidden rounded-md border border-gray-300 text-sm">
            {(["All", "Invoice", "Payment"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 ${
                  typeFilter === t ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or reference"
              className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={wrapperStyle}
            />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Total Transactions</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{filteredData.length}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-xs text-gray-600">Total Invoiced</p>
          <p className="mt-1 text-xl font-semibold text-blue-700">{formatCurrency(totals.invoiced)}</p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-xs text-gray-600">Total Received</p>
          <p className="mt-1 text-xl font-semibold text-green-700">{formatCurrency(totals.received)}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Reference</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Customer</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{formatDate(row.date)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.type === "Invoice"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.reference}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{row.customer_name}</td>
                <td className="px-4 py-3 text-gray-500">{row.status || "—"}</td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    row.type === "Invoice" ? "text-blue-700" : "text-green-700"
                  }`}
                >
                  {formatCurrency(row.amount)}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">
                  No transactions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}