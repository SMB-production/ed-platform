import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { authKeys } from '@/shared/api/keys.ts';

export const deleteAccount = async () => {
  await axiosInstance.delete('/auth/users/me/');
};

export const useDeleteAccount = () =>
  useMutation({
    mutationKey: authKeys.detail('delete'),
    mutationFn: deleteAccount,
  });
