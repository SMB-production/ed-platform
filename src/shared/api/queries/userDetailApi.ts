import { useQuery } from '@tanstack/react-query';
import { createKeys } from '@/shared/api/create-keys.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const userDetailKeys = createKeys('userDetail');

export type UserDetail = {
  id: number;
  username: string;
  email: string;
  date_birth: string | null;
  is_teacher: boolean;
  is_admin: boolean;
  photo?: string;
};

export const useUserDetail = (id: number) =>
  useQuery({
    queryKey: userDetailKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<UserDetail>(`/api/v1/edit/user/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });
