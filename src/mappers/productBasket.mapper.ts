import { LineItem } from '@commercetools/platform-sdk';
import { ProductBasketDto } from './dto/productBasket.dto';

class ProductBasketMapper {
  public fromDto(data: LineItem): ProductBasketDto {
    const productItem: ProductBasketDto = {
      id: data.id,
      name: data.name['ru-BY'],
      price: {
        centAmount: null,
        discounted: null,
        currency: null,
      },
      productId: data.productId,
      cartCount: data.quantity,
      image: data.variant.images?.length ? data.variant.images[0] : undefined,
    };
    const priceProduct = data.price;

    if (priceProduct && priceProduct.value) {
      productItem.price.currency = priceProduct.value.currencyCode;
      const price = priceProduct.value.centAmount.toString();
      productItem.price.centAmount = +price.slice(0, -2);
      if (priceProduct.discounted) {
        const priceDiscount =
          priceProduct.discounted!.value.centAmount.toString();
        if (priceDiscount) {
          productItem.price.discounted = +priceDiscount.slice(0, -2);
        }
      }
    }

    return productItem;
  }
}

export const productBasketMapper = new ProductBasketMapper();
