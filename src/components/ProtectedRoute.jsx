// src/components/ProtectedRoute.jsx
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoginModal from './LoginModal';

// Utility to decode JWT (you can move this to utils later)
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles = ['user'] }) => {
  const { isAuthenticated, getToken } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // If not authenticated at all, show login modal
  if (!isAuthenticated) {
    return (
      <>
        <LoginModal
          isOpen={true}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    );
  }

  // Decode token to check role
  const token = getToken();
  const decoded = parseJwt(token);

  // If token invalid or no role, show login modal
  if (!decoded || !decoded.role) {
    return (
      <>
        <LoginModal
          isOpen={true}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    );
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(decoded.role)) {
    return <Navigate to="/" replace />; // or to /unauthorized if you have such page
  }

  // All good — render protected component
  return children;
};

export default ProtectedRoute;