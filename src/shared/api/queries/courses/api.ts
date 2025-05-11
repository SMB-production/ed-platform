import { CoursesResponse, LearnCourseDetail } from './model.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { coursesKeys, editCoursesKeys, learnCoursesKeys } from '@/shared/api/keys.ts';

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

export const useCourseById = (id: number) =>
  useQuery({
    queryKey: learnCoursesKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/v1/learn/courses/${id}/`);
      return res.data as LearnCourseDetail;
    },
    enabled: !!id,
  });

export const useDeleteCourse = (id: number) =>
  useMutation({
    mutationKey: editCoursesKeys.detail(`delete-${id}`),
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/edit/course/${id}/`);
    },
  });
