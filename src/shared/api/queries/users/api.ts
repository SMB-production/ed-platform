import { usersKeys } from '../../keys';
import { axiosInstance } from '../base';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UsersResponse } from '@/shared/api/queries/users/model.ts';

export const fetchAllUsers = async (params?: Record<string, any>): Promise<UsersResponse> => {
  const res = await axiosInstance.get('/api/v1/edit/user/', {
    params,
  });
  return res.data;
};

export const promoteToTeacher = async (id: number) => {
  const formData = new FormData();
  formData.append('id_will_teacher', String(id));
  return axiosInstance.post('/api/v1/edit/user/get_teacher/', formData);
};

export const promoteToAdmin = async (id: number) => {
  const formData = new FormData();
  formData.append('id_will_admin', String(id));
  return axiosInstance.post('/api/v1/edit/user/get_admin/', formData);
};

export const useAllUsers = (params?: Record<string, any>) =>
  useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => fetchAllUsers(params),
  });

export const useMakeTeacher = () =>
  useMutation({
    mutationKey: usersKeys.detail('make-teacher'),
    mutationFn: promoteToTeacher,
  });

export const useMakeAdmin = () =>
  useMutation({
    mutationKey: usersKeys.detail('make-admin'),
    mutationFn: promoteToAdmin,
  });
