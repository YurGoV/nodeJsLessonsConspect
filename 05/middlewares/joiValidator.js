const Joi = require('joi');

exports.createUserValidator = (data) => Joi.object({
  name: Joi.string()
    .min(3)
    .max(10)
    .required(),
  year: Joi.number()
    .min(1940)
    .max(2023)
    .required(),
}).validate(data);
