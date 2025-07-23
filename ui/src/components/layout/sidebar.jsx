import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  LayoutDashboard,
  Users,
  Zap,
  Contact,
  Building2,
  StickyNote,
  CheckSquare,
  Phone,
  HelpCircle,
  ChevronDown,
  Grid3x3,
  Moon,
  Info,
  LogOut,
  Settings,
  Funnel,
  ArrowRightFromLine,
  HandHeart
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <Bell className="h-5 w-5" />, label: 'Notifications' },
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', onClick: () => navigate('/dashboard') },
    { icon: <Users className="h-5 w-5" />, label: 'Leads', onClick: () => navigate('/lead') },
    { icon: <Zap className="h-5 w-5" />, label: 'Deals' },
    { icon: <Contact className="h-5 w-5" />, label: 'Contacts' },
    { icon: <HandHeart className="h-5 w-5" />, label: 'Customer', onClick: () => navigate('/customer') },
    { icon: <Building2 className="h-5 w-5" />, label: 'Organizations' },
    { icon: <StickyNote className="h-5 w-5" />, label: 'Notes' },
    { icon: <CheckSquare className="h-5 w-5" />, label: 'Tasks' },
    { icon: <Phone className="h-5 w-5" />, label: 'Call Logs' },
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-2 transition-all duration-300 ease-in-out`}>
      <div>
        <div className="relative mb-6 flex justify-center" ref={dropdownRef}>
          <div
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer w-full"
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center gap-2">
              <div className="bg-gray-900 text-white w-9 h-9 flex items-center justify-center rounded-md">
                <Funnel className='h-5 w-5' />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-semibold">CRM</p>
                  <p className="text-xs text-gray-600">John Snow</p>
                </div>
              )}
            </div>
            {!collapsed && <ChevronDown className="h-4 w-4 text-gray-500" />}
          </div>

          {open && !collapsed && (
            <div className="absolute z-50 bg-white shadow-lg rounded-md mt-1 right-0 top-15 w-60 text-sm border border-gray-200">
              <ul className="py-1 text-gray-700">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"><Grid3x3 className="h-4 w-4" />Apps</li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"><Moon className="h-4 w-4" />Toggle theme</li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"><Info className="h-4 w-4" />About</li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"><Settings className="h-4 w-4" />Settings</li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 border-t border-gray-200"><LogOut className="h-4 w-4" />Log out</li>
              </ul>
            </div>
          )}
        </div>

        <ul className="space-y-1 text-sm text-gray-700">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={item.onClick}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                item.onClick ? 'cursor-pointer' : ''
              } hover:bg-gray-100 ${
                item.active ? 'bg-gray-100 font-semibold text-black' : ''
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </li>
          ))}
        </ul>

        {!collapsed && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500 mb-2">Public views</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">🖖 My Leads</li>
              <li className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">🛡 My Deals</li>
              <li className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">😵 Timeless Only</li>
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2 flex flex-col items-center pb-2">
        {collapsed ? (
          <>
            <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">
              <HelpCircle className="h-4 w-4 text-gray-600" />
            </div>
            <div
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() => setCollapsed(false)}
            >
              <ArrowRightFromLine className="h-4 w-4 text-gray-600" />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between text-sm text-gray-600 px-2 w-full">
            <div className="flex items-center gap-1 cursor-pointer hover:underline">
              <HelpCircle className="h-4 w-4" /> Help
            </div>
            <div
              className="cursor-pointer text-xs hover:underline"
              onClick={() => setCollapsed(true)}
            >
              ⇠ Collapse
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
