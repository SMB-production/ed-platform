import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { CentralLoader } from '@/shared/components';
import {
  RegistrationPage,
  LoginPage,
  ProfilePage,
  CreateCoursePage,
  CreateLessonPage,
  CourseDetailPage,
  LessonDetailPage,
  CreateTaskPage,
  UsersPage,
  SolveTaskPage,
} from '@/pages';
import { ProtectedRoute } from '@/app/providers/protected-route.tsx';
import { MyCoursesPage } from '@/pages/сourses-page/MyCoursesPage.tsx';
import { UserHomeworkPage } from '@/pages/сourses-page/UserHomeworkPage.tsx';
import { SolveHomeworkPage } from '@/pages/сourses-page/SolveHomeworkPage.tsx';
import { SubmittedHomeworkPage } from '@/pages/сourses-page/SubmittedHomeworkPage.tsx';
import { HomeworkResultPage } from '@/pages/сourses-page/HomeworkResultPage.tsx';
import { EditProfilePage } from '@/pages/lk/EditProfilePage.tsx';
import { AllSubmissionsPage } from '@/pages/tasks/AllSubmissionsPage.tsx';
import { UserDetailPage } from '@/pages/admin/UserDetailPage';
import { TaskBankPage } from '@/pages/tasks/TaskBankPage.tsx';
import { LessonManagePage } from '@/pages/сourses-page/LessonManagePage.tsx';
import { HomeworkEditPage } from '@/pages/сourses-page/HomeworkEditPage.tsx';
import { AdminCoursesPage } from '@/pages/admin/AdminCoursesPage.tsx';
import { EditCourseDetailPage } from '@/pages/admin/EditCourseDetailPage.tsx';
import { CoursesSwitch } from '@/pages/сourses-page/CoursesSwitch.tsx';
import { TaskDetailPage } from '@/pages/tasks/TaskDetailPage.tsx';
import { HomeworkIntroPage } from '@/pages/сourses-page/HomeworkIntroPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/edit',
    element: (
      <ProtectedRoute requiredRole={['student', 'teacher', 'admin']}>
        <EditProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/courses',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin', 'student']}>
        <CoursesSwitch />
      </ProtectedRoute>
    ),
  },
  {
    path: '/courses/:id',
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <CourseDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/lessons/:id',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin', 'student']}>
        <LessonDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-courses',
    element: (
      <ProtectedRoute requiredRole={['student', 'teacher', 'admin']}>
        <MyCoursesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user-homework/:id',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <UserHomeworkPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:id/solve',
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <SolveHomeworkPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:id/submitted',
    element: (
      <ProtectedRoute requiredRole={['student', 'teacher', 'admin']}>
        <SubmittedHomeworkPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:id',
    element: (
      <ProtectedRoute requiredRole={['student']}>
        <HomeworkIntroPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:id/results',
    element: (
      <ProtectedRoute requiredRole={['student', 'teacher', 'admin']}>
        <HomeworkResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-courses',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <CreateCoursePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-task',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <CreateTaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-lesson',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <CreateLessonPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute requiredRole={['admin']}>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:homeworkId/task/:taskNumber',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin', 'student']}>
        <SolveTaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/all',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <AllSubmissionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <ProtectedRoute requiredRole={['admin', 'teacher']}>
        <UserDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/task-bank',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <TaskBankPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/lesson/manage/:id',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <LessonManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/homework/:id/edit',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin']}>
        <HomeworkEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/courses/admin',
    element: (
      <ProtectedRoute requiredRole={['admin', 'teacher']}>
        <AdminCoursesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/courses/edit/:id',
    element: (
      <ProtectedRoute requiredRole={['admin', 'teacher']}>
        <EditCourseDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/task/:id',
    element: (
      <ProtectedRoute requiredRole={['admin', 'teacher']}>
        <TaskDetailPage />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => (
  <Suspense fallback={<CentralLoader />}>
    <RouterProvider router={router} />
  </Suspense>
);
