import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const tokenCacheUtil = (): TokenCache => {
  const tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  return {
    get: () => tokenStore,
    set: (cache) => {
      tokenStore.token = cache.token;
      tokenStore.expirationTime = cache.expirationTime;
      tokenStore.refreshToken = cache.refreshToken;
    },
  };
};

export default tokenCacheUtil;
