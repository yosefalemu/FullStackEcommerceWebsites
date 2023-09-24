const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "user required"],
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, "please specify the quantity"],
    },

    color: {
      type: String,
      required: [true, "please specify the color of the product"],
    },
    size: {
      type: String,
      required: [true, "please specify the size of the product"],
    },
    price: {
      type: Number,
      required: [true, "specify the price for the product"],
    },
    title: {
      type: String,
      required: [true, "please provide the title for the product"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartSchema", CartSchema);
