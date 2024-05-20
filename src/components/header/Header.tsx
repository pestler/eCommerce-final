import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import BurgerButton from '../burgerMenu/BurgerButton.tsx';
import MainMenu from '../menu/MainMenu.tsx';
import style from './header.module.scss';


const Header: React.FC = () => {
  const [isMenuOpen, setToggleMenu] = useState(false);

  const body = document.querySelector('body');
  body!.style.overflow = isMenuOpen ? 'hidden' : 'auto';

  return (
    <div className="container">
      <div className={style.header}>
        <img src={logo} className={style.logo} />
        <MainMenu
          isMenuOpen={isMenuOpen}
          clickHandler={() => setToggleMenu(false)}
        />
        <BurgerButton
            className={style.burger}
          isMenuOpen={isMenuOpen}
          clickHandler={() => setToggleMenu(!isMenuOpen)}
        />
      </div>
    </div>
  );
};

export default Header;
