const { catchAsyncWrapper } = require('../utils');
const User = require('../models/userModels');
const ImageService = require('../services/ImageService');

// TODO: with catchAsync more shortened:
exports.getUsers = catchAsyncWrapper(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }); // TODO: сортування
  res.status(200).json({
    users,
  });
});

/**
 * ? Get_by_Id user
 */
exports.getUsersById = catchAsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id); // .lean - повертає лише об'єкт, без додаткових методів, що є у відповіді монги/гуса

  res.status(200).json({
    user,
  });
});

/**
 * * Create user only for Admin
 */
exports.createUser = catchAsyncWrapper(async (req, res) => {
  const { name, birthYear, email, password, role } = req.body;
  const newUser = await User.create({
    name,
    birthYear,
    email,
    password,
    role,
  });

  res.status(201).json({
    user: newUser,
  });
});

/**
 * * update user bi id
 */
exports.updateUserById = catchAsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, birthYear, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      birthYear,
      email,
    },
    { new: true } // TODO: якщо хочемо повертати в апдейтЮзер оновлений контакт
  );

  res.status(200).json({
    user: updatedUser,
  });
});

/**
 * * Delete user by id
 */
exports.deleteUserById = catchAsyncWrapper(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id); // TODO: delete - by default. remove - if necessary;

  res.sendStatus(204); // ** if no need to response smth // status 204 - no content
});

exports.getMe = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

exports.updateAvatar = catchAsyncWrapper(async (req, res) => {
  const { user, file } = req; // *multer закидає файл у реквест, тому беремо його з реквесту
  if (file) {
    user.avatar = await ImageService.save(
      file,
      null,
      'images',
      'users',
      user.id
    );
  }

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key];
  });

  const updatedUser = await user.save();

  res.status(200).json({
    user: updatedUser,
  });
});

exports.updateMyPassword = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
