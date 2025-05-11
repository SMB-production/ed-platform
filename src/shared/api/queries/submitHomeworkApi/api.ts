import { useQuery } from '@tanstack/react-query';
import { submittedHomeworkKeys } from '@/shared/api/keys.ts';
import { axiosInstance } from '@/shared/api/queries/base.ts';

export const useSubmittedHomework = (homeworkId: number) =>
  useQuery({
    queryKey: submittedHomeworkKeys.detail(homeworkId),
    queryFn: async () => {
      const res = await axiosInstance.get<SubmittedHomework>(`/api/v1/learn/submit/${homeworkId}/`);
      return res.data;
    },
    enabled: !!homeworkId,
  });

type SubmittedAnswer = {
  number: number;
  answers_text: string;
  correct_answer: string;
  result: number;
  is_auto: boolean;
  question: string;
  files: { file: string }[];
};

type SubmittedHomework = {
  created_at: string;
  result: number;
  comment: string;
  answers: SubmittedAnswer[];
};

export const useSubmittedHomeworkById = (homeworkId: number) =>
  useQuery({
    queryKey: ['submittedHomework', homeworkId],
    queryFn: async () => {
      const res = await axiosInstance.get<SubmittedHomework>(`/api/v1/learn/homework/${homeworkId}/submit`);
      return res.data;
    },
    enabled: !!homeworkId,
  });
