const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv')
  .config({ path: './06/.env' });

// const userController = require('./controllers/userControllers');
const userRouter = require('./routes/userRoutes');

const app = express();

/**
 * * needed for development only (morgan installed as dev-dependency)
 */
const PORT = process.env.PORT || 4000;
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL)
  .then((connection) => {
    console.log('connected to DB');
  })
  .catch((error) => console.log(error));

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

/**
 * POST /users - create user
 * GET /users - get users list
 * GET /users/<userId> - get user by id
 * PATCH /users/<userId> - update user by id
 * DELETE /users/<userId> - delete user by id
 */

/**
 * * create user
 */
/* app.post('/api/v1/user', userController.createUser);
app.get('/api/v1/user', userController.getUsers);
app.get('/api/v1/user/:id', userController.getUsersById); */
app.use('/api/v1/users', userRouter);

app.all('*', (req, res) => {
  res.status(404)
    .json({
      message: 'route not found',
    });
});

/**
 * * Global error handler (middleware)
 */
app.use((err, req, res, next) => {
  let { status } = err; // there we get error status, that was setting on user useMiddlewares

  if (!status) status = 500;

  res.status(status)
    .json({
      message: err.message,
    });
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});
