import { Product } from "../models/Product.js";

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).populate(
      "reviews"
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    req.product = product;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getProduct;
