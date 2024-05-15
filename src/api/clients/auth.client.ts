import {createApiBuilderFromCtpClient} from "@commercetools/platform-sdk";
import {authFlowClient} from "../flows/auth.flow.ts";
import {configService} from "../../services/config.service.ts";

export const authClient = createApiBuilderFromCtpClient(authFlowClient)
    .withProjectKey({projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE')});
