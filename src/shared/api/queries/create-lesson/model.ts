export type CreateLessonDto = {
  title: string;
  course: number;
  homework?: number;
  files?: File[];
};
