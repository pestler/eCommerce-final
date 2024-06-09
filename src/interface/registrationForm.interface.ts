export interface IRegistrationForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingCountry: string;
  billingCountry: string;
  shippingCity: string;
  billingCity: string;
  shippingStreet: string;
  billingStreet: string;
  shippingHouseNumber: string;
  billingHouseNumber: string;
  shippingApartment: string;
  billingApartment: string;
  shippingPostcode: string;
  billingPostcode: string;
  sameAddress: boolean;
  defaultBilling: boolean;
  defaultShipping: boolean;
  newPassword: string;
  currentPassword: string;
  registerPassword: string;
  repeatPassword: string;
}

export type UpdateUserInfo = Pick<
  IRegistrationForm,
  'email' | 'lastName' | 'firstName' | 'dateOfBirth'
>;
