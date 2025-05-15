import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { userCoursesKeys } from '@/shared/api/keys.ts';
import { UserCoursesResponse } from '@/shared/api/queries/userCoursesApi/model.ts';

export const useUserCourses = () =>
  useQuery({
    queryKey: userCoursesKeys.list(),
    queryFn: async () => {
      const res = await axiosInstance.get<UserCoursesResponse>('/api/v1/learn/courses/');
      return res.data;
    },
  });
