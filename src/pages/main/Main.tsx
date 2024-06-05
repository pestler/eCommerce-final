import React from 'react';
import imgCenter from '../../assets/images/registration.png';
import styles from './main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={styles.main__wrapper}>
      <h2>
        Создадим сад <br />в вашем доме и офисе
      </h2>
      <p className={styles.main__description}>
        Если в большом городе вы скучаете по природе, ничто не мешает вам
        превратить в оазис квартиру или офис. И мы поможем вам это сделать!
      </p>
      <img src={imgCenter} className={styles.main__imgcenter} />
    </div>
  );
};

export default Main;
