const express = require('express');

const todoController = require('../controllers/todoController');

/* const {
  getUsers,
  createUser,
  getUsersById,
  updateUserById,
  deleteUserById,
  getMe,
} = require('../controllers/userControllers'); // todo: try from index */
const { userMiddlewares } = require('../middlewares');
const { protect, allowFor } = require('../middlewares');
// const { enums } = require('../constants');

const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);

router.use(protect);

// router.get('/', todoController.getTodosList);
router.post('/', todoController.createTodo);
router.get('/', todoController.getTodosList);

// router.use(allowFor(enums.USER_ROLES.ADMIN, enums.USER_ROLES.MODERATOR));

module.exports = router;
