const express = require('express');
const cartController = require('./../controllers/cartController');
const userController = require('./../controllers/userController');
const cartRouter = express.Router();

cartRouter
  .route('/')
  .post(userController.isLoggedIn, cartController.addToCart)
  .delete(userController.isLoggedIn, cartController.removeFromCart)
  .get(userController.isLoggedIn, cartController.getCart);

module.exports = cartRouter;
