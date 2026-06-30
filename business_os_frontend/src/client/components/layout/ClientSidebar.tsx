
import React,{useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Receipt, UsersRound, FolderKanban, BarChart3, Settings,  ChevronDown,
  ChevronRight } from 'lucide-react';

interface ClientSidebarProps {
  isOpen: boolean;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ isOpen }) => {

  const [billingOpen, setBillingOpen] = useState(true);

  const location = useLocation();

const isBillingActive = location.pathname.includes('/client/billing');

  const menuItems = [
    { path: '/client/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/client/customers', label: 'Customers', icon: <Users size={18} /> },
    { path: '/client/inventory', label: 'Inventory', icon: <Package size={18} /> },
    // { path: '/client/billing', label: 'Billing', icon: <Receipt size={18} /> },
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

  {menuItems.map((item, index) => (
    <React.Fragment key={item.path}>

      <NavLink
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

      {/* Inventory kapparam Billing dropdown */}
      {item.label === "Inventory" && (
        <div>
          <button
            onClick={() => setBillingOpen(!billingOpen)}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm border-l-4 transition-all ${
  isBillingActive
    ? "bg-[#dce7ff] text-[#2c52ed] font-semibold border-[#2c52ed]"
    : "text-gray-600 hover:bg-gray-50 border-transparent"
}`}
          >
            <div className="flex items-center gap-3">
              <Receipt size={18} />
              <span>Billing</span>
            </div>

            {billingOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {billingOpen && (
            <div className="ml-8 flex flex-col">

              <NavLink
                to="/client/billing/invoices"
                className={({ isActive }) =>
  `px-4 py-2 text-sm ${
    isActive
      ? 'text-[#2c52ed] font-semibold'
      : 'text-gray-600 hover:text-[#2c52ed]'
  }`
}
              >
                Invoices
              </NavLink>

              <NavLink
                to="/client/billing/payments"
                className={({ isActive }) =>
  `px-4 py-2 text-sm ${
    isActive
      ? 'text-[#2c52ed] font-semibold'
      : 'text-gray-600 hover:text-[#2c52ed]'
  }`
}
              >
                Payments
              </NavLink>

              <NavLink
                to="/client/billing/expenses"
                className={({ isActive }) =>
  `px-4 py-2 text-sm ${
    isActive
      ? 'text-[#2c52ed] font-semibold'
      : 'text-gray-600 hover:text-[#2c52ed]'
  }`
}
              >
                Expenses
              </NavLink>

            </div>
          )}
        </div>
      )}

    </React.Fragment>
  ))}

</nav>
    </aside>
  );
};

export default ClientSidebar;