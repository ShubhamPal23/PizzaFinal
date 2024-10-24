import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import React from "react";

const ImageSlider = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>
      <div id="carousel">
        <div className="tag">
          <h1>Welcome to the world of Deliciousness</h1>
        </div>
        <div className="imgslider">
          <Slider {...settings}>
            {images.map((item) => (
              <div className="imga" key={item.id}>
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default ImageSlider;
