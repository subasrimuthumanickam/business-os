import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';
import UpcomingTasks from './UpcomingTasks';

const ClientDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        stats: {
          revenue: { thisMonth: 45000, growth: 18.4 },
          customers: { total: 156, newThisMonth: 12 },
          products: { total: 48, lowStock: 5 },
          invoices: { total: 89, pending: 12 }
        },
        activities: [
          { id: '1', type: 'customer', title: 'New customer added', description: 'ABC Corp was added', timestamp: new Date().toISOString() },
          { id: '2', type: 'invoice', title: 'Invoice created', description: 'Invoice #INV-001 for ₹10,000', timestamp: new Date().toISOString() },
          { id: '3', type: 'payment', title: 'Payment received', description: 'Payment of ₹5,000 received', timestamp: new Date().toISOString() },
        ],
        topProducts: [
          { id: '1', name: 'Laptop Pro', revenue: 65000 },
          { id: '2', name: 'Wireless Mouse', revenue: 1200 },
          { id: '3', name: 'Office Chair', revenue: 8500 },
        ],
        tasks: [
          { id: '1', title: 'Follow up with ABC Corp', dueDate: new Date().toISOString(), priority: 'high' },
          { id: '2', title: 'Send quotation to XYZ Ltd', dueDate: new Date(Date.now() + 86400000).toISOString(), priority: 'medium' },
        ]
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="loading">Loading Dashboard...</div>;
  if (!data) return <div>No data available</div>;

  const { stats, activities, topProducts, tasks } = data;

  return (
    <div className="client-dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your business overview</p>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-grid">
        <StatsCard 
          title="Revenue" 
          value={`₹${stats.revenue.thisMonth.toLocaleString()}`} 
          icon="💰" 
          change={stats.revenue.growth} 
          changeLabel="vs last month"
        />
        <StatsCard 
          title="Customers" 
          value={stats.customers.total} 
          icon="👥" 
          change={stats.customers.newThisMonth} 
          changeLabel="new this month"
        />
        <StatsCard 
          title="Products" 
          value={stats.products.total} 
          icon="📦" 
        />
        <StatsCard 
          title="Invoices" 
          value={stats.invoices.total} 
          icon="📄" 
        />
      </div>

      {/* Dashboard Grid - Row 1: Recent Activities + Sales Chart */}
      <div className="dashboard-grid">
        <RecentActivities activities={activities} />
        <SalesChart />  {/* ← SalesChart added here */}
      </div>

      {/* Dashboard Grid - Row 2: Top Products + Upcoming Tasks */}
      <div className="dashboard-grid">
        <TopProducts products={topProducts} />
        <UpcomingTasks tasks={tasks} />
      </div>
    </div>
  );
};

export default ClientDashboard;