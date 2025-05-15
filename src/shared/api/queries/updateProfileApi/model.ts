export type UpdateProfileDto = {
  username?: string;
  email?: string;
  date_birth?: string;
  photo?: File | null;
  first_name: string;
  last_name: string;
};
