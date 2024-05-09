import {api} from "../api";
import {
    MyCustomerDraft,
    MyCustomerSignin
} from "@commercetools/platform-sdk";


class CustomerService {

    public getByEmail(email: string) {
        return api.customers().get({
                queryArgs: {
                    where: `email="${email}"`,
                },
            }).execute()
    }

    public getById(id: string) {
        return api.customers().withId({ ID: id })
            .get()
            .execute()
    }

    public registration(dto: Pick<MyCustomerDraft, 'email' | 'password'>) {
        return api.customers().post({ body: dto }).execute();
    }

    public login(dto: Pick<MyCustomerSignin, 'email' | 'password'>) {
        return api.me().login().post({ body: dto }).execute();
    }

    public logout() {
        //Логика по удалению токена из локального хранилища
    }
}

export const customerService = new CustomerService();
