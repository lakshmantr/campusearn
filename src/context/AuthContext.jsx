import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('campusearn_token');
    const savedUser = localStorage.getItem('campusearn_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  async function login(credentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, user: userData } = response.data;
    localStorage.setItem('campusearn_token', token);
    localStorage.setItem('campusearn_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  async function register(details) {
    const response = await api.post('/auth/register', details);
    const { token, user: userData } = response.data;
    localStorage.setItem('campusearn_token', token);
    localStorage.setItem('campusearn_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  function logout() {
    localStorage.removeItem('campusearn_token');
    localStorage.removeItem('campusearn_user');
    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
