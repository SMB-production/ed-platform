import { CreateLessonDto } from './model';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { useMutation } from '@tanstack/react-query';
import { lessonsKeys } from '@/shared/api/keys.ts';

export const createLesson = async (data: CreateLessonDto) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('course', String(data.course));
  if (data.homework) formData.append('homework', String(data.homework));
  if (data.files) {
    data.files.forEach((file) => {
      formData.append('files', file);
    });
  }

  const res = await axiosInstance.post('/api/v1/edit/lesson/', formData);
  return res.data;
};

export const useCreateLesson = () =>
  useMutation({
    mutationKey: lessonsKeys.detail('create'),
    mutationFn: createLesson,
  });
