import React, { useEffect, useMemo, useState } from "react";
import { Package, AlertCircle, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface FifoLot {
  lot_id: string;
  po_number: string;
  po_date: string;
  qty_received: number;
  qty_remaining: number;
  unit_cost: number;
  status: "active" | "depleted";
}

interface FifoLedgerEntry {
  date: string;
  type: "purchase" | "sale";
  reference: string;
  quantity: number;
  unit_cost: number;
  lot_id: string;
  remaining_after: number | null;
  note?: string;
}

interface FifoProduct {
  product_id: number;
  item_name: string;
  lots: FifoLot[];
  ledger: FifoLedgerEntry[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

const formatDate = (value: string) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function FifoCostLotTracking() {
  const [products, setProducts] = useState<FifoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await reportService.getFifoCostLotTracking();
        const list = Array.isArray(result) ? (result as FifoProduct[]) : [];
        setProducts(list);
        if (list.length > 0) setSelectedId(list[0].product_id);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.trim().toLowerCase();
    return products.filter((p) => p.item_name.toLowerCase().includes(q));
  }, [products, search]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.product_id === selectedId) || null,
    [products, selectedId]
  );

  const wrapperStyle: React.CSSProperties = { fontFamily: "'Times New Roman', Times, serif" };

  if (loading) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">FIFO Cost Lot Tracking</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading FIFO lot data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">FIFO Cost Lot Tracking</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 py-20">
          <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700">Error Loading Report</h2>
          <p className="mt-2 text-center text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full bg-white p-6" style={wrapperStyle}>
        <h1 className="mb-6 text-2xl font-semibold">FIFO Cost Lot Tracking</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Package className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">No Lot Data Available</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            FIFO tracking requires received purchase orders with matching product line items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-white" style={{ ...wrapperStyle, minHeight: "600px" }}>
      {/* Left pane — product list */}
      <div className="w-72 shrink-0 border-r border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <h1 className="mb-3 text-lg font-semibold text-gray-900">FIFO Cost Lot Tracking</h1>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items"
              className="w-full rounded-md border border-gray-300 py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={wrapperStyle}
            />
          </div>
        </div>
        <ul className="max-h-[560px] overflow-y-auto">
          {filteredProducts.map((p) => {
            const activeLots = p.lots.filter((l) => l.status === "active").length;
            const isSelected = p.product_id === selectedId;
            return (
              <li key={p.product_id}>
                <button
                  onClick={() => setSelectedId(p.product_id)}
                  className={`flex w-full flex-col items-start gap-0.5 border-b border-gray-100 px-4 py-3 text-left text-sm ${
                    isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <span className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                    {p.item_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {activeLots} active lot{activeLots !== 1 ? "s" : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right pane — lot summary + ledger */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedProduct ? (
          <>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">{selectedProduct.item_name}</h2>

            {/* Lot summary cards */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProduct.lots.map((lot) => (
                <div
                  key={lot.lot_id}
                  className={`rounded-lg border p-3 ${
                    lot.status === "active" ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">{lot.po_number}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        lot.status === "active" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {lot.status === "active" ? "Active" : "Depleted"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{formatDate(lot.po_date)}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-600">
                      {lot.qty_remaining} / {lot.qty_received} left
                    </span>
                    <span className="font-medium text-gray-800">{formatCurrency(lot.unit_cost)}/unit</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ledger timeline */}
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Ledger</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-2 font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-2 font-semibold text-gray-700">Reference</th>
                    <th className="px-4 py-2 font-semibold text-gray-700">Lot</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-700">Qty</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-700">Unit Cost</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-700">Lot Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.ledger.map((entry, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">{formatDate(entry.date)}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                            entry.type === "purchase"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {entry.type === "purchase" ? (
                            <ArrowDownRight className="h-3 w-3" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3" />
                          )}
                          {entry.type === "purchase" ? "Purchase" : "Sale"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">{entry.reference}</td>
                      <td className="px-4 py-2 text-gray-500">{entry.lot_id}</td>
                      <td
                        className={`px-4 py-2 text-right font-medium ${
                          entry.quantity < 0 ? "text-red-600" : "text-green-700"
                        }`}
                      >
                        {entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}
                      </td>
                      <td className="px-4 py-2 text-right text-gray-700">{formatCurrency(entry.unit_cost)}</td>
                      <td className="px-4 py-2 text-right text-gray-700">
                        {entry.remaining_after !== null ? entry.remaining_after : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedProduct.ledger.some((e) => e.note) && (
              <p className="mt-2 text-xs text-gray-400">
                * Some sales exceed tracked purchase lots and have no cost basis on record.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">Select an item to view its FIFO lot ledger.</p>
        )}
      </div>
    </div>
  );
}