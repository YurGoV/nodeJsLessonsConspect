const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

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
 * create user
 */
app.post('/api/v1/user', async (req, res) => {
  try {
    console.log(req.body);

    const dataFromDb = await fs.readFile('./03/models.json');
    const users = JSON.parse(dataFromDb);
    // users.push({
    //   id
    // })

    await fs.writeFile('./03/models.json', JSON.stringify(users));

    res.status(200).json({
      'req.body is:': req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get('/api/v1/user', (req, res) => {
  res.status(200).json({
    'req.time is:': req.time,
  });
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
