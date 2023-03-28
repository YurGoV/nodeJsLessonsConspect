// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const { enums } = require('../constants');

// const userSchema = new mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    birthYear: {
      type: Number,
    },
    email: {
      type: String,
      lowerCase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      select: false, // TODO: * don't show password on selects queries
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(enums.USER_ROLES),
      default: enums.USER_ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
