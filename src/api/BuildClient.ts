import {AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions} from "@commercetools/sdk-client-v2";
import {configService} from "../services/config.service.ts";

const scopes = [configService.get('VITE_SCOPE_ECOMMERCE')];

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: configService.get('VITE_AUTH_URL_ECOMMERCE'),
    projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE'),
    credentials: {
        clientId: configService.get('VITE_CLIENT_ID_ECOMMERCE'),
        clientSecret: configService.get('VITE_SECRET_ECOMMERCE'),
    },
    scopes,
    fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: configService.get('VITE_API_URL_ECOMMERCE'),
    fetch,
};

export const ctpClient = new ClientBuilder()
    .withProjectKey(configService.get('VITE_PROJECT_KEY_ECOMMERCE'))
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
