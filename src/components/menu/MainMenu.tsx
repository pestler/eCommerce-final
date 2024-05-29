import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginSvg from '../../assets/images/login.svg';
import ProfileSvg from '../../assets/svg/profile.svg';
import { useAuth } from '../../hooks/useAuth.ts';
import InputSearch from '../inputSearch/InputSearch';
import BasicMenu from './Menu';
import { listLinks } from './listLink';
import style from './menu.module.scss';

type PropsMainMenu = {
  isMenuOpen: boolean;
  clickHandler: () => void;
};

const productGroup = [
  'Комнатные растения',
  'Флорариумы',
  'Сухоцветы',
  'Кашпо и горшки',
];

const eventsMenu: ('Войти' | 'Зарегистрироваться' | 'Выйти')[] = [
  'Войти',
  'Зарегистрироваться',
  'Выйти',
];

export default function MainMenu({ isMenuOpen, clickHandler }: PropsMainMenu) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const menuEvent = (event: string) => {
    switch (event) {
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
    }
  };

  return (
    <div
      className={
        isMenuOpen
          ? style.header__container + ' ' + style.menu_open
          : style.header__container
      }
      onClick={clickHandler}
    >
      <div className={style.header__menu}>
        <nav className={style.navbar}>
          {listLinks
            .filter((link) =>
              isMenuOpen
                ? link
                : link.to !== 'login' && link.to !== 'registration',
            )
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
        {!isMenuOpen && (
          <BasicMenu
            buttonContent={
              isAuthenticated ? <LoginSvg/> : <ProfileSvg/>
            }
            menuItems={eventsMenu.filter((item: string) =>
              isAuthenticated ? item === 'Выйти' : item !== 'Выйти',
            )}
            menuEvent={menuEvent}
          />
        )}
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
        <InputSearch placeholder="Поиск" />
      </div>
    </div>
  );
}
