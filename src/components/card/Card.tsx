import React, { useState } from 'react';
import Button from '../button/Button';
import { FavouriteCard } from './FavoriteCard';
import styles from './card.module.scss';
import {ProductProjectionInterface} from "../../interface/productProjection.interface.ts";
import { Link } from 'react-router-dom';

type Props = React.HTMLProps<HTMLInputElement> & {
    product: ProductProjectionInterface,
}

const Card: React.FC<Props> = ({ product }) => {
  const [counter, setCounter] = useState(0);
  const handleClickPlus = () => {
    setCounter(counter + 1);
  };
  const handleClickMinus = () => {
    counter > 0 && setCounter(counter - 1);
  };

  return (
    <div className={styles.card__container}>
      <div className={styles.card__img__container}>
        <FavouriteCard id={'id'} />
        <Link className={styles.detailed} to={`/catalog/${product.id}`}>
      <div className={styles.card__img}
          style={{backgroundImage: `url("${product.images[0]?.url ?? ''}")`}}
      >
      </div>
      </Link>
      </div>
      <span className={styles.card__title}>{product.name}</span>

      <div className={styles.price__container}>
      <div className={styles.price}>
            {product.price.countDiscount && product.price.currency &&
                <span>{product.price.countDiscount + ' ' + product.price.currency}</span>
            }
            </div>
        <div className={styles.price}>
            {product.price.count && product.price.currency &&
            product.price.countDiscount && product.price.currency
                ? <span className={styles.price__discount}>{product.price.count + ' ' + product.price.currency}</span>
                : <span>{product.price.count + ' ' + product.price.currency}</span>
            }
            </div>
        <Button className={styles.btn}>В корзину</Button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity__container}>
        <div className={styles.stepper}>
          <button className={styles.minus} onClick={handleClickMinus}></button>
          <div className={styles.input}>{counter}</div>
          <button className={styles.plus} onClick={handleClickPlus}></button>
        </div>
          <Link className={styles.detailed} to={`/catalog/${product.id}`}>
              ...Подробнее
          </Link>
      </div>
    </div>
  );
};

export default Card;
