export type CreateTaskDto = {
  question: string;
  subject: string;
  correct_answer: string;
  ball: number;
  exam_number: number;
  is_auto: boolean;
  files?: File[];
};
