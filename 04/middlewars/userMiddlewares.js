const fs = require('fs').promises;

/**
 * * Check new user data.
 */
exports.checkUserData = (req, res, next) => {
  console.log('~req.body userMiddleware [2]:', req.body);
  next();
};

/**
 * * Check new user ID.
 */
exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length < 5) throw new Error('Invalid user id!');

    const usersString = await fs.readFile('./04/models/models.json'); // TODO: duplicated 1
    const users = await JSON.parse(usersString);
    const foundedUser = await users.find((item) => item.id === id);
    if (!foundedUser) {
      res.status(404).json({
        message: 'user not exist',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
