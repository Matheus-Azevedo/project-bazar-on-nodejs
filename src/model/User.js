import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: { type: String, required: true, maxlength: 80 },
      email: { type: String, required: true, maxlength: 80, unique: true },
      password: { type: String, required: true, maxlength: 80 },
      phone: { type: String, required: true, maxlength: 40 },
      image: String,
      address: { type: String, required: true, maxlength: 100 },
    },
    { timestamps: true }
  )
);

export default User;
