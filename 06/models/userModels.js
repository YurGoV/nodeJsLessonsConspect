// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

// const userSchema = new mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    birthYear: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false, // TODO: * don't show password on selects queries
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
