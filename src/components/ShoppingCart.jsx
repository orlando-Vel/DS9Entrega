import React from "react";
import { useCart } from "../contexts/CartContext";
import PaypalButton from "../paypal/PaypalButton";

const ShoppingCart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    getSelectedGuideForProduct,
  } = useCart();

  const totalValue = calculateTotal().toFixed(2);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-500">
          Carrito de Compra
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id + item.selectedDate} // Incluye la fecha seleccionada en la clave
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p>${item.price}</p>
                  <p>Fecha seleccionada: {item.selectedDate}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-3 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p>Subtotal: ${item.price * item.quantity}</p>
                  <div className="mt-2">
                    <h3 className="font-bold">Guía seleccionado:</h3>
                    {getSelectedGuideForProduct(item.id) ? (
                      <p>
                        {`${getSelectedGuideForProduct(item.id).firstName} ${
                          getSelectedGuideForProduct(item.id).lastName
                        }`}
                      </p>
                    ) : (
                      <p>No se ha seleccionado ningún guía.</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div className="text-right">
              <p className="text-xl font-bold">Total: ${totalValue}</p>
            </div>
            <PaypalButton amount={totalValue} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
