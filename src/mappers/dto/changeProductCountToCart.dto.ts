import {CartActions} from "../../interface/cartActions.enum.ts";

export type ChangeProductCountToCartDto = {
    version: number,
    actions: ChangeCountAction[]
}

export type ChangeCountAction = {
    action: CartActions.CHANGE_COUNT,
    lineItemId: string,
    quantity: number,
}
