//  import React from 'react';

// interface ClientHeaderProps {
//   onMenuClick: () => void;
// }

// const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
//   const [notifications, setNotifications] = React.useState(3);
//   const [showProfileMenu, setShowProfileMenu] = React.useState(false);

//   return (
//     <header className="client-header">
//       <div className="header-left">
//         <button className="menu-btn" onClick={onMenuClick}>
//           ☰
//         </button>
//         <div className="search-bar">
//           <span className="search-icon">🔍</span>
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="header-right">
//         <div className="notifications" onClick={() => setNotifications(0)}>
//           <span className="notification-icon">🔔</span>
//           {notifications > 0 && <span className="notification-badge">{notifications}</span>}
//         </div>
//         <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
//           <div className="user-avatar">JD</div>
//           <span className="user-name">John Doe</span>
//           <span className="dropdown-icon">▼</span>
//           {showProfileMenu && (
//             <div className="profile-menu">
//               <a href="/profile">My Profile</a>
//               <a href="/settings">Settings</a>
//               <hr />
//               <a href="/logout">Logout</a>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ClientHeader;
import React from 'react';

interface ClientHeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const [notifications, setNotifications] = React.useState(3);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="client-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
          <kbd className="shortcut-key">/</kbd>
        </div>
      </div>
      
      <div className="header-right">
        {/* Visual-only action addition matching model layout */}
        <button className="share-dashboard-btn">
          <span>🔗</span> Share Dashboard
        </button>

        <div className="notifications" onClick={() => setNotifications(0)}>
          <span className="notification-icon">🔔</span>
          {notifications > 0 && <span className="notification-badge-dot"></span>}
        </div>
        
        <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="user-avatar">JD</div>
          <div className="user-info-text">
            <span className="user-name">John Doe</span>
            <span className="user-subtext">Administrator</span>
          </div>
          <span className="dropdown-icon">▼</span>
          
          {showProfileMenu && (
            <div className="profile-menu">
              <a href="/profile">My Profile</a>
              <a href="/settings">Settings</a>
              <hr />
              <a href="/logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;