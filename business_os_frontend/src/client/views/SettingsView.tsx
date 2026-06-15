// src/client/views/SettingsView.tsx
import React, { useState } from 'react';
import WorkspaceSettings from '../components/settings/WorkspaceSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import BillingSettings from '../components/settings/BillingSettings';
import TeamSettings from '../components/settings/TeamSettings';
import '../components/settings/workspace.css';
import '../components/settings/profile.css';
import '../components/settings/security.css';
import '../components/settings/notification.css';
import '../components/settings/billing.css';
import '../components/settings/team.css';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workspace');

  const tabs = [
    { id: 'workspace', label: 'Workspace', icon: '🏢' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'team', label: 'Team', icon: '👥' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'workspace':
        return <WorkspaceSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'team':
        return <TeamSettings />;
      default:
        return <WorkspaceSettings />;
    }
  };

  return (
    <div className="client-dashboard">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your workspace and account preferences</p>
      </div>

      <div className="dashboard-grid">
        {/* Settings Sidebar as Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Settings Menu</h3>
          </div>
          <div className="settings-tabs-list">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon text-xl">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="dashboard-card settings-content-card">
          <div className="card-header">
            <h3 className="card-title">
              {tabs.find(t => t.id === activeTab)?.label} Settings
            </h3>
          </div>
          <div className="settings-content-wrapper">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;