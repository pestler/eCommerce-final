import {anonymousClient} from "../api";
import {AddProductToCartDto} from "../mappers/dto/addProductToCart.dto.ts";
import {RemoveCartDto} from "../mappers/dto/removeCart.dto.ts";
import {ChangeProductCountToCartDto} from "../mappers/dto/changeProductCountToCart.dto.ts";
import {Cart} from "@commercetools/platform-sdk";

class CartService {

    public async createCart(currency: string = 'USD', country: string = 'BY') {
            return await anonymousClient.carts()
                .post({ body: { currency, country } })
                .execute();
    }

    public async addProductToCart(cart: Cart, dto: AddProductToCartDto) {
        return await anonymousClient.carts()
            .withId({ ID: cart.id })
            .post({ body: dto })
            .execute();
    }

    public async removeProductCart(cart: Cart, dto: RemoveCartDto) {
        return await anonymousClient.carts()
            .withId({ ID: cart.id })
            .post({ body: dto })
            .execute();
    }

    public async changeCount(cart: Cart, dto: ChangeProductCountToCartDto) {
        return await anonymousClient.carts()
            .withId({ ID: cart.id })
            .post({ body: dto })
            .execute();
    }
}

export const cartService = new CartService();
