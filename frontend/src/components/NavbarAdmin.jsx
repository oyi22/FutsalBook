import React, { useState, useEffect } from 'react';
import {
  Home,
  CalendarCheck2,
  LayoutGrid,
  Users,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavbarAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setIsCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', newState.toString());
  };

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/adm-dashboard' },
  { id: 'lapangan', label: 'Data Lapangan', icon: LayoutGrid, path: '/adm-lapangan' },
  { id: 'booking', label: 'Data Booking', icon: CalendarCheck2, path: '/adm-booking' },
  { id: 'user', label: 'Data User', icon: Users, path: '/adm-user' },
  { id: 'laporan', label: 'Laporan', icon: FileText, path: '/adm-laporan' },
];


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex flex-col justify-between h-screen bg-slate-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-slate-400">Manajemen Lapangan Futsal</p>
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-slate-700 rounded-lg"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="px-2 mt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Icon size={20} />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-400">admin@futsal.com</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
