const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleUserOrder,
  getAllOrders,
  getSingleOrder,
} = require("../controllers/order");

router.route("/").post(createOrder).get(getAllOrders);
router
  .route("/:id")
  .patch(updateOrder)
  .delete(deleteOrder)
  .post(getSingleUserOrder);

module.exports = router;
