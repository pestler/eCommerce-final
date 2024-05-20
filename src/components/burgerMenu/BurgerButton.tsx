import React from 'react';
import style from './burgerButton.module.scss';

type PropsBurger = React.HTMLProps<HTMLInputElement> & {
  isMenuOpen: boolean;
  clickHandler: () => void;
};

const BurgerButton = ({ isMenuOpen, clickHandler }: PropsBurger) => {
  return (
    <div
      className={
        isMenuOpen ? style.burger + ' ' + style.burger_active : style.burger
      }
      onClick={clickHandler}
    >
      <span className={style.burger__line} />
    </div>
  );
};

export default BurgerButton;
