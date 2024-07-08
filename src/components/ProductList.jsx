import React, { useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts("/products");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cart, setCart] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const onAddToCart = (product) => {
    setCart([...cart, product]);
    console.log("Producto añadido al carrito:", product);
    console.log("Carrito:", cart);
  };

  const filteredProducts = selectedProvince
    ? products.filter((product) => product.province === selectedProvince)
    : products;

  const uniqueProvinces = [
    ...new Set(products.map((product) => product.province)),
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Nuestros Destinos
      </h1>
      <div className="mb-4">
        <label htmlFor="province" className="mr-2">
          Filtrar por provincia:
        </label>
        <select
          id="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todas</option>
          {uniqueProvinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
