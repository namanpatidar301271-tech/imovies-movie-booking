import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMeApi, loginApi, registerApi } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('imovies_token') || null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem('imovies_city') || 'Bengaluru'
  );

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('imovies_token');
      if (storedToken) {
        try {
          const res = await getMeApi();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Failed to verify token', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    if (res.success) {
      localStorage.setItem('imovies_token', res.token);
      setToken(res.token);
      setUser(res.user);
      if (res.user.city) {
        setCity(res.user.city);
      }
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (userData) => {
    const res = await registerApi({ ...userData, city: selectedCity });
    if (res.success) {
      localStorage.setItem('imovies_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('imovies_token');
    setToken(null);
    setUser(null);
  };

  const setCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem('imovies_city', city);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        selectedCity,
        setCity,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
