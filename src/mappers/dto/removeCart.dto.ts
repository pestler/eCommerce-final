import {CartActions} from "../../interface/cartActions.enum.ts";

export type RemoveCartDto = {
    version: number,
    actions: RemoveCartAction[]
}

export type RemoveCartAction = {
    action: CartActions.DELETE,
    lineItemId: string,
}


