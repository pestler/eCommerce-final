import React, { useEffect, useState } from 'react';
import imghumidity from '../../assets/images/humidity.png';
import imglightning from '../../assets/images/lightning.png';
import imgtemperature from '../../assets/images/temperature.png';
import { ProductDto } from '../../mappers/dto/product.dto';
import { productMapper } from '../../mappers/product.mapper';
import { productsService } from '../../services/product.service';
import styles from './product.module.scss';

const descriptionProduct = [
  {
    name: 'lightning',
    title: 'Освещение',
    src: imglightning,
  },
  {
    name: 'humidity',
    title: 'Влажность',
    src: imghumidity,
  },
  {
    name: 'temperature',
    title: 'Температура',
    src: imgtemperature,
  },
];

const Product: React.FC = () => {
  const getData = async (id: string) => {
    try {
      const { statusCode, body } = await productsService.getByID(id);
      if (statusCode === 200) {
        return productMapper.fromDto(body.masterData.staged);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [product, setProduct] = useState<ProductDto>();

  useEffect(() => {
    const fetchData = async () => {
      const product = await getData('0336d8f9-3243-49c7-a6fb-879f1f1e0609');
      setProduct(product);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main__wrapper}>
      <h2>{product?.name}</h2>
      <div className={styles.product__content}>
        <img src={product?.images[0].url} className={styles.main__imgcenter} />
        <div className={styles.product__description}>
          {descriptionProduct.map((val) => {
            return (
              <div className={styles.product__option}>
                <img src={val.src} />
                <div>
                  <h3>{val.title}</h3>
                  <p className={styles.option__description}>

                  </p>
                </div>
              </div>
            );
          })}
          <p className={styles.product__size}>
            Высота: <span>{product?.height} см</span>
          </p>
          <p className={styles.product__size}>
            Диаметр (горшка): <span>{product?.diameter} см</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
