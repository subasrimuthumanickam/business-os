import React, { useState, useEffect } from 'react';

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  receipt?: string;
  notes?: string;
  vendor?: string;
}

interface ExpenseListProps {
  expenses?: Expense[];
  onExpenseUpdate?: (expenses: Expense[]) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses: propExpenses, 
  onExpenseUpdate 
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(propExpenses || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    description: '',
    category: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as 'paid' | 'pending' | 'failed',
    paymentMethod: '',
    vendor: '',
    notes: ''
  });

  const categories = ['Operations', 'IT', 'Marketing', 'Travel', 'Office Supplies', 'Utilities', 'Other'];
  const statuses: Array<'paid' | 'pending' | 'failed'> = ['paid', 'pending', 'failed'];

  useEffect(() => {
    if (!propExpenses) {
      fetchExpenses();
    }
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockExpenses: Expense[] = [
        {
          id: 'EXP-001',
          description: 'Office Supplies',
          category: 'Office Supplies',
          amount: 450.00,
          date: '2026-06-15',
          status: 'paid',
          paymentMethod: 'VISA ****6187',
          vendor: 'Staples',
          notes: 'Monthly office supplies'
        },
        {
          id: 'EXP-002',
          description: 'Software Licenses',
          category: 'IT',
          amount: 1200.00,
          date: '2026-06-14',
          status: 'pending',
          paymentMethod: 'Mastercard ****4321',
          vendor: 'Microsoft',
          notes: 'Annual software renewal'
        },
        {
          id: 'EXP-003',
          description: 'Marketing Campaign',
          category: 'Marketing',
          amount: 2500.00,
          date: '2026-06-13',
          status: 'failed',
          paymentMethod: 'VISA ****6187',
          vendor: 'Google Ads',
          notes: 'Q2 marketing campaign'
        },
        {
          id: 'EXP-004',
          description: 'Team Lunch',
          category: 'Other',
          amount: 150.00,
          date: '2026-06-12',
          status: 'paid',
          paymentMethod: 'VISA ****6187',
          vendor: 'Local Restaurant'
        },
        {
          id: 'EXP-005',
          description: 'Travel Expenses',
          category: 'Travel',
          amount: 850.00,
          date: '2026-06-11',
          status: 'pending',
          paymentMethod: 'Company Card',
          vendor: 'Delta Airlines',
          notes: 'Client meeting travel'
        },
      ];
      setExpenses(mockExpenses);
      if (onExpenseUpdate) onExpenseUpdate(mockExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredExpenses = expenses.filter((expense: Expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalExpenses = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter((e: Expense) => e.status === 'paid').reduce((sum: number, e: Expense) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter((e: Expense) => e.status === 'pending').reduce((sum: number, e: Expense) => sum + e.amount, 0);

  const handleAddExpense = async () => {
    try {
      const expense: Expense = {
        id: `EXP-${String(expenses.length + 1).padStart(3, '0')}`,
        description: newExpense.description || '',
        category: newExpense.category || 'Other',
        amount: newExpense.amount || 0,
        date: newExpense.date || new Date().toISOString().split('T')[0],
        status: (newExpense.status as 'paid' | 'pending' | 'failed') || 'pending',
        paymentMethod: newExpense.paymentMethod || '',
        vendor: newExpense.vendor,
        notes: newExpense.notes,
      };
      const updatedExpenses = [...expenses, expense];
      setExpenses(updatedExpenses);
      if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
      setShowAddModal(false);
      setEditingExpense(null);
      setNewExpense({
        description: '',
        category: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'pending' as 'paid' | 'pending' | 'failed',
        paymentMethod: '',
        vendor: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const updatedExpenses = expenses.filter((exp: Expense) => exp.id !== id);
      setExpenses(updatedExpenses);
      if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleUpdateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      const updatedExpenses = expenses.map((exp: Expense) =>
        exp.id === id ? { ...exp, ...updates } : exp
      );
      setExpenses(updatedExpenses);
      if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setNewExpense({
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      status: expense.status,
      paymentMethod: expense.paymentMethod,
      vendor: expense.vendor,
      notes: expense.notes,
    });
    setShowAddModal(true);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
    const value = e.target.value as 'paid' | 'pending' | 'failed';
    handleUpdateExpense(id, { status: value });
  };

  const handleFormStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'paid' | 'pending' | 'failed';
    setNewExpense({ ...newExpense, status: value });
  };

  const uniqueCategories = [...new Set(expenses.map(e => e.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Expenses</p>
            <p className="text-lg font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Paid</p>
            <p className="text-lg font-bold text-green-600">${paidExpenses.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-lg font-bold text-yellow-600">${pendingExpenses.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button
            onClick={() => {
              setEditingExpense(null);
              setNewExpense({
                description: '',
                category: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                status: 'pending' as 'paid' | 'pending' | 'failed',
                paymentMethod: '',
                vendor: '',
                notes: ''
              });
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense: Expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {expense.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {expense.description}
                    {expense.vendor && (
                      <span className="block text-xs text-gray-500">Vendor: {expense.vendor}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(expense.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={expense.status}
                      onChange={(e) => handleStatusChange(e, expense.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(expense.status)}`}
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(expense.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingExpense ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddExpense(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <input
                  type="text"
                  required
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter expense description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor
                </label>
                <input
                  type="text"
                  value={newExpense.vendor || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter vendor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newExpense.status}
                  onChange={handleFormStatusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <input
                  type="text"
                  value={newExpense.paymentMethod || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter payment method"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newExpense.notes || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingExpense(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {editingExpense ? 'Update' : 'Add'} Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Expense</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteExpense(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
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