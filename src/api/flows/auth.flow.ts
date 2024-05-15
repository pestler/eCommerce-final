import {ClientBuilder} from "@commercetools/sdk-client-v2";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {httpMiddleware} from "../middlewares/http.middleware.ts";

export const authFlowClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddleware)
    .withHttpMiddleware(httpMiddleware)
    .build();
