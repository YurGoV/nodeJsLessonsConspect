const express = require('express');
const todoController = require('../controllers/todoController');
const { protect } = require('../middlewares');

const router = express.Router();

router.use(protect);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodosList);

module.exports = router;
