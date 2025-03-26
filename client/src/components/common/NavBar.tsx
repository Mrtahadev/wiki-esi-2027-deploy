import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const NavBar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Wiki ESI 2027</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Accueil
              </Link>
              <Link 
                to="/filieres" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  location.pathname.includes('/filieres') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Filières
              </Link>
              <Link 
                to="/actualite" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/actualite') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Actualité
              </Link>
              <Link 
                to="/retour-experience" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/retour-experience') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Retours d'expérience
              </Link>
              <Link 
                to="/ressources" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/ressources') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Ressources
              </Link>
              <Link 
                to="/internships" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/internships') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Stages
              </Link>
              <Link 
                to="/chatroom" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/chatroom') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Discussion
              </Link>
              <Link 
                to="/faq" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/faq') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out border-b-2 ${
                  isActive('/contact') 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Bonjour, {user?.name || 'Utilisateur'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Connexion
              </Link>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            to="/filieres" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              location.pathname.includes('/filieres') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Filières
          </Link>
          <Link 
            to="/actualite" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/actualite') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Actualité
          </Link>
          <Link 
            to="/retour-experience" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/retour-experience') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Retours d'expérience
          </Link>
          <Link 
            to="/ressources" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/ressources') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Ressources
          </Link>
          <Link 
            to="/internships" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/internships') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Stages
          </Link>
          <Link 
            to="/chatroom" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/chatroom') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Discussion
          </Link>
          <Link 
            to="/faq" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/faq') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
              isActive('/contact') 
                ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 text-base font-medium"
            >
              Déconnexion
            </button>
          ) : (
            <Link 
              to="/login" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 