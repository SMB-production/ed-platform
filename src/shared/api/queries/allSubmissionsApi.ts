import { useQuery } from '@tanstack/react-query';
import { createKeys } from '@/shared/api/create-keys.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const allSubmissionsKeys = createKeys('userHomeworkList');

export type HomeworkSubmission = {
  id: number;
  user: number;
  homework: number;
  created_at: string;
  result: number;
};

type HomeworkSubmissionResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HomeworkSubmission[];
};

export const useAllSubmissions = (params?: { course?: string; subject?: string; teacher?: string }) =>
  useQuery({
    queryKey: allSubmissionsKeys.list(params),
    queryFn: async () => {
      const res = await axiosInstance.get<HomeworkSubmissionResponse>('/api/v1/edit/user-homework/', { params });
      return res.data.results;
    },
  });
