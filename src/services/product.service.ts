import { api } from '../api';

class ProductService {
  public getAll(limit?: number) {
    return api.products().get({ queryArgs: { limit } }).execute();
  }

  public getDiscounts() {
    return api.productDiscounts().get().execute();
  }

  public getProjectionsSort(fieldSort: string) {
    return api
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: fieldSort,
        },
      })
      .execute();
  }

  public searchProjections(search: string) {
    return api
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en': search,
          fuzzy: true,
        },
      })
      .execute();
  }

  public getAllProjections(limit: number, offset: number) {
    return api
      .productProjections()
      .search()
      .get({ queryArgs: { limit, offset } })
      .execute();
  }

  public getByKey(key: string) {
    return api.products().withKey({ key }).get().execute();
  }

  public getByID(ID: string) {
    return api.products().withId({ ID }).get().execute();
  }

  public getByCategory(ID: string) {
    return api.categories().withId({ ID }).get().execute();
  }
}

export const productsService = new ProductService();
