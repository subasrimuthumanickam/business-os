import React, { useEffect, useMemo, useState } from "react";
import { Users, AlertCircle, Search } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface CustomerSummaryRow {
  customer_id: number;
  customer_name: string;
  email: string | null;
  phone: string | null;
  total_invoices: number;
  total_sales: number;
  total_received: number;
  outstanding: number;
  last_invoice_date: string | null;
  status: "Active" | "Inactive" | "No Activity";
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

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-yellow-100 text-yellow-700",
  "No Activity": "bg-gray-100 text-gray-600",
};

export default function CustomerSummary() {
  const [data, setData] = useState<CustomerSummaryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await reportService.getCustomerSummary();
        setData(Array.isArray(result) ? (result as CustomerSummaryRow[]) : []);
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
    return data.filter(
      (row) =>
        row.customer_name?.toLowerCase().includes(q) ||
        row.email?.toLowerCase().includes(q) ||
        row.phone?.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totals = filteredData.reduce(
    (acc, row) => ({
      invoices: acc.invoices + Number(row.total_invoices),
      sales: acc.sales + Number(row.total_sales),
      received: acc.received + Number(row.total_received),
      outstanding: acc.outstanding + Number(row.outstanding),
    }),
    { invoices: 0, sales: 0, received: 0, outstanding: 0 }
  );

  const wrapperStyle: React.CSSProperties = { fontFamily: "'Times New Roman', Times, serif" };

  if (loading) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Summary</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading customer data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Customer Summary</h1>
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
        <h1 className="mb-6 text-2xl font-semibold">Customer Summary</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Users className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">No Customers Yet</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            This report will populate once customers are added and invoiced.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6" style={wrapperStyle}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Customer Summary</h1>
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
              <th className="px-4 py-3 font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Invoices</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Sales</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Received</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Outstanding</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Last Invoice</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.customer_id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{row.customer_name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex flex-col text-xs">
                    {row.email && <span>{row.email}</span>}
                    {row.phone && <span>{row.phone}</span>}
                    {!row.email && !row.phone && <span>—</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-700">{row.total_invoices}</td>
                <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(row.total_sales)}</td>
                <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(row.total_received)}</td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    row.outstanding > 0 ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {formatCurrency(row.outstanding)}
                </td>
                <td className="px-4 py-3 text-gray-600">{formatDate(row.last_invoice_date)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-gray-800">Total</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-right text-gray-800">{totals.invoices}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.sales)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.received)}</td>
              <td className="px-4 py-3 text-right text-gray-800">{formatCurrency(totals.outstanding)}</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}