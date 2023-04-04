const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const { catchAsyncWrapper, CustomError } = require('../utils');
const { signupUserValidator } = require('./joiValidator');

const { JWT_SECRET } = process.env;

const checkSignupData = catchAsyncWrapper(async (req, res, next) => {
  const { error, value } = signupUserValidator(req.body);

  if (error) return next(new CustomError(400, error.details[0].message));

  const { email } = value;

  const userExists = await User.exists({ email }); // повертає айді, якщо такий юзер вже є

  if (userExists) return next(new CustomError(409, 'email is already used'));

  req.body = value;

  next();
});

const protect = catchAsyncWrapper(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) return next(new CustomError(401, 'You are not logged in..'));

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const currentUser = await User.findById(decodedToken.id);

  req.user = currentUser;

  next();
});

// TODO: rename
/**
 * * used after protect is passed
 * @param  {...any} roles
 * @returns
 */
const allowFor = (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    return next(new CustomError(403, 'You are have no permissions')); // todo: try this in noAsync in rest-api-test
  };

module.exports = {
  checkSignupData,
  protect,
  allowFor,
};
