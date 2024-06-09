import { CartActions } from '../../interface/cartActions.enum.ts';

export type AddProductToCartDto = {
  version: number;
  actions: ProductCartAction[];
};

export type ProductCartAction = {
  action: CartActions;
  productId: string;
  variantId: number;
  quantity: number;
};
