export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  is_teacher: boolean;
  is_admin: boolean;
};

export type UsersResponse = {
  count: number;
  results: User[];
};
