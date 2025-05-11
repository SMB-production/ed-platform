import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './base';

type CreateHomeworkDto = {
  title: string;
  lesson: number;
  tasks: number[];
};

export const useCreateHomework = () =>
  useMutation({
    mutationFn: async (data: CreateHomeworkDto) => {
      const res = await axiosInstance.post('/api/v1/edit/homework/', data);
      return res.data;
    },
  });
