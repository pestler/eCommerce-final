import { ProductData } from '@commercetools/platform-sdk';
import { ProductDto } from './dto/product.dto';

class ProductMapper {
  public fromDto(data: ProductData, id: string): ProductDto {
    const product: ProductDto = {
      id,
      name: data.name['ru-BY'],
      images: data.masterVariant.images?.length
        ? data.masterVariant.images
        : [],
      price: {
        centAmount: null,
        discounted: null,
        currency: null,
      },
      cartCount: null,
      cart: false,
      lineCartId: null,
      variantId: data.masterVariant.id,
    };
    const priceProduct = data.masterVariant.prices;

    if (priceProduct && priceProduct[0]) {
      product.price.currency = priceProduct[0].value.currencyCode;
      const price = priceProduct[0].value.centAmount.toString();
      product.price.centAmount = +price.slice(0, -2);
      if (priceProduct[0].discounted) {
        const priceDiscount =
          priceProduct[0].discounted!.value.centAmount.toString();
        if (priceDiscount) {
          product.price.discounted = +priceDiscount.slice(0, -2);
        }
      }
    }

    data.masterVariant.attributes?.forEach((attr) => {
      product[attr.name] = attr.value;
    });

    return product;
  }
}

export const productMapper = new ProductMapper();
