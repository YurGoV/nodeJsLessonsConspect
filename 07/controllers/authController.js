const { enums } = require('../constants');
const User = require('../models/userModels');
const { catchAsyncWrapper } = require('../utils');

exports.signup = catchAsyncWrapper(async (req, res) => {
  const { password } = req.body;

  // const isValid = await bcrypt.compare(password, hashedPassword);
  // const sault = await bcrypt.genSalt(10);

  // const hashedPassword = await bcrypt.hash(password, sault);

  // console.log('~sault, hashedPassword authController.js [15]:', sault, hashedPassword);

  const newUserData = {
    ...req.body,
    role: enums.USER_ROLES.USER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  res.status(201).json({
    user: newUser,
  });
});

exports.login = catchAsyncWrapper(async (req, res, next) => {});
