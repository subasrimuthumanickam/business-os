 import React from 'react';
import { NavLink } from 'react-router-dom';

interface ClientSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { path: '/client/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/client/customers', icon: '👥', label: 'Customers' },
    { path: '/client/inventory', icon: '📦', label: 'Inventory' },
    { path: '/client/billing', icon: '💰', label: 'Billing' },
    { path: '/client/hrms', icon: '👔', label: 'HRMS' },
    { path: '/client/projects', icon: '📋', label: 'Projects' },
    { path: '/client/reports', icon: '📈', label: 'Reports' },
    { path: '/client/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className={`client-sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{isOpen ? 'BusinessOS' : 'B'}</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ClientSidebar;
