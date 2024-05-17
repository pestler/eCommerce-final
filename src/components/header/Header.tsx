import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import login from '../../assets/images/login.svg';
import logo from '../../assets/images/logo.svg';
import style from './header.module.scss';
import { listLinks } from './listLink';
import BasicMenu from "../menu/Menu.tsx";

const productGroup = [
  'Комнатные растения',
  'Флорариумы',
  'Сухоцветы',
  'Кашпо и горшки',
];
export type eventType = 'Войти' | 'Зарегистриваться';
const eventsMenu: eventType[] = ['Войти', 'Зарегистриваться'];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const menuEvent = (event: eventType) => {
    switch (event) {
      case 'Войти':
        navigate('/login');
        break;
      case 'Зарегистриваться':
        navigate('/registration');
        break;
    }
  }

  return (
    <div className="container">
      <div className={style.header}>
        <img src={logo} />
        <div className={style.header__container}>
          <div className={style.header__menu}>
            <nav className={style.navbar} data-testid="navbar">
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
            <BasicMenu
                buttonContent={<img src={login}/>}
                menuItems={eventsMenu}
                menuEvent={menuEvent}
            />
          </div>
          <div className={style.header__bottom}>
            <div className={style.header__group}>
              {productGroup.map((group) => {
                return (
                  <Link to="#" className={style.link} key={group}>
                    {group}
                  </Link>
                );
              })}
            </div>
            {/* <InputSearch placeholder="Search"/> */}
            <input className={style.inputSearch} type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
