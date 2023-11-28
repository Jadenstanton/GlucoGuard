import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Check the storage to update login status upon initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsAuthenticated(!!token); // Convert token presence to a boolean
    setUsername(storedUsername || ''); // Set username or default to an empty string
  }, []);

  // Function to toggle authentication status and set username
  const toggleAuth = (status, newUsername = '') => {
    setIsAuthenticated(status);
    if (status && newUsername) {
      setUsername(newUsername);
      localStorage.setItem('username', newUsername);
    } else if (!status) {
      setUsername('');
      localStorage.removeItem('username');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
