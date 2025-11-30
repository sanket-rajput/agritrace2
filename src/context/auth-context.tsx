'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  uid: string;
  email: string | null;
  role?: 'farmer' | 'agent';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => void;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: 'farmer' | 'agent') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a mock implementation.
    // In a real app, you would check for a stored session (e.g., in localStorage)
    // and verify it with your backend.
    const storedUser = localStorage.getItem('agritrace-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    // Mock login. In a real app, this would be an API call to Firebase Auth.
    console.log(`Logging in with ${email} and ${pass}`);
    if (email === 'farmer@test.com') {
      const loggedInUser = { uid: 'farmer123', email, role: 'farmer' as const };
      setUser(loggedInUser);
      localStorage.setItem('agritrace-user', JSON.stringify(loggedInUser));
    } else if (email === 'agent@test.com') {
       const loggedInUser = { uid: 'agent123', email, role: 'agent' as const };
       setUser(loggedInUser);
       localStorage.setItem('agritrace-user', JSON.stringify(loggedInUser));
    } else {
      const loggedInUser = { uid: 'newuser123', email };
      setUser(loggedInUser);
      localStorage.setItem('agritrace-user', JSON.stringify(loggedInUser));
    }
  };

  const signup = async (email: string, pass: string) => {
    // Mock signup.
    console.log(`Signing up with ${email} and ${pass}`);
    const newUser = { uid: `newuser-${Date.now()}`, email };
    setUser(newUser);
    localStorage.setItem('agritrace-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agritrace-user');
  };

  const setUserRole = (role: 'farmer' | 'agent') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('agritrace-user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
