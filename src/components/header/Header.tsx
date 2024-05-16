import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import bag from '../../assets/image/bag.svg';
import login from '../../assets/image/login.svg';
import logo from '../../assets/image/logo.svg';
import style from './header.module.scss';
import { listLinks } from './listLink';

const productGroup = [
  'Комнатные растения',
  'Флорариумы',
  'Сухоцветы',
  'Кашпо и горшки',
];

const listButtonLink = [
  {
    id: 'login',
    to: '/login',
    src: login,
  },
  {
    id: 'bag',
    to: '#',
    src: bag,
  },
];

const Header: React.FC = () => {
  return (
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
          <div className={style.menu__img}>
            {listButtonLink.map((link) => {
              return (
                <Link to={link.to} key={link.id}>
                  <img src={link.src} />
                </Link>
              );
            })}
          </div>
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
          <input
            className={style.inputSearch}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
