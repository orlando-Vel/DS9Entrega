import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [selectedGuides, setSelectedGuides] = useState(() => {
    const savedGuides = localStorage.getItem("selectedGuides");
    return savedGuides ? JSON.parse(savedGuides) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedGuides", JSON.stringify(selectedGuides));
  }, [selectedGuides]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) =>
          item.id === product.id && item.selectedDate === product.selectedDate
      );
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id && item.selectedDate === product.selectedDate
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) =>
          !(
            item.id === product.id && item.selectedDate === product.selectedDate
          )
      )
    );
    setSelectedGuides((prevGuides) =>
      prevGuides.filter((guide) => guide.productId !== product.id)
    );
  };

  const increaseQuantity = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id && item.selectedDate === product.selectedDate
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id &&
        item.selectedDate === product.selectedDate &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const selectGuide = (productId, guide) => {
    setSelectedGuides((prevGuides) => [
      ...prevGuides.filter((g) => g.productId !== productId),
      { productId, guide },
    ]);
  };

  const getSelectedGuideForProduct = (productId) => {
    return selectedGuides.find((g) => g.productId === productId)?.guide;
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedGuides([]);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("selectedGuides");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        selectedGuides,
        selectGuide,
        getSelectedGuideForProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
