import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from './layout/PrivateLayout';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <PrivateLayout showFooter={false}><Outlet /></PrivateLayout>;
};

export default PrivateRoute;