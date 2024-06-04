import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imghumidity from '../../assets/images/humidity.png';
import imglightning from '../../assets/images/lightning.png';
import imgtemperature from '../../assets/images/temperature.png';
import Button from '../../components/button/Button';
import SliderSimple from '../../components/slider/Slider';
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

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const getData = async (id: string) => {
    try {
      const { statusCode, body } = await productsService.getByID(id);
      if (statusCode === 200) {
        console.log(body);
        return productMapper.fromDto(body.masterData.staged);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [product, setProduct] = useState<ProductDto>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const product = await getData(id!);
      setProduct(product);
    };
    fetchData();
  }, [id]);

  const handleOpenModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    console.log(target.id);
    setCurrentSlide(0);
    setIsOpenModal(true);
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    console.log(target.id);
    e.stopPropagation;
    if (target.id === 'modalOverlay') {
      setIsOpenModal(false);
    }
  };

  return product ? (

    <div className={styles.main__wrapper}>

      {isOpenModal ? (
        <div className="modal__overlay" id="modalOverlay" onClick={handleCloseModal} >
          <div className="modal__container">
            <div className="modal__carusel">
              <SliderSimple images={product.images} currentSlide={currentSlide} handleOpenModal={(e: React.MouseEvent<HTMLElement>) => handleOpenModal(e)}/>
            </div>
          </div>
        </div>
      ) : ''}
      <h2>{product.name}</h2>
      <div className={styles.product__content}>
        {product.images.length > 0 ? (
          <div className={styles.product__carusel}>
            <SliderSimple images={product.images} currentSlide={0} handleOpenModal={handleOpenModal}/>
          </div>
        ) : (
          ''
        )}
        <div className={styles.product__description}>
          {descriptionProduct.map((val) => {
            return product[val.name] ? (
              <div className={styles.product__option} key={val.name}>
                <div className={styles.option__img}>
                  <img src={val.src} />
                </div>
                <div>
                  <h3>{val.title}</h3>
                  <p className={styles.option__description}>
                    {`${product[val.name]}`}
                  </p>
                </div>
              </div>
            ) : (
              ''
            );
          })}
          <div className={styles.description__bottom}>
            <div className={styles.bottom__left}>
              {product.height ? (
                <p className={styles.product__size}>
                  Высота:{' '}
                  <span className={styles.size__value}>
                    {product.height} см
                  </span>
                </p>
              ) : (
                ''
              )}
              {product.diameter ? (
                <p className={styles.product__size}>
                  Диаметр (горшка):{' '}
                  <span className={styles.size__value}>
                    {product.diameter} см
                  </span>
                </p>
              ) : (
                ''
              )}
            </div>
            {product.price.centAmount ? (
              <div
                className={styles.price}
              >{`${product.price.centAmount} ${product.price.currency}`}</div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.buttons}>
            <Button className={styles.btn}>В избранное</Button>
            <Button className={styles.btn}>В корзину</Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main__wrapper}>Описание продукта отсутсвует</div>
  );
};

export default ProductPage;
