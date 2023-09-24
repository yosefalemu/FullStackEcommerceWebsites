const express = require("express");
const router = express.Router();
const {
  createCart,
  getAllCartItems,
  getUserCartItems,
  deleteCart,
  updateCart,
} = require("../controllers/cart");

router.route("/").post(createCart).get(getAllCartItems);
router.route("/:id").get(getUserCartItems).delete(deleteCart).patch(updateCart);
module.exports = router;
