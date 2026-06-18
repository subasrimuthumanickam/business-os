import React, { useMemo, useState } from 'react';
import {
  Search,
  Settings,
  Star,
  ArrowLeft,
  LayoutDashboard,
  ShoppingCart,
  Boxes,
   Users,
  UserCheck,
} from 'lucide-react';
import ConfigureReportLayout from '../components/reports/ConfigureReportLayout';
import ProfitAndLoss from '../components/reports/ProfitAndLoss';
import CashFlowStatement from "../components/reports/CashFlowStatement";
import BalanceSheet from '../components/reports/BalanceSheet';
import SalesByCustomer from "../components/reports/SalesByCustomer";
import SalesByItem from "../components/reports/SalesByItem";
import SalesBySalesPerson from '../components/reports/SalesBySalesPerson';
import InventorySummary from '../components/reports/InventorySummary';
import InventoryValuationSummary from '../components/reports/InventoryValuationSummary';
import ProductSalesReport from "../components/reports/ProductSalesReport";
import LandedCostSummary from "../components/reports/LandedCostSummary";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReportItem {
  id: string;
  name: string;
  path: string;
  isFavorite?: boolean;
}

export interface ReportCategory {
  id: string;
  title: string;
  icon: 'overview' | 'sales' | 'inventory' | string;
  reports: ReportItem[];
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: LayoutDashboard,
  sales: ShoppingCart,
  inventory: Boxes,
  crm: Users,
  hrms: UserCheck,
};

function getCategoryIcon(key: string) {
  return CATEGORY_ICONS[key] ?? LayoutDashboard;
}

// ---------------------------------------------------------------------------
// Registry of reports that have an actual built component.
// Add to this map as more reports get built — anything not listed here
// will simply do nothing when clicked instead of trying to navigate to a
// route that doesn't exist yet.
// ---------------------------------------------------------------------------

const REPORT_COMPONENTS: Record<string, React.ComponentType> = {
  pnl: ProfitAndLoss,
  cashflow: CashFlowStatement,
  balance: BalanceSheet,
  "sales-by-customer": SalesByCustomer,
  "sales-by-item": SalesByItem,
  "sales-by-person": SalesBySalesPerson,
  "inv-summary": InventorySummary,
  "inv-valuation": InventoryValuationSummary,
  "product-sales": ProductSalesReport,
  "landed-cost": LandedCostSummary,
};

// ---------------------------------------------------------------------------
// Static UI data — replace this with real data when you wire up the backend.
// ---------------------------------------------------------------------------

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    id: 'overview',
    title: 'Business Overview',
    icon: 'overview',
    reports: [
      { id: 'pnl', name: 'Profit and Loss', path: '/reports/profit-and-loss' },
      { id: 'cashflow', name: 'Cash Flow Statement', path: '/reports/cash-flow-statement' },
      { id: 'balance', name: 'Balance Sheet', path: '/reports/balance-sheet' },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: 'sales',
    reports: [
      { id: 'sales-by-customer', name: 'Sales by Customer', path: '/reports/sales-by-customer' },
      { id: 'sales-by-item', name: 'Sales by Item', path: '/reports/sales-by-item' },
      { id: 'sales-by-person', name: 'Sales by Sales Person', path: '/reports/sales-by-sales-person' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: 'inventory',
    reports: [
      { id: 'inv-summary', name: 'Inventory Summary', path: '/reports/inventory-summary' },
      { id: 'inv-valuation', name: 'Inventory Valuation Summary', path: '/reports/inventory-valuation-summary' },
      { id: 'fifo', name: 'FIFO Cost Lot Tracking', path: '/reports/fifo-cost-lot-tracking' },
      { id: 'product-sales', name: 'Product Sales Report', path: '/reports/product-sales-report' },
      { id: 'landed-cost', name: 'Landed Cost Summary', path: '/reports/landed-cost-summary' },
    ],
  },
  {
  id: 'crm',
  title: 'CRM',
  icon: 'users',
  reports: [
    {id: 'customer-summary',name: 'Customer Summary',path: '/reports/customer-summary'},
    {id: 'customer-aging',name: 'Customer Aging Report',path: '/reports/customer-aging'},
    {id: 'lead-summary',name: 'Lead Summary',path: '/reports/lead-summary'},
    {id: 'lead-conversion',name: 'Lead Conversion Report',path: '/reports/lead-conversion'},
    {id: 'customer-transactions',name: 'Customer Transactions',path: '/reports/customer-transactions'}
  ]
},
{
  id: 'hrms',
  title: 'HRMS',
  icon: 'UserCheck',
  reports: [
    {id: 'employee-summary',name: 'Employee Summary',path: '/reports/employee-summary'},
    {id: 'attendance-report',name: 'Attendance Report',path: '/reports/attendance-report'},
    {
      id: 'leave-report',
      name: 'Leave Report',
      path: '/reports/leave-report'
    },
    {
      id: 'payroll-report',
      name: 'Payroll Report',
      path: '/reports/payroll-report'
    },
    {
      id: 'department-report',
      name: 'Department Report',
      path: '/reports/department-report'
    }
  ]
}
];

// ---------------------------------------------------------------------------
// Component — pure UI, no API calls. Favorite toggle is local-only for now.
// ---------------------------------------------------------------------------

export default function ReportView() {
  const [categories, setCategories] = useState<ReportCategory[]>(REPORT_CATEGORIES);
  const [query, setQuery] = useState('');
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  const toggleFavorite = (categoryId: string, reportId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              reports: cat.reports.map((r) =>
                r.id === reportId ? { ...r, isFavorite: !r.isFavorite } : r
              ),
            }
      )
    );
  };

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        reports: cat.reports.filter((r) => r.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.reports.length > 0);
  }, [categories, query]);

  const handleReportClick = (reportId: string) => {
    if (REPORT_COMPONENTS[reportId]) {
      setActiveReportId(reportId);
    }
    // Reports without a built component yet do nothing — no broken navigation.
  };

  // ---------------------------------------------------------------------
  // If a built report is selected, render it instead of the reports grid.
  // ---------------------------------------------------------------------
  if (activeReportId && REPORT_COMPONENTS[activeReportId]) {
    const ActiveReport = REPORT_COMPONENTS[activeReportId];
    return (
      <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
          <button
            onClick={() => setActiveReportId(null)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </button>
        </div>
        <ActiveReport />
      </div>
    );
  }

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Reports</h1>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports"
              className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsConfigureOpen(true)}
          className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Settings className="h-4 w-4" />
          Configure Report Layout
        </button>
      </div>

      <div className="border-t border-gray-200" />

      {/* Body */}
      <div className="px-6 py-6">
        {filteredCategories.length === 0 ? (
          <p className="py-12 text-sm text-gray-500">No reports match "{query}".</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => {
              const Icon = getCategoryIcon(category.icon);
              return (
                <div key={category.id}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-700" />
                    <h2 className="text-sm font-semibold text-gray-900">{category.title}</h2>
                  </div>

                  <ul>
                    {category.reports.map((report, idx) => (
                      <li
                        key={report.id}
                        className={`flex items-center gap-2 py-2 ${
                          idx !== 0 ? 'border-t border-gray-100' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleFavorite(category.id, report.id)}
                          aria-label={report.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          className="shrink-0"
                        >
                          <Star
                            className={`h-3.5 w-3.5 ${
                              report.isFavorite
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-gray-400'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleReportClick(report.id)}
                          className={`text-sm hover:underline ${
                            REPORT_COMPONENTS[report.id]
                              ? 'text-blue-600 hover:text-blue-700'
                              : 'cursor-default text-gray-400'
                          }`}
                          title={REPORT_COMPONENTS[report.id] ? undefined : 'Not built yet'}
                        >
                          {report.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfigureReportLayout
        isOpen={isConfigureOpen}
        onClose={() => setIsConfigureOpen(false)}
        onSave={(settings) => {
          console.log('Saved report layout settings:', settings);
        }}
      />
    </div>
  );
}