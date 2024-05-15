import {UserAuthOptions} from "@commercetools/sdk-client-v2";
import {ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient} from '@commercetools/platform-sdk';
import {passwordFlowClient} from "../flows/password.flow.ts";
import {configService} from "../../services/config.service.ts";

export const passwordClient = (user: UserAuthOptions): ByProjectKeyRequestBuilder => createApiBuilderFromCtpClient(passwordFlowClient(user))
    .withProjectKey({projectKey: configService.get('VITE_PROJECT_KEY_ECOMMERCE')})

