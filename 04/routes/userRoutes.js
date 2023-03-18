const express = require('express');

const userController = require('../controllers/userControllers');
const userMiddlewares = require('../middlewares/userMiddlewares');

const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);
router
  .route('/')
  .post(userMiddlewares.checkUserData, userController.createUser)
  .get(userController.getUsers);

// router.get('/:id', userController.getUsersById);
// router.patch('/:id', userController.updateUserById);
// router.delete('/:id', userController.deleteUserById);

router.use('/:id', userMiddlewares.checkUserId);

router
  .route('/:id')
  .get(userController.getUsersById)
  .patch(userMiddlewares.checkUserData, userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
