const { Todo } = require('../models/todoModel');
const { catchAsyncWrapper } = require('../../07/utils');

// todo: validators
exports.createTodo = catchAsyncWrapper(async (req, res) => {
  const newTodoData = {
    owner: req.user, // id не треба зазначати, монга сама
    title: req.body.title,
    comment: req.body.comment,
    due: req.body.due,
  };
  console.log('CL: ~ file: todoController.js:12 ~ newTodoData:', newTodoData);

  const newTodo = await Todo.create(newTodoData);
  res.status(201).json({
    todo: newTodo,
  });
});

exports.getTodosList = catchAsyncWrapper(async (req, res) => {
  const { sort, order, page, limit, search } = req.query; // validator needed
  // console.log('CL: ~ file: todoController.js:22 ~ sort:', sort, order);

  /*   const paginationPage = +page || 1;
  const paginationLimit = +limit || 3;
  const skip = (paginationPage - 1) * paginationLimit;
 */

  // const receivedTodos = await Todo.find().sort(
  //   `${order === 'DESC' ? '-' : ''}${sort}`
  // );
  /*   const receivedTodos = await Todo.find().skip(skip).limit(paginationLimit);
  
 */
  const todosCount = await Todo.count();
  const receivedTodos = await Todo.find({title: {$regex: search, $options: 'i'}});

  res.status(200).json({
    totalInResponse: receivedTodos.length,
    totalInDB: todosCount,
    todos: receivedTodos,
  });
});
