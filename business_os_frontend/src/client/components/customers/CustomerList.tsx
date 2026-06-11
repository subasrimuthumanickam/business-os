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
        <select className="chart-select">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="chart-container">
        {chartData.map((item, index) => (
          <div key={index} className="chart-bar-wrapper">
            <div 
              className="chart-bar" 
              style={{ height: `${(item.revenue / maxRevenue) * 150}px` }}
            >
              <span className="chart-value">₹{item.revenue / 1000}K</span>
            </div>
            <div className="chart-label">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
