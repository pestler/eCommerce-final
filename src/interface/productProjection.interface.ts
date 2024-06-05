import {Image} from "@commercetools/platform-sdk";

export interface ProductProjectionInterface {
    [key: string]: string | number | Image[] | undefined | IPrice | null;
    id: string,
    name: string;
    lightning?: string;
    humidity?: string;
    temperature?: string;
    height?: number;
    diameter?: number;
    images: Image[];
    price: IPrice;
}

export interface IPrice {
    count: number | null,
    countDiscount?: number | null,
    currency: string | null
}
