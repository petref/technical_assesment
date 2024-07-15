import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/WithAuth';

const WithProtectedRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default WithProtectedRoute;