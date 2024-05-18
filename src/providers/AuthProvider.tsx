import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ACCESS_TOKEN,
  EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../contstants/storage-keys.constants.ts';
import { localStorageService } from '../services/localStorage.service.ts';

interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorageService.get<string>(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorageService.remove(ACCESS_TOKEN);
    localStorageService.remove(REFRESH_TOKEN);
    localStorageService.remove(EXPIRATION_TIME);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
