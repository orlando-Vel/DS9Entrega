import express from "express";
import { Product, Review } from "../models/Product.js";
import { check, validationResult } from "express-validator";
import getProduct from "../middlewares/getProduct.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("reviews");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo producto
router.post(
  "/",
  [
    check("id").isNumeric().withMessage("El ID debe ser un número"),
    check("image").notEmpty().withMessage("La imagen es obligatoria"),
    check("title").notEmpty().withMessage("El título es obligatorio"),
    check("description")
      .notEmpty()
      .withMessage("La descripción es obligatoria"),
    check("price")
      .isFloat({ gt: 0 })
      .withMessage("El precio debe ser un número positivo"),
    check("duration").isNumeric().withMessage("La duración debe ser un número"),
    check("province").notEmpty().withMessage("La provincia es obligatoria"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, image, images, title, description, price, duration, province } =
      req.body;

    const product = new Product({
      id,
      image,
      images,
      title,
      description,
      price,
      duration,
      province,
      reviews: [],
    });

    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Obtener un producto por ID
router.get("/:id", getProduct, (req, res) => {
  res.json(req.product);
});

// Actualizar un producto
router.patch("/:id", getProduct, async (req, res) => {
  const { image, images, title, description, price, duration, province } =
    req.body;

  console.log("Updating product with ID:", req.params.id);
  console.log("New data:", req.body);

  if (image != null) req.product.image = image;
  if (images != null) req.product.images = images;
  if (title != null) req.product.title = title;
  if (description != null) req.product.description = description;
  if (price != null) req.product.price = price;
  if (duration != null) req.product.duration = duration;
  if (province != null) req.product.province = province;

  try {
    const updatedProduct = await req.product.save();
    console.log("Product updated successfully:", updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un producto
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await req.product.remove();
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener todas las reseñas de un producto
router.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
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

    const { rating, comment } = req.body;

    const newReview = new Review({
      productId: req.product.id,
      rating,
      comment,
    });

    try {
      await newReview.save();
      req.product.reviews.push(newReview._id);
      await req.product.save();
      res.status(201).json({ message: "Reseña agregada", review: newReview });
    } catch (err) {
      res.status(500).json({ message: err.message });
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
    if (!product || !product.reviews.includes(review._id)) {
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
