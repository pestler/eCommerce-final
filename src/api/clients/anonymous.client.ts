import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { configService } from '../../services/config.service.ts';
import { anonymousFlowClient } from '../flows/anonymous.flow.ts';

export const anonymousClient = createApiBuilderFromCtpClient(
  anonymousFlowClient,
).withProjectKey({
  projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
});
