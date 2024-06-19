import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import deleteImg from '../../assets/images/delete.png';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import Counter from '../counter/Counter.tsx';
import styles from './cardBasket.module.scss';

type Props = React.HTMLProps<HTMLElement> & {
  product: ProductBasketDto;
  changeCount: (payload: ProductBasketDto, count: number) => void;
  removeProduct: (payload: ProductBasketDto) => void;
};

const CardBasket: React.FC<Props> = ({
  product,
  changeCount,
  removeProduct,
}) => {
  const [counter, setCounter] = useState(product.cartCount);

  const changeCounter = (count: number) => {
    setCounter(count);
    if (product && product.id) {
      changeCount(product, count);
    }
  };

  return (
    <div className={styles.product__item}>
      <Link to={`../catalog/${product.productId}`}>
        <img
          src={product.image ? product.image.url : undefined}
          className={styles.product__img}
        />
      </Link>
      <div className={styles.product__description}>
        <Link to={`../catalog/${product.productId}`}>
          <p className={styles.product__name}>{product.name}</p>
        </Link>
        <div className={styles.product__counter}>
          <Counter count={counter} changeCounter={changeCounter}></Counter>
        </div>
        <div className={styles.product__price}>
          <div className={styles.price__discount}>
            {product.price.discounted &&
              product.price.currency &&
              `${product.price.discounted * counter} ${product.price.currency}`}
          </div>
          <div
            className={
              product.price.discounted
                ? styles.price__amount
                : styles.price__discount
            }
          >
            {product.price.centAmount &&
              product.price.currency &&
              `${product.price.centAmount * counter} ${product.price.currency}`}
          </div>
        </div>
        <div
          className={styles.product__delete}
          onClick={() => removeProduct(product)}
        >
          <img src={deleteImg} />
        </div>
      </div>
    </div>
  );
};

export default CardBasket;
