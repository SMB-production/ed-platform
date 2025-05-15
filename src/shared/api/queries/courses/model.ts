export type Course = {
  id: number;
  title: string;
  subject: string;
  month: string;
};

export type CoursesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
};

export type LessonShort = {
  id: number;
  title: string;
};

export type LearnCourseDetail = {
  id: number;
  title: string;
  subject: string;
  month: string;
  content: string;
  lessons: LessonShort[];
};
