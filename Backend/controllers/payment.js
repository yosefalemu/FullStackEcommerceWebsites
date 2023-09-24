// Backend code
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

const makePayment = async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ msg: "error" });
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = { makePayment };
