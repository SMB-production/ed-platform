export type CreateLessonDto = {
  title: string;
  lesson_date: string;
  course: number;
  homework?: number;
  files?: File[];
};
