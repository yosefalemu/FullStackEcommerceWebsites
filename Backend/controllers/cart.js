const { StatusCodes } = require("http-status-codes");
const CartSchema = require("../models/cart");
const { BadRequestError, NotFoundError } = require("../errors");

//create cart
const createCart = async (req, res) => {
  const cart = await CartSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ cart });
};
//get all cart items
const getAllCartItems = async (Req, res) => {
  const cartItems = await CartSchema.find();
  res.status(StatusCodes.OK).json({ cartItems, count: cartItems.length });
};

//get users cart item
const getUserCartItems = async (req, res) => {
  const userId = req.params.id;
  const cartItem = await CartSchema.find({ userId });
  res.status(StatusCodes.OK).json({ cartItem, count: cartItem.length });
};

//delete cart
const deleteCart = async (req, res) => {
  const productId = req.params.id;
  const deletedCart = await CartSchema.findOneAndDelete(productId);
  if (!deletedCart) {
    throw new NotFoundError(
      `There is no cart with Id ${productId} to be deleted`
    );
  }
  res.status(StatusCodes.OK).json({ deletedCart });
};

//update cart
const updateCart = async (req, res) => {
  const updateCartId = req.params.id;
  const { userId, products } = req.body;
  if (!userId || !products) {
    throw new BadRequestError("All fields are required");
  }
  const cart = await CartSchema.findByIdAndUpdate(updateCartId, req.body, {
    runValidators: true,
    new: true,
  });
  if (!cart) {
    throw new NotFoundError(
      `There is no cart with id ${updateCartId} to be updated`
    );
  }
  res.status(StatusCodes.OK).json({ cart });
};

module.exports = {
  createCart,
  getAllCartItems,
  getUserCartItems,
  deleteCart,
  updateCart,
};
