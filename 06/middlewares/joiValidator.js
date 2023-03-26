const Joi = require('joi');

exports.createUserValidator = (data) => Joi.object({
  name: Joi.string()
    .min(3)
    .max(10),
    // .required(),
  birthYear: Joi.number()
    .min(1940)
    .max(2023),
    // .required(),
  email: Joi.string(),
  password: Joi.string().min(5),
  role: Joi.string(),
}).validate(data);
