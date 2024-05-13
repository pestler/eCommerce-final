import styles from './main.module.scss';
import imgLeft from '../../assets/image/login.png';
import imgRight from '../../assets/image/login1.png';
import imgCenter from '../../assets/image/registration.png';

const Main: React.FC = () => {
  // useEffect(() => {});

  // const registrationHandler = async () => {};

  return (
    <main className={styles.main}>
      <h2>Создадим сад в вашем доме и офисе</h2>
      <p>Если в большом городе вы скучаете по природе, ничто не мешает вам превратить в оазис квартиру или офис. И мы поможем вам это сделать!</p>
      <img src={imgLeft}/>
      <img src={imgCenter}/>
      <img src={imgRight}/>
    </main>
  );
};

export default Main;
