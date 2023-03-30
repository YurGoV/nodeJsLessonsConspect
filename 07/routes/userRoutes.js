const express = require('express');

const {
  getUsers,
  createUser,
  getUsersById,
  updateUserById,
  deleteUserById,
} = require('../controllers/userControllers'); // todo: try from index
const { userMiddlewares } = require('../middlewares');
const { protect, allowFor } = require('../middlewares');
// const { allowFor } = require('../middlewares/authMiddleware');
const { enums } = require('../constants');

const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);

router.use(protect);

router.use(allowFor(enums.USER_ROLES.ADMIN, enums.USER_ROLES.MODERATOR));

router.route('/').post(userMiddlewares.checkUserData, createUser).get(getUsers);

// router.get('/:id', userController.getUsersById);
// router.patch('/:id', userController.updateUserById);
// router.delete('/:id', userController.deleteUserById);

router.use('/:id', userMiddlewares.checkUserId);

router
  .route('/:id')
  .get(getUsersById)
  .patch(userMiddlewares.checkUserData, updateUserById)
  .delete(deleteUserById);

module.exports = router;
