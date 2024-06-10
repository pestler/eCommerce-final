import React, {useEffect} from 'react';
import styles from './basket.module.scss';
import Button from '../../components/button/Button';
import {useCart} from "../../hooks/useCart.ts";

const Basket: React.FC = () => {

    const { getCartItems, getTotalCoast, getCount } = useCart();

    useEffect(() => {
        console.log(getCartItems())
        console.log(getTotalCoast())
        console.log(getCount())
    }, []);

    // const remove = (id: string) => {
    //     removeFromCart(id);
    // }

    return (
      <div className={styles.basket__wrapper}>
        <h2>Корзина</h2>
        <div className={styles.basket__container}>
          <div className={styles.list_product}>

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
