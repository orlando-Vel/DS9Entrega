import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import useMessage from "../hooks/useMessage";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { message, showMessage } = useMessage();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    showMessage("Producto añadido al carrito");
  };

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg m-4 transform transition-transform duration-300 hover:scale-105 bg-gray-50">
      <img
        className="w-full h-64 object-cover"
        src={product.image}
        alt={product.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2">{product.title}</div>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-white rounded-full px-3 py-1 text-lg font-semibold text-black mr-2 mb-2">
          Precio: ${product.price}
        </span>
        <span className="inline-block bg-white rounded-full px-3 py-1 text-lg font-semibold text-black mr-2 mb-2">
          Duración: {product.duration} días
        </span>
      </div>
      <div className="px-6 py-4 flex justify-between">
        <button
          onClick={handleViewDetails}
          className="bg-green-400 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
        >
          Ver Más
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-blue-400 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
        >
          Añadir al Carrito
        </button>
      </div>
      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
