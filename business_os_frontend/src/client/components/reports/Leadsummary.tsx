import React, { useEffect, useMemo, useState } from "react";
import { Target, AlertCircle, Search } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface LeadRow {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: "New" | "Contacted" | "Qualified" | "Lost" | "Won";
  assigned_to_name: string | null;
  created_at: string;
}

interface LeadSummaryData {
  total_leads: number;
  status_breakdown: Record<string, number>;
  source_breakdown: { source: string; count: number }[];
  leads: LeadRow[];
}

const formatDate = (value: string | null) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const statusStyles: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-purple-100 text-purple-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-gray-200 text-gray-600",
};

const statusCardStyles: Record<string, string> = {
  New: "border-blue-200 bg-blue-50",
  Contacted: "border-yellow-200 bg-yellow-50",
  Qualified: "border-purple-200 bg-purple-50",
  Won: "border-green-200 bg-green-50",
  Lost: "border-gray-200 bg-gray-50",
};

export default function LeadSummary() {
  const [data, setData] = useState<LeadSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await reportService.getLeadSummary();
        setData(result as LeadSummaryData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredLeads = useMemo(() => {
    if (!data) return [];
    let list = data.leads;
    if (statusFilter) list = list.filter((l) => l.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.assigned_to_name?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [data, search, statusFilter]);

  const wrapperStyle: React.CSSProperties = { fontFamily: "'Times New Roman', Times, serif" };

  if (loading) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Lead Summary</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading lead data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Lead Summary</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 py-20">
          <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700">Error Loading Report</h2>
          <p className="mt-2 text-center text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.total_leads === 0) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">Lead Summary</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Target className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">No Leads Yet</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            This report will populate once leads are added to the CRM.
          </p>
        </div>
      </div>
    );
  }

  const statuses: (keyof typeof statusStyles)[] = ["New", "Contacted", "Qualified", "Won", "Lost"];

  return (
    <div className="w-full bg-white p-6" style={wrapperStyle}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Lead Summary</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads"
            className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={wrapperStyle}
          />
        </div>
      </div>

      {/* Status summary cards — click to filter */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <button
          onClick={() => setStatusFilter(null)}
          className={`rounded-lg border p-3 text-left ${
            statusFilter === null ? "border-gray-400 bg-gray-100" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <p className="text-xs text-gray-500">Total Leads</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{data.total_leads}</p>
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? null : status)}
            className={`rounded-lg border p-3 text-left ${statusCardStyles[status]} ${
              statusFilter === status ? "ring-2 ring-offset-1 ring-gray-400" : ""
            }`}
          >
            <p className="text-xs text-gray-600">{status}</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {data.status_breakdown[status] || 0}
            </p>
          </button>
        ))}
      </div>

      {/* Source breakdown */}
      {data.source_breakdown.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">Leads by Source</h3>
          <div className="flex flex-wrap gap-2">
            {data.source_breakdown.map((s) => (
              <span
                key={s.source}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
              >
                {s.source}: <span className="font-semibold">{s.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lead list */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Source</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Assigned To</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex flex-col text-xs">
                    {lead.email && <span>{lead.email}</span>}
                    {lead.phone && <span>{lead.phone}</span>}
                    {!lead.email && !lead.phone && <span>—</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{lead.source || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{lead.assigned_to_name || "Unassigned"}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(lead.created_at)}</td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}