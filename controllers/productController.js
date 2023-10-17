const Product = require('./../models/productModel');
const ApiError = require('./../utils/apiError');
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', data: products });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ApiError('Product Id invalid', 400, 'Faliure'));
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    });
    res.status(201).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ApiError('Product Id invalid', 400, 'Faliure'));
    }
    res.status(200).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return next(new ApiError('Product Id invalid', 400, 'Faliure'));
    }
    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};
