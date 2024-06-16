import { CentPrecisionMoney } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import CardBasket from '../../components/cardBasket/CardBasket.tsx';
import { useCart, useModal } from '../../hooks';
import { productBasketMapper } from '../../mappers';
import { ProductBasketDto } from '../../mappers/dto/productBasket.dto.ts';
import styles from './basket.module.scss';

type PromoCodeForm = {
  code: string;
};

const Basket: React.FC = () => {
  const {
    cart,
    getCartItems,
    changeCount,
    getTotalCoast,
    getCount,
    addPromoCode,
    removePromoCode,
    removeFromCart,
    promoCode,
    clearCart,
  } = useCart();

  const { openModal, closeModal } = useModal();

  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductBasketDto[]>([]);
  const [total, setTotal] = useState<CentPrecisionMoney>();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PromoCodeForm>({
    mode: 'onChange',
  });

  const getProducts = useCallback(() => {
    const products: ProductBasketDto[] = getCartItems().map((product) =>
      productBasketMapper.fromDto(product),
    );
    setProducts(products);
  }, [getCartItems]);

  const changeCountHandler = async (
    product: ProductBasketDto,
    count: number,
  ) => {
    changeCount(product.id!, count);
  };

  const getTotal = useCallback(() => {
    const total = getTotalCoast();
    setTotal(total);
  }, [getTotalCoast]);

  const onSubmit: SubmitHandler<PromoCodeForm> = async ({ code }) => {
    addPromoCode(code);
  };

  const backCatalog = () => {
    navigate('../catalog');
  };

  const deleteCart = (agree: boolean): void => {
    closeModal();
    if (agree) clearCart();
  };

  const deleteProduct = ({ name, id }: ProductBasketDto) => {
    openModal({
      open: true,
      title: `Вы действительно хотите удалить "${name}" из корзины?`,
      description: '',
      handleClose: (agree: boolean) => {
        closeModal();
        if (agree) removeFromCart(id);
      },
    });
  };

  const deletePromoCode = (agree: boolean): void => {
    closeModal();
    if (agree) removePromoCode(cart!.discountCodes[0].discountCode.id);
  };

  useEffect(() => {
    getProducts();
    getTotal();
    setValue('code', promoCode ? promoCode : '');
  }, [cart]);

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
                removeProduct={deleteProduct}
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
                {getCount() && `${getCount()}`}
                {!getCount() && '0'}
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
                {total &&
                cart &&
                cart.discountOnTotalPrice &&
                cart.discountOnTotalPrice.discountedAmount.centAmount ? (
                  <span className={styles.oldPrice}>
                    {(
                      cart.discountOnTotalPrice.discountedAmount.centAmount +
                      total.centAmount
                    )
                      .toString()
                      .slice(0, -2)}{' '}
                    {cart.discountOnTotalPrice.discountedAmount.currencyCode}
                  </span>
                ) : (
                  ''
                )}
              </span>
            </p>
          </div>
          <form
            className={styles.basket__promo}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register('code', {
                required: {
                  value: true,
                  message: 'Поле обязательно для заполнения!',
                },
              })}
              placeholder="Введите промокод"
              type="text"
              readOnly={!!cart?.discountCodes.length}
              error={errors.code}
            />
            {!cart?.discountCodes.length && (
              <CustomButton
                disabled={!isValid}
                className={styles.promo__button}
              >
                Применить
              </CustomButton>
            )}
          </form>
          {cart?.discountCodes.length ? (
            <CustomButton
              className={'outline'}
              style={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}
              alternativeText={'Удалить'}
              onClick={() =>
                openModal({
                  open: true,
                  title: 'Вы действительно хотите удалить промокод?',
                  description: '',
                  handleClose: deletePromoCode,
                })
              }
            >
              Промокод применен
            </CustomButton>
          ) : (
            ''
          )}
          <div></div>
          <div className={styles.basket__buttons}>
            <CustomButton
              className={styles.basket__button}
              onClick={backCatalog}
            >
              {getCount() ? 'Продолжить покупки' : 'Начать покупки'}
            </CustomButton>
            {getCount() && (
              <CustomButton
                className={styles.basket__button}
                onClick={() =>
                  openModal({
                    open: true,
                    title: 'Вы действительно хотите очистить корзину?',
                    description:
                      'Из корзины будут удалены все товары и очищен промокод, если он применен.',
                    handleClose: deleteCart,
                  })
                }
              >
                Очистить корзину
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
