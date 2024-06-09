import {ProductProjectionInterface} from "../interface/productProjection.interface.ts";
import {AddProductToCartDto} from "./dto/addProductToCart.dto.ts";
import {CartActions} from "../interface/cartActions.enum.ts";
import {RemoveCartDto} from "./dto/removeCart.dto.ts";
import {ChangeProductCountToCartDto} from "./dto/changeProductCountToCart.dto.ts";

class CartMapper {
    public toAddToCartDto(model: ProductProjectionInterface, count: number, version: number): AddProductToCartDto {
        return {
            version,
            actions: [
                {
                    action: CartActions.ADD,
                    productId: model.id,
                    variantId: model.variantId,
                    quantity: count,
                }
            ]
        }
    }

    public toRemoveItemCartDto(lineItemId: string, version: number): RemoveCartDto {
        return {
            version,
            actions: [
                {
                    action: CartActions.DELETE,
                    lineItemId,
                }
            ]
        }
    }

    public changeCountItemCartDto(lineItemId: string, version: number, quantity: number): ChangeProductCountToCartDto {
        return {
            version,
            actions: [
                {
                    action: CartActions.CHANGE_COUNT,
                    lineItemId,
                    quantity
                }
            ]
        }
    }
}

export const cartMapper = new CartMapper();
