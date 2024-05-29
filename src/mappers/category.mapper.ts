import {Category} from "@commercetools/platform-sdk";
import {ProductCategory} from "../interface/productCategory.type.ts";

class CategoryMapper {
    public fromDto(dto: Category[]): ProductCategory[] {
        return dto.map(category => ({
            id: category.id,
            name: category.name['ru-BY'],
            subcategories: dto
                .filter(subcategory => subcategory.parent && subcategory.parent.id === category.id)
                .map(subcategory => ({
                    id: subcategory.id,
                    name: subcategory.name['ru-BY'],
                    checked: false,
                })),
        })).filter(category => category.subcategories.length);
    }
}

export const categoryMapper = new CategoryMapper();
