import { CustomerDraft } from '@commercetools/platform-sdk';

export type RegistrationDto = Pick<
  CustomerDraft,
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'email'
  | 'password'
  | 'addresses'
  | 'billingAddresses'
  | 'shippingAddresses'
  | 'defaultShippingAddress'
  | 'defaultBillingAddress'
>;

/**
 * Для отправки данных на eCommerce у тебя должен быть следующий объект,
 * который соответствует интерфейсу RegistrationDto:
 *
 * const dto: RegistrationDto {
 *   email: string;
 *   password: string;
 *   firstName: string;
 *   lastName: string;
 *   dateOfBirth: string;
 *   addresses: BaseAddress[]; <-- здесь массив с двумя адресами в виде объектов BaseAddress из @commercetools/platform-sdk
 *   defaultShippingAddress: number | undefined; <-- здесь индекс ShippingAddress по умолчанию, т.к. их в массиве addresses может быть много
 *   shippingAddresses: number[]; <-- здесь массив с индексами ShippingAddress т.к. их в массиве addresses может быть много, но у нам он только один, поэтому массив с одним значением
 *   defaultBillingAddress: number | undefined; <-- здесь индекс BillingAddress по умолчанию, т.к. их в массиве addresses тоже может быть много
 *   billingAddresses: number[]; <-- здесь массив с индексами BillingAddress т.к. их в массиве addresses может быть много, но у нам он только один, поэтому массив с одним значением
 * }
 * */
