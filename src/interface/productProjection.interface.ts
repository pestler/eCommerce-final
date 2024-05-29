import {Image} from "@commercetools/platform-sdk";

export interface ProductProjectionInterface {
    [key: string]: string | number | Image[] | undefined
    id: string,
    name: string;
    lightning?: string;
    humidity?: string;
    temperature?: string;
    height?: number;
    diameter?: number;
    images: Image[];
}
