const { StatusCodes } = require("http-status-codes");
const ProductSchema = require("../models/product");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

//create product
const createProduct = async (req, res) => {
  const product = await ProductSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//get all products
const getAllProducts = async (req, res) => {
  const products = await ProductSchema.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

//get single product
const getSingleProduct = async (req, res) => {
  const findId = req.params.id;
  const product = await ProductSchema.findById(findId);
  if (!product) {
    throw new NotFoundError(`There is no product with Id ${findId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

//updated product
const updateProduct = async (req, res) => {
  const updateId = req.params.id;
  const { title, description, categories, size, color, price, inStock } =
    req.body;
  const product = await ProductSchema.findById(updateId);
  if (!product) {
    throw new NotFoundError(
      `There is no product with id${updateId} to be updated`
    );
  } else {
    product.title = title || product.title;
    product.description = description || product.description;
    product.categories = categories || product.categories;
    product.size = size || product.size;
    product.color = color || product.color;
    product.price = price || product.price;
    product.inStock = inStock || product.inStock;
  }
  await product.save();
  res.status(StatusCodes.OK).json({ product });
};

//delete product
const deleteProduct = async (req, res) => {
  const deletedId = req.params.id;
  const deletedProduct = await ProductSchema.findByIdAndDelete(deletedId);
  if (!deletedProduct) {
    throw new NotFoundError(
      `There is no product with ID ${deletedId} to be deleted`
    );
  }
  res.status(StatusCodes.OK).json({ deletedProduct, msg: "DELETED..." });
};
//make product review
const makeProductReview = async (req, res) => {
  const id = req.params.id;
  const { username, rating, comment } = req.body;
  const product = await ProductSchema.findById(id);
  if (product) {
    const review = {
      username,
      rating,
      comment,
    };
    product.review.push(review);
    await product.save();
    res.status(StatusCodes.OK).json({ message: "product reviewed" });
  } else {
    res.status(StatusCodes.OK).json({
      message: "product is outof stock there is no need for the review",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  makeProductReview,
};
