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

// TODO: in homework:
// error wrapper
// async wrapper
// password select false in user model;
// current data in update: {new: true};
// перевірка, чи валідний ID // ObjectId.isValid(id);
