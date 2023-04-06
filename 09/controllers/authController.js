const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

exports.getOTP = catchAsyncWrapper(async (req, res, next) => {
  const { email } = req.body; // *validator needed

  const user = await User.findOne({ email });

  if (!user) return next(new CustomError(404, 'user not fount'));

  const otp = user.createOtp();

  await user.save({
    validateBeforeSave: false, // пропускає усі попередні валідатори, що є у ці моделі
  });

  const resetUrl = `${req.protocol}://${req.get(
    // * just demo hov link acn create dynamically
    'host'
  )}/api/v1/auth/restore-password/${otp}`;

  res.status(200).json({
    resetUrl, // * just demo hov link acn create dynamically
  });
});

exports.resetPassword = catchAsyncWrapper(async (req, res, next) => {
  const otpParamsHashed = crypto
    .createHash('sha256')
    .update(req.params.otp)
    .digest('hex');

  const user = await User.findOne({
    otpHashed: otpParamsHashed,
    otpExpires: { $gt: Date.now() },
  });

  if (!user) return next(new CustomError(400, 'invalid token'));

  user.password = req.body.password;
  user.otpHashed = undefined;
  user.otpExpires = undefined;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    user,
  });
});
