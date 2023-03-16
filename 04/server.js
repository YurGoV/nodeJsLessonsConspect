const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const userController = require('./controllers/userControllers');
const userRouter = require('./routes/userRoutes');

const app = express();

const PORT = 3000;

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

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});
