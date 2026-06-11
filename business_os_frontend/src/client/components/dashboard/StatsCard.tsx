 import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: number;
  changeLabel?: string;
  alert?: boolean;
  alertText?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeLabel,
  alert,
  alertText 
}) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <span className="stats-card-title">{title}</span>
        <span className="stats-card-icon">{icon}</span>
      </div>
      <div className="stats-card-value">{value}</div>
      {change !== undefined && (
        <div className="stats-card-change">
          <span className={change >= 0 ? 'change-positive' : 'change-negative'}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span>{changeLabel || 'vs last month'}</span>
        </div>
      )}
      {alert && (
        <div className="stats-card-alert">
          ⚠️ {alertText}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
