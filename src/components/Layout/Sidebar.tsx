import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Ticket, Settings, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAppContext();
  
  // Extract first name or use email prefix for display
  const getDisplayName = (user: User | null) => {
    if (!user) return 'Complete Profile';
    
    if (user.name && user.name.trim()) {
      // If name exists, use first name only
      const firstName = user.name.split(' ')[0];
      return firstName.length > 10 ? firstName.substring(0, 10) + '...' : firstName;
    }
    
    // If no name, use email prefix
    const emailPrefix = user.email.split('@')[0];
    return emailPrefix.length > 10 ? emailPrefix.substring(0, 10) + '...' : emailPrefix;
  };

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/active-sessions', icon: Clock, label: 'Active Sessions' },
    { path: '/paid-leave', icon: Ticket, label: 'Paid Leave Token', disabled: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full md:w-64 lg:w-72 xl:w-80 bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 md:min-h-screen shadow-xl">
      <div className="p-3 sm:p-4 md:p-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 md:mb-8 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-800 truncate" title={user?.name || user?.email || 'Complete Profile'}>
                {getDisplayName(user)}
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-xs sm:text-xs lg:text-sm text-gray-600 truncate">
                  {user?.status === 'pending' ? 'Pending Verification' : 'Verified Member'}
                </p>
                {user?.status === 'approved' && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 sm:space-y-1 lg:space-y-2">
          {menuItems.map((item) => (
            <div key={item.path} className="relative">
              {item.disabled ? (
                <div className="flex items-center space-x-2 sm:space-x-2 lg:space-x-3 p-2 sm:p-3 lg:p-4 rounded-xl text-gray-400 cursor-not-allowed">
                  <item.icon className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm lg:text-base truncate">{item.label}</span>
                  <span className="ml-auto text-xs bg-gray-200 px-1 sm:px-2 py-1 rounded-full whitespace-nowrap hidden md:inline">
                    Coming Soon
                  </span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 sm:space-x-2 lg:space-x-3 p-2 sm:p-3 lg:p-4 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm lg:text-base truncate">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Profile Settings */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <Link
            to="/profile"
            className={`flex items-center space-x-2 sm:space-x-2 lg:space-x-3 p-2 sm:p-3 lg:p-4 rounded-xl transition-all duration-300 ${
              isActive('/profile')
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-white hover:shadow-md'
            }`}
          >
            <Settings className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm lg:text-base truncate">Profile Settings</span>
            {user?.status === 'pending' && (
              <span className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full flex-shrink-0"></span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};