import { CartActions } from '../interface/cartActions.enum.ts';
import { AddProductToCartDto } from './dto/addProductToCart.dto.ts';
import { ChangeProductCountToCartDto } from './dto/changeProductCountToCart.dto.ts';
import { RemoveCartDto } from './dto/removeCart.dto.ts';

class CartMapper {
  public toAddToCartDto(
    productId: string,
    variantId: number,
    count: number,
    version: number,
  ): AddProductToCartDto {
    return {
      version,
      actions: [
        {
          action: CartActions.ADD,
          productId,
          variantId,
          quantity: count,
        },
      ],
    };
  }

  public toRemoveItemCartDto(
    lineItemId: string,
    version: number,
  ): RemoveCartDto {
    return {
      version,
      actions: [
        {
          action: CartActions.DELETE,
          lineItemId,
        },
      ],
    };
  }

  public changeCountItemCartDto(
    lineItemId: string,
    version: number,
    quantity: number,
  ): ChangeProductCountToCartDto {
    return {
      version,
      actions: [
        {
          action: CartActions.CHANGE_COUNT,
          lineItemId,
          quantity,
        },
      ],
    };
  }
}

export const cartMapper = new CartMapper();
