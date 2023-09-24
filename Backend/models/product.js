const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title for the product"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "please provide the description"],
    },
    // image: {
    //   type: String,
    //   required: [true, "please provide the image"],
    // },
    categories: {
      type: Array,
      required: [true, "please provide the categories"],
    },
    size: { type: Array },
    color: { type: Array },
    review: { type: Array, default: [] },
    price: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSchema", ProductSchema);
