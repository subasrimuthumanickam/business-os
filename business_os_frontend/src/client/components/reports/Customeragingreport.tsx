import React, { useEffect, useMemo, useState } from "react";
import { Users, AlertCircle, Search, ChevronDown, ChevronRight } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface AgingInvoice {
  invoice_id: number;
  invoice_number: string;
  due_date: string | null;
  outstanding: number;
  days_overdue: number;
}

interface AgingRow {
  customer_id: number;
  customer_name: string;
  current: number;
  days_1_30: number;
  days_31_60: number;
  days_61_90: number;
  days_90_plus: number;
  total_outstanding: number;
  invoices: AgingInvoice[];
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

export default function CustomerAgingReport() {
  const [data, setData] = useState<AgingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await reportService.getCustomerAging();
        setData(Array.isArray(result) ? (result as AgingRow[]) : []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) => row.customer_name?.toLowerCase().includes(q));
  }, [data, search]);

  const totals = filteredData.reduce(
    (acc, row) => ({
      current: acc.current + row.current,
      days_1_30: acc.days_1_30 + row.days_1_30,
      days_31_60: acc.days_31_60 + row.days_31_60,
      days_61_90: acc.days_61_90 + row.days_61_90,
      days_90_plus: acc.days_90_plus + row.days_90_plus,
      total_outstanding: acc.total_outstanding + row.total_outstanding,
    }),
    { current: 0, days_1_30: 0, days_31_60: 0, days_61_90: 0, days_90_plus: 0, total_outstanding: 0 }
  );

  const wrapperStyle: React.CSSProperties = { fontFamily: "'Times New Roman', Times, serif" };

  if (loading) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Aging Report</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading aging data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Aging Report</h1>
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
        <h1 className="mb-6 text-2xl font-semibold">Customer Aging Report</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Users className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">No Outstanding Balances</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            All invoices are fully paid, or none are overdue right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6" style={wrapperStyle}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Customer Aging Report</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers"
            className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={wrapperStyle}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">Customer</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Current</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">1-30 Days</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">31-60 Days</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">61-90 Days</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">90+ Days</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <React.Fragment key={row.customer_id}>
                <tr
                  className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  onClick={() =>
                    setExpandedId(expandedId === row.customer_id ? null : row.customer_id)
                  }
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <span className="flex items-center gap-1.5">
                      {expandedId === row.customer_id ? (
                        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                      )}
                      {row.customer_name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(row.current)}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(row.days_1_30)}</td>
                  <td className="px-4 py-3 text-right text-yellow-700">
                    {formatCurrency(row.days_31_60)}
                  </td>
                  <td className="px-4 py-3 text-right text-orange-700">
                    {formatCurrency(row.days_61_90)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">
                    {formatCurrency(row.days_90_plus)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {formatCurrency(row.total_outstanding)}
                  </td>
                </tr>
                {expandedId === row.customer_id && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 px-4 py-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="py-1 pr-4 font-medium">Invoice #</th>
                            <th className="py-1 pr-4 font-medium">Due Date</th>
                            <th className="py-1 pr-4 text-right font-medium">Days Overdue</th>
                            <th className="py-1 text-right font-medium">Outstanding</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.invoices.map((inv) => (
                            <tr key={inv.invoice_id} className="border-t border-gray-200">
                              <td className="py-1.5 pr-4 text-gray-700">{inv.invoice_number}</td>
                              <td className="py-1.5 pr-4 text-gray-600">{formatDate(inv.due_date)}</td>
                              <td
                                className={`py-1.5 pr-4 text-right ${
                                  inv.days_overdue > 0 ? "text-red-600" : "text-gray-600"
                                }`}
                              >
                                {inv.days_overdue > 0 ? inv.days_overdue : "—"}
                              </td>
                              <td className="py-1.5 text-right text-gray-700">
                                {formatCurrency(inv.outstanding)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-gray-800">Total</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.current)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.days_1_30)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.days_31_60)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.days_61_90)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.days_90_plus)}</td>
              <td className="px-4 py-3 text-right text-gray-900">
                {formatCurrency(totals.total_outstanding)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}