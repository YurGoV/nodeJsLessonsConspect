const {
  Types: { ObjectId },
} = require('mongoose');
const path = require('node:path');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const { CustomError, catchAsyncWrapper } = require('../utils');
const User = require('../models/userModels');
const { createUserValidator } = require('./joiValidator');

const { WORK_DIR } = process.env;
const multerUsersStoragePath = path.join(WORK_DIR, 'static', 'img', 'users');

/**
 * * Check new user data.
 */
exports.checkUserData = catchAsyncWrapper(async (req, res, next) => {
  const { error, value } = createUserValidator(req.body);

  if (error) return next(new CustomError(400, error.details[0].message));

  const { email } = value;

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

    if (!ObjectId.isValid(id)) {
      // перевірка, чи валідний ID

      return next(new CustomError(400, 'Invalid user id!')); // TODO: change where is possible
    }

    const userExists = await User.exists({ _id: id });
    if (!userExists) return next(new CustomError(404, 'user not found'));

    next();
  } catch (err) {
    next(err);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, clb) => {
    clb(null, multerUsersStoragePath);
  },
  filename: (req, file, clb) => {
    const ext = file.mimetype.split('/')[1]
    clb(null, `${req.user.name}-${uuid()}.${ext}`);
  },
});

const multerFileFilter = (req, file, clb) => {
  if (file.mimetype.startsWith('image')) {
    clb(null, true);
  } else {
    clb(new CustomError(400, 'Please upload image file only'), false);
  }
};

exports.uploadUserPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
}).single('avatar');
