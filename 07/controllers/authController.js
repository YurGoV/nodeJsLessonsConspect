const { enums } = require('../constants');
const User = require('../models/userModels');
const { catchAsyncWrapper } = require('../utils');

exports.signup = catchAsyncWrapper(async (req, res) => {
  const newUserData = {
    ...req.body,
    role: enums.USER_ROLES.USER,
  };

  const newUser = await User.create(newUserData);

  res.status(201).json({
    user: newUser,
  });
});

exports.login = catchAsyncWrapper(async (req, res, next) => {});
