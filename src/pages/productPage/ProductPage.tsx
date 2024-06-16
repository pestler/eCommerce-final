import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imghumidity from '../../assets/images/humidity.png';
import imglightning from '../../assets/images/lightning.png';
import imgtemperature from '../../assets/images/temperature.png';
import CustomButton from '../../components/button/CustomButton.tsx';
import Counter from '../../components/counter/Counter.tsx';
import SliderSimple from '../../components/slider/Slider';
import { useCart } from '../../hooks/useCart.ts';
import { ProductDto } from '../../mappers/dto/product.dto';
import { productMapper } from '../../mappers/product.mapper';
import { productsService } from '../../services';
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
  const { cart, getProductById, removeFromCart, addToCart, changeCount } =
    useCart();
  const [product, setProduct] = useState<ProductDto>();
  const [counter, setCounter] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async (id: string) => {
    try {
      const { statusCode, body } = await productsService.getByID(id);
      if (statusCode === 200) {
        return productMapper.fromDto(body.masterData.staged, body.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const product = await getData(id!);
      const productCart = getProductById(id!);
      if (productCart && product) {
        const newProduct: ProductDto = {
          ...product,
          cart: true,
          cartCount: productCart.quantity,
          lineCartId: productCart.id,
        };
        setProduct(newProduct);
        setCounter(newProduct.cartCount ?? 1);
      } else {
        setProduct(product);
        setCounter(1);
      }
    };
    fetchData();
  }, [id, cart]);

  const handleOpenModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const indexCurrent = target
      .closest('.slick-slide')
      ?.getAttribute('data-index');
    indexCurrent ? setCurrentSlide(+indexCurrent) : setCurrentSlide(0);
    setIsOpenModal(true);
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    e.stopPropagation;
    if (target.id === 'modalOverlay') {
      setIsOpenModal(false);
    }
  };

  const changeCounter = (count: number) => {
    setCounter(count);
    if (product && product.lineCartId) {
      changeCount(product.lineCartId, count);
    }
  };

  const addToCartHandler = () => {
    if (!product) return;
    addToCart(product.id, product.variantId, counter);
  };

  return product ? (
    <div className={styles.main__wrapper}>
      {isOpenModal ? (
        <div
          className="modal__overlay"
          id="modalOverlay"
          onClick={handleCloseModal}
        >
          <div className="modal__container">
            <div className="modal__carusel">
              <SliderSimple
                images={product.images}
                currentSlide={currentSlide}
                handleOpenModal={(e: React.MouseEvent<HTMLElement>) =>
                  handleOpenModal(e)
                }
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <h2>{product.name}</h2>
      <div className={styles.product__content}>
        {product.images.length > 0 ? (
          <div className={styles.product__carusel}>
            <SliderSimple
              images={product.images}
              currentSlide={0}
              handleOpenModal={handleOpenModal}
            />
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
              <Counter count={counter} changeCounter={changeCounter}></Counter>
            </div>
            {product.price.discounted ? (
              <div className={styles.price}>
                {`${product.price.discounted} ${product.price.currency}`}{' '}
                <span>{`${product.price.centAmount} ${product.price.currency}`}</span>
              </div>
            ) : (
              <div className={styles.price}>
                {product.price.centAmount} {product.price.currency}
              </div>
            )}
          </div>
          <div className={styles.buttons}>
            {product.cart ? (
              <CustomButton
                className={'outline'}
                alternativeText={'Удалить'}
                onClick={() => removeFromCart(product!.lineCartId!)}
              >
                В корзине
              </CustomButton>
            ) : (
              <CustomButton
                className={styles.btn}
                onClick={() => addToCartHandler()}
              >
                В корзину
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main__wrapper}>Описание продукта отсутсвует</div>
  );
};

export default ProductPage;
