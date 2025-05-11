export type CreateTaskDto = {
  question: string;
  correct_answer: string;
  ball: number;
  is_auto: boolean;
  files?: File[];
};
