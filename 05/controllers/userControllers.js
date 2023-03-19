const fs = require('fs').promises;
const { v4: uuid } = require('uuid');
const { catchAsyncWrapper } = require('../utils');

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
// * with catchAsync more shortened:
exports.getUsers = catchAsyncWrapper(async (req, res) => {
  // TODO: refactoring all try/catch into wrapper
  const usersString = await fs.readFile('./04/models/models.json');
  const users = JSON.parse(usersString);
  res.status(200).json({
    users,
  });
});

/**
 * ? Get_by_Id user
 */
exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 1
    const users = await JSON.parse(usersString);

    const foundedUser = await users.find((item) => item.id === id);

    res.status(200).json({
      foundedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @Create user
 */
exports.createUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, year } = req.body;

    const dataFromDb = await fs.readFile('./04/models/models.json');
    const users = JSON.parse(dataFromDb);
    const newUser = {
      id: uuid(),
      name,
      year,
    };
    users.push(newUser);

    await fs.writeFile('./04/models/models.json', JSON.stringify(users));

    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * * update user bi id
 */
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year } = req.body;

    const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 2
    const users = await JSON.parse(usersString);
    // console.log(':CL: ~ file: userControllers.js:75 ~ exports.updateUserById= ~ users:', users);
    const foundedUser = await users.find((item) => item.id === id);

    if (name) foundedUser.name = name;
    if (year) foundedUser.year = year;

    const userIdx = users.findIndex((item) => item.id === id);
    // console.log(':CL: ~ file: userControllers.js:81 ~ exports.updateUserById= ~ userIdx:', userIdx);
    users[userIdx] = foundedUser;

    await fs.writeFile('./04/models/models.json', JSON.stringify(users));

    res.status(200).json({
      user: foundedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * * Delete user by id
 */
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 3
    const users = await JSON.parse(usersString);

    const usersListToUpdate = await users.filter((item) => item.id !== id);

    await fs.writeFile(
      './04/models/models.json',
      JSON.stringify(usersListToUpdate)
    );

    res.sendStatus(204); // ** if no need to response smth // status 204 - no content
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
