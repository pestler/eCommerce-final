import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { configService } from '../../services/config.service.ts';
import { authFlowClient } from '../flows/auth.flow.ts';

export const authClient = createApiBuilderFromCtpClient(
  authFlowClient,
).withProjectKey({
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
});
