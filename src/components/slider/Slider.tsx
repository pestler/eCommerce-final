import { Image } from '@commercetools/platform-sdk';
import Slider from 'react-slick';

type PropsSlider = React.HTMLProps<HTMLElement> & {
  images: Image[];
};

const SliderSimple = ({ images }: PropsSlider) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((val) => {
        return (
          <div>
            <img src={val.url} />
          </div>
        );
      })}
    </Slider>
  );
};

export default SliderSimple;
