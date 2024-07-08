import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";
import ImageSlider from "./ImageSlider";
import { useCart } from "../contexts/CartContext";
import useMessage from "../hooks/useMessage";
import useProducts from "../hooks/useProducts";
import GuidesList from "./GuidesList";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);

  const {
    getProductById,
    loading: productLoading,
    error: productError,
  } = useProducts();
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useCart();
  const { message, showMessage } = useMessage();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const fetchedProduct = await getProductById(productId, {
          signal: controller.signal,
        });
        setProduct(fetchedProduct);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [productId, getProductById]);

  if (productLoading) return <p>Loading...</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  const handleAddToCart = () => {
    // Validar que se haya seleccionado una fecha
    if (!selectedDate) {
      showMessage("Selecciona una fecha antes de agregar al carrito.");
      return;
    }

    // Validar que la fecha seleccionada no sea el día actual ni días anteriores
    const today = new Date();
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0); // Ajustar a la medianoche para comparación

    if (selected <= today) {
      showMessage("Selecciona una fecha futura para el viaje.");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, selectedDate }); // Pasa la fecha junto con el producto
    }
    showMessage("Producto agregado");
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (!product) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
          <ImageSlider images={product.images} />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {product.title}
          </h2>
          <p className="text-black text-lg mb-4">{product.description}</p>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
            <span className="text-black font-semibold text-xl">
              Precio: ${product.price}
            </span>
            <span className="text-black font-semibold text-xl">
              Duración: {product.duration} días
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-3 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-3 rounded"
            >
              +
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <label className="text-lg text-gray-800">
              Selecciona una fecha:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-gray-100 rounded p-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => navigate("/shoppingcart")}
            >
              Comprar
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => navigate("/packages")}
            >
              Atrás
            </button>
          </div>
          {message && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
              {message}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <GuidesList productId={productId} />
      </div>
      <Reviews productId={productId} />
    </div>
  );
};

export default ProductDetails;
