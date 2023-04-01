const { Todo } = require('../models/todoModel')
const { catchAsyncWrapper } = require('../../07/utils')

// todo: validators
exports.createTodo = catchAsyncWrapper(async (req, res) => {
  const newTodoData = {
    owner: req.user, // id не треба зазначати, монга сама
    title: req.body.title,
    comment: req.body.comment,
    due: req.body.due,
  }

  const newTodo = await Todo(newTodoData)
  res.status(201).json({
    todo: newTodo,
  })
})
