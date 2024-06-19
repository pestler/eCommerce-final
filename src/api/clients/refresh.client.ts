import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { configService } from '../../services/config.service.ts';
import { refreshTokenFlowClient } from '../flows/refresh.flow.ts';

export const refreshClient = () => {
  // TODO - Написать логику по получению токена из локального хранилища
  const token = '';
  return createApiBuilderFromCtpClient(
    refreshTokenFlowClient(token),
  ).withProjectKey({
    projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
  });
};
