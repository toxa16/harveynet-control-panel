const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile('../build/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './login.html'));
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  console.log(username);
  res.end('POST /login');
});

module.exports = app;
