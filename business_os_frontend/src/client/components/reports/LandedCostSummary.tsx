import React, { useEffect, useState } from "react";
import { Package, AlertCircle } from "lucide-react";
import { reportService } from "../../services/api.service"; // adjust path to match your project structure

interface LandedCostRow {
  item_name: string;
  quantity: number;
  base_cost: number;
  landed_cost: number;
  landed_cost_per_unit: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

export default function LandedCostSummary() {
  const [data, setData] = useState<LandedCostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // apiService.get() auto-unwraps the { success, data } envelope,
        // so this resolves directly to the array of rows.
        const result = await reportService.getLandedCostSummary();
        setData(Array.isArray(result) ? (result as LandedCostRow[]) : []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totals = data.reduce(
    (acc, row) => ({
      quantity: acc.quantity + Number(row.quantity || 0),
      base_cost: acc.base_cost + Number(row.base_cost || 0),
      landed_cost: acc.landed_cost + Number(row.landed_cost || 0),
    }),
    { quantity: 0, base_cost: 0, landed_cost: 0 }
  );

  if (loading) {
    return (
      <div
        className="w-full bg-white p-6"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <h1 className="mb-6 text-2xl font-semibold">Landed Cost Summary</h1>
        <div className="flex items-center justify-center py-20 text-gray-500">
          Loading landed cost data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full bg-white p-6"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <h1 className="mb-6 text-2xl font-semibold">Landed Cost Summary</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 py-20">
          <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700">
            Error Loading Report
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className="w-full bg-white p-6"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <h1 className="mb-6 text-2xl font-semibold">Landed Cost Summary</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
          <Package className="mb-4 h-12 w-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">
            No Landed Cost Data Available
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Landed Cost Summary requires received purchase orders with
            shipping charges and customs duties.
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">
            This report will populate once purchase orders are marked
            "Received".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white p-6"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <h1 className="mb-6 text-2xl font-semibold">Landed Cost Summary</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">Item</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Base Cost
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Landed Cost
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">
                Landed Cost / Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-800">{row.item_name}</td>
                <td className="px-4 py-3 text-right text-gray-800">
                  {Number(row.quantity)}
                </td>
                <td className="px-4 py-3 text-right text-gray-800">
                  {formatCurrency(row.base_cost)}
                </td>
                <td className="px-4 py-3 text-right text-gray-800">
                  {formatCurrency(row.landed_cost)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {formatCurrency(row.landed_cost_per_unit)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-gray-800">Total</td>
              <td className="px-4 py-3 text-right text-gray-800">
                {totals.quantity}
              </td>
              <td className="px-4 py-3 text-right text-gray-800">
                {formatCurrency(totals.base_cost)}
              </td>
              <td className="px-4 py-3 text-right text-gray-800">
                {formatCurrency(totals.landed_cost)}
              </td>
              <td className="px-4 py-3 text-right text-gray-900">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}