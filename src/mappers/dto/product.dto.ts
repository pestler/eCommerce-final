import { Image } from '@commercetools/platform-sdk';

export type ProductDto = {
  name: string;
  lightning?: string;
  humidity?: string;
  temperature?: string;
  height?: number;
  diameter?: number;
  images: Image[];
  price: IPrice;
};

export interface IPrice {
  centAmount: number | null;
  currency: string | null;
}
