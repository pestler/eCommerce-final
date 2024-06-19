import { AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { configService } from '../../services';
import { tokenCacheUtil } from '../../utils';

export const authMiddleware: AuthMiddlewareOptions = {
  host: configService.get('VITE_AUTH_URL_ECOMMERCE'),
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
  credentials: {
    clientId: configService.get('VITE_CLIENT_ID_ECOMMERCE'),
    clientSecret: configService.get('VITE_SECRET_ECOMMERCE'),
  },
  tokenCache: tokenCacheUtil(),
  fetch,
};
