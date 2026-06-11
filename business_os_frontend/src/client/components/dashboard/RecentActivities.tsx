 import React from 'react';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      customer: '👥',
      invoice: '💰',
      payment: '💳',
      stock: '📦',
      lead: '📋'
    };
    return icons[type] || '📌';
  };

  const formatTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
        <button className="view-all">View All</button>
      </div>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">{getIcon(activity.type)}</div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-description">{activity.description}</div>
            </div>
            <div className="activity-time">{formatTime(activity.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
