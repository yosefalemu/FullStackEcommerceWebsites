const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  makeProductReview,
} = require("../controllers/product");

router.route("/").post(createProduct).get(getAllProducts);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);
router.route("/:id/review").post(makeProductReview);

module.exports = router;
