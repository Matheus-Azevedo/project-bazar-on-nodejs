import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = mongoose.model(
  "Product",
  new Schema(
    {
      name: { type: String, required: true, maxlength: 80 },
      description: { type: String, required: true, maxlength: 200 },
      images: { type: Array, required: true },
      available: { type: Boolean, required: true },
      state: { type: String, enum: ["good", "fair", "bad"] },
      owner: { type: Schema.Types.ObjectId, ref: "User" },
      receiver: { type: Schema.Types.ObjectId, ref: "User" },
      purchased_at: Date,
      donated_at: Date,
    },
    { timestamps: true }
  )
);

export default Product;
