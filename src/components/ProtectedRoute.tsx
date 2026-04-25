import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Maintenance } from '../pages/Maintenance';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, provider, isLoading } = useAuth();
  
  // Show nothing while checking auth (prevents flash)
  if (isLoading) {
    return null;
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }
  
  // Check admin requirement - show maintenance page if patient tries to access admin
  if (requireAdmin && provider?.role === 'patient') {
    return <Maintenance />;
  }
  
  // Check admin requirement for other cases
  if (requireAdmin && provider?.role !== 'admin' && provider?.role !== 'provider') {
    return <Maintenance />;
  }
  
  return <>{children}</>;
}
