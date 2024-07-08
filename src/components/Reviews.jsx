import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import useReviews from "../hooks/useReviews";

const Reviews = ({ productId }) => {
  const {
    reviews,
    addReview,
    deleteReview,
    loading: reviewsLoading,
    error: reviewError,
  } = useReviews(productId);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleCommentChange = (event) => {
    setNewReview({ ...newReview, comment: event.target.value });
  };

  const handleAddReview = async () => {
    if (newReview.rating === 0 || newReview.comment === "") {
      return;
    }
    await addReview(newReview.rating, newReview.comment);
    setNewReview({ rating: 0, comment: "" });
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteReview(reviewId);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <span className="text-3xl font-bold">{averageRating}</span>
            <div className="ml-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-gray-600">{totalReviews} reseñas</span>
        </div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleAddReview}
        >
          Escribir reseña
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Escribir una reseña</h3>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`h-8 w-8 cursor-pointer ${
                i < newReview.rating ? "text-green-500" : "text-gray-400"
              }`}
              onClick={() => handleRatingChange(i + 1)}
            />
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={handleCommentChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Escribe tu reseña aquí..."
        ></textarea>
        {reviewError && (
          <p className="text-red-500 mt-2">{reviewError.message}</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reseñas</h3>
        {reviews.map((review) => (
          <div key={review._id} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteReview(review._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
