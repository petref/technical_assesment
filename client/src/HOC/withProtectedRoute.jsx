import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/withAuth';

const ProtectedRoute = () => {
  const { token } = useAuth();
    console.log(token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;