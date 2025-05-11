import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { createKeys } from '@/shared/api/create-keys.ts';

export const editCoursesKeys = createKeys('editCourses');

type CourseItem = {
  id: number;
  title: string;
  month: string;
  subject: string;
  content: string;
  teacher: number;
  students: number[];
  lessons: number[];
};

type CoursesResponse = {
  count: number;
  results: CourseItem[];
};

type UpdateCourseDto = {
  title: string;
  subject: string;
  month: string;
  content: string;
  teacher: number;
  students: number[];
  lessons: number[];
};

export const useAllEditableCourses = () =>
  useQuery({
    queryKey: editCoursesKeys.list(),
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/edit/course/');
      return res.data as CoursesResponse;
    },
  });

export const useEditCourseById = (id: number) =>
  useQuery({
    queryKey: editCoursesKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/v1/edit/course/${id}/`);
      return res.data as {
        id: number;
        title: string;
        subject: string;
        month: string;
        content: string;
        teacher: number;
        lessons: number[];
        students: number[];
      };
    },
    enabled: !!id,
  });

export const usePutCourse = (id: number) =>
  useMutation({
    mutationKey: editCoursesKeys.detail(`put-${id}`),
    mutationFn: async (data: UpdateCourseDto) => {
      const res = await axiosInstance.put(`/api/v1/edit/course/${id}/`, data);
      return res.data;
    },
  });

export const useDeleteCourse = (id: number) =>
  useMutation({
    mutationKey: editCoursesKeys.detail(`delete-${id}`),
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/edit/course/${id}/`);
    },
  });
