import { Cart } from '@commercetools/platform-sdk';
import { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { CentPrecisionMoney } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { useSnackbar } from 'notistack';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  APP_CART,
  CART_PROMO_CODE,
} from '../contstants/storage-keys.constants.ts';
import { useLoader } from '../hooks';
import { BadRequest } from '../interface/responseError.interface.ts';
import { cartMapper } from '../mappers';
import { cartService, localStorageService } from '../services';

export interface ICartContext {
  cart: Cart | null;
  promoCode: string | null;
  getCartItems: () => LineItem[] /** Получение списка товаров, добавленных в корзину */;
  updateCart: (cart: Cart) => void /** Обновление состояние корзины */;
  getCount: () => number | undefined /** Общее количество товаров в корзине */;
  getTotalCoast: () =>
    | CentPrecisionMoney
    | undefined /** Общая стоимость товаров в корзине */;
  getProductById: (
    id: string,
  ) => LineItem | undefined /** Получаем конкретный продукт из корзины */;
  removeFromCart: (
    lineCartId: string,
  ) => void /** Удаление товара из корзины */;
  addToCart: (
    productId: string,
    variantId: number,
    count: number,
  ) => void /** Добавление товара в корзину */;
  changeCount: (
    lineCartId: string,
    count: number,
  ) => void /** Изменение количества товара в корзине */;
  addPromoCode: (code: string) => void /** Добавление промокода */;
  removePromoCode: (id: string) => void /** Удаление промокода */;
  clearCart: () => void /** Очистить корзину */;
}

interface Props {
  children: ReactNode;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();

  const cartData = localStorageService.get<Cart | null>(APP_CART);

  const [cart, setCart] = useState<Cart | null>(cartData);
  const [promoCode, setPromoCode] = useState<string | null>(
    localStorageService.get<string>(CART_PROMO_CODE),
  );

  const getCount = () => {
    return cart?.totalLineItemQuantity;
  };

  const getProductById = (id: string): LineItem | undefined => {
    return cart?.lineItems.find((item) => item.productId === id);
  };

  const getCartItems = () => {
    return cart ? cart.lineItems : [];
  };

  const getTotalCoast = () => {
    return cart?.totalPrice;
  };

  const updateCart = (cart: Cart) => {
    localStorageService.set<Cart>(APP_CART, cart);
    setCart(cart);
  };

  const createCart = useCallback(async () => {
    try {
      const { body } = await cartService.createCart();
      updateCart(body);
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при создании корзины: ${message}`, {
        variant: 'error',
      });
    }
  }, []);

  const removeFromCart = async (lineCartId: string) => {
    showLoader();
    try {
      if (!cart) return;
      const res = await cartService.removeProductCart(
        cart,
        cartMapper.toRemoveItemCartDto(lineCartId, cart.version),
      );
      if (res) {
        enqueueSnackbar(`Товар удален из корзины`, { variant: 'success' });
        updateCart(res.body);
      }
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при удалении товара из корзины: ${message}`, {
        variant: 'error',
      });
      hideLoader();
    }
  };

  const addToCart = async (
    productId: string,
    variantId: number,
    count: number,
  ) => {
    showLoader();
    try {
      if (!cart) return;
      const res = await cartService.addProductToCart(
        cart,
        cartMapper.toAddToCartDto(productId, variantId, count, cart.version),
      );
      if (res) {
        updateCart(res.body);
        enqueueSnackbar(`Товар добавлен в корзину`, { variant: 'success' });
      }
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при добавлении товара в корзину: ${message}`, {
        variant: 'error',
      });
      hideLoader();
    }
  };

  const changeCount = async (lineCartId: string, count: number) => {
    showLoader();
    try {
      if (!cart) return;
      const res = await cartService.changeCount(
        cart,
        cartMapper.changeCountItemCartDto(lineCartId, cart.version, count),
      );
      if (res) {
        updateCart(res.body);
      }
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(
        `Ошибка при изменении количества товара в корзине: ${message}`,
        { variant: 'error' },
      );
      hideLoader();
    }
  };

  const addPromoCode = async (code: string) => {
    showLoader();
    try {
      if (!cart) return;
      const res = await cartService.addPromoCode(
        cart,
        cartMapper.addPromoCodeDto(cart.version, code),
      );
      if (res) {
        updateCart(res.body);
        enqueueSnackbar(`Промокод применен`, { variant: 'success' });
        localStorageService.set<string>(CART_PROMO_CODE, code);
        setPromoCode(code);
      }
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при применении промокода: ${message}`, {
        variant: 'error',
      });
      hideLoader();
    }
  };

  const removePromoCode = async (id: string) => {
    showLoader();
    try {
      if (!cart) return;
      const res = await cartService.removePromoCode(
        cart,
        cartMapper.removePromoCodeDto(cart.version, id),
      );
      if (res) {
        updateCart(res.body);
        enqueueSnackbar(`Промокод удален`, { variant: 'success' });
        localStorageService.remove(CART_PROMO_CODE);
        setPromoCode(null);
      }
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при удалении промокода: ${message}`, {
        variant: 'error',
      });
      hideLoader();
    }
  };

  const clearCart = async () => {
    showLoader();
    try {
      createCart();
      enqueueSnackbar(`Корзина очищена`, { variant: 'success' });
      hideLoader();
    } catch (e: unknown) {
      const { message } = e as BadRequest;
      enqueueSnackbar(`Ошибка при удалении товара из корзины: ${message}`, {
        variant: 'error',
      });
      hideLoader();
    }
  };

  useEffect(() => {
    if (!cart) {
      createCart();
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        promoCode,
        updateCart,
        getCount,
        getProductById,
        removeFromCart,
        addToCart,
        changeCount,
        getCartItems,
        getTotalCoast,
        addPromoCode,
        removePromoCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
