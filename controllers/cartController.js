const Cart = require('./../models/cartModel');
const Product = require('./../models/productModel');
const ApiError = require('./../utils/apiError');
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = res.locals.userId;
    let cart = await Cart.findOne({ userId });
    const product = await Product.findById({ _id: productId });

    if (!product) {
      return next(new ApiError('Product Id invalid', 400, 'Faliure'));
    }

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );

      if (itemIndex != -1) {
        cart.items[itemIndex].price = product.price;
        cart.items[itemIndex].name = product.name;
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          price: product.price,
          name: product.name,
        });
      }

      cart.total = cart.items
        .map((item) => item.price * item.quantity)
        .reduce((total, additive) => total + additive, 0);

      cart = await cart.save();

      return res
        .status(200)
        .json({ status: 'success', data: cart, message: 'Added to cart' });
    } else {
      const cart = await Cart.create({
        userId,
        items: [
          { productId, quantity, price: product.price, name: product.name },
        ],
        total: product.price * quantity,
      });
      return res
        .status(200)
        .json({ status: 'success', data: cart, message: 'Added to cart' });
    }
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = res.locals.userId;
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );
      if (itemIndex != -1) {
        if (cart.items[itemIndex].quantity > quantity) {
          cart.items[itemIndex].quantity -= quantity;
          cart.total = cart.items
            .map((item) => item.price * item.quantity)
            .reduce((total, additive) => total + additive, 0);

          cart = await cart.save();
          return res.status(200).json({
            status: 'success',
            data: cart,
            message: 'Removed from cart',
          });
        }
        else if (cart.items[itemIndex].quantity == quantity) {
          await Cart.findByIdAndDelete(cart.id);
          return res.status(200).json({
            status: 'success',
            data: null,
            message: 'Removed from cart',
          });
        }
        else{
          return next(new ApiError('quantity higher than in cart', 400, 'Faliure'));
        }
      }
    }
    return next(new ApiError('No item in cart', 400, 'Faliure'));
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(200)
        .json({ status: 'success', message: 'No items in cart' });
    else {
      return res.status(200).send({ status: 'success', data: cart });
    }
  } catch (err) {
    next(err);
  }
};


