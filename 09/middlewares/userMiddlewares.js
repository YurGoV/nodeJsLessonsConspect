const {
  Types: { ObjectId },
} = require('mongoose');
const ImageService = require('../services/ImageService');

const { CustomError, catchAsyncWrapper } = require('../utils');
const User = require('../models/userModels');
const { createUserValidator } = require('./joiValidator');

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

/* const multerStorage = multer.diskStorage({
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
}).single('avatar'); */

// console.log('~type if ImageService userMiddlewares.js [79]:', typeof ImageService);

exports.uploadUserPhoto = ImageService.upload('avatar');

exports.checkPassword = catchAsyncWrapper(async (req, res, next) => {
  // * validator needed
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('password');

  if (!(await user.checkPassword(currentPassword, user.password))) {
    return next(new CustomError(401, 'Current password is wrong..'));
  }

  user.password = newPassword;

  await user.save();

  next();
});
