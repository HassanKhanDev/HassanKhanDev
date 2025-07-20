import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your leave request for Dec 25-26 has been approved',
      time: '2 hours ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'New Job Application',
      message: 'A new application received for Frontend Developer position',
      time: '4 hours ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Performance Review Due',
      message: 'Your Q4 performance review is due this week',
      time: '1 day ago',
      type: 'warning',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-base-100 border-b border-base-300 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Menu button */}
          <button
            onClick={onMenuClick}
            className="btn btn-ghost btn-sm lg:btn-md"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} />
          </button>

          {/* Page title area */}
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-base-content">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.firstName}!
            </h2>
            <p className="text-sm text-base-content/60">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <div className="tooltip tooltip-bottom" data-tip={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm lg:btn-md"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <div className="tooltip tooltip-bottom" data-tip="Notifications">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm lg:btn-md relative"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <FiBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            {showNotifications && (
              <div className="dropdown-content z-50 menu p-0 shadow-lg bg-base-100 rounded-box w-80 mt-4 border border-base-300">
                <div className="p-4 border-b border-base-300">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-base-300 hover:bg-base-200 cursor-pointer ${
                        notification.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-base-content/70 mt-1">{notification.message}</p>
                          <p className="text-xs text-base-content/50 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-base-300">
                  <button className="btn btn-primary btn-sm w-full">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-sm lg:btn-md flex items-center gap-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="avatar">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <FiUser size={16} />
                </div>
              </div>
              <span className="hidden sm:block font-medium">{user?.firstName}</span>
              <FiChevronDown size={16} className="hidden sm:block" />
            </button>
            {showUserMenu && (
              <div className="dropdown-content z-50 menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4 border border-base-300">
                <div className="p-3 border-b border-base-300">
                  <p className="font-medium">{user?.fullName}</p>
                  <p className="text-sm text-base-content/60">{user?.email}</p>
                  <p className="text-xs text-base-content/50 capitalize">{user?.role}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="/profile" className="flex items-center gap-2">
                      <FiUser size={16} />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="/settings" className="flex items-center gap-2">
                      <FiSettings size={16} />
                      Settings
                    </a>
                  </li>
                  <li className="border-t border-base-300 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-error hover:bg-error/10 w-full"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;