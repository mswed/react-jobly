import React, { useState, useEffect } from 'react';
import JoblyApi from './api';

// We create the context
const AuthContext = React.createContext();

// We set up a component to manage the context
const AuthProvider = ({ children }) => {
  // We initialize the token with the value from localStorage
  const [token, setToken] = useState(localStorage.getItem('jobly-token'));

  // Whenever the token changes (login/logout) we need to update
  // both the api module and localStorage
  useEffect(() => {
    JoblyApi.token = token;
    localStorage.setItem('jobly-token', token || '');
  }, [token]);

  const login = async (username, password) => {
    try {
      const token = await JoblyApi.login(username, password);
      setToken(token);
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

  // Create the value object
  const value = { token, register };

  // Wrap everything in the context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
