export type SubmittedAnswer = {
  number: number;
  question: string;
  answers_text: string;
  correct_answer: string;
  result: number;
};

export type SubmittedHomework = {
  homework: number;
  user: { id: number; firstname: string; lastname: string };
  answers: SubmittedAnswer[];
  comment: string;
  total_score: number;
};
