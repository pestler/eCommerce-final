import React from 'react';
import styles from './notFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.main__wrapper}>
      <div className={styles.main__content}>
        <h2>
            404
        </h2>
        <p className={styles.main__description}>
            Страница не найдена
        </p>
        <Link className={styles.link} to="/">
            на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
