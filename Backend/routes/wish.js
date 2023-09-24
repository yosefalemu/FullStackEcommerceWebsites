const express = require("express");
const router = express.Router();
const {
  createWish,
  deleteUserWish,
  getAllWish,
  getUserWish,
} = require("../controllers/wish");

router.route("/").get(getAllWish).post(createWish);
router.route("/:id").get(getUserWish).delete(deleteUserWish);

module.exports = router;
