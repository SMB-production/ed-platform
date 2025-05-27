import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const useRemoveFavoriteTask = () => {
  return useMutation({
    mutationFn: async (taskId: number) => {
      return axiosInstance.delete(`/api/v1/learn/selectedtasks/${taskId}/`);
    },
  });
};

export const useFavoriteTasks = () => {
  return useQuery({
    queryKey: ['favoriteTasks'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/learn/selectedtasks/');
      return res.data.tasks;
    },
  });
};
