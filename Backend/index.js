require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./Db/connect");
const notFoundMiddleWare = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authenticateUser = require("./middlewares/authenticate");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const paymentRoute = require("./routes/payment");
const wishRoute = require("./routes/wish");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("test");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/wish", wishRoute);

// //middlewares
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`server is listening on port ${port}`));
};

start();
