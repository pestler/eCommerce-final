import { CentPrecisionMoney } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button';
import CardBasket from '../../components/cardBasket/CardBasket.tsx';
import { useCart } from '../../hooks/useCart.ts';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import { productBasketMapper } from '../../mappers/productBasket.mapper.ts';
import styles from './basket.module.scss';

const Basket: React.FC = () => {
  const { getCartItems, changeCount, getTotalCoast, getCount } = useCart();

  const [products, setProducts] = useState<ProductBasketDto[]>([]);
  const [total, setTotal] = useState<CentPrecisionMoney>();
  const [countProduct, setCountProduct] = useState<number>(0);

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

  const getTotal = useCallback(() => {
    try {
      const total = getTotalCoast();
      if (total) {
        setTotal(total);
      }
    } catch (e) {
      console.error(e);
    }
  }, [getTotalCoast]);

  const getCountProduct = useCallback(() => {
    try {
      const countProduct = getCount();
      if (countProduct) {
        setCountProduct(countProduct);
      }
    } catch (e) {
      console.error(e);
    }
  }, [getCount]);

  useEffect(() => {
    getProducts();
    getTotal();
    getCountProduct();
  }, [getProducts, getTotal, getCountProduct]);

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
            <div className={styles.basket__empty}>
              Корзина пуста
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
              Товаров:{' '}
              <span className={styles.order__count}>
                {countProduct && `${countProduct}`}
                {!countProduct && '0'}
              </span>
            </p>
            <p>
              Общая стоимость:{' '}
              <span className={styles.order__total}>
                {total &&
                  total.centAmount &&
                  total.fractionDigits &&
                  `${total.centAmount.toString().slice(0, -2)} ${total.currencyCode}`}
                {!total && '0'}
              </span>
            </p>
          </div>
          <div className={styles.basket__promo}>
            <Input placeholder="Введите промокод" type="text" />
            <Button className={styles.promo__button}>Применить</Button>
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
