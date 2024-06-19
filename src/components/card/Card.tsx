import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dotted from '../../assets/svg/dotted.svg';
import { ProductProjectionInterface } from '../../interface/productProjection.interface.ts';
import CustomButton from '../button/CustomButton.tsx';
import Counter from '../counter/Counter.tsx';
import styles from './card.module.scss';

type Props = React.HTMLProps<HTMLInputElement> & {
  product: ProductProjectionInterface;
  addToCart: (payload: ProductProjectionInterface, count: number) => void;
  removeFromCart: (payload: ProductProjectionInterface) => void;
  changeCount: (payload: ProductProjectionInterface, count: number) => void;
};

const Card: React.FC<Props> = ({
  product,
  addToCart,
  removeFromCart,
  changeCount,
}) => {
  const [counter, setCounter] = useState(product.cartCount);

  useEffect(() => {
    setCounter(product.cartCount ?? 1);
  }, [product]);

  const changeCounter = (count: number) => {
    setCounter(count);
    if (product.cart) {
      changeCount(product, count);
    }
  };

  return (
    <div className={styles.card__container}>
      <div className={styles.card__img__container}>
        <Link className={styles.detailed} to={`/catalog/${product.id}`}>
          <div
            className={styles.card__img}
            style={{
              backgroundImage: `url("${product.images[0]?.url ?? ''}")`,
            }}
          ></div>
        </Link>
      </div>
      <span className={styles.card__title}>{product.name}</span>

      <div className={styles.price__container}>
        <div className={`${styles.price}`}>
          {product.price.countDiscount && product.price.currency && (
            <span>
              {product.price.countDiscount + ' ' + product.price.currency}
            </span>
          )}
        </div>
        <div
          className={`${styles.price} ${product.price.countDiscount ? styles.discount : ''}`}
        >
          {product.price.count &&
          product.price.currency &&
          product.price.countDiscount &&
          product.price.currency ? (
            <span>{product.price.count + ' ' + product.price.currency}</span>
          ) : (
            <span>{product.price.count + ' ' + product.price.currency}</span>
          )}
        </div>
        {product.cart ? (
          <CustomButton
            className={'outline'}
            style={{ maxWidth: '150px' }}
            alternativeText={'Удалить'}
            onClick={() => removeFromCart(product)}
          >
            В корзине
          </CustomButton>
        ) : (
          <CustomButton
            style={{ maxWidth: '150px' }}
            className={styles.btn}
            onClick={() => addToCart(product, counter)}
          >
            В корзину
          </CustomButton>
        )}
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity__container}>
        <Counter
          count={product.cartCount}
          changeCounter={changeCounter}
        ></Counter>
        <Link className={styles.detailed} to={`/catalog/${product.id}`}>
          <Dotted></Dotted> Подробнее
        </Link>
      </div>
    </div>
  );
};

export default Card;
