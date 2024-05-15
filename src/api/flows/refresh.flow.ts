import {ClientBuilder, Client} from "@commercetools/sdk-client-v2";
import {httpMiddleware} from "../middlewares/http.middleware.ts";
import {refreshMiddleware} from "../middlewares/refresh.middleware.ts";

export const refreshTokenFlowClient = (token: string): Client =>
    new ClientBuilder()
        .withRefreshTokenFlow(refreshMiddleware(token))
        .withHttpMiddleware(httpMiddleware)
        .build();
