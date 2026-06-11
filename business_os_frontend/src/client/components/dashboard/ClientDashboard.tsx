 import React, { useState, useEffect } from 'react';

const ClientDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: { thisMonth: 45000, growth: 18.4 },
    customers: { total: 156, newThisMonth: 12 },
    products: { total: 48, lowStock: 5 },
    invoices: { total: 89, pending: 12 }
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading Dashboard...</div>;
  }

  return (
    <div className="client-dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your business overview</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Revenue</span>
            <span className="stats-card-icon">💰</span>
          </div>
          <div className="stats-card-value">₹{stats.revenue.thisMonth.toLocaleString()}</div>
          <div className="stats-card-change">
            <span className="change-positive">↑ {stats.revenue.growth}%</span>
            <span>vs last month</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Customers</span>
            <span className="stats-card-icon">👥</span>
          </div>
          <div className="stats-card-value">{stats.customers.total}</div>
          <div className="stats-card-change">
            <span className="change-positive">+{stats.customers.newThisMonth}</span>
            <span>new this month</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Products</span>
            <span className="stats-card-icon">📦</span>
          </div>
          <div className="stats-card-value">{stats.products.total}</div>
          <div className="stats-card-change">
            <span>{stats.products.lowStock} low stock items</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <span className="stats-card-title">Invoices</span>
            <span className="stats-card-icon">📄</span>
          </div>
          <div className="stats-card-value">{stats.invoices.total}</div>
          <div className="stats-card-change">
            <span>{stats.invoices.pending} pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
