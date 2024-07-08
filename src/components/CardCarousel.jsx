import React, { useRef } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CardCarousel = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(); // Utiliza el hook personalizado

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
    ],
  };

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Destinos Destacados
      </h1>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <ProductCard product={product} onOpenModal={handleNavigate} />
          </div>
        ))}
      </Slider>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 hover:bg-green-500 rounded-full p-2 cursor-pointer"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-6 w-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 hover:bg-green-500 rounded-full p-2 cursor-pointer"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FontAwesomeIcon icon={faArrowRight} className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CardCarousel;
