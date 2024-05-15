import {HttpMiddlewareOptions} from "@commercetools/sdk-client-v2";
import {configService} from "../../services/config.service.ts";

export const httpMiddleware: HttpMiddlewareOptions = {
    host: configService.get('VITE_API_URL_ECOMMERCE'),
    fetch,
};
