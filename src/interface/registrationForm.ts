export interface RegistrationForm {
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

export interface RegistrationFormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: {
    country: string;
    city: string;
    postalCode: string;
    streetNumber: string;
  };
  billingAddress: {
    country: string;
    city: string;
    postalCode: string;
    streetNumber: string;
  };
  /* shippingAsBilling: boolean;
  billingAsShipping: boolean;
  shippingAsDefault: boolean;
  billingAsDefault: boolean; */
}
