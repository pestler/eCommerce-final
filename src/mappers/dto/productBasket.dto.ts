import { Image } from '@commercetools/platform-sdk';

export interface ProductBasketDto {
  [key: string]: string | number | Image | undefined | IPrice | null | boolean;
  id: string;
  name: string;
  price: IPrice;
  cartCount: null | number;
  image?: Image;
}

export interface IPrice {
  centAmount: number | null;
  discounted?: number | null;
  currency: string | null;
}
