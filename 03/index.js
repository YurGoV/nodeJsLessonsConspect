const express = require('express');

const app = express();

const PORT = 3000;

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
  and available at http://locathost:${PORT}`);
});
