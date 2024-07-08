import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import axios from "axios";

const useProducts = (url = "/products") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(url, {
          cancelToken: source.token,
        });
        setProducts(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      source.cancel();
    };
  }, [url]);

  const getProductById = useCallback(async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    }
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await axiosInstance.post("/products", product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axiosInstance.patch(
        `/products/${id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (err) {
      setError(err);
    }
  };

  return {
    products,
    loading,
    error,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
