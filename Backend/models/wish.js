const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "please provide the user"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: [true, "please provide the product"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("WishSchema", WishSchema);
