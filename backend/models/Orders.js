import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  intent: {
    type: String,
    required: true,
  },
  payerEmail: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  updateTime: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
