import { Image } from '@commercetools/platform-sdk';
import Slider from 'react-slick';
import styles from './slider.module.scss';

type PropsSlider = React.HTMLProps<HTMLElement> & {
  images: Image[];
};

const SliderSimple = ({ images }: PropsSlider) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((val, index) => {
        return (
          <div className={styles.slider__item} key={`slider-img-${index}`}>
            <img src={val.url} className={styles.slider__image} />
          </div>
        );
      })}
    </Slider>
  );
};

export default SliderSimple;
