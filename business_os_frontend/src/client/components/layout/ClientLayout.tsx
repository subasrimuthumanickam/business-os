import React, { ReactNode, useState } from 'react';
import ClientHeader from './ClientHeader';
import ClientSidebar from './ClientSidebar';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-40px)] w-full">
      <ClientSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64 pl-6' : 'ml-20 pl-6'}`}>
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;