import { useState } from 'react';
import deleteImg from '../../assets/images/delete.png';
import { useCart } from '../../hooks/useCart.ts';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import Counter from '../counter/Counter.tsx';
import styles from './cardBasket.module.scss';

type Props = React.HTMLProps<HTMLElement> & {
  product: ProductBasketDto;
  changeCount: (payload: ProductBasketDto, count: number) => void;
};

const CardBasket: React.FC<Props> = ({ product, changeCount }) => {
  const { removeFromCart } = useCart();

  const [counter, setCounter] = useState(product.cartCount);

  const changeCounter = (count: number) => {
    setCounter(count);
    if (product && product.id) {
      changeCount(product, count);
    }
  };

  const remove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className={styles.product__item}>
      <img
        src={product.image ? product.image.url : undefined}
        className={styles.product__img}
      />
      <div className={styles.product__description}>
        <p className={styles.product__name}>{product.name}</p>
        <div className={styles.product__counter}>
          <Counter count={counter} changeCounter={changeCounter}></Counter>
        </div>
        <div
          className={styles.product__price}
        >{`${product.price.centAmount} ${product.price.currency}`}</div>
        <div
          className={styles.product__delete}
          onClick={() => remove(product.id)}
        >
          <img src={deleteImg} />
        </div>
      </div>
    </div>
  );
};

export default CardBasket;
