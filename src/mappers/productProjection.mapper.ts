import {ProductProjection} from "@commercetools/platform-sdk";
import {ProductProjectionInterface} from "../interface/productProjection.interface.ts";

export class ProductProjectionMapper {
    public fromDto(data: ProductProjection): ProductProjectionInterface {
        const model: ProductProjectionInterface = {
            id: data.id,
            name: data.name['ru-BY'],
            images: data.masterVariant.images?.length ? data.masterVariant.images : [],
        }
        data.masterVariant.attributes?.forEach((attr) => {
            model[attr.name] = attr.value
        })
        return model;
    }
}

export const productProjectionMapper = new ProductProjectionMapper();
