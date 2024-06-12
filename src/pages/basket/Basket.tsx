import React, {useCallback, useEffect, useState} from 'react';
import Button from '../../components/button/Button';
import CardBasket from '../../components/cardBasket/CardBasket.tsx';
import { useCart } from '../../hooks/useCart.ts';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import { productBasketMapper } from '../../mappers/productBasket.mapper.ts';
import styles from './basket.module.scss';
import { Link } from 'react-router-dom';

const Basket: React.FC = () => {
  const { getCartItems, changeCount } = useCart();

  const [products, setProducts] = useState<ProductBasketDto[]>([]);

  const getProducts = useCallback(() => {
    try {
      const products: ProductBasketDto[] = getCartItems().map((product) =>
          productBasketMapper.fromDto(product),
      );
      setProducts(products);
    } catch (e) {
      console.error(e);
    }
  }, [getCartItems]);

  const changeCountHandler = async (
    product: ProductBasketDto,
    count: number,
  ) => {
    changeCount(product.id!, count);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className={styles.basket__wrapper}>
      <h2>Корзина</h2>
      <div className={styles.basket__container}>
        <div className={styles.list_product}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <CardBasket
                product={product}
                key={product.id}
                changeCount={changeCountHandler}
              />
            ))
          ) : (
            <div className={styles.basket__null}>Корзина пуста
              <Link className={styles.link} to="/catalog">
                в каталог
              </Link>
            </div>
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
