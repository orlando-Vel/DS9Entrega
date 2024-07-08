import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import axios from "axios";

const useReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/products/${productId}/reviews`,
          {
            cancelToken: source.token,
          }
        );
        setReviews(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }

    return () => {
      source.cancel();
    };
  }, [productId]);

  const addReview = useCallback(
    async (rating, comment) => {
      setError(null);
      try {
        const response = await axiosInstance.post(
          `/reviews/${productId}/reviews`,
          {
            rating,
            comment,
          }
        );
        setReviews((prevReviews) => [...prevReviews, response.data.review]);
      } catch (err) {
        setError(err);
      }
    },
    [productId]
  );

  const deleteReview = useCallback(
    async (reviewId) => {
      setError(null);
      try {
        await axiosInstance.delete(
          `/products/${productId}/reviews/${reviewId}`
        );
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
      } catch (err) {
        setError(err);
      }
    },
    [productId]
  );

  return {
    reviews,
    loading,
    error,
    addReview,
    deleteReview,
  };
};

export default useReviews;
