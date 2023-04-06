const express = require('express');

const {
  getUsers,
  createUser,
  getUsersById,
  updateUserById,
  deleteUserById,
  getMe,
  updateAvatar,
  updateMyPassword,
} = require('../controllers/userControllers'); // TODO: try from index

const { userMiddlewares } = require('../middlewares');
const { protect, allowFor } = require('../middlewares');
const { enums } = require('../constants');

const router = express.Router();

router.route('/').post(userMiddlewares.checkUserData, createUser);

router.use(protect);

router.get('/me', getMe);
router.patch('/me', userMiddlewares.uploadUserPhoto, updateAvatar);
router.patch(
  '/update-my-password',
  userMiddlewares.checkPassword,
  updateMyPassword,
);

router.use(allowFor(enums.USER_ROLES.ADMIN, enums.USER_ROLES.MODERATOR));

router.route('/').get(getUsers);

router.use('/:id', userMiddlewares.checkUserId);

router
  .route('/:id')
  .get(getUsersById)
  .patch(userMiddlewares.checkUserData, updateUserById)
  .delete(deleteUserById);

module.exports = router;
