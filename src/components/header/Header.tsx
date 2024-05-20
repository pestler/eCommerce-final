import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import BurgerButton from '../burgerMenu/BurgerButton.tsx';
import MainMenu from '../menu/MainMenu.tsx';
import style from './header.module.scss';

const Header: React.FC = () => {
  const [isMenuOpen, toggleMenu] = useState(false);

  return (
    <div className="container">
      <div className={style.header}>
        <img src={logo} className={style.logo} />
        <MainMenu
          isMenuOpen={isMenuOpen}
          clickHandler={() => toggleMenu(false)}
        />
        <BurgerButton
          isMenuOpen={isMenuOpen}
          clickHandler={() => toggleMenu(!isMenuOpen)}
        />
      </div>
    </div>
  );
};

export default Header;
