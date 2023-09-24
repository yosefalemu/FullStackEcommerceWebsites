const { StatusCodes } = require("http-status-codes");
const WishSchema = require("../models/wish");

const createWish = async (req, res) => {
  try {
    const wish = await WishSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ wish });
  } catch (error) {
    console.log(error);
  }
};
const getAllWish = async (req, res) => {
  const wishes = await WishSchema.find({});
  res.status(StatusCodes.OK).json({ wishes });
};
const getUserWish = async (req, res) => {
  const userId = req.params.id;
  const userWish = await WishSchema.find({ userId });
  res.status(StatusCodes.OK).json({ userWish, count: userWish.length });
};
const deleteUserWish = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const deleteWish = await WishSchema.findByIdAndDelete(deleteId);
    res.status(StatusCodes.OK).json({ deleteWish });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createWish, getAllWish, getUserWish, deleteUserWish };
