import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginDto, RegisterDto, AuthTokenResponse, User } from './model.ts';
import { authKeys } from '@/shared/api/keys.ts';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/auth/',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// --- API-функции ---
// const login = async (data: LoginDto): Promise<AuthTokenResponse> => {
//   const res = await axiosInstance.post('/token/login/', data);
//   return res.data;
// };

const login = async (data: LoginDto): Promise<AuthTokenResponse> => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);

  const res = await axiosInstance.post('/token/login/', formData);
  return res.data;
};

const register = async (data: RegisterDto): Promise<User> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value as never);
    }
  });
  const res = await axiosInstance.post('/users/', formData);
  return res.data;
};

const getMe = async (): Promise<User> => {
  const res = await axiosInstance.get('/users/me/');
  console.log(res);
  return res.data;
};

const logout = async () => {
  await axiosInstance.post('/token/logout/');
};

// --- Хуки ---
export const useLogin = () =>
  useMutation({
    mutationKey: authKeys.detail('login'),
    mutationFn: login,
    onSuccess: (data) => {
      setAuthToken(data.auth_token);
      localStorage.setItem('auth_token', data.auth_token);
    },
  });

export const useRegister = () =>
  useMutation({
    mutationKey: authKeys.detail('register'),
    mutationFn: register,
    // ⚠️ Регистрация не возвращает токен — возможно нужно авторизовать вручную после
  });

export const useLogout = () =>
  useMutation({
    mutationKey: authKeys.detail('logout'),
    mutationFn: logout,
    onSuccess: () => {
      setAuthToken(null);
      localStorage.removeItem('auth_token');
    },
  });

export const useCurrentUser = () =>
  useQuery({
    queryKey: authKeys.detail('me'),
    queryFn: getMe,
    enabled: false,
  });
