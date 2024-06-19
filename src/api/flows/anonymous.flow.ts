import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { anonymousMiddleware } from '../middlewares/anonymous.middleware.ts';
import { httpMiddleware } from '../middlewares/http.middleware.ts';

export const anonymousFlowClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousMiddleware)
  .withHttpMiddleware(httpMiddleware)
  .build();
