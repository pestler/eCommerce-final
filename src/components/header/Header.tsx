import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cart from '../../assets/svg/cart.svg';
import LoginSvg from '../../assets/svg/login.svg';
import Logo from '../../assets/svg/logo.svg';
import ProfileSvg from '../../assets/svg/profile.svg';
import { useAuth, useCart } from '../../hooks';
import InputSearch from '../inputSearch/InputSearch.tsx';
import BasicMenu from '../menu/Menu.tsx';
import { listLinks } from '../menu/listLink.tsx';
import style from './header.module.scss';

export type EventsMenuType =
  | 'Войти'
  | 'Зарегистрироваться'
  | 'Выйти'
  | 'Профиль'
  | 'Главная'
  | 'Каталог'
  | 'О нас';

const eventsMenu: EventsMenuType[] = [
  'Войти',
  'Зарегистрироваться',
  'Выйти',
  'Профиль',
  'Главная',
  'Каталог',
  'О нас',
];

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { getCount } = useCart();

  const navigate = useNavigate();

  const menuEvent = (event: string) => {
    switch (event) {
      case 'Профиль':
        navigate('/profile');
        break;
      case 'Войти':
        navigate('/login');
        break;
      case 'Зарегистрироваться':
        navigate('/registration');
        break;
      case 'Выйти':
        logout();
        break;
      case 'Главная':
        navigate('/');
        break;
      case 'Каталог':
        navigate('/catalog');
        break;
      case 'О нас':
        navigate('/about');
        break;
    }
  };

  return (
    <div className="container">
      <div className={style.header}>
        <Link to={'./'}>
          <Logo />
        </Link>
        <div className={style.header__container}>
          <div className={style.header__menu}>
            <nav className={style.navbar}>
              {listLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.to}
                  className={style.link}
                  data-testid={link.testid}
                  end
                >
                  {link.textLink}
                </NavLink>
              ))}
            </nav>
            <div className={style.rightMenu}>
              {user && (
                <span className={style.user}>
                  Привет, {user.firstName ? user.firstName : user.email}
                </span>
              )}
              <BasicMenu
                buttonContent={!isAuthenticated ? <LoginSvg /> : <ProfileSvg />}
                menuItems={eventsMenu
                  .filter((item) => item !== 'Каталог' && item !== 'Главная' && item !== 'О нас')
                  .filter((item: string) =>
                    isAuthenticated
                      ? item === 'Выйти' || item === 'Профиль'
                      : item !== 'Выйти' && item !== 'Профиль',
                  )}
                menuEvent={menuEvent}
              />
              <Link to={'./basket'}>
                <div className={style.cart}>
                  <Cart></Cart>
                  {!!getCount() && (
                    <div className={style.cartBadge}>{getCount()}</div>
                  )}
                </div>
              </Link>
              <div className={style.burger}>
                <BasicMenu
                  buttonContent={<MenuIcon></MenuIcon>}
                  menuItems={eventsMenu.filter(
                    (item: string) =>
                      item === 'Главная' ||
                      item === 'Каталог' ||
                      item === 'О нас',
                  )}
                  menuEvent={menuEvent}
                />
              </div>
            </div>
          </div>
          <div className={style.header__bottom}>
            <InputSearch placeholder="Поиск" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
