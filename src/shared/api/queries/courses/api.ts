import { CoursesResponse } from './model.ts';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { coursesKeys } from '@/shared/api/keys.ts';

const token = localStorage.getItem('auth_token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
}

const fetchCourses = async (): Promise<CoursesResponse> => {
  const res = await axiosInstance.get('/api/v1/learn/courses/');
  return res.data;
};

export const useCourses = () =>
  useQuery({
    queryKey: coursesKeys.list(),
    queryFn: fetchCourses,
  });
