import { useContext } from 'react';
import { IModalContext, ModalContext } from '../providers/ModalProvider.tsx';

export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal должен использоваться внутри ModalProvider');
  }
  return context;
};
