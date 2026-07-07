// import React from "react";

// export default function CashFlowStatement() {
//   const operatingCashIn = 150000;
//   const supplierPayments = 50000;
//   const expensePayments = 25000;

//   const investingOut = 30000;
//   const investingIn = 10000;

//   const financingIn = 50000;
//   const financingOut = 20000;

//   const operatingNet =
//     operatingCashIn - supplierPayments - expensePayments;

//   const investingNet =
//     investingIn - investingOut;

//   const financingNet =
//     financingIn - financingOut;

//   const netCashFlow =
//     operatingNet + investingNet + financingNet;

//   const openingBalance = 100000;
//   const closingBalance =
//     openingBalance + netCashFlow;

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-2xl font-semibold">
//         Cash Flow Statement
//       </h1>

//       <div className="overflow-x-auto rounded-lg border">
//         <table className="min-w-full">
//           <tbody>

//             <tr className="bg-gray-100">
//               <td className="px-4 py-3 font-semibold">
//                 Operating Activities
//               </td>
//               <td />
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Cash Received From Customers
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{operatingCashIn.toLocaleString()}
//               </td>
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Payments To Suppliers
//               </td>
//               <td className="px-4 py-2 text-right">
//                 (₹{supplierPayments.toLocaleString()})
//               </td>
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Operating Expenses
//               </td>
//               <td className="px-4 py-2 text-right">
//                 (₹{expensePayments.toLocaleString()})
//               </td>
//             </tr>

//             <tr className="font-semibold">
//               <td className="px-4 py-2">
//                 Net Cash From Operating Activities
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{operatingNet.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="bg-gray-100">
//               <td className="px-4 py-3 font-semibold">
//                 Investing Activities
//               </td>
//               <td />
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Asset Purchases
//               </td>
//               <td className="px-4 py-2 text-right">
//                 (₹{investingOut.toLocaleString()})
//               </td>
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Asset Sales
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{investingIn.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="font-semibold">
//               <td className="px-4 py-2">
//                 Net Cash From Investing Activities
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{investingNet.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="bg-gray-100">
//               <td className="px-4 py-3 font-semibold">
//                 Financing Activities
//               </td>
//               <td />
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Owner Investment
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{financingIn.toLocaleString()}
//               </td>
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Loan Repayment
//               </td>
//               <td className="px-4 py-2 text-right">
//                 (₹{financingOut.toLocaleString()})
//               </td>
//             </tr>

//             <tr className="font-semibold">
//               <td className="px-4 py-2">
//                 Net Cash From Financing Activities
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{financingNet.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="border-t-2 font-bold">
//               <td className="px-4 py-3">
//                 Net Increase In Cash
//               </td>
//               <td className="px-4 py-3 text-right">
//                 ₹{netCashFlow.toLocaleString()}
//               </td>
//             </tr>

//             <tr>
//               <td className="px-4 py-2">
//                 Opening Cash Balance
//               </td>
//               <td className="px-4 py-2 text-right">
//                 ₹{openingBalance.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="font-bold bg-green-50">
//               <td className="px-4 py-3">
//                 Closing Cash Balance
//               </td>
//               <td className="px-4 py-3 text-right">
//                 ₹{closingBalance.toLocaleString()}
//               </td>
//             </tr>

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { reportService } from '../../services/api.service';
import { getDateRangeBounds } from '../../utils/dateRange';

interface CashFlowTimelineRow {
  month: string;
  cashIn: number;
  cashOut: number;
  net: number;
}

interface CashFlowData {
  timeline: CashFlowTimelineRow[];
  summary: { totalCashIn: number; totalCashOut: number; netCashFlow: number };
}

const DATE_RANGE_OPTIONS = [
  { value: 'this_fiscal_year', label: 'This Fiscal Year' },
  { value: 'last_fiscal_year', label: 'Last Fiscal Year' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'this_month', label: 'This Month' },
];

export default function CashFlowStatement() {
  const [dateRange, setDateRange] = useState(DATE_RANGE_OPTIONS[0].value);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [data, setData] = useState<CashFlowData | null>(null);

  const fetchData = async () => {
    setStatus('loading');
    try {
      const { from, to } = getDateRangeBounds(dateRange);
      const response = await reportService.getCashFlow({ from, to }) as CashFlowData;
      setData(response);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load Cash Flow Statement', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Cash Flow Statement</h1>
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {DATE_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex items-center gap-2 py-12 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading report…
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-start gap-3 py-12 text-sm text-gray-600">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            Couldn't load the report.
          </div>
          <button onClick={fetchData} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Try again
          </button>
        </div>
      )}

      {status === 'ready' && data && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Month</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Cash In</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Cash Out</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Net</th>
              </tr>
            </thead>
            <tbody>
              {data.timeline.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-400">No data for this period</td>
                </tr>
              ) : (
                data.timeline.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2 text-sm">{row.month}</td>
                    <td className="px-4 py-2 text-right text-sm text-green-700">₹{row.cashIn.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right text-sm text-red-700">(₹{row.cashOut.toLocaleString()})</td>
                    <td className="px-4 py-2 text-right text-sm font-medium">₹{row.net.toLocaleString()}</td>
                  </tr>
                ))
              )}
              <tr className="border-t-2 font-bold bg-gray-50">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right text-green-700">₹{data.summary.totalCashIn.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-red-700">(₹{data.summary.totalCashOut.toLocaleString()})</td>
                <td className="px-4 py-3 text-right">₹{data.summary.netCashFlow.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}