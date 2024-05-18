import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import {
  ACCESS_TOKEN,
  EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../contstants/storage-keys.constants.ts';
import { localStorageService } from '../services/localStorage.service.ts';

const tokenCacheUtil = (): TokenCache => {
  const tokenStore: TokenStore = {
    token: localStorageService.get<string>(ACCESS_TOKEN) ?? '',
    expirationTime: localStorageService.get<number>(EXPIRATION_TIME) ?? 0,
    refreshToken: localStorageService.get<string>(REFRESH_TOKEN) ?? '',
  };

  return {
    get: () => tokenStore,
    set: ({ token, expirationTime, refreshToken }) => {
      tokenStore.token = token;
      tokenStore.expirationTime = expirationTime;
      tokenStore.refreshToken = refreshToken;

      localStorageService.set<string>(ACCESS_TOKEN, token);
      localStorageService.set<number>(EXPIRATION_TIME, expirationTime);
      if (refreshToken) {
        localStorageService.set<string>(REFRESH_TOKEN, refreshToken);
      }
    },
  };
};

export default tokenCacheUtil;
