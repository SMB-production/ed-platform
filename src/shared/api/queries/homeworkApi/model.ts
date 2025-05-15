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

export interface UserHomeworkAnswer {
  number: number;
  answers_text: string;
  files: {
    id: number;
    file: string;
  }[];
  question: string;
  correct_answer: string;
  is_auto: boolean;
  result: number;
}

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
