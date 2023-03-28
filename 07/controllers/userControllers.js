const fs = require('fs').promises;
const { v4: uuid } = require('uuid');
const { catchAsyncWrapper } = require('../utils');
const User = require('../models/userModels');
/**
 * @Get user
 */
/* exports.getUsers = async (req, res) => {
  try {
    const usersString = await fs.readFile('./04/models/models.json');
    const users = JSON.parse(usersString);
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}; */
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
  // try {
  const { id } = req.params;
  const user = await User.findById(id); // .lean - повертає лише об'єкт, без додаткових методів, що є у відповіді монги/гуса

  // const user = await User.findById(id).select('+password');// якщо треба показати пароль, що схований у моделі
  // обробляємо
  // а потім "ховаємо" у відповіді:
  // user.password = undefined;// TODO: обробка паролю, прихованого у моделі
  // вибіркова видача без _id:
  // const user = await User.findById(id).select('name email -_id');
  res.status(200).json({
    user,
  });
  // } catch (err) {
  //   res.status(500)
  //     .json({
  //       message: err.message,
  //     });
  // }
});

/**
 * @Create user
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
  // try {
  const { id } = req.params;
  const { name, birthYear, email } = req.body;
  // const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 2
  // const users = await JSON.parse(usersString);
  // // console.log(':CL: ~ file: userControllers.js:75 ~ exports.updateUserById= ~ users:', users);
  // const foundedUser = await users.find((item) => item.id === id);
  //
  // if (name) foundedUser.name = name;
  // if (year) foundedUser.year = year;
  //
  // const userIdx = users.findIndex((item) => item.id === id);
  // // console.log(':CL: ~ file: userControllers.js:81 ~ exports.updateUserById= ~ userIdx:', userIdx);
  // users[userIdx] = foundedUser;
  //
  // await fs.writeFile('./04/models/models.json', JSON.stringify(users));
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
  // } catch (err) {
  //   res.status(500)
  //     .json({
  //       message: err.message,
  //     });
  // }
});

/**
 * * Delete user by id
 */
exports.deleteUserById = catchAsyncWrapper(async (req, res) => {
  // try {
  const { id } = req.params;
  //   const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 3
  //   const users = await JSON.parse(usersString);
  //
  //   const usersListToUpdate = await users.filter((item) => item.id !== id);
  //
  //   await fs.writeFile(
  //     './04/models/models.json',
  //     JSON.stringify(usersListToUpdate)
  //   );
  await User.findByIdAndDelete(id); // TODO: delete - by default. remove - if necessary;

  res.sendStatus(204); // ** if no need to response smth // status 204 - no content
  // } catch (err) {
  //   res.status(500)
  //     .json({
  //       message: err.message,
  //     });
  // }
});
