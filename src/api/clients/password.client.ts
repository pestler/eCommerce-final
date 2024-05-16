import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { configService } from '../../services/config.service.ts';
import { passwordFlowClient } from '../flows/password.flow.ts';

export const passwordClient = (
  user: UserAuthOptions,
): ByProjectKeyRequestBuilder =>
  createApiBuilderFromCtpClient(passwordFlowClient(user)).withProjectKey({
    projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
  });
