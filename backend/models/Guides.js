import mongoose from "mongoose";

const { Schema, model } = mongoose;

const guideSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  province: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Guide = model("Guide", guideSchema);

export default Guide;
