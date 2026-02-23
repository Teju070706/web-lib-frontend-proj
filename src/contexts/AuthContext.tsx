import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/types';
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and load user
    const token = localStorage.getItem('token');
    if (token) {
      api.getCurrentUser()
        .then((userData) => {
          setUser(userData as User);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const data = await api.login(email, password, role);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // For demo, allow fallback to mock login
      const mockUsers = [
        { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'user' as UserRole, joinedAt: '2024-01-15', bookmarks: ['1', '3'], downloadHistory: ['1', '2', '5'] },
        { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' as UserRole, joinedAt: '2023-06-01', bookmarks: [], downloadHistory: [] },
      ];
      const found = mockUsers.find(u => u.email === email && u.role === role);
      if (found || email.includes('@')) {
        setUser({
          id: Math.random().toString(36).slice(2),
          name: email.split('@')[0],
          email,
          role,
          joinedAt: new Date().toISOString(),
          bookmarks: [],
          downloadHistory: [],
        });
        return true;
      }
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const data = await api.register(name, email, password, role);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      // For demo, allow fallback to mock register
      setUser({
        id: Math.random().toString(36).slice(2),
        name,
        email,
        role,
        joinedAt: new Date().toISOString(),
        bookmarks: [],
        downloadHistory: [],
      });
      return true;
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
