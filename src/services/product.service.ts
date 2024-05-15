import {anonymousClient} from "../api";


class ProductService {
  public getAll(limit?: number) {
    return anonymousClient.products().get({ queryArgs: { limit } }).execute();
  }

  public getDiscounts() {
    return anonymousClient.productDiscounts().get().execute();
  }

  public getProjectionsSort(fieldSort: string) {
    return anonymousClient
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
    return anonymousClient
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
    return anonymousClient
      .productProjections()
      .search()
      .get({ queryArgs: { limit, offset } })
      .execute();
  }

  public getByKey(key: string) {
    return anonymousClient.products().withKey({ key }).get().execute();
  }

  public getByID(ID: string) {
    return anonymousClient.products().withId({ ID }).get().execute();
  }

  public getByCategory(ID: string) {
    return anonymousClient.categories().withId({ ID }).get().execute();
  }
}

export const productsService = new ProductService();
