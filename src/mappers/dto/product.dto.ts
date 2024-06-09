import { Image } from '@commercetools/platform-sdk';

export interface ProductDto {
  [key: string]:
    | string
    | number
    | Image[]
    | undefined
    | IPrice
    | null
    | boolean;
  id: string;
  name: string;
  lightning?: string;
  humidity?: string;
  temperature?: string;
  height?: number;
  diameter?: number;
  images: Image[];
  price: IPrice;
  cart: boolean;
  cartCount: null | number;
  lineCartId: string | null;
  variantId: number;
}

export interface IPrice {
  centAmount: number | null;
  discounted?: number | null;
  currency: string | null;
}
