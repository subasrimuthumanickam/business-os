
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Receipt, UsersRound, FolderKanban, BarChart3, Settings } from 'lucide-react';

interface ClientSidebarProps {
  isOpen: boolean;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { path: '/client/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/client/customers', label: 'Customers', icon: <Users size={18} /> },
    { path: '/client/inventory', label: 'Inventory', icon: <Package size={18} /> },
    { path: '/client/billing', label: 'Billing', icon: <Receipt size={18} /> },
    { path: '/client/hrms', label: 'HRMS', icon: <UsersRound size={18} /> },
    { path: '/client/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { path: '/client/reports', label: 'Reports', icon: <BarChart3 size={18} /> },
    { path: '/client/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="h-[56px] flex items-center px-6 font-bold text-lg text-gray-800 border-b">
        BusinessOS
      </div>
      
      <nav className="flex-1 py-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-4 ${
                isActive
                  ? "bg-[#dce7ff] text-[#2c52ed] font-semibold border-[#2c52ed]"
                  : "text-gray-600 hover:bg-gray-50 border-transparent"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ClientSidebar;