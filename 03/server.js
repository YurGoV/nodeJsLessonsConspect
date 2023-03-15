const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

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
app.post('/api/v1/user', async (req, res) => {
  try {
    // console.log(req.body);
    const { name, year } = req.body;

    const dataFromDb = await fs.readFile('./03/models.json');
    const users = JSON.parse(dataFromDb);
    const newUser = {
      id: uuid(),
      name,
      year,
    };
    users.push(newUser);

    await fs.writeFile('./03/models.json', JSON.stringify(users));

    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/**
 * * GET all users
 */
app.get('/api/v1/user', async (req, res) => {
  try {
    const usersString = await fs.readFile('./03/models.json');
    const users = JSON.parse(usersString);
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/**
 * * GET user by id
 */
app.get('/api/v1/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usersString = await fs.readFile('./03/models.json');
    const users = await JSON.parse(usersString);
    // const users = JSON.parse(await fs.readFile('./03/models.json'));
    console.log(':CL: -----------------------------------------:CL:');
    console.log(':CL: ~ file: server.js:75 ~ users:', users);
    console.log(':CL: -----------------------------------------:CL:');

    const foundedUser = await users.find((item) => item.id === id);
    console.log(':CL: ~ file: server.js:76 ~ foundedUser:', foundedUser);

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'route not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});
