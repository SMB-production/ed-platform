export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  re_password: string;
  date_birth?: string;
  is_teacher?: boolean;
  is_admin?: boolean;
  photo?: File;
}

export interface AuthTokenResponse {
  auth_token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  date_birth?: string;
  is_teacher: boolean;
  is_admin: boolean;
  photo?: string;
}
