import React, { useRef } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className="w-full h-64 object-cover mb-4"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
