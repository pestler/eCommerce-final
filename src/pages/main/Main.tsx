import imgLeft from '../../assets/images/login.png';
import imgRight from '../../assets/images/login1.png';
import imgCenter from '../../assets/images/registration.png';
import styles from './main.module.scss';
import React from "react";

const Main: React.FC = () => {

  return (
          <div className={styles.main__wrapper}>
              <h2>
                  Создадим сад <br/>в вашем доме и офисе
              </h2>
              <p className={styles.main__description}>
                  Если в большом городе вы скучаете по природе, ничто не мешает вам
                  превратить в оазис квартиру или офис. И мы поможем вам это сделать!
              </p>
              <img src={imgLeft} className={styles.main__imgleft}/>
              <img src={imgRight} className={styles.main__imgright}/>
              <img src={imgCenter} className={styles.main__imgcenter}/>
          </div>
  );
};

export default Main;
