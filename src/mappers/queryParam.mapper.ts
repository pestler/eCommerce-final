import {
  ProductCategory,
  SubcategoryType,
} from '../interface/productCategory.type.ts';

class QueryParamMapper {
  public fromQueryParam(
    params: string,
    categories: ProductCategory[],
  ): SubcategoryType[] {
    const subcategories: SubcategoryType[] = [];
    const paramsArray = params.split(',');
    categories.forEach((category) => {
      category.subcategories.forEach((subCategory) => {
        if (paramsArray.includes(subCategory.name))
          subcategories.push(subCategory);
      });
    });
    return subcategories;
  }
}

export const queryParamMapper = new QueryParamMapper();
