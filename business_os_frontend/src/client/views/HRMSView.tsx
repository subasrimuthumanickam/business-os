import React, { useState } from 'react';
import EmployeeList from '../components/hrms/EmployeeList';
import AttendanceTracker from '../components/hrms/AttendanceTracker';
import LeaveRequest from '../components/hrms/LeaveRequest';
import OrganizationChart from '../components/hrms/OrganizationChart';
import SkillMatrix from '../components/hrms/SkillMatrix';
import PerformanceTracker from '../components/hrms/PerformanceTracker';
import AnalyticsDashboard from '../components/hrms/AnalyticsDashboard';

type HRMSTab = 'employees' | 'attendance' | 'leave' | 'org-chart' | 'skills' | 'performance' | 'analytics';

const HRMSView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HRMSTab>('employees');

  const tabs: { id: HRMSTab; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
          <circle cx="8" cy="15" r="1" />
        </svg>
      )
    },
    { 
      id: 'leave', 
      label: 'Leave Management', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    { 
      id: 'org-chart', 
      label: 'Organization', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" />
          <circle cx="6" cy="10" r="2" />
          <circle cx="18" cy="10" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <line x1="12" y1="6" x2="12" y2="10" />
          <line x1="8" y1="12" x2="8" y2="16" />
          <line x1="16" y1="12" x2="16" y2="16" />
          <line x1="12" y1="12" x2="6" y2="12" />
          <line x1="12" y1="12" x2="18" y2="12" />
        </svg>
      )
    },
    { 
      id: 'skills', 
      label: 'Skill Matrix', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    { 
      id: 'performance', 
      label: 'Performance', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header - No icon, reduced margins ONLY */}
      <div className="px-3 pt-1.5 pb-1">
        <h1 className="text-2xl font-bold text-gray-800">HR Management System</h1>
        <p className="text-sm text-gray-500 mt-0.5">Complete employee lifecycle management</p>
      </div>

      {/* Stats Cards Removed */}

      {/* Tabs - Reduced side margin only */}
      <div className="bg-white border-y border-gray-200 overflow-x-auto">
        <nav className="flex px-3">
          {tabs.map((tab: { id: HRMSTab; label: string; icon: React.ReactNode }) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content - Reduced padding only */}
      <div className="p-3">
        {activeTab === 'employees' && <EmployeeList />}
        {activeTab === 'attendance' && <AttendanceTracker />}
        {activeTab === 'leave' && <LeaveRequest />}
        {activeTab === 'org-chart' && <OrganizationChart />}
        {activeTab === 'skills' && <SkillMatrix />}
        {activeTab === 'performance' && <PerformanceTracker />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>
    </div>
  );
};

export default HRMSView;