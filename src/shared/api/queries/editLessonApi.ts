import { useMutation, useQuery } from '@tanstack/react-query';
import { createKeys } from '@/shared/api/create-keys.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const editLessonKeys = createKeys('editLesson');

export type EditLessonDetail = {
  id: number;
  title: string;
  course: number;
  course_title: string;
  homework: number | null;
  files: { file: string }[];
};

type UpdateLessonDto = {
  title?: string;
  course?: number;
  homework?: number | null;
  files?: File[];
};

export const useEditLessonById = (id: number) =>
  useQuery({
    queryKey: editLessonKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<EditLessonDetail>(`/api/v1/edit/lesson/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });

const buildFormData = (data: UpdateLessonDto) => {
  const formData = new FormData();
  if (data.title) formData.append('title', data.title);
  if (data.course) formData.append('course', String(data.course));
  if (data.homework !== undefined && data.homework !== null) formData.append('homework', String(data.homework));
  if (data.files) {
    data.files.forEach((file) => formData.append('files', file));
  }
  return formData;
};

export const usePatchLesson = (id: number) =>
  useMutation({
    mutationKey: editLessonKeys.detail(`patch-${id}`),
    mutationFn: async (data: UpdateLessonDto) => {
      const formData = buildFormData(data);
      const res = await axiosInstance.patch(`/api/v1/edit/lesson/${id}/`, formData);
      return res.data;
    },
  });

export const usePutLesson = (id: number) =>
  useMutation({
    mutationKey: editLessonKeys.detail(`put-${id}`),
    mutationFn: async (data: UpdateLessonDto) => {
      const formData = buildFormData(data);
      const res = await axiosInstance.put(`/api/v1/edit/lesson/${id}/`, formData);
      return res.data;
    },
  });

export const useDeleteLesson = (id: number) =>
  useMutation({
    mutationKey: editLessonKeys.detail(`delete-${id}`),
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/edit/lesson/${id}/`);
    },
  });
