// // import React, { useEffect, useState, useCallback } from 'react';
// // import { Download, Printer, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
// // import { reportService } from '../../services/api.service';
// // import { getDateRangeBounds } from '../../utils/dateRange';

// // interface ExpenseBreakdown {
// //   category: string;
// //   total: number;
// // }

// // interface PnlData {
// //   revenue: { subtotal: number; tax: number; total: number };
// //   cogs: number;
// //   expenses: { breakdown: ExpenseBreakdown[]; total: number };
// //   grossProfit: number;
// //   netProfit: number;
// // }

// // const DATE_RANGE_OPTIONS = [
// //   { value: 'this_fiscal_year', label: 'This Fiscal Year' },
// //   { value: 'last_fiscal_year', label: 'Last Fiscal Year' },
// //   { value: 'this_quarter', label: 'This Quarter' },
// //   { value: 'this_month', label: 'This Month' },
// // ];

// // function formatCurrency(value: number) {
// //   const formatted = Math.abs(value).toLocaleString('en-IN', {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   });
// //   return value < 0 ? `(${formatted})` : formatted;
// // }

// // function downloadCsv(filename: string, rows: (string | number)[][]) {
// //   const csv = rows
// //     .map((row) => row.map((c) => (String(c).includes(',') ? `"${c}"` : c)).join(','))
// //     .join('\n');
// //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
// //   const url = URL.createObjectURL(blob);
// //   const link = document.createElement('a');
// //   link.href = url;
// //   link.download = filename;
// //   document.body.appendChild(link);
// //   link.click();
// //   document.body.removeChild(link);
// //   URL.revokeObjectURL(url);
// // }

// // export default function ProfitAndLoss() {
// //   const [dateRange, setDateRange] = useState(DATE_RANGE_OPTIONS[0].value);
// //   const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
// //   const [data, setData] = useState<PnlData | null>(null);

// //   const fetchData = useCallback(async () => {
// //     setStatus('loading');
// //     try {
// //       const { from, to } = getDateRangeBounds(dateRange);
// //       const response = await reportService.getProfitAndLoss({ from, to }) as PnlData;
// //       setData(response);
// //       setStatus('ready');
// //     } catch (err) {
// //       console.error('Failed to load Profit and Loss report', err);
// //       setStatus('error');
// //     }
// //   }, [dateRange]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const dateRangeLabel = DATE_RANGE_OPTIONS.find((o) => o.value === dateRange)?.label ?? dateRange;

// //   const handlePrint = () => window.print();

// //   const handleExport = () => {
// //     if (!data) return;
// //     const rows: (string | number)[][] = [['Profit and Loss', dateRangeLabel]];
// //     rows.push([]);
// //     rows.push(['Operating Income']);
// //     rows.push(['Sales Revenue', data.revenue.subtotal]);
// //     rows.push(['Total Operating Income', data.revenue.subtotal]);
// //     rows.push([]);
// //     rows.push(['Operating Expense']);
// //     data.expenses.breakdown.forEach((e) => rows.push([e.category, e.total]));
// //     rows.push(['Total Operating Expense', data.expenses.total]);
// //     rows.push([]);
// //     rows.push(['Cost of Goods Sold', data.cogs]);
// //     rows.push(['Gross Profit', data.grossProfit]);
// //     rows.push(['Net Profit', data.netProfit]);

// //     downloadCsv(`profit-and-loss-${dateRange}.csv`, rows);
// //   };

// //   return (
// //     <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
// //       {/* Header */}
// //       <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:px-6">
// //         <div>
// //           <h1 className="text-xl font-semibold text-gray-900">Profit and Loss</h1>
// //           <p className="mt-0.5 text-sm text-gray-500">For {dateRangeLabel}</p>
// //         </div>

// //         <div className="flex flex-wrap items-center gap-2">
// //           <div className="relative">
// //             <select
// //               value={dateRange}
// //               onChange={(e) => setDateRange(e.target.value)}
// //               className="appearance-none rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //             >
// //               {DATE_RANGE_OPTIONS.map((opt) => (
// //                 <option key={opt.value} value={opt.value}>{opt.label}</option>
// //               ))}
// //             </select>
// //             <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //           </div>

// //           <button onClick={handlePrint} className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
// //             <Printer className="h-4 w-4" />
// //             Print
// //           </button>
// //           <button
// //             onClick={handleExport}
// //             disabled={status !== 'ready'}
// //             className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
// //           >
// //             <Download className="h-4 w-4" />
// //             Export
// //           </button>
// //         </div>
// //       </div>

// //       {/* Statement */}
// //       <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
// //         {status === 'loading' && (
// //           <div className="flex items-center gap-2 py-12 text-sm text-gray-500">
// //             <Loader2 className="h-4 w-4 animate-spin" />
// //             Loading report…
// //           </div>
// //         )}

// //         {status === 'error' && (
// //           <div className="flex flex-col items-start gap-3 py-12 text-sm text-gray-600">
// //             <div className="flex items-center gap-2 text-red-600">
// //               <AlertCircle className="h-4 w-4" />
// //               Couldn't load the report.
// //             </div>
// //             <button onClick={fetchData} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
// //               Try again
// //             </button>
// //           </div>
// //         )}

// //         {status === 'ready' && data && (
// //           <>
// //             {/* Operating Income */}
// //             <div className="mb-2">
// //               <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
// //                 Operating Income
// //               </div>
// //               <div className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
// //                 <span>Sales Revenue</span>
// //                 <span className="tabular-nums">{formatCurrency(data.revenue.subtotal)}</span>
// //               </div>
// //               <div className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
// //                 <span>Tax Collected</span>
// //                 <span className="tabular-nums">{formatCurrency(data.revenue.tax)}</span>
// //               </div>
// //               <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
// //                 <span>Total Operating Income</span>
// //                 <span className="tabular-nums">{formatCurrency(data.revenue.subtotal)}</span>
// //               </div>
// //               {/* Cost of Goods Sold */}
// // <div className="mb-2 mt-2">
// //   <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
// //     Cost of Goods Sold
// //   </div>
// //   <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
// //     <span>Total COGS</span>
// //     <span className="tabular-nums">{formatCurrency(data.cogs)}</span>
// //   </div>
// // </div>
// //             </div>

// //             <div className="flex items-center justify-between border-t border-gray-300 py-3 text-sm font-semibold text-gray-900">
// //               <span>Gross Profit</span>
// //               <span className="tabular-nums">{formatCurrency(data.grossProfit)}</span>
// //             </div>

// //             {/* Operating Expense */}
// //             <div className="mt-4 mb-2">
// //               <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
// //                 Operating Expense
// //               </div>
// //               {data.expenses.breakdown.length === 0 ? (
// //                 <p className="py-2 pl-4 text-sm text-gray-400">No expenses recorded.</p>
// //               ) : (
// //                 data.expenses.breakdown.map((e, i) => (
// //                   <div key={i} className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
// //                     <span>{e.category}</span>
// //                     <span className="tabular-nums">{formatCurrency(e.total)}</span>
// //                   </div>
// //                 ))
// //               )}
// //               <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
// //                 <span>Total Operating Expense</span>
// //                 <span className="tabular-nums">{formatCurrency(data.expenses.total)}</span>
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between border-t-2 border-gray-900 py-3 text-base font-bold text-gray-900">
// //               <span>Net Profit</span>
// //               <span className="tabular-nums">{formatCurrency(data.netProfit)}</span>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState, useCallback } from 'react';
// import { Download, Printer, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
// import { reportService } from '../../services/api.service';
// import { getDateRangeBounds } from '../../utils/dateRange';

// interface ExpenseBreakdown {
//   category: string;
//   total: number;
// }

// interface PnlData {
//   revenue: { subtotal: number; tax: number; total: number };
//   cogs: number;
//   expenses: { breakdown: ExpenseBreakdown[]; total: number };
//   grossProfit: number;
//   netProfit: number;
// }

// const DATE_RANGE_OPTIONS = [
//   { value: 'this_fiscal_year', label: 'This Fiscal Year' },
//   { value: 'last_fiscal_year', label: 'Last Fiscal Year' },
//   { value: 'this_quarter', label: 'This Quarter' },
//   { value: 'this_month', label: 'This Month' },
// ];

// function formatCurrency(value: number) {
//   const formatted = Math.abs(value).toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   return value < 0 ? `(₹${formatted})` : `₹${formatted}`;
// }

// function downloadCsv(filename: string, rows: (string | number)[][]) {
//   const csv = rows
//     .map((row) => row.map((c) => (String(c).includes(',') ? `"${c}"` : c)).join(','))
//     .join('\n');
//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = filename;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

// export default function ProfitAndLoss() {
//   const [dateRange, setDateRange] = useState(DATE_RANGE_OPTIONS[0].value);
//   const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
//   const [data, setData] = useState<PnlData | null>(null);

//   const fetchData = useCallback(async () => {
//     setStatus('loading');
//     try {
//       const { from, to } = getDateRangeBounds(dateRange);
//       const response = (await reportService.getProfitAndLoss({ from, to })) as PnlData;
//       setData(response);
//       setStatus('ready');
//     } catch (err) {
//       console.error('Failed to load Profit and Loss report', err);
//       setStatus('error');
//     }
//   }, [dateRange]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const dateRangeLabel = DATE_RANGE_OPTIONS.find((o) => o.value === dateRange)?.label ?? dateRange;

//   const handlePrint = () => window.print();

//   const handleExport = () => {
//     if (!data) return;
//     const rows: (string | number)[][] = [['Profit and Loss', dateRangeLabel]];
//     rows.push([]);
//     rows.push(['Operating Income']);
//     rows.push(['Sales Revenue', data.revenue.subtotal]);
//     rows.push(['Tax Collected', data.revenue.tax]);
//     rows.push(['Total Operating Income', data.revenue.subtotal]);
//     rows.push([]);
//     rows.push(['Cost of Goods Sold', data.cogs]);
//     rows.push(['Gross Profit', data.grossProfit]);
//     rows.push([]);
//     rows.push(['Operating Expense']);
//     data.expenses.breakdown.forEach((e) => rows.push([e.category, e.total]));
//     rows.push(['Total Operating Expense', data.expenses.total]);
//     rows.push([]);
//     rows.push(['Net Profit', data.netProfit]);

//     downloadCsv(`profit-and-loss-${dateRange}.csv`, rows);
//   };

//   return (
//     <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
//       {/* Header */}
//       <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:px-6">
//         <div>
//           <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">Profit and Loss</h1>
//           <p className="mt-0.5 text-sm text-gray-500">For {dateRangeLabel}</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <div className="relative flex-1 sm:flex-none">
//             <select
//               value={dateRange}
//               onChange={(e) => setDateRange(e.target.value)}
//               className="w-full appearance-none rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-auto"
//             >
//               {DATE_RANGE_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           </div>

//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
//           >
//             <Printer className="h-4 w-4" />
//             <span className="hidden sm:inline">Print</span>
//           </button>
//           <button
//             onClick={handleExport}
//             disabled={status !== 'ready'}
//             className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             <Download className="h-4 w-4" />
//             <span className="hidden sm:inline">Export</span>
//           </button>
//         </div>
//       </div>

//       {/* Statement */}
//       <div className="mx-auto max-w-3xl px-3 py-6 sm:px-6">
//         {status === 'loading' && (
//           <div className="flex items-center gap-2 py-12 text-sm text-gray-500">
//             <Loader2 className="h-4 w-4 animate-spin" />
//             Loading report…
//           </div>
//         )}

//         {status === 'error' && (
//           <div className="flex flex-col items-start gap-3 py-12 text-sm text-gray-600">
//             <div className="flex items-center gap-2 text-red-600">
//               <AlertCircle className="h-4 w-4" />
//               Couldn't load the report.
//             </div>
//             <button
//               onClick={fetchData}
//               className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {status === 'ready' && data && (
//           <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//             <table className="min-w-[480px] w-full">
//               <tbody>
//                 {/* Operating Income */}
//                 <tr className="bg-blue-50">
//                   <td className="px-3 py-3 font-bold text-gray-800 sm:px-4" colSpan={2}>
//                     OPERATING INCOME
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-2 text-sm text-gray-700 sm:px-8">Sales Revenue</td>
//                   <td className="px-3 py-2 text-right text-sm tabular-nums text-gray-800 sm:px-4">
//                     {formatCurrency(data.revenue.subtotal)}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-2 text-sm text-gray-500 sm:px-8">Tax Collected</td>
//                   <td className="px-3 py-2 text-right text-sm tabular-nums text-gray-500 sm:px-4">
//                     {formatCurrency(data.revenue.tax)}
//                   </td>
//                 </tr>
//                 <tr className="border-t font-semibold">
//                   <td className="px-3 py-2.5 text-sm text-gray-900 sm:px-4">Total Operating Income</td>
//                   <td className="px-3 py-2.5 text-right text-sm tabular-nums text-gray-900 sm:px-4">
//                     {formatCurrency(data.revenue.subtotal)}
//                   </td>
//                 </tr>

//                 {/* COGS */}
//                 <tr>
//                   <td className="px-3 py-2 text-sm text-gray-700 sm:px-4">Cost of Goods Sold</td>
//                   <td className="px-3 py-2 text-right text-sm tabular-nums text-gray-700 sm:px-4">
//                     {formatCurrency(data.cogs)}
//                   </td>
//                 </tr>

//                 {/* Gross Profit */}
//                 <tr className={`border-t-2 font-bold ${data.grossProfit < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
//                   <td className="px-3 py-3 text-sm sm:px-4">Gross Profit</td>
//                   <td
//                     className={`px-3 py-3 text-right text-sm tabular-nums sm:px-4 ${
//                       data.grossProfit < 0 ? 'text-red-700' : 'text-green-700'
//                     }`}
//                   >
//                     {formatCurrency(data.grossProfit)}
//                   </td>
//                 </tr>

//                 {/* Operating Expense */}
//                 <tr className="bg-red-50">
//                   <td className="px-3 py-3 font-bold text-gray-800 sm:px-4" colSpan={2}>
//                     OPERATING EXPENSE
//                   </td>
//                 </tr>
//                 {data.expenses.breakdown.length === 0 ? (
//                   <tr>
//                     <td className="px-6 py-3 text-sm text-gray-400 sm:px-8" colSpan={2}>
//                       No expenses recorded.
//                     </td>
//                   </tr>
//                 ) : (
//                   data.expenses.breakdown.map((e, i) => (
//                     <tr key={i}>
//                       <td className="px-6 py-2 text-sm text-gray-700 sm:px-8">{e.category}</td>
//                       <td className="px-3 py-2 text-right text-sm tabular-nums text-gray-800 sm:px-4">
//                         {formatCurrency(e.total)}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 <tr className="border-t font-semibold">
//                   <td className="px-3 py-2.5 text-sm text-gray-900 sm:px-4">Total Operating Expense</td>
//                   <td className="px-3 py-2.5 text-right text-sm tabular-nums text-gray-900 sm:px-4">
//                     {formatCurrency(data.expenses.total)}
//                   </td>
//                 </tr>

//                 {/* Net Profit */}
//                 <tr className={`border-t-2 font-bold ${data.netProfit < 0 ? 'bg-red-100' : 'bg-green-100'}`}>
//                   <td className="px-3 py-4 text-sm sm:px-4 sm:text-base">Net Profit</td>
//                   <td
//                     className={`px-3 py-4 text-right text-sm tabular-nums sm:px-4 sm:text-base ${
//                       data.netProfit < 0 ? 'text-red-700' : 'text-green-700'
//                     }`}
//                   >
//                     {formatCurrency(data.netProfit)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useCallback } from 'react';
import { Download, Printer, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { reportService } from '../../services/api.service';
import { getDateRangeBounds } from '../../utils/dateRange';

interface ExpenseBreakdown {
  category: string;
  total: number;
}

interface PnlData {
  revenue: { subtotal: number; tax: number; total: number };
  cogs: number;
  expenses: { breakdown: ExpenseBreakdown[]; total: number };
  grossProfit: number;
  netProfit: number;
}

const DATE_RANGE_OPTIONS = [
  { value: 'this_financial_year', label: 'This Financial Year' },
  { value: 'last_financial_year', label: 'Last Financial Year' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'this_month', label: 'This Month' },
];

function formatCurrency(value: number) {
  const formatted = Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `(₹${formatted})` : `₹${formatted}`;
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) => row.map((c) => (String(c).includes(',') ? `"${c}"` : c)).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ProfitAndLoss() {
  const [dateRange, setDateRange] = useState(DATE_RANGE_OPTIONS[0].value);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [data, setData] = useState<PnlData | null>(null);

  const fetchData = useCallback(async () => {
    setStatus('loading');
    try {
      const { from, to } = getDateRangeBounds(dateRange);
      const response = (await reportService.getProfitAndLoss({ from, to })) as PnlData;
      setData(response);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load Profit and Loss report', err);
      setStatus('error');
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dateRangeLabel = DATE_RANGE_OPTIONS.find((o) => o.value === dateRange)?.label ?? dateRange;

  const handlePrint = () => window.print();

  const handleExport = () => {
    if (!data) return;
    const rows: (string | number)[][] = [['Profit and Loss', dateRangeLabel]];
    rows.push([]);
    rows.push(['DEBIT']);
    rows.push(['Cost of Goods Sold', data.cogs]);
    data.expenses.breakdown.forEach((e) => rows.push([e.category, e.total]));
    rows.push(['Total Debit', data.cogs + data.expenses.total]);
    rows.push([]);
    rows.push(['CREDIT']);
    rows.push(['Sales Revenue', data.revenue.subtotal]);
    rows.push(['Tax Collected', data.revenue.tax]);
    rows.push(['Total Credit', data.revenue.subtotal]);
    rows.push([]);
    rows.push(['Gross Profit', data.grossProfit]);
    rows.push(['Net Profit', data.netProfit]);

    downloadCsv(`profit-and-loss-${dateRange}.csv`, rows);
  };

  // Same underlying data, just split into two visual columns
  const totalDebit = data ? data.cogs + data.expenses.total : 0;
  const totalCredit = data ? data.revenue.subtotal : 0;

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">Profit and Loss</h1>
          <p className="mt-0.5 text-sm text-gray-500">For {dateRangeLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-auto"
            >
              {DATE_RANGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleExport}
            disabled={status !== 'ready'}
            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Statement */}
      <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6">
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
            <button
              onClick={fetchData}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && data && (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:divide-x md:divide-gray-200">
      {/* ── DEBIT (Operating Expenses only) ── */}
      <div className="md:pr-6">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={2} className="border-b-2 border-blue-200 pb-2 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
                Debit
              </th>
            </tr>
            <tr className="text-xs font-semibold uppercase text-gray-500">
              <th className="py-1.5 text-left">A/c Name</th>
              <th className="py-1.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-3 pb-1 text-sm font-semibold text-gray-800" colSpan={2}>
                Operating Expenses
              </td>
            </tr>
            {data.expenses.breakdown.length === 0 ? (
              <tr>
                <td className="py-1 pl-4 text-sm text-gray-400" colSpan={2}>No expenses recorded.</td>
              </tr>
            ) : (
              data.expenses.breakdown.map((e, i) => (
                <tr key={i}>
                  <td className="py-1 pl-4 text-sm text-gray-700">{e.category}</td>
                  <td className="py-1 text-right text-sm tabular-nums text-gray-800">{formatCurrency(e.total)}</td>
                </tr>
              ))
            )}
            <tr className="bg-gray-50">
              <td className="py-2 pl-4 text-sm font-semibold text-gray-800">Total Operating Expenses</td>
              <td className="py-2 text-right text-sm font-semibold tabular-nums text-gray-800">
                {formatCurrency(data.expenses.total)}
              </td>
            </tr>

            {/* Total debit */}
            <tr className="border-t-2 border-gray-300">
              <td className="pt-3 text-sm font-bold text-gray-900">Total Debit</td>
              <td className="pt-3 text-right text-sm font-bold tabular-nums text-gray-900">
                {formatCurrency(data.expenses.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── CREDIT (Income − COGS = Gross Profit) ── */}
      <div className="md:pl-6">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={2} className="border-b-2 border-blue-200 pb-2 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
                Credit
              </th>
            </tr>
            <tr className="text-xs font-semibold uppercase text-gray-500">
              <th className="py-1.5 text-left">A/c Name</th>
              <th className="py-1.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-3 pb-1 text-sm font-semibold text-gray-800" colSpan={2}>
                Operating Income
              </td>
            </tr>
            <tr>
              <td className="py-1 pl-4 text-sm text-gray-700">Sales Revenue</td>
              <td className="py-1 text-right text-sm tabular-nums text-gray-800">
                {formatCurrency(data.revenue.subtotal)}
              </td>
            </tr>
            <tr>
              <td className="py-1 pl-4 text-sm text-gray-500">Tax Collected</td>
              <td className="py-1 text-right text-sm tabular-nums text-gray-500">
                {formatCurrency(data.revenue.tax)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 pl-4 text-sm font-semibold text-gray-800">Sub Total</td>
              <td className="py-2 text-right text-sm font-semibold tabular-nums text-gray-800">
                {formatCurrency(data.revenue.subtotal)}
              </td>
            </tr>

            {/* COGS — now on the credit side, deducted from income */}
            <tr>
              <td className="pt-4 pb-1 text-sm font-semibold text-gray-800" colSpan={2}>
                Less: Cost of Goods Sold
              </td>
            </tr>
            <tr>
              <td className="py-1 pl-4 text-sm text-gray-700">COGS</td>
              <td className="py-1 text-right text-sm tabular-nums text-red-600">
                ({formatCurrency(data.cogs)})
              </td>
            </tr>

            {/* Gross Profit */}
            <tr className={data.grossProfit < 0 ? 'bg-red-50' : 'bg-green-50'}>
              <td className="py-2 pl-4 text-sm font-bold text-gray-900">Gross Profit</td>
              <td className={`py-2 text-right text-sm font-bold tabular-nums ${data.grossProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(data.grossProfit)}
              </td>
            </tr>

            {/* Total credit */}
            <tr className="border-t-2 border-gray-300">
              <td className="pt-3 text-sm font-bold text-gray-900">Total Credit</td>
              <td className="pt-3 text-right text-sm font-bold tabular-nums text-gray-900">
                {formatCurrency(data.grossProfit)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Net Profit — full width summary strip */}
    <div
      className={`mt-6 flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold sm:text-base ${
        data.netProfit < 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
    >
      <span>Net Profit</span>
      <span className="tabular-nums">{formatCurrency(data.netProfit)}</span>
    </div>
  </div>
)}
      </div>
    </div>
  );
}