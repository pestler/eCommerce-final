import {
  MyCustomerSignin,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { authClient, passwordClient } from '../api';
import { IChangePasswordForm } from '../interface/changePasswordForm.interface.ts';
import { UpdateUserInfo } from '../interface/registrationForm.interface.ts';
import { RegistrationDto } from '../mappers/dto/registration.dto.ts';

class CustomerService {
  public registration(dto: RegistrationDto) {
    return authClient.customers().post({ body: dto }).execute();
  }

  public updateCustomer(
    id: string,
    customerVersion: number,
    { firstName, lastName, email, dateOfBirth }: UpdateUserInfo,
  ) {
    const updateActions: MyCustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'setFirstName',
          firstName,
        },
        {
          action: 'setLastName',
          lastName,
        },
        {
          action: 'changeEmail',
          email,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth,
        },
      ],
    };
    return authClient
      .customers()
      .withId({ ID: id })
      .post({ body: updateActions })
      .execute();
  }

  public changePassword(
    id: string,
    version: number,
    { currentPassword, newPassword }: IChangePasswordForm,
  ) {
    const changePasswordActions = {
      id,
      version,
      currentPassword,
      newPassword,
    };
    return authClient
      .customers()
      .password()
      .post({ body: changePasswordActions })
      .execute();
  }

  public login({
    email,
    password,
  }: Pick<MyCustomerSignin, 'email' | 'password'>) {
    return passwordClient({ username: email, password })
      .login()
      .post({ body: { email, password } })
      .execute();
  }
}

export const customerService = new CustomerService();
