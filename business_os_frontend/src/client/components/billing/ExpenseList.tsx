import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  expense_number: string;
  expense_date: string;
  paid_by?: string;
  category: string;
  amount: number;
  currency: string;
  payment_method: string;
  vendor_name?: string;
  reference_number?: string;
  notes?: string;
  status: 'paid' | 'pending' | 'failed';
  is_billable?: boolean;
}

interface ExpenseListProps {
  onNewExpense?: () => void;
  onEditExpense?: (expense: Expense) => void;
}

const API = 'http://localhost:5000/api';

const DEFAULT_FILTERS = ['All', 'Billable', 'Non-Billable'];

const COLUMN_DEFS = [
  { key: 'date', label: 'Date' },
  { key: 'expense_account', label: 'Expense Account' },
  { key: 'reference', label: 'Reference#' },
  { key: 'vendor_name', label: 'Vendor Name' },
  { key: 'paid_through', label: 'Paid Through' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount' },
];

const SORT_OPTIONS = ['Created Time', 'Date', 'Expense Account', 'Vendor Name', 'Paid Through', 'Amount'];

const ExpenseList: React.FC<ExpenseListProps> = ({ onNewExpense, onEditExpense }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(COLUMN_DEFS.map((c) => c.key));
  const [pendingColumns, setPendingColumns] = useState<string[]>(visibleColumns);

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [sortField, setSortField] = useState('Amount');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const filterMenuRef = useRef<HTMLDivElement>(null);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target as Node)) setShowFilterMenu(false);
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target as Node)) setShowColumnMenu(false);
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) setShowActionMenu(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/expenses`);
      const raw = res.data?.data;
      const dataArray = Array.isArray(raw) ? raw : raw ? [raw] : [];
      const formatted: Expense[] = dataArray.map((e: any) => ({
        id: e.id,
        expense_number: e.expense_number,
        expense_date: e.expense_date,
        paid_by: e.paid_by || '',
        category: e.category || 'Other',
        amount: Number(e.amount) || 0,
        currency: e.currency || 'INR',
        payment_method: e.payment_method || '—',
        vendor_name: e.vendor_name || '',
        reference_number: e.reference_number || '',
        notes: e.notes || '',
        status: (e.status || 'pending').toLowerCase(),
        is_billable: !!e.is_billable,
      }));
      setExpenses(formatted);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await axios.delete(`${API}/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      setShowDeleteModal(null);
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense');
    }
  };

  const handleToggleBillable = async (expense: Expense) => {
    const newValue = !expense.is_billable;
    try {
      await axios.patch(`${API}/expenses/${expense.id}/billable`, { is_billable: newValue });
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === expense.id ? { ...exp, is_billable: newValue } : exp))
      );
    } catch (err) {
      console.error('Error updating billable:', err);
      alert('Failed to update');
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredExpenses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredExpenses.map((e) => e.id));
    }
  };

  const getBillableLabel = (isBillable?: boolean) => (isBillable ? 'Billable' : 'Non-Billable');
  const getBillableStyle = (isBillable?: boolean) => (isBillable ? 'text-green-600' : 'text-gray-500');

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch =
        !searchTerm ||
        expense.expense_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'All') return true;
      if (activeFilter === 'Billable') return !!expense.is_billable;
      if (activeFilter === 'Non-Billable') return !expense.is_billable;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'Date':
          cmp = new Date(a.expense_date).getTime() - new Date(b.expense_date).getTime();
          break;
        case 'Expense Account':
          cmp = a.category.localeCompare(b.category);
          break;
        case 'Vendor Name':
          cmp = (a.vendor_name || '').localeCompare(b.vendor_name || '');
          break;
        case 'Paid Through':
          cmp = a.payment_method.localeCompare(b.payment_method);
          break;
        case 'Amount':
        default:
          cmp = a.amount - b.amount;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setShowActionMenu(false);
  };

  const handleExport = () => {
    let csvContent =
      'data:text/csv;charset=utf-8,Date,Expense Account,Reference#,Vendor Name,Paid Through,Status,Amount\n';
    filteredExpenses.forEach((e) => {
      csvContent += `${e.expense_date},"${e.category}","${e.reference_number || ''}","${e.vendor_name || ''}","${e.payment_method}","${getBillableLabel(e.is_billable)}",${e.amount}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'business_os_expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowActionMenu(false);
  };

  const isColVisible = (key: string) => visibleColumns.includes(key);

  const arrow = (field: string) =>
    sortField === field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Top toolbar */}
      <div className="border-b px-6 py-3 bg-white flex items-center justify-between">
        <div className="relative" ref={filterMenuRef}>
          <button
            onClick={() => setShowFilterMenu((p) => !p)}
            className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gray-600"
          >
            {activeFilter === 'All' ? 'All Expenses' : activeFilter}
            <span className="text-xs">▾</span>
          </button>

          {showFilterMenu && (
            <div className="absolute left-0 top-8 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-2">
              <p className="px-4 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Default Filters
              </p>
              {DEFAULT_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 ${
                    activeFilter === f ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNewExpense && onNewExpense()}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
          >
            + New
          </button>

          {/* Column settings (gear) */}
          <div className="relative" ref={columnMenuRef}>
            <button
              onClick={() => {
                setPendingColumns(visibleColumns);
                setShowColumnMenu((p) => !p);
              }}
              className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
              title="Customize columns"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </button>

            {showColumnMenu && (
              <div className="absolute right-0 top-10 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-3 px-3">
                {COLUMN_DEFS.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 py-1 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pendingColumns.includes(col.key)}
                      onChange={() =>
                        setPendingColumns((prev) =>
                          prev.includes(col.key) ? prev.filter((c) => c !== col.key) : [...prev, col.key]
                        )
                      }
                    />
                    {col.label}
                  </label>
                ))}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setVisibleColumns(pendingColumns);
                      setShowColumnMenu(false);
                    }}
                    className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowColumnMenu(false)}
                    className="px-3 py-1.5 border border-gray-300 text-xs font-medium rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger action menu */}
          <div className="relative" ref={actionMenuRef}>
            <button
              onClick={() => setShowActionMenu((p) => !p)}
              className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
              title="More actions"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {showActionMenu && (
              <div className="absolute right-0 top-10 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-2">
                <p className="px-4 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sort By</p>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSortClick(opt)}
                    className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 ${
                      sortField === opt ? 'bg-blue-500 text-white hover:bg-blue-500' : 'text-gray-700'
                    }`}
                  >
                    {opt}
                    {sortField === opt ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </button>
                ))}
                <div className="border-t mt-1 pt-1">
                  <button
                    onClick={() => {
                      alert('CSV import coming soon');
                      setShowActionMenu(false);
                    }}
                    className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ⬇ Import Expenses
                  </button>
                  <button onClick={handleExport} className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                    ⬆ Export Expenses
                  </button>
                  <button
                    onClick={() => {
                      fetchExpenses();
                      setShowActionMenu(false);
                    }}
                    className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ↻ Refresh List
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredExpenses.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {isColVisible('date') && (
                <th onClick={() => handleSortClick('Date')} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                  Date{arrow('Date')}
                </th>
              )}
              {isColVisible('expense_account') && (
                <th onClick={() => handleSortClick('Expense Account')} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                  Expense Account{arrow('Expense Account')}
                </th>
              )}
              {isColVisible('reference') && (
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Reference#</th>
              )}
              {isColVisible('vendor_name') && (
                <th onClick={() => handleSortClick('Vendor Name')} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                  Vendor Name{arrow('Vendor Name')}
                </th>
              )}
              {isColVisible('paid_through') && (
                <th onClick={() => handleSortClick('Paid Through')} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                  Paid Through{arrow('Paid Through')}
                </th>
              )}
              {/* {isColVisible('status') && (
             <td className={`px-4 py-3 text-xs font-semibold uppercase ${getBillableStyle(expense.is_billable)}`}>
              {getBillableLabel(expense.is_billable)}
             </td>
              )} */}
              {isColVisible('amount') && (
                <th onClick={() => handleSortClick('Amount')} className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                  Amount{arrow('Amount')}
                </th>
              )}
              <th className="px-4 py-3 w-10">
                <button onClick={() => setShowSearch((p) => !p)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </th>
            </tr>
            {showSearch && (
              <tr>
                <th colSpan={COLUMN_DEFS.length + 2} className="px-4 pb-3">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search by vendor, account..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-72 px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />
                </th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={COLUMN_DEFS.length + 2} className="px-6 py-16 text-center text-gray-400 text-sm">
                  Loading expenses...
                </td>
              </tr>
            ) : filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={COLUMN_DEFS.length + 2} className="px-6 py-16 text-center text-gray-400 text-sm">
                  No expenses found
                </td>
              </tr>
            ) : (
              // filteredExpenses.map((expense) => (
              //   <tr
              //     key={expense.id}
              //     className="hover:bg-gray-50 transition-colors cursor-pointer"
              //     onClick={() => onEditExpense && onEditExpense(expense)}
              //   >
              //     <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
              //       <input type="checkbox" checked={selectedIds.includes(expense.id)} onChange={() => toggleSelect(expense.id)} />
              //     </td>
              //     {isColVisible('date') && (
              //       <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
              //         {new Date(expense.expense_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              //       </td>
              //     )}
              //     {isColVisible('expense_account') && (
              //       <td className="px-4 py-3 text-sm text-blue-600 font-medium">{expense.category}</td>
              //     )}
              //     {isColVisible('reference') && (
              //       <td className="px-4 py-3 text-sm text-gray-600">{expense.reference_number || '—'}</td>
              //     )}
              //     {isColVisible('vendor_name') && (
              //       <td className="px-4 py-3 text-sm text-gray-700">{expense.vendor_name || '—'}</td>
              //     )}
              //     {isColVisible('paid_through') && (
              //       <td className="px-4 py-3 text-sm text-gray-700">{expense.payment_method}</td>
              //     )}
              //     {isColVisible('status') && (
              //       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
              //         <button
              //           onClick={() => handleToggleBillable(expense)}
              //           className={`text-xs font-semibold uppercase hover:underline ${getBillableStyle(expense.is_billable)}`}
              //           title="Click to toggle"
              //         >
              //           {getBillableLabel(expense.is_billable)}
              //         </button>
              //       </td>
              //     )}
              //     {isColVisible('amount') && (
              //       <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
              //         ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              //       </td>
              //     )}
              //     <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
              //       <button
              //         onClick={() => setShowDeleteModal(expense.id)}
              //         className="text-gray-400 hover:text-red-500 transition-colors p-1"
              //         title="Delete"
              //       >
              //         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              //           <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              //         </svg>
              //       </button>
              //     </td>
              //   </tr>
              // ))

              filteredExpenses.map((expense) => (
  <tr
    key={expense.id}
    className="hover:bg-gray-50 transition-colors cursor-pointer"
    onClick={() => onEditExpense && onEditExpense(expense)}
  >
    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={selectedIds.includes(expense.id)} onChange={() => toggleSelect(expense.id)} />
    </td>
    {isColVisible('date') && (
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        {new Date(expense.expense_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
    )}
    {isColVisible('expense_account') && (
      <td className="px-4 py-3 text-sm text-blue-600 font-medium">{expense.category}</td>
    )}
    {isColVisible('reference') && (
      <td className="px-4 py-3 text-sm text-gray-600">{expense.reference_number || '—'}</td>
    )}
    {isColVisible('vendor_name') && (
      <td className="px-4 py-3 text-sm text-gray-700">{expense.vendor_name || '—'}</td>
    )}
    {isColVisible('paid_through') && (
      <td className="px-4 py-3 text-sm text-gray-700">{expense.payment_method}</td>
    )}
    {isColVisible('status') && (
      <td className={`px-4 py-3 text-xs font-semibold uppercase ${getBillableStyle(expense.is_billable)}`}>
        {getBillableLabel(expense.is_billable)}
      </td>
    )}
    {isColVisible('amount') && (
      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
        ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </td>
    )}
    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setShowDeleteModal(expense.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        title="Delete"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      </button>
    </td>
  </tr>
))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      {filteredExpenses.length > 0 && (
        <div className="border-t px-6 py-3 bg-white text-xs text-gray-500">
          Showing {filteredExpenses.length} of {expenses.length} expenses
          {selectedIds.length > 0 && <span className="ml-3 text-blue-600">{selectedIds.length} selected</span>}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Expense</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this expense? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDeleteExpense(showDeleteModal)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;