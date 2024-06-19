import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionInterface } from '../interface/productProjection.interface.ts';

export class ProductProjectionMapper {
  public fromDto(data: ProductProjection): ProductProjectionInterface {
    const model: ProductProjectionInterface = {
      id: data.id,
      name: data.name['ru-BY'],
      images: data.masterVariant.images?.length
        ? data.masterVariant.images
        : [],
      price: {
        count: null,
        countDiscount: null,
        currency: null,
      },
      variantId: data.masterVariant.id,
      cart: false,
      cartCount: 1,
      lineCartId: null,
    };
    const priceCount = data.masterVariant.prices;

    if (priceCount && priceCount[0]) {
      model.price.currency = priceCount[0].value.currencyCode;
      const price = priceCount[0].value.centAmount.toString();
      model.price.count = +price.slice(0, -2);
      if (priceCount[0].discounted) {
        const priceDiscount =
          priceCount[0].discounted!.value.centAmount.toString();
        model.price.countDiscount = +priceDiscount.slice(0, -2);
      }
    }
    data.masterVariant.attributes?.forEach((attr) => {
      model[attr.name] = attr.value;
    });
    return model;
  }
}

export const productProjectionMapper = new ProductProjectionMapper();
