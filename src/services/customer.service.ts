import { MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { authClient, passwordClient } from '../api';

class CustomerService {
  public getByEmail(email: string) {
    return authClient
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute();
  }

  public getById(id: string) {
    return authClient.customers().withId({ ID: id }).get().execute();
  }

  public registration(dto: Pick<MyCustomerDraft, 'email' | 'password'>) {
    return authClient.customers().post({ body: dto }).execute();
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

  public logout() {
    // TODO - Логика по удалению токена из локального хранилища
  }
}

export const customerService = new CustomerService();
