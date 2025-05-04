import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { CentralLoader } from '@/shared/components';
import { RegistrationPage, LoginPage } from '@/pages';

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
