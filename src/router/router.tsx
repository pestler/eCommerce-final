import { ReactNode } from 'react';
import About from '../pages/about/About.tsx';
import Basket from '../pages/basket/Basket.tsx';
import Catalog from '../pages/catalog/Catalog.tsx';
import Login from '../pages/login/Login.tsx';
import Main from '../pages/main/Main.tsx';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage.tsx';
import ProductPage from '../pages/productPage/ProductPage.tsx';
import Profile from '../pages/profile/Profile.tsx';
import Registration from '../pages/registration/Registration.tsx';
import AuthGuard from './guards/auth.guard.tsx';
import NonAuthGuard from './guards/non-auth.guard.tsx';

interface Route {
  path: string;
  element: ReactNode;
  children?: Route[];
}

export const router: Route[] = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/catalog',
    element: <Catalog />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/profile',
    element: <NonAuthGuard element={<Profile />} />,
  },
  {
    path: '/catalog/:id',
    element: <ProductPage />,
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
    path: '/basket',
    element: <Basket />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
