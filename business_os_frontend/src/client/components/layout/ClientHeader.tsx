import React, { useState } from 'react';
import { Search, Plus, Bell, Settings, Grid3X3, ChevronDown, User, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../context/SearchContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {
  // 1. Need to define state for the dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 2. Need to define navigation
  const navigate = useNavigate();

  // 3. Global search term — shared with every page via SearchContext
  const { searchTerm, setSearchTerm } = useSearch();

  // 4. Define the logout handler
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="h-[56px] bg-[#1d2238] text-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* Menu Toggle - Only visible on Mobile/Tablet */}
        <button onClick={onMenuClick} className="md:hidden p-1">
          <Menu size={24} />
        </button>

        {/* Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2d3450] w-[150px] md:w-[300px] h-9 rounded-md pl-10 pr-4 text-sm outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        <button className="bg-[#2c52ed] hover:bg-blue-600 w-8 h-8 rounded flex items-center justify-center">
          <Plus size={18} />
        </button>
        <Bell size={18} className="cursor-pointer text-gray-300" />
        <Settings size={18} className="cursor-pointer text-gray-300" />

        {/* Profile Dropdown Container */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">S</div>
            <ChevronDown size={14} />
          </div>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-1 z-50">
              <button onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm">
                <User size={16} /> My Profile
              </button>
              <button onClick={() => { navigate('/client/settings'); setShowProfileMenu(false); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm">
                <Settings size={16} /> Settings
              </button>
              <div className="border-t my-1"></div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <Grid3X3 size={18} className="cursor-pointer text-gray-300" />
      </div>
    </header>
  );
};

export default ClientHeader;