import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData && userData.role === 'admin'; // Check if 'role' exists in userData and if it is 'admin'
};

const PrivateRoute = ({ element }) => {
  const isAuthenticatedUser = isAuthenticated();

  if (isAuthenticatedUser) {
    // If user is authenticated and is an admin, render the provided element
    return element;
  } else {
    // If user is not authenticated or is not an admin, redirect to the login page
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
