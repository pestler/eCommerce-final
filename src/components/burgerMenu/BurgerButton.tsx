import style from './burgerButton.module.scss';

type PropsBurger = {
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
