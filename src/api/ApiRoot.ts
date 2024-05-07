import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { configService } from '../services/config.service.ts';
import { ctpClient } from './BuildClient.ts';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
});

export default apiRoot;
