import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './base';

export const useDeleteHomework = (id: number) =>
  useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/v1/edit/homework/${id}/`);
    },
  });
