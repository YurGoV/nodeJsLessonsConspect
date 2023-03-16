const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('my middleware');

  req.time = new Date();

  next();
});

app.get('/api/v1/html', (req, res) => {
  console.log(req.body);

  res.status(200).send('<h1>Home page</h1>');
});

app.get('/api/v1/json', (req, res) => {
  res.status(200).json({
    'req.time is:': req.time
  });
});

app.post('/api/v1/json', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    'req.body is:': req.body
  });
});

app.get('*', (req, res) => {
  res.send('<p> PAGE NOT FOUND </p>');
});

app.listen(PORT, () => {
  console.log(`Server running up on port ${PORT}
  api available at http://localhost:${PORT}/api/v1/`);
});
