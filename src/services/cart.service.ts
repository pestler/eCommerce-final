import {CART_ID, VERSION_CART} from "../contstants/storage-keys.constants.ts";
import {anonymousClient} from "../api";
import {AddProductToCartDto} from "../mappers/dto/addProductToCart.dto.ts";
import {RemoveCartDto} from "../mappers/dto/removeCart.dto.ts";
import {ChangeProductCountToCartDto} from "../mappers/dto/changeProductCountToCart.dto.ts";

class CartService {

    private id: string | null = localStorage.getItem(CART_ID);
    private version: string | null = localStorage.getItem(VERSION_CART);

    set cartId(id: string) {
        localStorage.setItem(CART_ID, id);
        this.id = id;
    }

    get cartId(): string | null {
        return this.id;
    }

    set versionCart(version: string) {
        localStorage.setItem(VERSION_CART, version);
        this.version = version;
    }

    get versionCart(): string | null {
        return this.version;
    }

    public async getCart() {
        if (!this.cartId) return;
        return await anonymousClient.carts().withId({ ID: this.cartId}).get().execute();
    }

    public async createCart(currency: string = 'USD', country: string = 'BY') {
        if (!this.cartId) {
            const { body } = await anonymousClient.carts()
                .post({ body: { currency, country } })
                .execute();
            this.cartId = body.id;
            this.versionCart = body.version.toString();
        } else {
            console.log('Корзина уже созадана. ID: ' + this.cartId)
        }
    }

    public async addProductToCart(dto: AddProductToCartDto) {
        if (!this.cartId || !this.versionCart) return;
        return await anonymousClient.carts()
            .withId({ ID: this.cartId })
            .post({ body: dto })
            .execute();
    }

    public async removeProductCart(dto: RemoveCartDto) {
        if (!this.cartId || !this.versionCart) return;
        return await anonymousClient.carts()
            .withId({ ID: this.cartId })
            .post({ body: dto })
            .execute();
    }

    public async changeCount(dto: ChangeProductCountToCartDto) {
        if (!this.cartId || !this.versionCart) return;
        return await anonymousClient.carts()
            .withId({ ID: this.cartId })
            .post({ body: dto })
            .execute();
    }
}

export const cartService = new CartService();
