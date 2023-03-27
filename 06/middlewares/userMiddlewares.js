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
  // console.log('~req.body userMiddleware [2]:', req.body);
  const { error, value } = createUserValidator(req.body);
  // console.log(error);
  // console.log(value);
  if (error) return next(new CustomError(400, error.details[0].message));

  const { email } = value;
  // const userExists = await User.findOne({ email });
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
    /* console.log(
      '~objectId.isValid(id) userMiddlewares.js [34]:',
      ObjectId.isValid(id)// TODO: перевірка, чи валідний ID
    ); */

    if (!ObjectId.isValid(id)) {
      // const error = new Error('Invalid user id!');
      // error.status = 400;

      return next(new CustomError(400, 'Invalid user id!')); // TODO: change where is possible
    }

    const userExists = await User.exists({ _id: id });
    if (!userExists) return next(new CustomError(404, 'user not found'));

    next();
  } catch (err) {
    next(err);
  }
};
