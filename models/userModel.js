const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone number is required'],
    unique: true,
    select: false,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.checkPassword = function (enteredPassword, userPassword) {
  return bcrypt.compare(enteredPassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
