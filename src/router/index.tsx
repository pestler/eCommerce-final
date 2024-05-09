import { ReactNode } from 'react';
import { Login, Main, Registration } from '../pages';

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
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
];
