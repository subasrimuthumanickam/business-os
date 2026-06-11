import React from 'react';

interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

interface SalesChartProps {
  data?: SalesData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data = [] }) => {
  const defaultData = [
    { month: 'Jan', sales: 4000, revenue: 24000 },
    { month: 'Feb', sales: 3000, revenue: 18000 },
    { month: 'Mar', sales: 5000, revenue: 30000 },
    { month: 'Apr', sales: 4500, revenue: 27000 },
    { month: 'May', sales: 6000, revenue: 36000 },
    { month: 'Jun', sales: 5500, revenue: 33000 },
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Sales Overview</h3>
        <select className="chart-select" style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="chart-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px', padding: '20px', minHeight: '250px' }}>
        {chartData.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{ 
                width: '100%', 
                height: `${(item.revenue / maxRevenue) * 150}px`,
                background: 'linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '8px 8px 0 0',
                position: 'relative',
                transition: 'height 0.5s ease'
              }}
            >
              <span style={{ 
                position: 'absolute', 
                top: '-25px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: '11px',
                color: '#4f46e5',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}>
                ₹{item.revenue / 1000}K
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;