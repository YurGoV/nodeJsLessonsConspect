const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: './07/.env' });

// const userController = require('./controllers/userControllers');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');

const app = express();

/**
 * * needed for development only (morgan installed as dev-dependency)
 */
const PORT = process.env.PORT || 4000;
const { MONGO_URL, NODE_ENV } = process.env;

mongoose
  .connect(MONGO_URL)
  .then((connection) => {
    console.log('connected to DB');
  })
  .catch((error) => console.log(error));

if (NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

/**
 * * Global error handler (middleware)
 */
app.use((err, req, res, next) => {
  const { status } = err; // there we get error status, that was setting on user useMiddlewares

  // if (!status) status = 500;

  if (NODE_ENV === 'development') {
    res.status(status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(status || 500).json({
      message: err.message,
    });
  }
  // TODO: stack: err.stack// для розробки - конкретика по помилці - можна окремо під умовами оточення: дев та ін
  // TODO: можна винести в окремий файл
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});

// TODO: in homework:
// error wrapper;
// async wrapper;
// password select false in user model;
// password undefined при відповідях (реєстрація, апдейт, тощо)
// current data in update: {new: true};
// перевірка, чи валідний ID // ObjectId.isValid(id);
// видалити детальну валідацію паролю у джоі при логіні (зробити як тут)
// uploaded file size limit
//  mongosh auth hook - to homework
//  ?DONE(TO CHECK) dev/prod errors (there - in server.js)
// admin route/auth

// todo: learn cron job
// !normal relation in mongodb model!
// * sorting (take from todoController)
