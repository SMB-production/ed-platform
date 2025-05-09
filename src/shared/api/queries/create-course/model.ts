export type CoursePayload = {
  title: string;
  subject: string;
  month: string;
  content: string;
  teacher: number;
  students: number[];
};

export type Course = {
  id: number;
  title: string;
  subject: string;
  month: string;
};

export type CoursesResponse = {
  count: number;
  results: Course[];
};

export type AuthTokenResponse = {
  auth_token: string;
};
