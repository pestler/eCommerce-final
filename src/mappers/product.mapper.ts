import {Attribute, Image, ProductData} from '@commercetools/platform-sdk';
import { ProductDto } from './dto/product.dto';

class ProductMapper {
  public fromDto(data: ProductData): ProductDto {
    const product: ProductDto = {
      name: data.name['ru-BY'],
      lightning: (data.masterVariant.attributes as Attribute[])[0].value,
      humidity: (data.masterVariant.attributes as Attribute[])[1]
        .value as string,
      temperature: (data.masterVariant.attributes as Attribute[])[2]
        .value as string,
      height: (data.masterVariant.attributes as Attribute[])[3].value as number,
      diameter: (data.masterVariant.attributes as Attribute[])[4]
        .value as number,
      images: data.masterVariant.images as Image[],
    };
    return product;
  }
}

export const productMapper = new ProductMapper();
