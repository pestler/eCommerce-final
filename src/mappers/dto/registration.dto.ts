import {CustomerDraft} from "@commercetools/platform-sdk";

export type RegistrationDto = Pick<CustomerDraft, 'firstName' | 'lastName' | 'dateOfBirth' | 'email' | 'password' | 'addresses' | 'billingAddresses' | 'shippingAddresses' | 'defaultShippingAddress' | 'defaultBillingAddress'>;
