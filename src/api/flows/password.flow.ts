import {
  Client,
  ClientBuilder,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import { httpMiddleware } from '../middlewares/http.middleware.ts';
import { passwordMiddleware } from '../middlewares/password.middleware.ts';

export const passwordFlowClient = (user: UserAuthOptions): Client =>
  new ClientBuilder()
    .withPasswordFlow(passwordMiddleware(user))
    .withHttpMiddleware(httpMiddleware)
    .build();
