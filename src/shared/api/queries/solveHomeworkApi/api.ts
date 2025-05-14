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

type HomeworkSubmissionInput = {
  textAnswers: Record<string, string>;
  fileAnswers: Record<number, File[]>;
};

export const useSubmitHomework = (id: number) =>
  useMutation({
    mutationFn: async ({ textAnswers, fileAnswers }: HomeworkSubmissionInput) => {
      const formData = new FormData();

      Object.entries(textAnswers).forEach(([number, value]) => {
        formData.append(number, value);
      });

      Object.entries(fileAnswers).forEach(([number, files]) => {
        files.forEach((file) => {
          formData.append(`${number}`, file);
        });
      });

      const res = await axiosInstance.post(`/api/v1/learn/homework/${id}/submit/`, formData);
      return res.data;
    },
  });
