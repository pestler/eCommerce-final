import {Image} from "@commercetools/platform-sdk";

export interface ProductProjectionInterface {
    [key: string]: string | number | Image[] | undefined | IPrice | null | boolean;
    id: string,
    name: string;
    lightning?: string;
    humidity?: string;
    temperature?: string;
    height?: number;
    diameter?: number;
    images: Image[];
    price: IPrice;
    variantId: number;
    cart: boolean;
    cartCount: number;
    lineCartId: string | null;
}

export interface IPrice {
    currency: string | null
    count: number | null,
    countDiscount?: number | null,
}
