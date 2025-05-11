export type UserCourse = {
  id: number;
  title: string;
  subject: string;
  month: string;
};

export type UserCoursesResponse = {
  count: number;
  results: UserCourse[];
};
