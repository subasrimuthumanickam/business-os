import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const items = [
    { label: 'Overview', to: '/dashboard' },
    { label: 'Companies', to: '/companies' },
    { label: 'Revenue', to: '/revenue' },
    { label: 'Settings', to: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-title">Main Menu</p>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? 'sidebar-link active'
                : 'sidebar-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      
    </aside>
    
  );
};

export default Sidebar;