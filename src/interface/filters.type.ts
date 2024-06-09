import { SubcategoryType } from './productCategory.type.ts';

export type Filters = {
  categories: SubcategoryType[];
  attributes: FilterByAttributes;
};

export type FilterByAttributes = {
  heightTo?: number;
  heightFrom?: number;
  diameterTo?: number;
  diameterFrom?: number;
};
