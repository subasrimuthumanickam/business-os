 import React, { useState } from 'react';

interface ReportData {
  month: string;
  sales: number;
  orders: number;
  customers: number;
}

const SalesReport: React.FC = () => {
  const [period, setPeriod] = useState('monthly');
  const [data, setData] = useState<ReportData[]>([
    { month: 'Jan', sales: 45000, orders: 45, customers: 12 },
    { month: 'Feb', sales: 52000, orders: 52, customers: 15 },
    { month: 'Mar', sales: 48000, orders: 48, customers: 10 },
    { month: 'Apr', sales: 61000, orders: 61, customers: 18 },
    { month: 'May', sales: 58000, orders: 58, customers: 14 },
    { month: 'Jun', sales: 72000, orders: 72, customers: 22 },
  ]);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
  const averageSales = totalSales / data.length;

  const handleExport = () => {
    alert('Exporting report...');
  };

  return (
    <div className="sales-report">
      <div className="list-header">
        <h2>Sales Report</h2>
        <div className="report-actions">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-primary" onClick={handleExport}>Export Report</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Sales</span>
            <span className="stats-card-icon">💰</span>
          </div>
          <div className="stats-card-value">₹{totalSales.toLocaleString()}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Total Orders</span>
            <span className="stats-card-icon">📦</span>
          </div>
          <div className="stats-card-value">{totalOrders}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">New Customers</span>
            <span className="stats-card-icon">👥</span>
          </div>
          <div className="stats-card-value">{totalCustomers}</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Average Sales</span>
            <span className="stats-card-icon">📊</span>
          </div>
          <div className="stats-card-value">₹{averageSales.toLocaleString()}</div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3>Sales Overview</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Sales (₹)</th>
                <th>Orders</th>
                <th>New Customers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>₹{item.sales.toLocaleString()}</td>
                  <td>{item.orders}</td>
                  <td>{item.customers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
