import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

interface AuthGuardProps {
  element: ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ element }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default AuthGuard;
