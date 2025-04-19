import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: 'admin' | 'seller' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, isLoading } = useAuth();
  
  if (isLoading) {
    // You could render a loading spinner here
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific role is required, check if the user has that role
  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // If we have an outlet (using this as a wrapper for a route), render that
  if (!children) {
    return <Outlet />;
  }
  
  // Otherwise render the children directly
  return <>{children}</>;
};

export default ProtectedRoute;
