const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/payment");

router.route("/").post(makePayment);

module.exports = router;
