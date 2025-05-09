import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useCurrentUser } from '@/shared/api/queries/auth/authApi.ts';

type Roles = 'teacher' | 'student' | 'admin';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: Roles[];
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole.includes('teacher') && !user.is_teacher) {
    return <Navigate to="/profile" replace />;
  }

  if (requiredRole.includes('admin') && !user.is_admin) {
    return <Navigate to="/profile" replace />;
  }

  if (requiredRole.includes('student') && user.is_teacher) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
