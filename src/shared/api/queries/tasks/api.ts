import { axiosInstance } from '../base';
import { CreateTaskDto } from '@/shared/api/queries/tasks/model.ts';
import { useMutation } from '@tanstack/react-query';
import { taskKeys } from '@/shared/api/keys.ts';

const createTask = async (data: CreateTaskDto) => {
  const formData = new FormData();
  formData.append('question', data.question);
  formData.append('correct_answer', data.correct_answer);
  formData.append('ball', String(data.ball));
  formData.append('is_auto', String(data.is_auto));
  formData.append('exam_number', String(data.exam_number));
  formData.append('subject', String(data.subject));

  data.files?.forEach((file) => {
    formData.append('files', file);
  });

  const res = await axiosInstance.post('/api/v1/edit/task/', formData);
  return res.data;
};

export const useCreateTask = () =>
  useMutation({
    mutationKey: taskKeys.detail('create'),
    mutationFn: createTask,
  });
