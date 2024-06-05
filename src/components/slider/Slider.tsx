import { Image } from '@commercetools/platform-sdk';
import Slider from 'react-slick';
import styles from './slider.module.scss';

type PropsSlider = React.HTMLProps<HTMLElement> & {
  images: Image[];
  currentSlide: number;
  handleOpenModal(e: React.MouseEvent<HTMLElement>): void;
};

const SliderSimple = ({ images, currentSlide, handleOpenModal }: PropsSlider) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
  };
  return (
    <Slider {...settings}>
      {images.map((val, index) => {
        return (
          <div className={styles.slider__item} key={`slider-img-${index}`}>
            <img src={val.url} className={styles.slider__image} onClick={handleOpenModal}/>
          </div>
        );
      })}
    </Slider>
  );
};

export default SliderSimple;
