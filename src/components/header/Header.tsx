import style from './styles.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
    </div>
  );
};

export default Header;
