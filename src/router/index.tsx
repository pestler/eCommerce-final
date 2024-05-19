import { ReactNode } from 'react';
import { Login, Main, Registration } from '../pages';
import AuthGuard from './guards/auth.guard.tsx';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage.tsx';

interface Route {
  path: string;
  element: ReactNode;
}

export const router: Route[] = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <AuthGuard element={<Login />} />,
  },
  {
    path: '/registration',
    element: <AuthGuard element={<Registration />} />,
  },
  {
    path: '*',
    element: <AuthGuard element={<NotFoundPage />} />,
  }
];
