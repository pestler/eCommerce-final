import { Image } from '@commercetools/platform-sdk';

export type ProductDto = {
  name: string;
  lightning: string;
  humidity: string;
  temperature: string;
  height: number;
  diameter: number;
  images: Image[];
};
