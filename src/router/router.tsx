import { ReactNode } from 'react';
import Login from '../pages/login/Login.tsx';
import Main from '../pages/main/Main.tsx';
import Registration from '../pages/registration/Registration.tsx';
import AuthGuard from './guards/auth.guard.tsx';

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
];
