import style from './header.module.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { listLinks } from './listLink';
import logo from '../../assets/image/logo.png';
import login from '../../assets/image/login.svg';
import bag from '../../assets/image/bag.svg';

const productGroup = ['Комнатные растения', 'Флорариумы', 'Сухоцветы', 'Кашпо и горшки'];

const Header: React.FC = () => {
  return (
    /*<div className={style.header}>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
    </div>*/
    <div className={style.header}>
      <img src={logo} />
      <div className='header__container'>
        <div>
          <nav className="navbar" data-testid="navbar">
          {listLinks.map((link) => (
            <NavLink key={link.id} to={link.to} className="link" data-testid={link.testid} end>
              {link.textLink}
            </NavLink>
          ))}
          </nav>
          <div>
            {[login, bag].map((link) => {
                return <Link to={"/"+link}><img src={link}/></Link>
              })
            }
          </div>
        </div>
        <div>
          {
            productGroup.map((group) => {
             return <Link to="#">{group}</Link>
            })
          }
        </div>
      </div>
    </div>
    
  );
};

export default Header;
