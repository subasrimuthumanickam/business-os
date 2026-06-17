import React from "react";
import { Package } from "lucide-react";

export default function LandedCostSummary() {
  return (
    <div
      className="w-full bg-white p-6"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <h1 className="mb-6 text-2xl font-semibold">
        Landed Cost Summary
      </h1>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20">
        <Package className="mb-4 h-12 w-12 text-gray-400" />

        <h2 className="text-lg font-semibold text-gray-700">
          No Landed Cost Data Available
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Landed Cost Summary requires purchase orders,
          shipping charges, customs duties, and inventory receipts.
        </p>

        <p className="mt-1 text-center text-sm text-gray-500">
          This report will become available after the Purchase
          and Inventory modules are implemented.
        </p>
      </div>
    </div>
  );
}