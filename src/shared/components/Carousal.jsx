import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  console.log(images);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Slider {...settings}>
        {images.map((value, index) => {
          return (
            <div key={index}>
              <img src={value} alt={`slide ${index}`} className="rounded-xl" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
