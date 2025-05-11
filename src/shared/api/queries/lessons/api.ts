import { useQuery } from '@tanstack/react-query';
import { lessonsKeys } from '@/shared/api/keys.ts';
import { axiosInstance } from '../base';
import { LessonDetail } from '@/shared/api/queries/lessons/model.ts';

export const useLessonById = (id: number) =>
  useQuery({
    queryKey: lessonsKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get<LessonDetail>(`/api/v1/learn/lesson/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });
