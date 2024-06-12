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

type KeyValuePair<K extends string | number | symbol, T> = {
  key: K;
  value: T;
};

export type FilterKeyValueByAttributes = KeyValuePair<
  keyof FilterByAttributes,
  number | undefined
>;
