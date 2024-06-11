import React, {useEffect, useState} from 'react';
import styles from './basket.module.scss';
import Button from '../../components/button/Button';
import {useCart} from "../../hooks/useCart.ts";
import Counter from '../../components/counter/Counter.tsx';

const Basket: React.FC = () => {

    const { getCartItems, getTotalCoast, getCount } = useCart();

    useEffect(() => {
        console.log(getCartItems())
        console.log(getTotalCoast())
        console.log(getCount())
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
                <div>
                  <img src={item.variant.images ? item.variant.images[0].url : undefined} />
                  <p>{item.name["ru-BY"]}</p>
                  <Counter count={counter} changeCounter={changeCounter}></Counter>
                </div>
              )
            })}
          </div>
          <div className={styles.basket__order}>
            <div className={styles.basket__description}>
              <h3>Ваш заказ</h3>
              <p>Товаров: <span>0</span></p>
              <p>Общая стоимость: <span>USD</span></p>
            </div>
            <div className={styles.basket_buttons}>
              <Button className={styles.basket_button}>
                Продолжить покупки
              </Button>
              <Button className={styles.basket_button}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Basket;
