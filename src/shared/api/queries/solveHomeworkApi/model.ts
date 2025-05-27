export type HomeworkTask = {
  id: number;
  number: number;
  question: string;
  correct_answer: string;
  is_auto: boolean;
  files: { file: string }[];
};

export type HomeworkToSolve = {
  id: number;
  title: string;
  is_done: boolean;
  tasks: HomeworkTask[];
};
