import React from 'react';
import Logo from '../../assets/images/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import style from './header.module.scss';
import {listLinks} from "../menu/listLink.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import BasicMenu from "../menu/Menu.tsx";
import LoginSvg from "../../assets/images/login.svg";
import ProfileSvg from "../../assets/svg/profile.svg";
import InputSearch from "../inputSearch/InputSearch.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

export type EventsMenuType = 'Войти' | 'Зарегистрироваться' | 'Выйти' | 'Профиль' | 'Главная' | 'Каталог';

const eventsMenu: EventsMenuType[] = [
  'Войти',
  'Зарегистрироваться',
  'Выйти',
  'Профиль',
  'Главная',
  'Каталог',
];

const Header: React.FC = () => {
  const {isAuthenticated, logout, user} = useAuth();
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
        navigate('/login');
        break;
      case 'Главная':
        navigate('/');
        break;
      case 'Каталог':
        navigate('/catalog');
        break;
    }
  };

  return (
    <div className="container">
      <div className={style.header}>
        <Logo/>
        <div
            className={style.header__container}
        >
          <div className={style.header__menu}>
            <nav className={style.navbar}>
              {listLinks
                  .map((link) => (
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
            {user && <span className={style.user}>Привет, {user.firstName ? user.firstName : user.email}</span>}
            <BasicMenu
                buttonContent={
                  !isAuthenticated ? <LoginSvg/> : <ProfileSvg/>
                }
                menuItems={eventsMenu.filter((item: string) =>
                    isAuthenticated ? (item === 'Выйти' || item === 'Профиль') : (item !== 'Выйти' && item !== 'Профиль'),
                )}
                menuEvent={menuEvent}
            />
            <div className={style.burger}>
              <BasicMenu
                  buttonContent={<MenuIcon></MenuIcon>}
                  menuItems={eventsMenu.filter((item: string) => item === 'Главная' || item === 'Каталог')}
                  menuEvent={menuEvent}
              />
            </div>
          </div>

          <div className={style.header__bottom}>
            <InputSearch placeholder="Поиск"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
