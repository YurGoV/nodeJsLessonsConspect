const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());

app.use((req, res, next) => {
  console.log('my middleware');

  next();
});

app.get('/api/v1/html', (req, res) => {
  console.log(req.body);

  res.status(200).send('<h1>Home page</h1>');
});

app.get('/api/v1/json', (req, res) => {
  res.status(200).json({
    message: 'the message'
  });
});

app.get('*', (req, res) => {
  res.send('<p> PAGE NOT FOUND </p>');
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});
