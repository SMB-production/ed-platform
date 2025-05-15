import { UpdateProfileDto } from '@/shared/api/queries/updateProfileApi/model.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { useMutation } from '@tanstack/react-query';
import { authKeys } from '@/shared/api/keys.ts';

export const updateProfile = async (data: UpdateProfileDto) => {
  const formData = new FormData();
  if (data.username) formData.append('username', data.username);
  if (data.email) formData.append('email', data.email);
  if (data.date_birth) formData.append('date_birth', data.date_birth);
  if (data.photo) formData.append('photo', data.photo);
  if (data.last_name) formData.append('last_name', data.last_name);
  if (data.first_name) formData.append('first_name', data.first_name);

  const res = await axiosInstance.patch('/auth/users/me/', formData);
  return res.data;
};

export const useUpdateProfile = () =>
  useMutation({
    mutationKey: authKeys.detail('update'),
    mutationFn: updateProfile,
  });
