import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Pill, LogOut, User, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-medical-500 rounded-lg group-hover:scale-105 transition-transform">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
              PharmaMCQ
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium text-gray-900">{user.name}</span>
                {!user.isAdmin && (
                  <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                    Year {user.year}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Admin Panel"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                )}
                
                <Link
                  to="/dashboard"
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Dashboard"
                >
                  <User className="h-5 w-5" />
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}