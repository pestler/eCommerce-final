import { forwardRef, useState } from 'react';
import Button from '../button/Button';
import { FavouriteCard } from './FavoriteCard';
import styles from './card.module.scss';

const Card: React.FC = forwardRef(({ ...props }) => {
  const [counter, setCounter] = useState(0);
  const handleClickPlus = () => {
    setCounter(counter + 1);
  };
  const handleClickMinus = () => {
    counter > 0 && setCounter(counter - 1);
  };

  return (
    <div className={styles.card__container}>
      <div className={styles.card__img}>
        <FavouriteCard id={'id'} />
      </div>
      <span className={styles.card__title}  {...props}></span>

      <div className={styles.price__container}>
        <div className={styles.price}>29 BYN</div>
        <Button className={styles.btn}>В корзину</Button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity__container}>
        <div className={styles.stepper}>
          <button className={styles.minus} onClick={handleClickMinus}></button>
          <div className={styles.input}>{counter}</div>
          <button className={styles.plus} onClick={handleClickPlus}></button>
        </div>
        <div className={styles.detailed}>...Подробнее</div>
      </div>
    </div>
  );
});

export default Card;
