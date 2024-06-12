import React, { useEffect, useState } from 'react';
import deleteImg from '../../assets/images/delete.png';
import Button from '../../components/button/Button';
import Counter from '../../components/counter/Counter.tsx';
import { useCart } from '../../hooks/useCart.ts';
import styles from './basket.module.scss';

const Basket: React.FC = () => {
  const { getCartItems, getTotalCoast, getCount } = useCart();

  useEffect(() => {
    console.log(getCartItems());
    console.log(getTotalCoast());
    console.log(getCount());
  }, []);

  const listProduct = getCartItems();

  const [counter, setCounter] = useState<number>(1);

  const changeCounter = (count: number) => {
    setCounter(count);
    // if (product && product.lineCartId) {
    //   changeCount(product.lineCartId, count);
    //}
  };

  // const remove = (id: string) => {
  //     removeFromCart(id);
  // }

  return (
    <div className={styles.basket__wrapper}>
      <h2>Корзина</h2>
      <div className={styles.basket__container}>
        <div className={styles.list_product}>
          {listProduct.map((item) => {
            return (
              <div className={styles.product__item}>
                <img
                  src={
                    item.variant.images ? item.variant.images[0].url : undefined
                  }
                  className={styles.product__img}
                />
                <div className={styles.product__description}>
                  <p className={styles.product__name}>{item.name['ru-BY']}</p>
                  <div className={styles.product__counter}>
                    <Counter
                      count={counter}
                      changeCounter={changeCounter}
                    ></Counter>
                  </div>
                  <div className={styles.product__price}>100 USD</div>
                  <div className={styles.product__delete}>
                    <img src={deleteImg} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.basket__order}>
          <div className={styles.basket__description}>
            <h3>Ваш заказ</h3>
            <p>
              Товаров: <span>0</span>
            </p>
            <p>
              Общая стоимость: <span>USD</span>
            </p>
          </div>
          <div className={styles.basket__buttons}>
            <Button className={styles.basket__button}>
              Продолжить покупки
            </Button>
            <Button className={styles.basket__button}>Оформить заказ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
