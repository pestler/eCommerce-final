import {CartContext, ICartContext} from "../providers/CartProvider.tsx";
import {useContext} from "react";

export const useCart = (): ICartContext => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart должен использоваться внутри CartProvider');
    }
    return context;
}
