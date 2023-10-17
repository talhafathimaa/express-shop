const { promisify } = require('util');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const ApiError = require('./../utils/apiError');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });

    res
      .status(201)
      .json({ status: 'success', token: generateToken(user._id), data: user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return next(new ApiError('Invalid  data', 400, 'Faliure'));
    }
    const user = await User.findOne({ phoneNumber }).select('+password');
    if (!user || !user.checkPassword(password, user.password)) {
      return next(
        new ApiError('Incorrect phone number or password', 400, 'Faliure')
      );
    }

    res.status(200).json({ status: 'success', token: generateToken(user._id) });
  } catch (err) {
    next(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new ApiError('Unauthorized', 401, 'Failure'));
    }
    const decodedData = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    res.locals.userId = decodedData.id;
    next();
  } catch (err) {
    next(err);
  }
};
