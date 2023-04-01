const express = require('express');

const { todoController } = require('../controllers/todoController');

/* const {
  getUsers,
  createUser,
  getUsersById,
  updateUserById,
  deleteUserById,
  getMe,
} = require('../controllers/userControllers'); // todo: try from index */
const { userMiddlewares } = require('../../07/middlewares');
const { protect, allowFor } = require('../../07/middlewares');
const { enums } = require('../constants');

const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);

router.use(protect);

router.get('/', todoController.getTodosList);
router.post('/', todoController.createTodo);

router.use(allowFor(enums.USER_ROLES.ADMIN, enums.USER_ROLES.MODERATOR));

module.exports = router;
