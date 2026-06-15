import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ClientHeaderProps {
  onMenuClick: () => void;
}

interface UserProfileState {
  name: string;
  role: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const [notifications, setNotifications] = useState(3);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState<UserProfileState>({
    name: 'Loading...',
    role: 'User'
  });

  useEffect(() => {
    const fetchCurrentSessionUser = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        
        if (!token) {
          setUser({ name: 'Guest Identity', role: 'Anonymous' });
          return;
        }

        // Axios calling with explicit validation Bearer structure mapping context parameter
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` } 
        });

        if (response.data && response.data.success) {
          setUser({
            name: response.data.data.name,
            role: response.data.data.role
          });
        }
      } catch (err) {
        console.error("Session identity framework loading error:", err);
        setUser({ name: 'Guest Identity', role: 'Anonymous' }); 
      }
    };

    fetchCurrentSessionUser();
  }, []);

  const getInitials = (fullName: string) => {
    if (!fullName || fullName === 'Loading...' || fullName === 'Guest Identity') return 'GI';
    const parts = fullName.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <header className="client-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search..." />
          <kbd className="shortcut-key">⌘K</kbd>
        </div>
      </div>
      
      <div className="header-right">
        <button className="share-dashboard-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share Dashboard
        </button>

        <div className="notifications" onClick={() => setNotifications(0)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications > 0 && <span className="notification-badge-dot"></span>}
        </div>
        
        <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="user-avatar">{getInitials(user.name)}</div>
          
          <div className="user-info-text">
            <span className="user-name">{user.name}</span>
            <span className="user-subtext">{user.role}</span>
          </div>
          
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          
          {showProfileMenu && (
            <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
              <a href="/profile">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                My Profile
              </a>
              <a href="/settings">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Settings
              </a>
              <hr />
              <a href="#logout" onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/login';      
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;