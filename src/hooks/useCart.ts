import { useContext } from 'react';
import { CartContext, ICartContext } from '../providers/CartProvider.tsx';

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};
