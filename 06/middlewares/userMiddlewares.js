const fs = require('fs').promises;
const { CustomError } = require('../utils');
const { createUserValidator } = require('./joiValidator');

/**
 * * Check new user data.
 */
exports.checkUserData = (req, res, next) => {
  // console.log('~req.body userMiddleware [2]:', req.body);
  const {
    error,
    value
  } = createUserValidator(req.body);
  // console.log(error);
  // console.log(value);
  if (error) return next(new CustomError(400, error.details[0].message));

  req.body = value;

  next();
};

/**
 * * Check user ID.
 */
exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length < 5) {
      // const error = new Error('Invalid user id!');
      // error.status = 400;

      return next(new CustomError(400, 'Invalid user id!'));// TODO: change where is possible
    }

    const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 1
    const users = await JSON.parse(usersString);
    const foundedUser = await users.find((item) => item.id === id);
    if (!foundedUser) {
      const error = new Error('user not found!');
      error.status = 404;

      return next(error);
    }

    next();
  } catch (err) {
    next(err);
  }
};
