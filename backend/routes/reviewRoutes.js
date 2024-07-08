import express from "express";
import { Product, Review } from "../models/Product.js";
import { check, validationResult } from "express-validator";
import getProduct from "../middlewares/getProduct.js";

const router = express.Router();

// Obtener todas las reseñas de productos
router.get("/:id/reviews", async (req, res) => {
  const productId = req.params.id;

  try {
    const reviews = await Review.find({ productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar una reseña a un producto
router.post(
  "/:id/reviews",
  getProduct,
  [
    check("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("La calificación debe estar entre 1 y 5"),
    check("comment").notEmpty().withMessage("El comentario es obligatorio"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newReview = new Review({
        productId: req.product.id,
        rating: req.body.rating,
        comment: req.body.comment,
      });

      await newReview.save();

      // Inicializar product.reviews como un array vacío si no está definido
      if (!req.product.reviews) {
        req.product.reviews = [];
      }

      req.product.reviews.push(newReview._id);
      await req.product.save();

      res.status(201).json({ message: "Reseña agregada", review: newReview });
    } catch (err) {
      res.status(500).json({ message: "Error al agregar reseña" });
    }
  }
);

// Eliminar una reseña de un producto
router.delete("/:id/reviews/:reviewId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    const product = await Product.findOne({ id: req.params.id });
    if (
      !product ||
      !Array.isArray(product.reviews) ||
      !product.reviews.includes(review._id)
    ) {
      return res
        .status(404)
        .json({ message: "Reseña no encontrada para este producto" });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    product.reviews.pull(review._id);
    await product.save();

    res.status(200).json({ message: "Reseña eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
