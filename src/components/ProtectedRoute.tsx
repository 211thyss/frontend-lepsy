import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
  
  // Check admin requirement
  if (requireAdmin && provider?.role !== 'admin') {
    window.location.href = '/';
    return null;
  }
  
  return <>{children}</>;
}
