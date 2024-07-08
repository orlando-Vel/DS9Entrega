import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  productId: { type: Number, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  image: { type: String, required: true },
  images: { type: [String], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  province: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Review = model("Review", reviewSchema);
const Product = model("Product", productSchema);

export { Review, Product };
