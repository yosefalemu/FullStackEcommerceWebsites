const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "please provide the user"],
    },

    products: {
      type: Array,
      required: [true, "please provide the array of the product"],
    },
    total: {
      type: Number,
      required: [true, "please provide the quantity"],
    },

    amount: {
      type: Number,
      required: [true, "please provide the amount"],
    },
    address: {
      type: String,
      required: [true, "please provide the address"],
    },
    city: {
      type: String,
      required: [true, "please provide the city"],
    },
    postalCode: {
      type: String,
      required: [true, "please provide the postalCode"],
    },
    country: {
      type: String,
      required: [true, "please provide the country"],
    },
    distance: {
      type: Number,
      required: [true, "please provide the distance from my office"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderSchema", OrderSchema);
