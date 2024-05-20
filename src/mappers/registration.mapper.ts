import { IRegistrationForm } from '../interface/registrationForm.interface.ts';
import { RegistrationDto } from './dto/registration.dto.ts';

class RegistrationMapper {
  public toDto(data: IRegistrationForm): RegistrationDto {
    const addresses = [
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
    ];
    if (data.sameAddress) {
      addresses.unshift();
    }
    return {
      email: data.email,
      password: data.registerPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses,
      shippingAddresses: data.sameAddress ? [0] : [1],
      defaultShippingAddress:  data.sameAddress ? 0 : (data.defaultShipping ? 1 : undefined),
      billingAddresses: [0],
      defaultBillingAddress:data.sameAddress ? 0 : (data.defaultBilling ? 0 : undefined),
    };
  }
}

export const registrationMapper = new RegistrationMapper();
