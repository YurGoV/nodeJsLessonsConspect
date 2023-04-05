const { Todo } = require('../models/todoModel');
const { catchAsyncWrapper } = require('../../07/utils');

// TODO: validators
exports.createTodo = catchAsyncWrapper(async (req, res) => {
  const newTodoData = {
    owner: req.user, // id не треба зазначати, монга сама
    title: req.body.title,
    comment: req.body.comment,
    due: req.body.due,
  };

  const newTodo = await Todo.create(newTodoData);
  res.status(201).json({
    TODO: newTodo,
  });
});

exports.getTodosList = catchAsyncWrapper(async (req, res) => {
  const { sort, order, page, limit, search } = req.query; // validator needed

  const findOptions = search
    ? { $or:[ {title: { $regex: search, $options: 'i' } }, {desc: {$regex: search, $options: 'i'}}]}
    : {};

  const todosQuery = Todo.find(findOptions);

  todosQuery.sort(`${order === 'DESC' ? '-' : ''}${sort}`);

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 2;
  const skip = (paginationPage - 1) * paginationLimit;

  todosQuery.skip(skip).limit(paginationLimit);

  const todosCount = await Todo.count();
  const receivedTodos = await todosQuery.populate('owner');

  res.status(200).json({
    totalInResponse: receivedTodos.length,
    totalInDB: todosCount,
    page: paginationPage,
    perPage: paginationLimit,
    todos: receivedTodos,
  });
});
