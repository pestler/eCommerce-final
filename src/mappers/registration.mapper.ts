import { IRegistrationForm } from '../interface/registrationForm.interface.ts';
import { RegistrationDto } from './dto/registration.dto.ts';

class RegistrationMapper {
  public toDto(data: IRegistrationForm): RegistrationDto {
    return {
      email: data.email,
      password: data.registerPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses: [
        {
          country: data.billingCountry,
          city: data.billingCity,
          streetName: data.billingStreet,
          postalCode: data.billingPostcode,
        },
        {
          country: data.shippingCountry,
          city: data.shippingCity,
          streetName: data.shippingStreet,
          postalCode: data.billingPostcode,
        },
      ],
      shippingAddresses: [1],
      defaultShippingAddress: 0,
      billingAddresses: [0],
      defaultBillingAddress: 0,
    };
  }
}

export const registrationMapper = new RegistrationMapper();
