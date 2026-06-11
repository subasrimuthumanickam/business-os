 import React from 'react';

const ExpenseList: React.FC = () => {
  return (
    <div>
      <h2>Expenses</h2>
      <button className="btn-primary">+ Add Expense</button>
      <table className="data-table">
        <thead>
          <tr><th>Date</th><th>Category</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td colSpan={4}>No expenses found</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
export {};  // ← ADD THIS
