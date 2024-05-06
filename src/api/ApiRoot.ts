import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { configService } from '../services/config.service.ts';
import { ctpClient } from './BuildClient.ts';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
});
