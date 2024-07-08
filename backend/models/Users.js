import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  identification: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  roles: [{ type: String, enum: ["user", "admin"], default: ["user"] }],
});

const User = model("User", userSchema);

export default User;
