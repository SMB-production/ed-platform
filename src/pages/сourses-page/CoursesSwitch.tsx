import { useCurrentUser } from '@/shared/api/queries/auth/authApi';
import { AdminCoursesPage } from '../admin/AdminCoursesPage';
import { CentralLoader } from '@/shared/components';
import { MyCoursesPage } from '@/pages/сourses-page/MyCoursesPage.tsx';

export const CoursesSwitch = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <CentralLoader />;
  if (isError || !user) return null;

  if (user.is_teacher || user.is_admin) {
    return <AdminCoursesPage />;
  }

  return <MyCoursesPage />;
};
