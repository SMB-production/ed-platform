export type HomeworkTask = {
  number: number;
  question: string;
  correct_answer: string;
  is_auto: boolean;
  files: { file: string }[];
};

export type HomeworkDetail = {
  id: number;
  title: string;
  tasks: HomeworkTask[];
};

export type UserHomeworkAnswer = {
  number: number;
  question: string;
  answers_text: string;
  correct_answer: string;
  result: number;
  is_auto: boolean;
};

export type UserInfo = {
  id: number;
  firstname: string;
  lastname: string;
};

export type UserHomeworkDetail = {
  id: number;
  comment: string;
  user: UserInfo;
  homework: number;
  answers: UserHomeworkAnswer[];
};
