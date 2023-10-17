const express = require('express');
const productController = require('./../controllers/productController');
const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.post('/add', productController.addProduct);
productRouter
  .route('/:id')
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProduct);

module.exports = productRouter;
