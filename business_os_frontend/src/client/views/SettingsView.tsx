// src/client/views/SettingsView.tsx
import React, { useState } from 'react';
import GeneralSettings from '../components/settings/GeneralSettings';
import CompanyProfile from '../components/settings/CompanyProfile';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import RolesPermissions from '../components/settings/RolesPermissions';
import NotificationSettings from '../components/settings/NotificationSettings';
import BillingSettings from '../components/settings/BillingSettings';
import TeamSettings from '../components/settings/TeamSettings';

interface NavItem {
  id: string;
  label: string;
  status?: 'active' | 'soon';
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Organization',
    items: [
      { id: 'general', label: 'General & Localization', status: 'active' },
      { id: 'company', label: 'Company Profile', status: 'active' },
      { id: 'financial', label: 'Financial Settings', status: 'active' },
    ],
  },
  {
    title: 'Users & Controls',
    items: [
      { id: 'team', label: 'Users', status: 'active' },
      { id: 'roles', label: 'Roles & Permissions', status: 'active' },
      { id: 'security', label: 'Security', status: 'active' },
    ],
  },
  {
    title: 'Module Preferences',
    items: [
      { id: 'mod-finance', label: 'Finance', status: 'soon' },
      { id: 'mod-inventory', label: 'Inventory', status: 'soon' },
      { id: 'mod-hr', label: 'HR & Payroll', status: 'soon' },
    ],
  },
  {
    title: 'Integrations & System',
    items: [
      { id: 'api', label: 'API & Webhooks', status: 'soon' },
      { id: 'email', label: 'Email (SMTP)', status: 'soon' },
      { id: 'backup', label: 'Backup & Data', status: 'soon' },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'My Profile', status: 'active' },
      { id: 'billing', label: 'Billing & Plan', status: 'active' },
      { id: 'notifications', label: 'Notifications', status: 'active' },
    ],
  },
];

const allLabelsById: Record<string, string> = navGroups
  .flatMap(g => g.items)
  .reduce((acc, item) => ({ ...acc, [item.id]: item.label }), {});

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Pages that need full width (tables, matrices) skip the narrow max-w constraint
  const isWideLayout = activeTab === 'roles';

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'company':
        return <CompanyProfile />;
      case 'financial':
        return <GeneralSettings section="financial" />;
      case 'team':
        return <TeamSettings />;
      case 'roles':
        return <RolesPermissions />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-4xl mb-3">🚧</div>
            <p className="text-sm font-medium text-gray-700">
              {allLabelsById[activeTab]} — Coming soon
            </p>
            <p className="text-xs text-gray-400 mt-1">This section is on the roadmap.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-64px)] bg-white">
      {/* Zoho-style grouped sidebar */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="px-5 py-5 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your organization</p>
        </div>

        <nav className="py-3">
          {navGroups.map(group => (
            <div key={group.title} className="mb-4">
              <p className="px-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </p>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between text-left px-5 py-2 text-sm border-l-2 transition-colors ${
                    activeTab === item.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.status === 'soon' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content area */}
      <main className="flex-1 overflow-y-auto">
        <div className={isWideLayout ? 'px-6 py-6' : 'max-w-3xl mx-auto px-8 py-8'}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SettingsView;