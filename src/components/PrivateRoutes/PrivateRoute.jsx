// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Agar user ya token nahi hai
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role match karta hai to route allow karo
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // Agar role allowed nahi hai
  return <Navigate to="/login" replace />;
};

