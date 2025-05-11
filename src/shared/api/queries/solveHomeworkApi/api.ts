import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../base';
import { HomeworkToSolve } from './model';
import { solveHomeworkKeys } from '../../keys';

export const useHomeworkToSolve = (id: number) =>
  useQuery({
    queryKey: solveHomeworkKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<HomeworkToSolve>(`/api/v1/learn/homework/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });

export const useSubmitHomework = (id: number) =>
  useMutation({
    mutationFn: async (answers: Record<string, string>) => {
      const formData = new FormData();
      Object.entries(answers).forEach(([number, value]) => {
        formData.append(number, value);
      });

      const res = await axiosInstance.post(`/api/v1/learn/homework/${id}/submit/`, formData);
      return res.data;
    },
  });
