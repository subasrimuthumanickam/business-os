//  import React, { ReactNode, useState } from 'react';
// import ClientHeader from './ClientHeader';
// import ClientSidebar from './ClientSidebar';

// interface ClientLayoutProps {
//   children: ReactNode;
// }
// const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     // Ensure no 'p-x' or 'm-x' classes are on this div
//     <div className="flex h-screen w-full bg-[#f7f8fa] overflow-hidden">
//       <ClientSidebar isOpen={true} />
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <ClientHeader />
//         <main className="flex-1 overflow-y-auto">
//           <div className="p-6">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ClientLayout;

import React, { useState } from 'react';
import ClientHeader from './ClientHeader';
import ClientSidebar from './ClientSidebar';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f8fa] overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed/absolute on desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0`}>
        <ClientSidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ClientHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ClientLayout;