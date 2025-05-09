import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { CentralLoader } from '@/shared/components';
import { RegistrationPage, LoginPage, ProfilePage, CoursesPage, CreateCoursePage } from '@/pages';
import { ProtectedRoute } from '@/app/providers/protected-route.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <>1</>,
  },
  {
    path: '/about',
    element: <>2</>,
  },
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
    path: '/courses',
    element: (
      <ProtectedRoute requiredRole={['teacher', 'admin', 'student']}>
        <CoursesPage />
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
    path: '*',
    element: <>3</>,
  },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => (
  <Suspense fallback={<CentralLoader />}>
    <RouterProvider router={router} />
  </Suspense>
);
