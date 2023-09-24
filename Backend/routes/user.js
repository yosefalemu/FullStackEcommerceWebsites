const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
