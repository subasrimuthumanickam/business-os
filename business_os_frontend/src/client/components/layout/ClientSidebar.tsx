//  import React from 'react';
// import { NavLink } from 'react-router-dom';

// interface ClientSidebarProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {
//   const menuItems = [
//     { path: '/client/dashboard', icon: '📊', label: 'Dashboard' },
//     { path: '/client/customers', icon: '👥', label: 'Customers' },
//     { path: '/client/inventory', icon: '📦', label: 'Inventory' },
//     { path: '/client/billing', icon: '💰', label: 'Billing' },
//     { path: '/client/hrms', icon: '👔', label: 'HRMS' },
//     { path: '/client/projects', icon: '📋', label: 'Projects' },
//     { path: '/client/reports', icon: '📈', label: 'Reports' },
//     { path: '/client/settings', icon: '⚙️', label: 'Settings' },
//   ];

//   return (
//     <aside className={`client-sidebar ${!isOpen ? 'collapsed' : ''}`}>
//       <div className="sidebar-header">
//         <h2>{isOpen ? 'BusinessOS' : 'B'}</h2>
//       </div>
//       <nav className="sidebar-nav">
//         {menuItems.map(item => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             {isOpen && <span className="nav-label">{item.label}</span>}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default ClientSidebar;
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// interface ClientSidebarProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {
//   // Keeping your exact paths, labels, and order—just replacing emojis with crisp SVGs
//   const menuItems = [
//     { 
//       path: '/client/dashboard', 
//       label: 'Dashboard', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <rect x="3" y="3" width="7" height="9" rx="1" />
//           <rect x="14" y="3" width="7" height="5" rx="1" />
//           <rect x="14" y="12" width="7" height="9" rx="1" />
//           <rect x="3" y="16" width="7" height="5" rx="1" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/customers', 
//       label: 'Customers', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//           <circle cx="9" cy="7" r="4" />
//           <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//           <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/inventory', 
//       label: 'Inventory', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
//           <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/billing', 
//       label: 'Billing', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <line x1="12" y1="1" x2="12" y2="23" />
//           <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/hrms', 
//       label: 'HRMS', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//           <circle cx="12" cy="7" r="4" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/projects', 
//       label: 'Projects', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//           <polyline points="14 2 14 8 20 8" />
//           <line x1="16" y1="13" x2="8" y2="13" />
//           <line x1="16" y1="17" x2="8" y2="17" />
//           <polyline points="10 9 9 9 8 9" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/reports', 
//       label: 'Reports', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <line x1="18" y1="20" x2="18" y2="10" />
//           <line x1="12" y1="20" x2="12" y2="4" />
//           <line x1="6" y1="20" x2="6" y2="14" />
//         </svg>
//       )
//     },
//     { 
//       path: '/client/settings', 
//       label: 'Settings', 
//       icon: (
//         <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
//           <circle cx="12" cy="12" r="3" />
//           <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
//         </svg>
//       )
//     },
//   ];

//   return (
//     <aside className={`client-sidebar ${!isOpen ? 'collapsed' : ''}`}>
//       <div className="sidebar-header">
//         <div className="logo-container">
//           <span className="logo-brand-icon">⚡</span>
//           {isOpen && <h2>BusinessOS</h2>}
//         </div>
//       </div>
      
//       <nav className="sidebar-nav">
//         {menuItems.map(item => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
//           >
//             <span className="nav-icon">{item.icon}</span>
//             {isOpen && <span className="nav-label">{item.label}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Clean Model Style Bottom Switch */}
//       <div className="sidebar-footer">
//         <div className="mode-toggle">
//           <span>☀️</span>
//           <label className="switch">
//             <input type="checkbox" defaultChecked />
//             <span className="slider round"></span>
//           </label>
//           <span>🌙</span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default ClientSidebar;
import React from 'react';
import { NavLink } from 'react-router-dom';

interface ClientSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { 
      path: '/client/dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    { 
      path: '/client/customers', 
      label: 'Customers', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      path: '/client/inventory', 
      label: 'Inventory', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      )
    },
    { 
      path: '/client/billing', 
      label: 'Billing', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    { 
      path: '/client/hrms', 
      label: 'HRMS', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    { 
      path: '/client/projects', 
      label: 'Projects', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    { 
      path: '/client/reports', 
      label: 'Reports', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    { 
      path: '/client/settings', 
      label: 'Settings', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
  ];

  return (
    <aside className={`client-sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-brand-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </span>
          {isOpen && <h2>BusinessOS</h2>}
        </div>
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

      <div className="sidebar-footer">
        <div className="mode-toggle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;