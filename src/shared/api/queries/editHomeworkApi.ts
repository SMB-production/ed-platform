import { useMutation } from '@tanstack/react-query';
import { createKeys } from '@/shared/api/create-keys.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const editHomeworkKeys = createKeys('editHomework');

type UpdateHomeworkDto = {
  title: string;
  lesson: number;
  tasks: number[];
};

export const usePutHomework = (id: number) =>
  useMutation({
    mutationKey: editHomeworkKeys.detail(`put-${id}`),
    mutationFn: async (data: UpdateHomeworkDto) => {
      const res = await axiosInstance.put(`/api/v1/edit/homework/${id}/`, data);
      return res.data;
    },
  });
