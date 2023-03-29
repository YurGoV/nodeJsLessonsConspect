const joiValidators = require('./joiValidator');
const userMiddlewares = require('./userMiddlewares');
const createUserValidator = require('./joiValidator');

const { checkSignupData, protect } = require('./authMiddleware');

const authMiddlewares = require('./authMiddleware');

module.exports = {
  joiValidators,
  userMiddlewares,
  createUserValidator,
  authMiddlewares,
  checkSignupData,
  protect,
};
