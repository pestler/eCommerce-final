import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { configService } from '../../services';

export const httpMiddleware: HttpMiddlewareOptions = {
  host: configService.get('VITE_API_URL_ECOMMERCE'),
  fetch,
};
