import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo_footer.png';
import { listLinks } from '../menu/listLink';
import style from './footer.module.scss';

const productGroup = [
  'Кактусы',
  'Суккуленты',
  'Бонсаи',
  'Комнатные растения',
  'Флорариумы',
];

const team = [
  {
    name: 'Ivan Haurylenka',
    gitHub: 'Ivankirik',
  },
  {
    name: 'Svetlana Antonova',
    gitHub: 'Claire-An',
  },
  {
    name: 'Aleh Kuis',
    gitHub: 'Pestler',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.wrapper}>
          <img src={Logo} className={style.footer__logo} />
          <div className={style.footer_menu}>
            <h3>Меню</h3>
            {listLinks.map((link) => (
              <Link key={link.id} to={link.to} className={style.link}>
                {link.textLink}
              </Link>
            ))}
          </div>
          <div className={style.footer__group}>
            <h3>КАТЕГОРИИ</h3>
            {productGroup.map((group) => {
              return (
                <Link to="#" className={style.link} key={group}>
                  {group}
                </Link>
              );
            })}
          </div>
          <div className={style.footer__team}>
            <h3>Разработчики</h3>
            {team.map((value) => {
              return (
                <Link
                  to={'https://github.com/' + value.gitHub}
                  className={style.link}
                  key={value.gitHub}
                  title={value.name}
                >
                  {value.gitHub}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
