const { StatusCodes } = require("http-status-codes");
const UserSchema = require("../models/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { firstname, middlename, lastname, email, username, password } =
    req.body;
  if (!firstname) {
    throw new BadRequestError("First name is required...");
  } else if (!middlename) {
    throw new BadRequestError("Middle name is required...");
  } else if (!lastname) {
    throw new BadRequestError("Last name is required...");
  } else if (!email) {
    throw new BadRequestError("Email is required...");
  } else if (!username) {
    throw new BadRequestError("Username is required...");
  } else if (!password) {
    throw new BadRequestError("Password is required...");
  }
  const user = await UserSchema.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid creditials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};
module.exports = { register, login };
