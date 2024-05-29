// import { useEffect, useState } from 'react';
import { productMapper } from '../../mappers/product.mapper';
import { productsService } from '../../services/product.service';
import styles from './product.module.scss';

const descriptionProduct = [
  {
    name: 'lightning',
    title: 'Освещение',
  },
  {
    name: 'humidity',
    title: 'Влажность',
  },
  {
    name: 'temperature',
    title: 'Температура',
  },
];

const Product: React.FC = () => {
  //   const [product, setProduct] = useState();

  //   const fetchData = async () => {
  //     const product = await getData();
  //     if (product) setProduct(product);
  //   };

  //   fetchData();
  //   useEffect( () => {
  //    const fetchData = async () => {
  //     const product = await getData();
  //     setProduct(product);
  //   };
  //   fetchData();
  // }, []);

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

  const product = getData('0336d8f9-3243-49c7-a6fb-879f1f1e0609');
  console.log(product);

  return (
    <div className={styles.main__wrapper}>
      <h2>{}</h2>
      <div className={styles.product__content}>
        {/* <img src={} className={styles.main__imgcenter} /> */}
        <div className={styles.product__description}>
          {descriptionProduct.map((val) => {
            return (
              <div className={styles.product__option}>
                <img src={`${val.name}.png`} />
                <div>
                  <h3>{val.title}</h3>
                  <p className={styles.option__description}>{}</p>
                </div>
              </div>
            );
          })}
          <p className={styles.product__size}>
            Высота: <span>{} см</span>
          </p>
          <p className={styles.product__size}>
            Диаметр (горшка): <span>{} см</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
