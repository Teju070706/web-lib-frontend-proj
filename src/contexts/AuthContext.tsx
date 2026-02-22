import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole) => {
    const found = mockUsers.find(u => u.email === email && u.role === role);
    if (found) {
      setUser(found);
      return true;
    }
    // For demo, allow any login
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
  };

  const register = (name: string, email: string, _password: string, role: UserRole) => {
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
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
