// // import React, { useState, useEffect } from 'react';

// // interface Expense {
// //   id: string;
// //   description: string;
// //   category: string;
// //   amount: number;
// //   date: string;
// //   status: 'paid' | 'pending' | 'failed';
// //   paymentMethod: string;
// //   receipt?: string;
// //   notes?: string;
// //   vendor?: string;
// // }

// // interface ExpenseListProps {
// //   expenses?: Expense[];
// //   onExpenseUpdate?: (expenses: Expense[]) => void;
// // }

// // const ExpenseList: React.FC<ExpenseListProps> = ({ 
// //   expenses: propExpenses, 
// //   onExpenseUpdate 
// // }) => {
// //   const [expenses, setExpenses] = useState<Expense[]>(propExpenses || []);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterCategory, setFilterCategory] = useState<string>('all');
// //   const [filterStatus, setFilterStatus] = useState<string>('all');
// //   // const [loading, setLoading] = useState(false);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
// //   const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
// //   const [newExpense, setNewExpense] = useState<Partial<Expense>>({
// //     description: '',
// //     category: '',
// //     amount: 0,
// //     date: new Date().toISOString().split('T')[0],
// //     status: 'pending' as 'paid' | 'pending' | 'failed',
// //     paymentMethod: '',
// //     vendor: '',
// //     notes: ''
// //   });

// //   const categories = ['Operations', 'IT', 'Marketing', 'Travel', 'Office Supplies', 'Utilities', 'Other'];
// //   const statuses: Array<'paid' | 'pending' | 'failed'> = ['paid', 'pending', 'failed'];

// //   useEffect(() => {
// //     if (!propExpenses) {
// //       fetchExpenses();
// //     }
// //   }, []);

// //   const fetchExpenses = async () => {
// //     // setLoading(true);
// //     try {
// //       await new Promise(resolve => setTimeout(resolve, 500));
// //       const mockExpenses: Expense[] = [
// //         {
// //           id: 'EXP-001',
// //           description: 'Office Supplies',
// //           category: 'Office Supplies',
// //           amount: 450.00,
// //           date: '2026-06-15',
// //           status: 'paid',
// //           paymentMethod: 'VISA ****6187',
// //           vendor: 'Staples',
// //           notes: 'Monthly office supplies'
// //         },
// //         {
// //           id: 'EXP-002',
// //           description: 'Software Licenses',
// //           category: 'IT',
// //           amount: 1200.00,
// //           date: '2026-06-14',
// //           status: 'pending',
// //           paymentMethod: 'Mastercard ****4321',
// //           vendor: 'Microsoft',
// //           notes: 'Annual software renewal'
// //         },
// //         {
// //           id: 'EXP-003',
// //           description: 'Marketing Campaign',
// //           category: 'Marketing',
// //           amount: 2500.00,
// //           date: '2026-06-13',
// //           status: 'failed',
// //           paymentMethod: 'VISA ****6187',
// //           vendor: 'Google Ads',
// //           notes: 'Q2 marketing campaign'
// //         },
// //         {
// //           id: 'EXP-004',
// //           description: 'Team Lunch',
// //           category: 'Other',
// //           amount: 150.00,
// //           date: '2026-06-12',
// //           status: 'paid',
// //           paymentMethod: 'VISA ****6187',
// //           vendor: 'Local Restaurant'
// //         },
// //         {
// //           id: 'EXP-005',
// //           description: 'Travel Expenses',
// //           category: 'Travel',
// //           amount: 850.00,
// //           date: '2026-06-11',
// //           status: 'pending',
// //           paymentMethod: 'Company Card',
// //           vendor: 'Delta Airlines',
// //           notes: 'Client meeting travel'
// //         },
// //       ];
// //       setExpenses(mockExpenses);
// //       if (onExpenseUpdate) onExpenseUpdate(mockExpenses);
// //     } catch (error) {
// //       console.error('Error fetching expenses:', error);
// //     } finally {
// //       // setLoading(false);
// //     }
// //   };

// //   const getStatusColor = (status: string): string => {
// //     switch (status) {
// //       case 'paid':
// //         return 'text-green-700 bg-green-50 border-green-200';
// //       case 'pending':
// //         return 'text-yellow-700 bg-yellow-50 border-yellow-200';
// //       case 'failed':
// //         return 'text-red-700 bg-red-50 border-red-200';
// //       default:
// //         return 'text-gray-700 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const filteredExpenses = expenses.filter((expense: Expense) => {
// //     const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
// //     const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
// //     return matchesSearch && matchesCategory && matchesStatus;
// //   });

// //   const totalExpenses = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0);
// //   const paidExpenses = expenses.filter((e: Expense) => e.status === 'paid').reduce((sum: number, e: Expense) => sum + e.amount, 0);
// //   const pendingExpenses = expenses.filter((e: Expense) => e.status === 'pending').reduce((sum: number, e: Expense) => sum + e.amount, 0);

// //   const handleAddExpense = async () => {
// //     try {
// //       const expense: Expense = {
// //         id: `EXP-${String(expenses.length + 1).padStart(3, '0')}`,
// //         description: newExpense.description || '',
// //         category: newExpense.category || 'Other',
// //         amount: newExpense.amount || 0,
// //         date: newExpense.date || new Date().toISOString().split('T')[0],
// //         status: (newExpense.status as 'paid' | 'pending' | 'failed') || 'pending',
// //         paymentMethod: newExpense.paymentMethod || '',
// //         vendor: newExpense.vendor,
// //         notes: newExpense.notes,
// //       };
// //       const updatedExpenses = [...expenses, expense];
// //       setExpenses(updatedExpenses);
// //       if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
// //       setShowAddModal(false);
// //       setEditingExpense(null);
// //       setNewExpense({
// //         description: '',
// //         category: '',
// //         amount: 0,
// //         date: new Date().toISOString().split('T')[0],
// //         status: 'pending' as 'paid' | 'pending' | 'failed',
// //         paymentMethod: '',
// //         vendor: '',
// //         notes: ''
// //       });
// //     } catch (error) {
// //       console.error('Error adding expense:', error);
// //     }
// //   };

// //   const handleDeleteExpense = async (id: string) => {
// //     try {
// //       const updatedExpenses = expenses.filter((exp: Expense) => exp.id !== id);
// //       setExpenses(updatedExpenses);
// //       if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
// //       setShowDeleteModal(null);
// //     } catch (error) {
// //       console.error('Error deleting expense:', error);
// //     }
// //   };

// //   const handleUpdateExpense = async (id: string, updates: Partial<Expense>) => {
// //     try {
// //       const updatedExpenses = expenses.map((exp: Expense) =>
// //         exp.id === id ? { ...exp, ...updates } : exp
// //       );
// //       setExpenses(updatedExpenses);
// //       if (onExpenseUpdate) onExpenseUpdate(updatedExpenses);
// //     } catch (error) {
// //       console.error('Error updating expense:', error);
// //     }
// //   };

// //   const handleEditExpense = (expense: Expense) => {
// //     setEditingExpense(expense);
// //     setNewExpense({
// //       description: expense.description,
// //       category: expense.category,
// //       amount: expense.amount,
// //       date: expense.date,
// //       status: expense.status,
// //       paymentMethod: expense.paymentMethod,
// //       vendor: expense.vendor,
// //       notes: expense.notes,
// //     });
// //     setShowAddModal(true);
// //   };

// //   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
// //     const value = e.target.value as 'paid' | 'pending' | 'failed';
// //     handleUpdateExpense(id, { status: value });
// //   };

// //   const handleFormStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const value = e.target.value as 'paid' | 'pending' | 'failed';
// //     setNewExpense({ ...newExpense, status: value });
// //   };

// //   const uniqueCategories = [...new Set(expenses.map(e => e.category))];

// //   // if (loading) {
// //   //   return (
// //   //     <div className="flex items-center justify-center py-12">
// //   //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //   //     </div>
// //   //   );
// //   // }

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
// //         <div className="flex items-center gap-4 flex-wrap">
// //           <div className="text-right">
// //             <p className="text-xs text-gray-500">Total Expenses</p>
// //             <p className="text-lg font-bold text-gray-800">${totalExpenses.toFixed(2)}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="text-xs text-gray-500">Paid</p>
// //             <p className="text-lg font-bold text-green-600">${paidExpenses.toFixed(2)}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="text-xs text-gray-500">Pending</p>
// //             <p className="text-lg font-bold text-yellow-600">${pendingExpenses.toFixed(2)}</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-3 flex-wrap">
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search expenses..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
// //             />
// //             <svg
// //               className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //             >
// //               <circle cx="11" cy="11" r="8" />
// //               <line x1="21" y1="21" x2="16.65" y2="16.65" />
// //             </svg>
// //           </div>
// //           <select
// //             value={filterCategory}
// //             onChange={(e) => setFilterCategory(e.target.value)}
// //             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //           >
// //             <option value="all">All Categories</option>
// //             {uniqueCategories.map(cat => (
// //               <option key={cat} value={cat}>{cat}</option>
// //             ))}
// //           </select>
// //           <select
// //             value={filterStatus}
// //             onChange={(e) => setFilterStatus(e.target.value)}
// //             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //           >
// //             <option value="all">All Status</option>
// //             <option value="paid">Paid</option>
// //             <option value="pending">Pending</option>
// //             <option value="failed">Failed</option>
// //           </select>
// //           <button
// //             onClick={() => {
// //               setEditingExpense(null);
// //               setNewExpense({
// //                 description: '',
// //                 category: '',
// //                 amount: 0,
// //                 date: new Date().toISOString().split('T')[0],
// //                 status: 'pending' as 'paid' | 'pending' | 'failed',
// //                 paymentMethod: '',
// //                 vendor: '',
// //                 notes: ''
// //               });
// //               setShowAddModal(true);
// //             }}
// //             className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             + Add Expense
// //           </button>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Expense ID
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Description
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Category
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Amount
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Date
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Payment Method
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredExpenses.length === 0 ? (
// //               <tr>
// //                 <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// //                   No expenses found
// //                 </td>
// //               </tr>
// //             ) : (
// //               filteredExpenses.map((expense: Expense) => (
// //                 <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
// //                   <td className="px-6 py-4 text-sm font-medium text-gray-800">
// //                     {expense.id}
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-700">
// //                     {expense.description}
// //                     {expense.vendor && (
// //                       <span className="block text-xs text-gray-500">Vendor: {expense.vendor}</span>
// //                     )}
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-700">
// //                     <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
// //                       {expense.category}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm font-medium text-gray-800">
// //                     ${expense.amount.toFixed(2)}
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-600">
// //                     {new Date(expense.date).toLocaleDateString('en-US', { 
// //                       month: 'short', 
// //                       day: 'numeric', 
// //                       year: 'numeric' 
// //                     })}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <select
// //                       value={expense.status}
// //                       onChange={(e) => handleStatusChange(e, expense.id)}
// //                       className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(expense.status)}`}
// //                     >
// //                       <option value="paid">Paid</option>
// //                       <option value="pending">Pending</option>
// //                       <option value="failed">Failed</option>
// //                     </select>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-600">
// //                     {expense.paymentMethod}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => handleEditExpense(expense)}
// //                         className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
// //                       >
// //                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                           <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
// //                           <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
// //                         </svg>
// //                       </button>
// //                       <button
// //                         onClick={() => setShowDeleteModal(expense.id)}
// //                         className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
// //                       >
// //                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                           <polyline points="3 6 5 6 21 6" />
// //                           <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
// //                         </svg>
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Add/Edit Modal */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
// //             <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //               {editingExpense ? 'Edit Expense' : 'Add New Expense'}
// //             </h3>
// //             <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddExpense(); }}>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Description *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={newExpense.description}
// //                   onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                   placeholder="Enter expense description"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Category *
// //                 </label>
// //                 <select
// //                   required
// //                   value={newExpense.category}
// //                   onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                 >
// //                   <option value="">Select category</option>
// //                   {categories.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Vendor
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={newExpense.vendor || ''}
// //                   onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                   placeholder="Enter vendor name"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Amount ($) *
// //                 </label>
// //                 <input
// //                   type="number"
// //                   required
// //                   min="0"
// //                   step="0.01"
// //                   value={newExpense.amount}
// //                   onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                   placeholder="0.00"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Date *
// //                 </label>
// //                 <input
// //                   type="date"
// //                   required
// //                   value={newExpense.date}
// //                   onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Status
// //                 </label>
// //                 <select
// //                   value={newExpense.status}
// //                   onChange={handleFormStatusChange}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                 >
// //                   <option value="paid">Paid</option>
// //                   <option value="pending">Pending</option>
// //                   <option value="failed">Failed</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Payment Method
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={newExpense.paymentMethod || ''}
// //                   onChange={(e) => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                   placeholder="Enter payment method"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Notes
// //                 </label>
// //                 <textarea
// //                   value={newExpense.notes || ''}
// //                   onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
// //                   rows={3}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                   placeholder="Additional notes..."
// //                 />
// //               </div>
// //               <div className="flex justify-end gap-3 pt-4">
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     setShowAddModal(false);
// //                     setEditingExpense(null);
// //                   }}
// //                   className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
// //                 >
// //                   {editingExpense ? 'Update' : 'Add'} Expense
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Delete Modal */}
// //       {showDeleteModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-xl p-6 max-w-md w-full">
// //             <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Expense</h3>
// //             <p className="text-gray-600 mb-4">
// //               Are you sure you want to delete this expense? This action cannot be undone.
// //             </p>
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 onClick={() => setShowDeleteModal(null)}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() => handleDeleteExpense(showDeleteModal)}
// //                 className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ExpenseList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Expense {
//   id: number;
//   expense_number: string;
//   expense_date: string;
//   paid_by?: string;
//   category: string;
//   amount: number;
//   currency: string;
//   payment_method: string;
//   vendor_name?: string;
//   reference_number?: string;
//   notes?: string;
//   customer_name?: string;
//   status: 'paid' | 'pending' | 'failed';
// }

// interface ExpenseListProps {
//   onNewExpense?: () => void;
//   onEditExpense?: (expense: Expense) => void;
// }

// const API = 'http://localhost:5000/api';

// const ExpenseList: React.FC<ExpenseListProps> = ({ onNewExpense, onEditExpense }) => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState<string>('all');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/expenses`);
//       const raw = res.data?.data;
//       const dataArray = Array.isArray(raw) ? raw : raw ? [raw] : [];
//       const formatted: Expense[] = dataArray.map((e: any) => ({
//         id: e.id,
//         expense_number: e.expense_number,
//         expense_date: e.expense_date,
//         paid_by: e.paid_by || '',
//         category: e.category || 'Other',
//         amount: Number(e.amount) || 0,
//         currency: e.currency || 'INR',
//         payment_method: e.payment_method || '—',
//         vendor_name: e.vendor_name || '',
//         reference_number: e.reference_number || '',
//         notes: e.notes || '',
//         customer_name: e.customer_name || '',
//         status: (e.status || 'pending').toLowerCase(),
//       }));
//       setExpenses(formatted);
//     } catch (err) {
//       console.error('Failed to fetch expenses:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteExpense = async (id: number) => {
//     try {
//       await axios.delete(`${API}/expenses/${id}`);
//       setExpenses((prev) => prev.filter((exp) => exp.id !== id));
//       setShowDeleteModal(null);
//     } catch (err) {
//       console.error('Error deleting expense:', err);
//       alert('Failed to delete expense');
//     }
//   };

//   const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, expense: Expense) => {
//     const value = e.target.value as 'paid' | 'pending' | 'failed';
//     try {
//       await axios.put(`${API}/expenses/${expense.id}`, {
//         expense_date: expense.expense_date,
//         paid_by: expense.paid_by,
//         expense_account_id: undefined, // backend keeps existing if omitted — see note below
//         amount: expense.amount,
//         currency: expense.currency,
//         paid_through_id: undefined,
//         vendor_name: expense.vendor_name,
//         reference_number: expense.reference_number,
//         notes: expense.notes,
//         customer_id: undefined,
//         status: value,
//       });
//       setExpenses((prev) => prev.map((exp) => (exp.id === expense.id ? { ...exp, status: value } : exp)));
//     } catch (err) {
//       console.error('Error updating status:', err);
//       alert('Failed to update status');
//     }
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'paid':
//         return 'text-green-700 bg-green-50 border-green-200';
//       case 'pending':
//         return 'text-yellow-700 bg-yellow-50 border-yellow-200';
//       case 'failed':
//         return 'text-red-700 bg-red-50 border-red-200';
//       default:
//         return 'text-gray-700 bg-gray-50 border-gray-200';
//     }
//   };

//   const filteredExpenses = expenses.filter((expense) => {
//     const matchesSearch =
//       expense.expense_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       expense.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
//     const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
//   const paidExpenses = expenses.filter((e) => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
//   const pendingExpenses = expenses.filter((e) => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
//   const uniqueCategories = [...new Set(expenses.map((e) => e.category))];

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//         <div className="flex items-center gap-4 flex-wrap">
//           <div className="text-right">
//             <p className="text-xs text-gray-500">Total Expenses</p>
//             <p className="text-lg font-bold text-gray-800">₹{totalExpenses.toFixed(2)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500">Paid</p>
//             <p className="text-lg font-bold text-green-600">₹{paidExpenses.toFixed(2)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500">Pending</p>
//             <p className="text-lg font-bold text-yellow-600">₹{pendingExpenses.toFixed(2)}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search expenses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 text-sm"
//             />
//             <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="11" cy="11" r="8" />
//               <line x1="21" y1="21" x2="16.65" y2="16.65" />
//             </svg>
//           </div>
//           <select
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
//           >
//             <option value="all">All Categories</option>
//             {uniqueCategories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
//           >
//             <option value="all">All Status</option>
//             <option value="paid">Paid</option>
//             <option value="pending">Pending</option>
//             <option value="failed">Failed</option>
//           </select>
//           <button
//             onClick={() => onNewExpense && onNewExpense()}
//             className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             + Add Expense
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Through</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {loading ? (
//               <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-400">Loading expenses...</td></tr>
//             ) : filteredExpenses.length === 0 ? (
//               <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">No expenses found</td></tr>
//             ) : (
//               filteredExpenses.map((expense) => (
//                 <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 text-sm font-medium text-blue-600">{expense.expense_number}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">
//                     <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{expense.category}</span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{expense.vendor_name || '—'}</td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-800">
//                     ₹{expense.amount.toFixed(2)} <span className="text-xs text-gray-400">{expense.currency}</span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {new Date(expense.expense_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
//                   </td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={expense.status}
//                       onChange={(e) => handleStatusChange(e, expense)}
//                       className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(expense.status)}`}
//                     >
//                       <option value="paid">Paid</option>
//                       <option value="pending">Pending</option>
//                       <option value="failed">Failed</option>
//                     </select>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{expense.payment_method}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => onEditExpense && onEditExpense(expense)}
//                         className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
//                       >
//                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                           <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => setShowDeleteModal(expense.id)}
//                         className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
//                       >
//                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <polyline points="3 6 5 6 21 6" />
//                           <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Expense</h3>
//             <p className="text-gray-600 mb-4">Are you sure you want to delete this expense? This action cannot be undone.</p>
//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button onClick={() => handleDeleteExpense(showDeleteModal)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpenseList;

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
  customer_name?: string;
  status: 'paid' | 'pending' | 'failed';
}

interface ExpenseListProps {
  onNewExpense?: () => void;
  onEditExpense?: (expense: Expense) => void;
}

const API = 'http://localhost:5000/api';

const DEFAULT_FILTERS = ['All', 'Unbilled', 'Invoiced', 'Reimbursed', 'Billable', 'Non-Billable', 'With Receipts', 'Without Receipts'];

const COLUMN_DEFS = [
  { key: 'date', label: 'Date' },
  { key: 'expense_account', label: 'Expense Account' },
  { key: 'reference', label: 'Reference#' },
  { key: 'vendor_name', label: 'Vendor Name' },
  { key: 'paid_through', label: 'Paid Through' },
  { key: 'customer_name', label: 'Customer Name' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount' },
];

const SORT_OPTIONS = ['Created Time', 'Date', 'Expense Account', 'Vendor Name', 'Paid Through', 'Customer Name', 'Amount'];

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
        customer_name: e.customer_name || '',
        status: (e.status || 'pending').toLowerCase(),
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  // Filter dropdown mapping (Zoho-style default filters -> our status field)
  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch =
        !searchTerm ||
        expense.expense_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      switch (activeFilter) {
        case 'All':
          return true;
        case 'Invoiced':
          return expense.status === 'paid';
        case 'Unbilled':
        case 'Billable':
          return expense.status === 'pending';
        case 'Reimbursed':
          return expense.status === 'paid';
        case 'Non-Billable':
          return expense.status === 'failed';
        default:
          return true;
      }
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
        case 'Customer Name':
          cmp = (a.customer_name || '').localeCompare(b.customer_name || '');
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
      'data:text/csv;charset=utf-8,Date,Expense Account,Reference#,Vendor Name,Paid Through,Customer Name,Status,Amount\n';
    filteredExpenses.forEach((e) => {
      csvContent += `${e.expense_date},"${e.category}","${e.reference_number || ''}","${e.vendor_name || ''}","${e.payment_method}","${e.customer_name || ''}","${e.status}",${e.amount}\n`;
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
              <div className="border-t mt-1 pt-1">
                <button className="w-full text-left px-4 py-1.5 text-sm text-blue-600 hover:bg-gray-50">
                  + New Custom View
                </button>
              </div>
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
                  <button onClick={handleExport} className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                    ⬆ Export Current View
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
        {loading ? (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Loading expenses...</div>
        ) : filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <p className="text-sm">No expenses found</p>
          </div>
        ) : (
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
                  <th
                    onClick={() => handleSortClick('Date')}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    Date{arrow('Date')}
                  </th>
                )}
                {isColVisible('expense_account') && (
                  <th
                    onClick={() => handleSortClick('Expense Account')}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    Expense Account{arrow('Expense Account')}
                  </th>
                )}
                {isColVisible('reference') && (
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference#
                  </th>
                )}
                {isColVisible('vendor_name') && (
                  <th
                    onClick={() => handleSortClick('Vendor Name')}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    Vendor Name{arrow('Vendor Name')}
                  </th>
                )}
                {isColVisible('paid_through') && (
                  <th
                    onClick={() => handleSortClick('Paid Through')}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    Paid Through{arrow('Paid Through')}
                  </th>
                )}
                {isColVisible('customer_name') && (
                  <th
                    onClick={() => handleSortClick('Customer Name')}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    Customer Name{arrow('Customer Name')}
                  </th>
                )}
                {isColVisible('status') && (
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                )}
                {isColVisible('amount') && (
                  <th
                    onClick={() => handleSortClick('Amount')}
                    className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
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
                      placeholder="Search by vendor, account, customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-72 px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                    />
                  </th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExpenses.map((expense) => (
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
                  {isColVisible('customer_name') && (
                    <td className="px-4 py-3 text-sm text-gray-700">{expense.customer_name || '—'}</td>
                  )}
                  {isColVisible('status') && (
                    <td className={`px-4 py-3 text-sm font-medium ${getStatusStyle(expense.status)}`}>
                      {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
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
              ))}
            </tbody>
          </table>
        )}
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