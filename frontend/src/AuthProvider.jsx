import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import JoblyApi from './api';

// We create the context
const AuthContext = React.createContext();

// We set up a component to manage the context
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState(null);
  // We initialize the token with the value from localStorage
  const [token, setToken] = useState(localStorage.getItem('jobly-token'));

  // Whenever the token changes (login/logout) we need to update
  // both the api module and localStorage
  useEffect(() => {
    JoblyApi.token = token;
    localStorage.setItem('jobly-token', token || '');
  }, [token]);

  const login = async (username, password) => {
    console.log('logging in!!!!');
    try {
      const authToken = await JoblyApi.login(username, password);
      setToken(authToken);
      const decoded = jwtDecode(authToken);
      setCurrentuser(decoded.username);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (username, password, firstName, lastName, email) => {
    try {
      const token = await JoblyApi.register(username, password, firstName, lastName, email);
      setToken(token);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = () => {
    setToken('');
  };
  // Create the value object
  const value = { token, currentUser, login, register, logout };

  // Wrap everything in the context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
