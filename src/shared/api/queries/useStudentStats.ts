import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const useStudentStats = () => {
  return useMutation({
    mutationFn: async (month: string) => {
      const formData = new FormData();
      formData.append('month', month);
      const res = await axiosInstance.post('/api/v1/learn/stateuser/', formData);
      return res.data;
    },
  });
};
