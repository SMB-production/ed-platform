import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';
import { homeworkKeys, userHomeworkKeys } from '@/shared/api/keys.ts';
import { HomeworkDetail, UserHomeworkDetail } from '@/shared/api/queries/homeworkApi/model.ts';

export const useHomeworkById = (id: number) =>
  useQuery({
    queryKey: homeworkKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<HomeworkDetail>(`/api/v1/learn/homework/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });

export const useUserHomeworkById = (id: number) =>
  useQuery({
    queryKey: userHomeworkKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<UserHomeworkDetail>(`/api/v1/edit/user-homework/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });

export const useRateUserHomework = (id: number) =>
  useMutation({
    mutationFn: async (payload: { comment: string; scores: { [number: number]: number } }) => {
      const res = await axiosInstance.patch(`/api/v1/edit/user-homework/${id}/rate/`, {
        comment: payload.comment,
        ...payload.scores,
      });
      return res.data;
    },
  });
