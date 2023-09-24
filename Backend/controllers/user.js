const UserSchema = require("../models/user");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const user = require("../models/user");

//update user profile
const updateUser = async (req, res) => {
  const updateId = req.params.id;
  const { firstname, middlename, lastname, username } = req.body;
  const user = await UserSchema.findById(updateId);
  if (!user) {
    throw new NotFoundError(`There is user with id${updateId}`);
  } else {
    user.firstname = firstname || user.firstname;
    user.middlename = middlename || user.middlename;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
  }
  res.status(StatusCodes.OK).json({ user });
};

//get single user
const getSingleUser = async (req, res) => {
  const findId = req.params.id;
  const user = await UserSchema.find(findId);
  if (!user) {
    throw new NotFoundError(`There is no user with Id ${findId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//delete user
const deleteUser = async (req, res) => {
  const deletedId = req.params.id;
  const deletedUser = await UserSchema.findByIdAndDelete(deletedId);
  if (!user) {
    throw new NotFoundError(
      `There is no user with Id ${deletedId} to be deleted`
    );
  }
  res.status(StatusCodes.OK).json({ deletedUser });
};

//get all users
const getAllUsers = async (req, res) => {
  const user = await UserSchema.find({}).sort({ createdAt: -1 });
  if (!user) {
    res.status(StatusCodes.OK).json({});
  }
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

module.exports = { updateUser, deleteUser, getAllUsers, getSingleUser };
