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
  pageTitle?: string;
  children?: Route[];
}

export const router: Route[] = [
  {
    path: '/',
    element: <Main />,
    pageTitle: 'Home Decor',
  },
  {
    path: '/catalog',
    element: <Catalog />,
    pageTitle: 'Каталог',
  },
  {
    path: '/about',
    element: <About />,
    pageTitle: 'О нас',
  },
  {
    path: '/profile',
    element: <NonAuthGuard element={<Profile />} />,
    pageTitle: 'Профиль',
  },
  {
    path: '/catalog/:id',
    element: <ProductPage />,
  },
  {
    path: '/login',
    element: <AuthGuard element={<Login />} />,
    pageTitle: 'Вход',
  },
  {
    path: '/registration',
    element: <AuthGuard element={<Registration />} />,
    pageTitle: 'Регистрация',
  },
  {
    path: '/basket',
    element: <Basket />,
    pageTitle: 'Корзина',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    pageTitle: '404',
  },
];
