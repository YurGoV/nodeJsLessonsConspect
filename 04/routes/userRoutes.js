const express = require('express');

const userController = require('../controllers/userControllers');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUsersById);
router.patch('/:id', userController.updateUserById);

module.exports = router;
