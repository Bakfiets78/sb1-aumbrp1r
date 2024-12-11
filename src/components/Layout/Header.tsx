import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { BellIcon, CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/sncf-logo.svg"
                alt="SNCF Logo"
              />
              <span className="ml-2 text-xl font-bold">Conducteurs SNCF</span>
            </Link>
          </div>

          {isAuthenticated && (
            <nav className="flex items-center space-x-4">
              <Link
                to="/calendar"
                className="p-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <CalendarIcon className="h-6 w-6" />
              </Link>
              <Link
                to="/notifications"
                className="p-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <BellIcon className="h-6 w-6" />
              </Link>
              <Link
                to="/profile"
                className="p-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6" />
                )}
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};