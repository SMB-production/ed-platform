export type HomeworkTask = {
  number: number;
  question: string;
  correct_answer: string;
  is_auto: boolean;
  files: { file: string }[];
};

export type HomeworkToSolve = {
  id: number;
  title: string;
  tasks: HomeworkTask[];
};
