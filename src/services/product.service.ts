import { anonymousClient } from '../api';
import { Filters } from '../interface/filters.type.ts';
import { ISort } from '../interface/sort.interface.ts';

class ProductService {
  public getAllSearch(
    { categories, attributes }: Filters,
    pagination: { limit: number; offset: number },
    sort: ISort,
  ) {
    const stringFilter = categories
      .map((item) => `subtree("${item.id}")`)
      .join(',');

    let rangeFilterHeight = 'variants.attributes.height:range(';
    if (attributes && attributes.heightFrom !== undefined) {
      rangeFilterHeight += `${attributes.heightFrom} to `;
    } else {
      rangeFilterHeight += '* to ';
    }

    if (attributes && attributes.heightTo !== undefined) {
      rangeFilterHeight += `${attributes.heightTo})`;
    } else {
      rangeFilterHeight += '*)';
    }

    let rangeFilterDiameter = 'variants.attributes.diameter:range(';
    if (attributes && attributes.diameterFrom !== undefined) {
      rangeFilterDiameter += `${attributes.diameterFrom} to `;
    } else {
      rangeFilterDiameter += '* to ';
    }

    if (attributes && attributes.diameterTo !== undefined) {
      rangeFilterDiameter += `${attributes.diameterTo})`;
    } else {
      rangeFilterDiameter += '*)';
    }

    const queryArgs: { filter: string[] | string | undefined } = {
      filter: undefined,
    };

    if (categories.length) {
      queryArgs.filter = [`categories.id: ${stringFilter}`];
    } else {
      queryArgs.filter = [];
    }

    if (attributes?.heightTo || attributes?.heightFrom) {
      if (Array.isArray(queryArgs.filter)) {
        queryArgs.filter.push(rangeFilterHeight);
      } else {
        queryArgs.filter = [rangeFilterHeight];
      }
    }

    if (attributes?.diameterTo || attributes?.diameterFrom) {
      if (Array.isArray(queryArgs.filter)) {
        queryArgs.filter.push(rangeFilterDiameter);
      } else {
        queryArgs.filter = [rangeFilterDiameter];
      }
    }

    if (Array.isArray(queryArgs.filter) && queryArgs.filter.length === 0) {
      queryArgs.filter = undefined;
    }

    const args = {
      ...queryArgs,
      limit: pagination.limit,
      offset: pagination.offset,
      sort: `${sort.name} ${sort.value}`,
    };

    return anonymousClient
      .productProjections()
      .search()
      .get({
        queryArgs: args,
      })
      .execute();
  }

  public getAll() {
    return anonymousClient.productProjections().get().execute();
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
          'text.ru-BY': search,
          fuzzy: true,
        },
      })
      .execute();
  }

  public getAllProjections(limit?: number, offset?: number) {
    return anonymousClient
      .productProjections()
      .search()
      .get({ queryArgs: { limit, offset, 'categories.id': 1 } })
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

  public getCategories() {
    return anonymousClient.categories().get().execute();
  }

  public getProductsTypes() {
    return anonymousClient.productTypes().get().execute();
  }
}

export const productsService = new ProductService();
