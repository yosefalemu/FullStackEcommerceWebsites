const { StatusCodes } = require("http-status-codes");
const OrderSchema = require("../models/order");
const { BadRequestError, NotFoundError } = require("../errors");
const order = require("../models/order");

//create order
const createOrder = async (req, res) => {
  try {
    const order = await OrderSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ order });
  } catch (error) {
    console.log(error);
  }
};

//update order
const updateOrder = async (req, res) => {
  const updateId = req.params.id;
  // const { userId, products, amount, address, status } = req.body;
  // if (!userId || !products || !amount || !address || !status) {
  //   throw new BadRequestError(" All fields are required");
  // }
  const order = await OrderSchema.findByIdAndUpdate(updateId, req.body, {
    runValidators: true,
    new: true,
  });
  if (!order) {
    throw new NotFoundError(
      `There is no order with id${updateId} to be updated`
    );
  }
  res.status(StatusCodes.OK).json({ order });
};
//delete order
const deleteOrder = async (req, res) => {
  const deleteId = req.params.id;
  const deleteOrder = await OrderSchema.findByIdAndDelete(deleteId);
  if (!deleteOrder) {
    throw new NotFoundError(
      `There is no order with Id ${deleteId} to be deleted`
    );
  }
  res.status(StatusCodes.OK).json({ deleteOrder });
};

//get single user orders
const getSingleUserOrder = async (req, res) => {
  const id = req.params.id;
  const { userId, orderId } = req.body;
  if (userId) {
    const order = await OrderSchema.find({ userId });
    res.status(StatusCodes.OK).json({ order });
  } else if (orderId) {
    const singleOrder = await OrderSchema.findById(id);
    res.status(StatusCodes.OK).json({ singleOrder });
  }
};

//get all orders
const getAllOrders = async (req, res) => {
  const orders = await OrderSchema.find();
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleUserOrder,
  getAllOrders,
};
