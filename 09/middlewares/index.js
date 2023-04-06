const joiValidators = require('./joiValidator');
const userMiddlewares = require('./userMiddlewares');
// console.log('CL: ~ file: index.js:3 ~ userMiddlewares:', userMiddlewares);
const createUserValidator = require('./joiValidator');

const { checkSignupData, protect, allowFor } = require('./authMiddleware');

const authMiddlewares = require('./authMiddleware');

module.exports = {
  joiValidators,
  userMiddlewares,
  createUserValidator,
  authMiddlewares,
  checkSignupData,
  protect,
  allowFor,
};
