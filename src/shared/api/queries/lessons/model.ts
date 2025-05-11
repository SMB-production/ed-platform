export type LessonDetail = {
  id: number;
  title: string;
  homework: number | null;
  files: { file: string }[];
};
