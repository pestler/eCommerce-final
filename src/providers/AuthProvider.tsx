import { Customer } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ACCESS_TOKEN,
  EXPIRATION_TIME,
  REFRESH_TOKEN,
  USER_CUSTOMER,
} from '../contstants/storage-keys.constants.ts';
import { useModal } from '../hooks';
import { localStorageService } from '../services';

export interface IAuthContext {
  user: Customer | null;
  isAuthenticated: boolean;
  login: (user: Customer) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const customer = localStorageService.get<Customer | null>(USER_CUSTOMER);
  const [isAuthenticated, setIsAuthenticated] = useState(!!customer);
  const [user, setUser] = useState<Customer | null>(customer);
  const { enqueueSnackbar } = useSnackbar();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const login = (user: Customer) => {
    localStorageService.set<Customer>(USER_CUSTOMER, user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    openModal({
      open: true,
      title: 'Выйти из учетной записи?',
      description: '',
      handleClose: (agree: boolean) => {
        closeModal();
        if (agree) {
          localStorageService.remove(ACCESS_TOKEN);
          localStorageService.remove(REFRESH_TOKEN);
          localStorageService.remove(EXPIRATION_TIME);
          localStorageService.remove(USER_CUSTOMER);
          setUser(null);
          setIsAuthenticated(false);
          navigate('/login');
          enqueueSnackbar('Вы вышли из системы', { variant: 'success' });
        }
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
