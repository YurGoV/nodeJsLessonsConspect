const jwt = require('jsonwebtoken');

const { enums } = require('../constants');
const User = require('../models/userModels');
const { catchAsyncWrapper, CustomError } = require('../utils');

const { JWT_SECRET, JWT_EXPIRES } = process.env;

const signToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });

exports.signup = catchAsyncWrapper(async (req, res) => {
  const newUserData = {
    ...req.body,
    role: enums.USER_ROLES.USER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});

exports.login = catchAsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new CustomError(401, 'no authorized..'));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) return next(new CustomError(401, 'no authorized..'));

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});
