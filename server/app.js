const express = require('express');

const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile('../build/index.html');
});

app.get('/login', (req, res) => {
  res.status(200).end();
});

module.exports = app;
