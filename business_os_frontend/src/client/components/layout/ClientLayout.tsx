 
import React, { ReactNode, useState } from 'react';
import ClientHeader from './ClientHeader';
import ClientSidebar from './ClientSidebar';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="client-layout">
      <ClientSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`client-main ${!sidebarOpen ? 'expanded' : ''}`}>
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="client-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;