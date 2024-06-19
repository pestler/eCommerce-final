import {
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { configService } from '../../services';
import { tokenCacheUtil } from '../../utils';

export const passwordMiddleware = (
  user: UserAuthOptions,
): PasswordAuthMiddlewareOptions => ({
  host: configService.get('VITE_AUTH_URL_ECOMMERCE'),
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
  credentials: {
    clientId: configService.get('VITE_CLIENT_ID_ECOMMERCE'),
    clientSecret: configService.get('VITE_SECRET_ECOMMERCE'),
    user,
  },
  tokenCache: tokenCacheUtil(),
  fetch,
});
