import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome,
  FiUsers,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiUserPlus,
  FiTrendingUp,
  FiFileText,
  FiSettings,
  FiUser,
  FiMessageSquare,
  FiX
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: FiHome,
      path: '/dashboard',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Attendance',
      icon: FiClock,
      path: '/attendance',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Leave Management',
      icon: FiCalendar,
      path: '/leave',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Payroll',
      icon: FiDollarSign,
      path: '/payroll',
      roles: ['admin', 'hr', 'employee']
    },
    {
      title: 'Recruitment',
      icon: FiUserPlus,
      path: '/recruitment',
      roles: ['admin', 'hr', 'recruiter']
    },
    {
      title: 'Performance',
      icon: FiTrendingUp,
      path: '/performance',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Documents',
      icon: FiFileText,
      path: '/documents',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Employees',
      icon: FiUsers,
      path: '/employees',
      roles: ['admin', 'hr']
    },
    {
      title: 'Communications',
      icon: FiMessageSquare,
      path: '/communications',
      roles: ['admin', 'hr', 'recruiter', 'employee']
    },
    {
      title: 'Settings',
      icon: FiSettings,
      path: '/settings',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-base-100 border-r border-base-300 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'} 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
            <h1 className="text-xl font-bold text-primary">HireSync</h1>
            <p className="text-xs text-base-content/60">HR Management</p>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden btn btn-ghost btn-sm"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <FiUser size={20} />
              </div>
            </div>
            <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
              <p className="font-medium text-sm">{user?.fullName}</p>
              <p className="text-xs text-base-content/60 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`
                  sidebar-item
                  ${isActive ? 'active' : ''}
                  ${!isOpen ? 'justify-center' : ''}
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profile Link */}
        <div className="absolute bottom-4 left-4 right-4">
          <NavLink
            to="/profile"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
            className={`
              sidebar-item
              ${location.pathname === '/profile' ? 'active' : ''}
              ${!isOpen ? 'justify-center' : ''}
            `}
          >
            <FiUser size={20} className="flex-shrink-0" />
            <span className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
              My Profile
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;