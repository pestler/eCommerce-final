import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import CardBasket from '../../components/cardBasket/CardBasket.tsx';
import { useCart } from '../../hooks/useCart.ts';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import { productBasketMapper } from '../../mappers/productBasket.mapper.ts';
import styles from './basket.module.scss';

const Basket: React.FC = () => {
  const { getCartItems, getTotalCoast, getCount, changeCount } = useCart();

  const [products, setProducts] = useState<ProductBasketDto[]>([]);

  const getProducts = () => {
    try {
      const products: ProductBasketDto[] = getCartItems().map((product) =>
        productBasketMapper.fromDto(product),
      );
      setProducts(products);
    } catch (e) {
      console.error(e);
    }
  };

  const changeCountHandler = async (
    product: ProductBasketDto,
    count: number,
  ) => {
    changeCount(product.id!, count);
  };

  useEffect(() => {
    console.log(getCartItems());
    console.log(getTotalCoast());
    console.log(getCount());
    getProducts();
  }, []);

  return (
    <div className={styles.basket__wrapper}>
      <h2>Корзина</h2>
      <div className={styles.basket__container}>
        <div className={styles.list_product}>
          {products ? (
            products.map((product) => (
              <CardBasket
                product={product}
                key={product.id}
                changeCount={changeCountHandler}
              />
            ))
          ) : (
            <div>Корзина пуста</div>
          )}
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
