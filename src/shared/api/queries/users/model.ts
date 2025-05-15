export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_teacher: boolean;
  is_admin: boolean;
  date_birth: string;
};

export type UsersResponse = {
  count: number;
  results: User[];
};
