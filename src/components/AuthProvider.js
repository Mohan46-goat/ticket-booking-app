// src/components/AuthProvider.js
import React, { createContext, useState } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './LocalStorageHelper.js';

export const AuthContext = createContext();

const mockUser = {
  email: 'vr46@gmail.com',
  password: '111', // Change these values to your requirements
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!getFromLocalStorage('authToken'));
  
    const login = async (email, password) => {
      if (email === mockUser.email && password === mockUser.password) {
        const fakeToken = '123456'; 
        saveToLocalStorage('authToken', fakeToken);
        setIsAuthenticated(true);
        return true; 
      } else {
        console.error('Invalid email or password');
        return false; 
      }
    };
  
    const logout = () => {
      removeFromLocalStorage('authToken');
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
