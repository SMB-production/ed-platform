import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { createKeys } from '../create-keys';

export const taskBankKeys = createKeys('taskBank');

export type TaskItem = {
  id: number;
  question: string;
  correct_answer: string;
  ball: number;
  is_auto: boolean;
  category: string;
  subject: string;
};

type TaskResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TaskItem[];
};

export const useTaskBank = () =>
  useQuery({
    queryKey: taskBankKeys.list(),
    queryFn: async () => {
      const res = await axiosInstance.get<TaskResponse>('/api/v1/edit/task/');
      return res.data.results;
    },
  });

export const useDeleteTask = (id: number) =>
  useMutation({
    mutationKey: taskBankKeys.detail(`delete-${id}`),
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/edit/task/${id}/`);
    },
  });

export const useTaskById = (id: number) =>
  useQuery({
    queryKey: taskBankKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/v1/edit/task/${id}/`);
      return res.data as TaskItem & { files: { file: string }[] };
    },
    enabled: !!id,
  });

type UpdateTaskDto = {
  question?: string;
  correct_answer?: string;
  ball?: number;
  is_auto?: boolean;
  files?: File[];
};

export const usePatchTask = (id: number) =>
  useMutation({
    mutationKey: taskBankKeys.detail(`patch-${id}`),
    mutationFn: async (data: UpdateTaskDto) => {
      const formData = new FormData();
      if (data.question) formData.append('question', data.question);
      if (data.correct_answer) formData.append('correct_answer', data.correct_answer);
      if (data.ball !== undefined) formData.append('ball', String(data.ball));
      if (data.is_auto !== undefined) formData.append('is_auto', String(data.is_auto));
      if (data.files) {
        data.files.forEach((file) => formData.append('files', file));
      }

      const res = await axiosInstance.patch(`/api/v1/edit/task/${id}/`, formData);
      return res.data;
    },
  });
