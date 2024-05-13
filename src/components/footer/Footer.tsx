import React from 'react';
import style from './footer.module.scss';
import logo from '../../assets/image/logo.svg';
import { listLinks } from '../header/listLink';
import { Link } from 'react-router-dom';

const productGroup = [
  "Кактусы",
  'Суккуленты',
  'Бонсаи',
  'Комнатные растения',
  'Флорариумы'
];

const team = [
  {
    "name": "Ivan Haurylenka",
    "gitHub": "ivankirik"
  },
  {
    "name": "Svetlana Antonova",
    "gitHub": "claire-an"
  },
  {
    "name": "Aleh Kuis",
    "gitHub": "pestler"
  }
];

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={style.wrapper}>
        <img src={logo} />
        <div className={style.footer_menu}>
          <h3>Меню</h3>
          {listLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className={style.link}
              >
                {link.textLink}
              </Link>
          ))}
        </div>
        <div className={style.header__group}>
          <h3>КАТЕГОРИИ</h3>
          {productGroup.map((group) => {
            return (
              <Link to="#" className={style.link} key={group}>
                {group}
              </Link>
            );
          })}
        </div>
        <div>
          <h3>Команда разработчиков</h3>
          {team.map((value) => {
            return (
              <Link to={"https://github.com/" + value.gitHub} className={style.link} key={value.gitHub} title={value.name}>
                {value.gitHub}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
