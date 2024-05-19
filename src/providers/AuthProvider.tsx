import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  ACCESS_TOKEN,
  EXPIRATION_TIME,
  REFRESH_TOKEN, USER_CUSTOMER,
} from '../contstants/storage-keys.constants.ts';
import {localStorageService} from "../services";
import {Customer} from "@commercetools/platform-sdk";

export interface IAuthContext {
  user: Customer | null,
  isAuthenticated: boolean;
  login: (user: Customer) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const token = localStorageService.get<string | null>(ACCESS_TOKEN);
    const user = localStorageService.get<Customer | null>(USER_CUSTOMER);
    if (token && user) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, []);

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
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
