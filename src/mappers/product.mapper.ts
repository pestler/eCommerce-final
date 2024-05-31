import { ProductData } from '@commercetools/platform-sdk';
import { ProductDto } from './dto/product.dto';

class ProductMapper {
  public fromDto(data: ProductData): ProductDto {
    const product: ProductDto = {
      name: data.name['ru-BY'],
      lightning: data.masterVariant.attributes ? data.masterVariant.attributes[0].value : '',
      humidity: data.masterVariant.attributes ? data.masterVariant.attributes[1].value : '',
      temperature: data.masterVariant.attributes ? data.masterVariant.attributes[2].value : '',
      height: data.masterVariant.attributes ? data.masterVariant.attributes[3].value : '',
      diameter: data.masterVariant.attributes ? data.masterVariant.attributes[4].value : '',
      images: data.masterVariant.images?.length ? data.masterVariant.images : [],
    };
    return product;
  }
}

export const productMapper = new ProductMapper();
