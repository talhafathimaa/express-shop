const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  image: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
