import {Cart} from "@commercetools/platform-sdk";
import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {cartService, localStorageService} from "../services";
import {APP_CART} from "../contstants/storage-keys.constants.ts";
import {BadRequest} from "../interface/responseError.interface.ts";
import {useSnackbar} from "notistack";
import {LineItem} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/cart";
import {cartMapper} from "../mappers/cart.mapper.ts";
import {useLoader} from "../hooks/useLoader.ts";
import {CentPrecisionMoney} from "@commercetools/platform-sdk/dist/declarations/src/generated/models/common";

export interface ICartContext {
    cart: Cart | null;
    getCartItems: () => LineItem[]; /** Получение списка товаров, добавленных в корзину */
    updateCart: (cart: Cart) => void; /** Обновление состояние корзины */
    getCount: () => number | null; /** Общее количество товаров в корзине */
    getTotalCoast: () => CentPrecisionMoney | undefined; /** Общая стоимость товаров в корзине */
    getProductById: (id: string) => LineItem | undefined; /** Получаем конкретный продукт из корзины */
    removeFromCart: (lineCartId: string) => void; /** Удаление товара из корзины */
    addToCart: (productId: string, variantId: number, count: number) => void; /** Добавление товара в корзину */
    changeCount: (lineCartId: string, count: number) => void; /** Изменение количества товара в корзине */
}

interface Props {
    children: ReactNode;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({children}: Props) => {
    const {enqueueSnackbar} = useSnackbar();
    const {showLoader, hideLoader} = useLoader();

    const cartData = localStorageService.get<Cart | null>(APP_CART);

    const [cart, setCart] = useState<Cart | null>(cartData);
    const [cartCount, setCartCount] = useState<number | null>(cartData?.lineItems.length ?? null);
    const [totalCoast, setTotalCoast] = useState<CentPrecisionMoney | undefined>(undefined);

    const getCount = () => {
        return cartCount;
    }

    const getProductById = (id: string): LineItem | undefined => {
        return cart?.lineItems.find((item) => item.productId === id);
    }

    const getCartItems = () => {
        return cart ? cart.lineItems : [];
    }

    const getTotalCoast = () => {
        return totalCoast;
    }

    const updateCart = (cart: Cart) => {
        localStorageService.set<Cart>(APP_CART, cart);
        setCartCount(cart.lineItems.length);
        setCart(cart);
    }

    const createCart = useCallback(async () => {
        try {
            const {body} = await cartService.createCart();
            updateCart(body);
        } catch (e: unknown) {
            const {message} = e as BadRequest;
            enqueueSnackbar(
                `Ошибка при создании корзины: ${message}`,
                {variant: 'error'},
            );
        }
    }, []);

    const removeFromCart = async (lineCartId: string) => {
        showLoader()
        try {
            if (!cart) return;
            const res = await cartService.removeProductCart(cart, cartMapper.toRemoveItemCartDto(lineCartId, cart.version));
            if (res) {
                enqueueSnackbar(
                    `Товар удален из корзины`,
                    {variant: 'success'},
                );
                updateCart(res.body);
            }
            hideLoader();
        } catch (e: unknown) {
            const {message} = e as BadRequest;
            enqueueSnackbar(
                `Ошибка при удалении товара из корзины: ${message}`,
                {variant: 'error'},
            );
            hideLoader();
        }
    }

    const addToCart = async (productId: string, variantId: number, count: number) => {
        showLoader()
        try {
            if (!cart) return;
            const res = await cartService.addProductToCart(cart, cartMapper.toAddToCartDto(productId, variantId, count, cart.version));
            if (res) {
                updateCart(res.body);
                enqueueSnackbar(
                    `Товар добавлен в корзину`,
                    {variant: 'success'},
                );
            }
            hideLoader();
        } catch (e: unknown) {
            const {message} = e as BadRequest;
            enqueueSnackbar(
                `Ошибка при добавлении товара в корзину: ${message}`,
                {variant: 'error'},
            );
            hideLoader();
        }
    }

    const changeCount = async (lineCartId: string, count: number) => {
        showLoader()
        try {
            if (!cart) return;
            const res = await cartService.changeCount(cart, cartMapper.changeCountItemCartDto(lineCartId, cart.version, count));
            if (res) {
                updateCart(res.body);
                enqueueSnackbar(
                    `Количество товара изменено`,
                    { variant: 'success' },
                );
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
    }

    useEffect(() => {
        if (!cart) {
            createCart();
        }
        setTotalCoast(cart?.totalPrice);
    }, [cart]);

    return (
        <CartContext.Provider value={{cart, updateCart, getCount, getProductById, removeFromCart, addToCart, changeCount, getCartItems, getTotalCoast}}>
            {children}
        </CartContext.Provider>
    )
}
