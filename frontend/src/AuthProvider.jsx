import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import JoblyApi from './api';

// We create the context
const AuthContext = React.createContext();

// We set up a component to manage the context
const AuthProvider = ({ children }) => {
  // We grab stuff from local storage if available
  const storedToken = localStorage.getItem('jobly-token');
  const storedUser = localStorage.getItem('jobly-user');

  // We set the token right away so we don't run in to authorization issues
  JoblyApi.token = storedToken || null;

  // We initialize the token with the value from localStorage
  const [token, setToken] = useState(storedToken);
  const [currentUser, setCurrentuser] = useState(storedUser);

  // Whenever the token changes (login/logout) we need to update
  // both the api module and localStorage
  useEffect(() => {
    if (token && token.trim !== '') {
      // We only set the token if it's not empty

      JoblyApi.token = token;
      localStorage.setItem('jobly-token', token || '');
      localStorage.setItem('jobly-user', currentUser || '');
    } else {
      JoblyApi.token = null;
      localStorage.removeItem('jobly-token');
      localStorage.removeItem('jobly-user');
    }
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
