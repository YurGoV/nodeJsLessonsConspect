const Joi = require('joi');

const { enums } = require('../constants');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,32})/;

/**
 * Validate create user data.
 */
exports.createUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })// TODO: одночасно повертає всі еррори
    .keys({
      name: Joi.string().max(30).alphanum().required(),
      email: Joi.string().email().required(),
      birthYear: Joi.number().min(1940).required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES)),
    })
    .validate(data);

/**
 * Validate update user data.
 */
exports.updateUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30).alphanum(),
      email: Joi.string().email(),
      birthYear: Joi.number().min(1940),
      role: Joi.string().valid(...Object.values(enums.USER_ROLES_ENUM)),
    })
    .validate(data);

/**
 * Validate signup user data.
 * *тут не кидаємо ролі/щоб юзер не зміг змінити ролі
 */
exports.signupUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().max(30).alphanum().required(),
      email: Joi.string().email().required(),
      birthYear: Joi.number().min(1940).required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);

/**
 * Login validator
 */
exports.loginValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    })
    .validate(data);
