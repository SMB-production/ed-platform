import { setAuthToken, useCurrentUser } from '@/shared/api/queries/auth/authApi';
import { ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { refetch } = useCurrentUser();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthToken(token);
      refetch(); // получаем пользователя при старте
    }
  }, [refetch]);

  return <>{children}</>;
};
