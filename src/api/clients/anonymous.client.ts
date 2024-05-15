import {anonymousFlowClient} from "../flows/anonymous.flow.ts";
import {createApiBuilderFromCtpClient} from "@commercetools/platform-sdk";
import {configService} from "../../services/config.service.ts";

export const anonymousClient = createApiBuilderFromCtpClient(anonymousFlowClient)
    .withProjectKey({projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE')})
