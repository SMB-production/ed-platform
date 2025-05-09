import { axiosInstance } from '../base';
import { CoursePayload, CoursesResponse } from './model';
import { useMutation, useQuery } from '@tanstack/react-query';
import { coursesKeys } from '@/shared/api/keys.ts';

export const fetchCourses = async (): Promise<CoursesResponse> => {
  const res = await axiosInstance.get('/api/v1/learn/courses/');
  return res.data;
};

export const useCourses = () =>
  useQuery({
    queryKey: coursesKeys.list(),
    queryFn: fetchCourses,
  });

const createCourse = async (data: CoursePayload) => {
  const res = await axiosInstance.post('/api/v1/edit/course/', data);
  return res.data;
};

export const useCreateCourse = () =>
  useMutation({
    mutationKey: coursesKeys.detail('create'),
    mutationFn: createCourse,
  });
