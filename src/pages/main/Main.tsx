import imgLeft from '../../assets/image/login.png';
import imgRight from '../../assets/image/login1.png';
import imgCenter from '../../assets/image/registration.png';
import styles from './main.module.scss';

const Main: React.FC = () => {
  // useEffect(() => {});

  // const registrationHandler = async () => {};

  return (
    <div className={styles.main__wrapper}>
      <h2>
        Создадим сад <br />в вашем доме и офисе
      </h2>
      <p className={styles.main__description}>
        Если в большом городе вы скучаете по природе, ничто не мешает вам
        превратить в оазис квартиру или офис. И мы поможем вам это сделать!
      </p>
      <img src={imgLeft} className={styles.main__imgleft} />
      <img src={imgRight} className={styles.main__imgright} />
      <img src={imgCenter} className={styles.main__imgcenter} />
    </div>
  );
};

export default Main;
