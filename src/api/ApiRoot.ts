import {createApiBuilderFromCtpClient} from "@commercetools/platform-sdk";
import {ctpClient} from "./BuildClient.ts";
import {configService} from "../services/config.service.ts";

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE')});
