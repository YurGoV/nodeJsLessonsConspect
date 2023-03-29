const User = require('../models/userModels');
const { catchAsyncWrapper, CustomError } = require('../utils');
const { signupUserValidator } = require('./joiValidator');

exports.checkSignupData = catchAsyncWrapper(async (req, res, next) => {
  const { error, value } = signupUserValidator (req.body);

  if (error) return next(new CustomError(400, error.details[0].message));
  // if (error) return next(new CustomError(400, {mess: 'mess'}));

  const { email } = value;

  const userExists = await User.exists({ email }); // повертає айді, якщо такий юзер вже є

  if (userExists) return next(new CustomError(409, 'email is already used'));

  req.body = value;

  next();
});
