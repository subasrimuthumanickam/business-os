import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', background: '#0a0a0a' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;