import React, { useState, useEffect } from 'react';
import './clientdashboard.css';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface SalesData {
  month: string;
  revenue: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: number;
  changeLabel?: string;
  alert?: boolean;
  alertText?: string;
  type?: 'revenue' | 'customers' | 'products' | 'invoices';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title, value, change, changeLabel, alert, alertText, type = 'revenue'
}) => {
  // Determine percentage stroke configurations matching the visual design tokens
  let strokeClass = 'progress-ring-revenue';
  let percentage = 75;

  if (type === 'customers') {
    strokeClass = 'progress-ring-customer';
    percentage = 62;
  } else if (type === 'products') {
    strokeClass = 'progress-ring-orders';
    percentage = 85;
  } else if (type === 'invoices') {
    strokeClass = 'progress-ring-cancel';
    percentage = 40;
  }

  // Calculate SVG stroke dashes based on a radius of 26
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="premium-metric-card">
      <div className="metric-left-visual">
        <svg className="metric-svg-ring" viewBox="0 0 64 64">
          <circle className="progress-ring-bg" cx="32" cy="32" r={radius} strokeWidth="6" />
          <circle 
            className={`progress-ring-indicator ${strokeClass}`} 
            cx="32" 
            cy="32" 
            r={radius} 
            strokeWidth="6" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className="metric-inner-percentage">{percentage}%</span>
      </div>

      <div className="metric-right-data">
        <span className="premium-metric-label">{title}</span>
        <h2 className="premium-metric-value">{value}</h2>
        
        {change !== undefined && (
          <div className="stats-card-change">
            <span className={change >= 0 ? 'change-positive' : 'change-negative'}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="change-label"> {changeLabel}</span>
          </div>
        )}
        {alert && alertText && (
          <div className="stats-card-alert">⚠️ {alertText}</div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// RECENT ACTIVITIES
// ─────────────────────────────────────────────
const ACTIVITY_ICONS: Record<string, string> = {
  customer: '👥', invoice: '💰', payment: '💳', stock: '📦', lead: '📋',
};

const formatTime = (ts: string): string => {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + ' min ago';
  const h = Math.floor(mins / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
};

const RecentActivities: React.FC<{ activities: Activity[] }> = ({ activities }) => (
  <div className="dashboard-card">
    <div className="card-header">
      <h3 className="card-title">Recent Activity</h3>
      <button className="view-all-btn">View All</button>
    </div>
    <div className="activity-list">
      {activities.map(a => (
        <div key={a.id} className="activity-item">
          <div className="activity-icon">{ACTIVITY_ICONS[a.type] ?? '📌'}</div>
          <div className="activity-content">
            <div className="activity-title">{a.title}</div>
            <div className="activity-desc">{a.description}</div>
          </div>
          <div className="activity-time">{formatTime(a.timestamp)}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// SALES CHART
// ─────────────────────────────────────────────
const DEFAULT_SALES: SalesData[] = [
  { month: 'Jan', revenue: 24000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 30000 },
  { month: 'Apr', revenue: 27000 },
  { month: 'May', revenue: 36000 },
  { month: 'Jun', revenue: 33000 },
];

const SalesChart: React.FC<{ data?: SalesData[] }> = ({ data = DEFAULT_SALES }) => {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Sales Overview</h3>
        <select className="chart-select">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="chart-container">
        {data.map((item, i) => (
          <div key={i} className="chart-bar-group">
            <div className="chart-bar-wrap">
              <span className="chart-bar-label">&#8377;{Math.round(item.revenue / 1000)}K</span>
              <div
                className="chart-bar"
                style={{ height: Math.round((item.revenue / max) * 160) + 'px' }}
                title={'&#8377;' + item.revenue.toLocaleString()}
              />
            </div>
            <span className="chart-month">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// TOP PRODUCTS
// ─────────────────────────────────────────────
const TopProducts: React.FC<{ products: TopProduct[] }> = ({ products }) => {
  const maxRevenue = Math.max(...products.map(p => p.revenue));
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Top Products</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="products-list">
        {products.map((p, i) => (
          <div key={p.id} className="product-item">
            <div className="product-rank">{i + 1}</div>
            <span className="product-name">{p.name}</span>
            <div className="product-bar-wrap">
              <div className="product-bar" style={{ width: Math.round((p.revenue / maxRevenue) * 100) + '%' }} />
            </div>
            <span className="product-revenue">&#8377;{p.revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// UPCOMING TASKS
// ─────────────────────────────────────────────
const formatDue = (dueDate: string): string => {
  const diff = new Date(dueDate).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due Today';
  if (days === 1) return 'Tomorrow';
  return days + ' days left';
};

const UpcomingTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setDone(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">Upcoming Tasks</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="tasks-list">
        {tasks.map(t => {
          const due = formatDue(t.dueDate);
          return (
            <div key={t.id} className="task-item">
              <input type="checkbox" className="task-checkbox"
                checked={done.has(t.id)} onChange={() => toggle(t.id)} />
              <div className="task-content">
                <div className="task-title"
                  style={{ textDecoration: done.has(t.id) ? 'line-through' : 'none', opacity: done.has(t.id) ? 0.5 : 1 }}>
                  {t.title}
                </div>
                <div className={'task-due' + (due === 'Due Today' || due === 'Overdue' ? ' urgent' : '')}>{due}</div>
              </div>
              <span className={'task-priority priority-' + t.priority}>{t.priority}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN CLIENT DASHBOARD
// ─────────────────────────────────────────────
const ClientDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        stats: {
          revenue:   { thisMonth: 45000, growth: 18.4 },
          customers: { total: 156, newThisMonth: 12 },
          products:  { total: 48, lowStock: 5 },
          invoices:  { total: 89, pending: 12 },
        },
        activities: [
          { id: '1', type: 'customer', title: 'New customer added',   description: 'ABC Corp was added',            timestamp: new Date().toISOString() },
          { id: '2', type: 'invoice',  title: 'Invoice created',      description: 'Invoice #INV-001 for ₹10,000', timestamp: new Date().toISOString() },
          { id: '3', type: 'payment',  title: 'Payment received',     description: 'Payment of ₹5,000 received',   timestamp: new Date().toISOString() },
          { id: '4', type: 'stock',    title: 'Low stock alert',      description: 'Laptop Pro below 5 units',     timestamp: new Date(Date.now() - 3600000).toISOString() },
        ],
        topProducts: [
          { id: '1', name: 'Laptop Pro',     revenue: 65000, quantity: 42 },
          { id: '2', name: 'Office Chair',   revenue: 38500, quantity: 28 },
          { id: '3', name: 'Wireless Mouse', revenue: 12000, quantity: 95 },
          { id: '4', name: 'Standing Desk',  revenue: 9400,  quantity: 14 },
        ],
        tasks: [
          { id: '1', title: 'Follow up with ABC Corp',    dueDate: new Date().toISOString(),                       priority: 'high'   as const },
          { id: '2', title: 'Send quotation to XYZ Ltd',  dueDate: new Date(Date.now() + 86400000).toISOString(),  priority: 'medium' as const },
          { id: '3', title: 'Review Q2 inventory report', dueDate: new Date(Date.now() + 172800000).toISOString(), priority: 'low'    as const },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="loading">Loading Dashboard…</div>;
  if (!data)   return <div className="loading">No data available</div>;

  const { stats, activities, topProducts, tasks } = data;

  return (
    <div className="client-dashboard">

      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your business overview</p>
      </div>

      <div className="stats-grid">
        <StatsCard type="revenue" title="Revenue" value={'₹' + stats.revenue.thisMonth.toLocaleString()} icon="💰" change={stats.revenue.growth} changeLabel="vs last month" />
        <StatsCard type="customers" title="Customers" value={stats.customers.total} icon="👥" change={stats.customers.newThisMonth} changeLabel="new this month" />
        <StatsCard type="products" title="Products" value={stats.products.total} icon="📦" alert={stats.products.lowStock > 0} alertText={stats.products.lowStock + ' items low stock'} />
        <StatsCard type="invoices" title="Invoices" value={stats.invoices.total} icon="📄" change={stats.invoices.pending} changeLabel="pending" />
      </div>

      <div className="dashboard-grid">
        <RecentActivities activities={activities} />
        <SalesChart />
      </div>

      <div className="dashboard-grid">
        <TopProducts products={topProducts} />
        <UpcomingTasks tasks={tasks} />
      </div>

    </div>
  );
};

export default ClientDashboard;