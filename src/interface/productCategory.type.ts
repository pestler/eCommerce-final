export type ProductCategory = {
  id: string;
  name: string;
  subcategories: SubcategoryType[];
};

export type SubcategoryType = Omit<ProductCategory, 'subcategories'> & {
  checked: boolean;
};
