import { CartActions } from '../interface/cartActions.enum.ts';
import { AddProductToCartDto } from './dto/addProductToCart.dto.ts';
import { ChangeProductCountToCartDto } from './dto/changeProductCountToCart.dto.ts';
import { RemoveCartDto } from './dto/removeCart.dto.ts';
import {AddPromoCodeDto} from "./dto/addPromocode.dto.ts";
import {RemovePromoCodeDto} from "./dto/removeDiscountCode.dto.ts";

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

  public addPromoCodeDto(
      version: number,
      code: string,
  ): AddPromoCodeDto {
    return {
      version,
      actions: [
        {
          action: 'addDiscountCode',
          code
        },
      ],
    };
  }

  public removePromoCodeDto(
      version: number,
      id: string,
  ): RemovePromoCodeDto {
    return {
      version,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id
          }
        },
      ],
    };
  }
}

export const cartMapper = new CartMapper();
