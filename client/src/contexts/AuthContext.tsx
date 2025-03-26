import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          setLoading(true);
          // In a real app, you would verify the token with your backend
          // const response = await axios.get(`${API_URL}/api/auth/profile`, {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // setUser(response.data);
          
          // For development, we'll mock a user
          setUser({
            id: '1',
            name: 'Utilisateur Test',
            email: 'user@example.com',
            role: 'user'
          });
          
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          setError('Session expirée. Veuillez vous reconnecter.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      // const { token, user } = response.data;
      
      // For development, we'll mock a successful login
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
      const mockUser = {
        id: '1',
        name: 'Utilisateur Test',
        email,
        role: 'user'
      };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Identifiants invalides. Veuillez réessayer.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      // const { token, user } = response.data;
      
      // For development, we'll mock a successful registration
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
      const mockUser = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user'
      };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 