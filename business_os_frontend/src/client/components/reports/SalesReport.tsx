import React, { useState } from 'react';

interface SalesData {
  month: string;
  sales: number;
  orders: number;
  newCustomers: number;
}

const SalesReport: React.FC = () => {
  const [period, setPeriod] = useState('monthly');
  const [data, setData] = useState<SalesData[]>([
    { month: 'Jan', sales: 45000, orders: 45, newCustomers: 12 },
    { month: 'Feb', sales: 52000, orders: 52, newCustomers: 15 },
    { month: 'Mar', sales: 48000, orders: 48, newCustomers: 10 },
    { month: 'Apr', sales: 61000, orders: 61, newCustomers: 18 },
    { month: 'May', sales: 58000, orders: 58, newCustomers: 14 },
    { month: 'Jun', sales: 72000, orders: 72, newCustomers: 22 },
  ]);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const totalNewCustomers = data.reduce((sum, item) => sum + item.newCustomers, 0);
  const averageSales = totalSales / data.length;

  const handleExport = () => {
    const csvContent = [
      ['Month', 'Sales (₹)', 'Orders', 'New Customers'],
      ...data.map(item => [item.month, item.sales, item.orders, item.newCustomers])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sales-report">
      <div className="report-header">
        <h2>Sales Report</h2>
        <div className="report-controls">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="period-select"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-export" onClick={handleExport}>Export Report</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="stat-label">TOTAL SALES</div>
          <div className="stat-value">₹{totalSales.toLocaleString()}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">TOTAL ORDERS</div>
          <div className="stat-value">{totalOrders.toLocaleString()}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">NEW CUSTOMERS</div>
          <div className="stat-value">{totalNewCustomers}</div>
        </div>
        <div className="report-stat-card">
          <div className="stat-label">AVERAGE SALES</div>
          <div className="stat-value">₹{Math.round(averageSales).toLocaleString()}</div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="report-table-container">
        <h3>Sales Overview</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>MONTH</th>
              <th>SALES (₹)</th>
              <th>ORDERS</th>
              <th>NEW CUSTOMERS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>₹{item.sales.toLocaleString()}</td>
                <td>{item.orders}</td>
                <td>{item.newCustomers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;