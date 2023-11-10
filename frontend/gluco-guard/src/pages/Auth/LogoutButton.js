import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LogoutButton = () => {
    const { toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from storage
    toggleAuth(false);
    navigate('/auth'); // Redirect to the home page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
