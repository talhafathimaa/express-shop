const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const errorHandler = require('./utils/errorHandler');
const ApiError = require('./utils/apiError');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.all('*', (req, res, next) => {
  next(new ApiError('No such endpoint', 404, 'Failure'));
});

app.use(errorHandler);

module.exports = app;
