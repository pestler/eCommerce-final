import { Customer } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import { createContext, ReactNode, useState } from 'react';
import {
  ACCESS_TOKEN,
  EXPIRATION_TIME,
  REFRESH_TOKEN,
  USER_CUSTOMER,
} from '../contstants/storage-keys.constants.ts';
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

  const login = (user: Customer) => {
    localStorageService.set<Customer>(USER_CUSTOMER, user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorageService.remove(ACCESS_TOKEN);
    localStorageService.remove(REFRESH_TOKEN);
    localStorageService.remove(EXPIRATION_TIME);
    localStorageService.remove(USER_CUSTOMER);
    setUser(null);
    setIsAuthenticated(false);
    enqueueSnackbar('Вы вышли из системы', { variant: 'success' });
  };

  return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
  );
};
