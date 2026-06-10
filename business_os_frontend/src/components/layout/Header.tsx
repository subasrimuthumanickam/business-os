import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div>
          <h1 className="header-logo">BusinessOS</h1>
          <p className="header-subtitle">Super Admin</p>
        </div>

        <div className="header-actions">
          {/* Theme Toggle Button - Added */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button type="button" className="notification-btn">
            🔔
          </button>

          <div className="profile-card">
            <div className="profile-avatar">
              SA
            </div>
            <div>
              <p className="profile-name">
                Super Admin
              </p>
              <p className="profile-role">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;