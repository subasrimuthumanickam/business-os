// import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
// import {
//   Download,
//   Printer,
//   SlidersHorizontal,
//   ChevronDown,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react';
// import {reportService}from '../../services/api.service';
// // ---------------------------------------------------------------------------
// // Types
// // ---------------------------------------------------------------------------

// export interface LineItem {
//   id: string;
//   label: string;
//   amount: number;
// }

// export interface PnlSection {
//   id: SectionKey;
//   title: string;
//   items: LineItem[];
// }

// export type SectionKey = 'operatingIncome' | 'costOfGoodsSold' | 'operatingExpense' | 'nonOperating';
// export type ReportBasis = 'accrual' | 'cash';

// interface PnlResponse {
//   sections: {
//     operatingIncome: LineItem[];
//     costOfGoodsSold: LineItem[];
//     operatingExpense: LineItem[];
//     nonOperating: LineItem[];
//   };
// }

// // ---------------------------------------------------------------------------
// // Config — point this at your real endpoint. Expected query params:
// // range (e.g. "this_fiscal_year") and basis ("accrual" | "cash").
// // Expected response shape: PnlResponse above.
// // ---------------------------------------------------------------------------

// const PNL_ENDPOINT = '/api/reports/profit-and-loss';

// const SECTION_META: Record<SectionKey, { title: string }> = {
//   operatingIncome: { title: 'Operating Income' },
//   costOfGoodsSold: { title: 'Cost of Goods Sold' },
//   operatingExpense: { title: 'Operating Expense' },
//   nonOperating: { title: 'Non Operating Income / Expense' },
// };

// const DATE_RANGE_OPTIONS = [
//   { value: 'this_fiscal_year', label: 'This Fiscal Year' },
//   { value: 'last_fiscal_year', label: 'Last Fiscal Year' },
//   { value: 'this_quarter', label: 'This Quarter' },
//   { value: 'this_month', label: 'This Month' },
// ];

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------

// function sumItems(items: LineItem[]) {
//   return items.reduce((sum, i) => sum + i.amount, 0);
// }

// function formatCurrency(value: number) {
//   const formatted = Math.abs(value).toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   return value < 0 ? `(${formatted})` : formatted;
// }

// function downloadCsv(filename: string, rows: (string | number)[][]) {
//   const csv = rows
//     .map((row) =>
//       row
//         .map((cell) => {
//           const str = String(cell);
//           return str.includes(',') || str.includes('"')
//             ? `"${str.replace(/"/g, '""')}"`
//             : str;
//         })
//         .join(',')
//     )
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

// // ---------------------------------------------------------------------------
// // Sub-components
// // ---------------------------------------------------------------------------

// function SectionBlock({ section }: { section: PnlSection }) {
//   const total = sumItems(section.items);
//   return (
//     <div className="mb-2">
//       <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
//         {section.title}
//       </div>
//       {section.items.length === 0 ? (
//         <p className="py-2 pl-4 text-sm text-gray-400">No line items.</p>
//       ) : (
//         section.items.map((item) => (
//           <div key={item.id} className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
//             <span>{item.label}</span>
//             <span className="tabular-nums">{formatCurrency(item.amount)}</span>
//           </div>
//         ))
//       )}
//       <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
//         <span>Total {section.title}</span>
//         <span className="tabular-nums">{formatCurrency(total)}</span>
//       </div>
//     </div>
//   );
// }

// function SummaryRow({
//   label,
//   amount,
//   emphasis = 'normal',
// }: {
//   label: string;
//   amount: number;
//   emphasis?: 'normal' | 'strong' | 'final';
// }) {
//   const base = 'flex items-center justify-between py-3';
//   const styles =
//     emphasis === 'final'
//       ? `${base} border-t-2 border-gray-900 text-base font-bold text-gray-900`
//       : emphasis === 'strong'
//       ? `${base} border-t border-gray-300 text-sm font-semibold text-gray-900`
//       : `${base} text-sm font-medium text-gray-800`;

//   return (
//     <div className={styles}>
//       <span>{label}</span>
//       <span className="tabular-nums">{formatCurrency(amount)}</span>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Component
// // ---------------------------------------------------------------------------

// export default function ProfitAndLoss() {
//   const [basis, setBasis] = useState<ReportBasis>('accrual');
//   const [dateRange, setDateRange] = useState(DATE_RANGE_OPTIONS[0].value);
//   const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
//   const [data, setData] = useState<PnlResponse['sections'] | null>(null);
//   const [visibleSections, setVisibleSections] = useState<Record<SectionKey, boolean>>({
//     operatingIncome: true,
//     costOfGoodsSold: true,
//     operatingExpense: true,
//     nonOperating: true,
//   });
//   const [customizeOpen, setCustomizeOpen] = useState(false);
//   const customizeRef = useRef<HTMLDivElement>(null);

//   // const fetchData = useCallback(async () => {
//   //   setStatus('loading');
//   //   try {
//   //     const params = new URLSearchParams({ range: dateRange, basis });
//   //     const res = await fetch(`${PNL_ENDPOINT}?${params.toString()}`, { credentials: 'include' });
//   //     if (!res.ok) throw new Error(`Request failed with ${res.status}`);
//   //     const json: PnlResponse = await res.json();
//   //     setData(json.sections);
//   //     setStatus('ready');
//   //   } catch (err) {
//   //     console.error('Failed to load Profit and Loss report', err);
//   //     setStatus('error');
//   //   }
//   // }, [dateRange, basis]);
   
//   const fetchData = useCallback(async () => {
//   setStatus('loading');
//   try {
//     // Cast 'data' as 'PnlResponse'
//     const response = await reportService.getProfitAndLoss({ 
//       range: dateRange, 
//       basis 
//     }) as PnlResponse;
    
//     setData(response.sections); 
//     setStatus('ready');
//   } catch (err) {
//     console.error('Failed to load Profit and Loss report', err);
//     setStatus('error');
//   }
// }, [dateRange, basis]);
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Close the customize panel when clicking outside it
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (customizeRef.current && !customizeRef.current.contains(e.target as Node)) {
//         setCustomizeOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const sections: Record<SectionKey, PnlSection> | null = useMemo(() => {
//     if (!data) return null;
//     return {
//       operatingIncome: { id: 'operatingIncome', title: SECTION_META.operatingIncome.title, items: data.operatingIncome },
//       costOfGoodsSold: { id: 'costOfGoodsSold', title: SECTION_META.costOfGoodsSold.title, items: data.costOfGoodsSold },
//       operatingExpense: { id: 'operatingExpense', title: SECTION_META.operatingExpense.title, items: data.operatingExpense },
//       nonOperating: { id: 'nonOperating', title: SECTION_META.nonOperating.title, items: data.nonOperating },
//     };
//   }, [data]);

//   const totals = useMemo(() => {
//     if (!data) return null;
//     const operatingIncome = sumItems(data.operatingIncome);
//     const cogs = sumItems(data.costOfGoodsSold);
//     const grossProfit = operatingIncome - cogs;

//     const operatingExpense = sumItems(data.operatingExpense);
//     const operatingProfit = grossProfit - operatingExpense;

//     const nonOperating = sumItems(data.nonOperating);
//     const netProfit = operatingProfit + nonOperating;

//     return { operatingIncome, cogs, grossProfit, operatingExpense, operatingProfit, nonOperating, netProfit };
//   }, [data]);

//   const dateRangeLabel = DATE_RANGE_OPTIONS.find((o) => o.value === dateRange)?.label ?? dateRange;

//   const handlePrint = () => window.print();

//   const handleExport = () => {
//     if (!sections || !totals) return;
//     const rows: (string | number)[][] = [['Profit and Loss', dateRangeLabel, basis]];
//     (Object.keys(sections) as SectionKey[]).forEach((key) => {
//       if (!visibleSections[key]) return;
//       const section = sections[key];
//       rows.push([]);
//       rows.push([section.title]);
//       section.items.forEach((item) => rows.push([item.label, item.amount]));
//       rows.push([`Total ${section.title}`, sumItems(section.items)]);
//     });
//     rows.push([]);
//     rows.push(['Gross Profit', totals.grossProfit]);
//     rows.push(['Operating Profit', totals.operatingProfit]);
//     rows.push(['Net Profit', totals.netProfit]);

//     downloadCsv(`profit-and-loss-${dateRange}.csv`, rows);
//   };

//   const toggleSection = (key: SectionKey) => {
//     setVisibleSections((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
//       {/* Header */}
//       <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:px-6">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-900">Profit and Loss</h1>
//           <p className="mt-0.5 text-sm text-gray-500">For {dateRangeLabel}</p>
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <div className="relative">
//             <select
//               value={dateRange}
//               onChange={(e) => setDateRange(e.target.value)}
//               className="appearance-none rounded-md border border-gray-300 px-3 py-1.5 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             >
//               {DATE_RANGE_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           </div>

//           <div className="flex rounded-md border border-gray-300 text-sm">
//             <button
//               onClick={() => setBasis('accrual')}
//               className={`px-3 py-1.5 ${basis === 'accrual' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               Accrual
//             </button>
//             <button
//               onClick={() => setBasis('cash')}
//               className={`border-l border-gray-300 px-3 py-1.5 ${basis === 'cash' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               Cash
//             </button>
//           </div>

//           {/* Customize */}
//           <div className="relative" ref={customizeRef}>
//             <button
//               onClick={() => setCustomizeOpen((v) => !v)}
//               className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
//             >
//               <SlidersHorizontal className="h-4 w-4" />
//               Customize
//             </button>
//             {customizeOpen && (
//               <div className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
//                 <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Show sections</p>
//                 {(Object.keys(SECTION_META) as SectionKey[]).map((key) => (
//                   <label key={key} className="flex items-center gap-2 py-1 text-sm text-gray-700">
//                     <input
//                       type="checkbox"
//                       checked={visibleSections[key]}
//                       onChange={() => toggleSection(key)}
//                       className="rounded border-gray-300"
//                     />
//                     {SECTION_META[key].title}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
//           >
//             <Printer className="h-4 w-4" />
//             Print
//           </button>
//           <button
//             onClick={handleExport}
//             disabled={status !== 'ready'}
//             className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             <Download className="h-4 w-4" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Statement */}
//       <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
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

//         {status === 'ready' && sections && totals && (
//           <>
//             {visibleSections.operatingIncome && <SectionBlock section={sections.operatingIncome} />}
//             {visibleSections.costOfGoodsSold && <SectionBlock section={sections.costOfGoodsSold} />}
//             <SummaryRow label="Gross Profit" amount={totals.grossProfit} emphasis="strong" />

//             {visibleSections.operatingExpense && (
//               <div className="mt-4">
//                 <SectionBlock section={sections.operatingExpense} />
//               </div>
//             )}
//             <SummaryRow label="Operating Profit" amount={totals.operatingProfit} emphasis="strong" />

//             {visibleSections.nonOperating && (
//               <div className="mt-4">
//                 <SectionBlock section={sections.nonOperating} />
//               </div>
//             )}

//             <SummaryRow label="Net Profit" amount={totals.netProfit} emphasis="final" />
//           </>
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
  { value: 'this_fiscal_year', label: 'This Fiscal Year' },
  { value: 'last_fiscal_year', label: 'Last Fiscal Year' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'this_month', label: 'This Month' },
];

function formatCurrency(value: number) {
  const formatted = Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `(${formatted})` : formatted;
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
      const response = await reportService.getProfitAndLoss({ from, to }) as PnlData;
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
    rows.push(['Operating Income']);
    rows.push(['Sales Revenue', data.revenue.subtotal]);
    rows.push(['Total Operating Income', data.revenue.subtotal]);
    rows.push([]);
    rows.push(['Operating Expense']);
    data.expenses.breakdown.forEach((e) => rows.push([e.category, e.total]));
    rows.push(['Total Operating Expense', data.expenses.total]);
    rows.push([]);
    rows.push(['Cost of Goods Sold', data.cogs]);
    rows.push(['Gross Profit', data.grossProfit]);
    rows.push(['Net Profit', data.netProfit]);

    downloadCsv(`profit-and-loss-${dateRange}.csv`, rows);
  };

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Profit and Loss</h1>
          <p className="mt-0.5 text-sm text-gray-500">For {dateRangeLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

          <button onClick={handlePrint} className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            onClick={handleExport}
            disabled={status !== 'ready'}
            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Statement */}
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
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
          <>
            {/* Operating Income */}
            <div className="mb-2">
              <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
                Operating Income
              </div>
              <div className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
                <span>Sales Revenue</span>
                <span className="tabular-nums">{formatCurrency(data.revenue.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
                <span>Tax Collected</span>
                <span className="tabular-nums">{formatCurrency(data.revenue.tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
                <span>Total Operating Income</span>
                <span className="tabular-nums">{formatCurrency(data.revenue.subtotal)}</span>
              </div>
              {/* Cost of Goods Sold */}
<div className="mb-2 mt-2">
  <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
    Cost of Goods Sold
  </div>
  <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
    <span>Total COGS</span>
    <span className="tabular-nums">{formatCurrency(data.cogs)}</span>
  </div>
</div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-300 py-3 text-sm font-semibold text-gray-900">
              <span>Gross Profit</span>
              <span className="tabular-nums">{formatCurrency(data.grossProfit)}</span>
            </div>

            {/* Operating Expense */}
            <div className="mt-4 mb-2">
              <div className="border-b border-gray-200 py-2 text-sm font-semibold text-gray-900">
                Operating Expense
              </div>
              {data.expenses.breakdown.length === 0 ? (
                <p className="py-2 pl-4 text-sm text-gray-400">No expenses recorded.</p>
              ) : (
                data.expenses.breakdown.map((e, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 pl-4 text-sm text-gray-700">
                    <span>{e.category}</span>
                    <span className="tabular-nums">{formatCurrency(e.total)}</span>
                  </div>
                ))
              )}
              <div className="flex items-center justify-between border-t border-gray-100 py-2 pl-4 text-sm font-medium text-gray-900">
                <span>Total Operating Expense</span>
                <span className="tabular-nums">{formatCurrency(data.expenses.total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t-2 border-gray-900 py-3 text-base font-bold text-gray-900">
              <span>Net Profit</span>
              <span className="tabular-nums">{formatCurrency(data.netProfit)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}