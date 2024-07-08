// src/components/CrudProduct.js
import React, { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const CrudProduct = () => {
  const {
    products,
    loading,
    error,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [formData, setFormData] = useState({
    id: "",
    image: "",
    title: "",
    description: "",
    price: 0,
    duration: 0,
    province: "",
  });

  const handleEdit = async (id) => {
    const productToUpdate = await getProductById(id);
    if (productToUpdate) {
      setFormData({
        id: productToUpdate.id,
        image: productToUpdate.image,
        title: productToUpdate.title,
        description: productToUpdate.description,
        price: productToUpdate.price,
        duration: productToUpdate.duration,
        province: productToUpdate.province,
      });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await updateProduct(formData.id, formData);
      } else {
        await addProduct(formData);
      }
      setFormData({
        id: "",
        image: "",
        title: "",
        description: "",
        price: 0,
        duration: 0,
        province: "",
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Formulario para agregar o editar productos */}
      <ProductForm initialFormData={formData} onSubmit={handleSubmit} />

      {/* Tabla de productos */}
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CrudProduct;
