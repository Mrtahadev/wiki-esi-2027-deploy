import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Wiki ESI 2027</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/wiki" className="hover:text-blue-200">Wiki</Link>
          <Link to="/internships" className="hover:text-blue-200">Stages</Link>
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="hover:text-blue-200">Chat</Link>
              <div className="relative group">
                <button className="flex items-center hover:text-blue-200">
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Connexion</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 