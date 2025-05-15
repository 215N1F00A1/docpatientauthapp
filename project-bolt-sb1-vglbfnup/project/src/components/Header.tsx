import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-sky-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">MedConnect</span>
          </div>
          
          {authState.isAuthenticated && (
            <div className="flex items-center space-x-4">
              {authState.user?.profilePicture ? (
                <img 
                  src={authState.user.profilePicture} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-800">
                  {authState.user?.firstName.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {authState.user?.firstName} {authState.user?.lastName}
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;