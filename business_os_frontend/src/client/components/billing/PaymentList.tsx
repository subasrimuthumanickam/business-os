 import React from 'react';

const PaymentList: React.FC = () => {
  return (
    <div>
      <h2>Payments</h2>
      <table className="data-table">
        <thead>
          <tr><th>Payment ID</th><th>Invoice #</th><th>Amount</th><th>Date</th><th>Method</th></tr>
        </thead>
        <tbody>
          <tr><td colSpan={5}>No payments found</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
export {};  // ← ADD THIS
