import React from 'react';

interface StatsProps {
  stats: {
    totalCompanies: number;
    activeCompanies: number;
    trialCompanies: number;
    revenue: number;
  };
}

const StatsCards: React.FC<StatsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Total Companies',
      value: stats.totalCompanies,
      icon: '🏢',
    },
    {
      label: 'Active Companies',
      value: stats.activeCompanies,
      icon: '✅',
    },
    {
      label: 'Trial Period',
      value: stats.trialCompanies,
      icon: '⏳',
    },
    {
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: '💰',
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">{card.icon}</span>
          </div>

          <div className="stat-value">
            {card.value}
          </div>

          <div className="stat-title">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;