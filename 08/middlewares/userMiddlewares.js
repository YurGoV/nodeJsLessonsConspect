const {
  Types: { ObjectId },
} = require('mongoose');

const { CustomError, catchAsyncWrapper } = require('../utils');
const User = require('../models/userModels');
const { createUserValidator } = require('./joiValidator');

/**
 * * Check new user data.
 */
exports.checkUserData = catchAsyncWrapper(async (req, res, next) => {
  const { error, value } = createUserValidator(req.body);

  if (error) return next(new CustomError(400, error.details[0].message));

  const { email } = value;

  const userExists = await User.exists({ email }); // повертає айді, якщо такий юзер вже є

  if (userExists) return next(new CustomError(409, 'email is already used'));

  req.body = value;

  next();
});

/**
 * * Check user ID.
 */
exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      // перевірка, чи валідний ID

      return next(new CustomError(400, 'Invalid user id!')); // TODO: change where is possible
    }

    const userExists = await User.exists({ _id: id });
    if (!userExists) return next(new CustomError(404, 'user not found'));

    next();
  } catch (err) {
    next(err);
  }
};
