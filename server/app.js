const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('build'));

/**
 * GET /
 */
app.get('/', (req, res) => {
  res.sendFile('../build/index.html');
});

/**
 * Stub (test) endpoint.
 */
app.get('/foobar', (req, res) => res.end('foobar'));

/**
 * GET /login
 */
app.get('/login', (req, res) => {
  const { username } = req.cookies;
  if (username) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, './login.html'));
  }
});

/**
 * POST /login
 */
app.post('/login', (req, res) => {
  const { username } = req.body;
  res.cookie('username', username);
  res.redirect('/');
});

module.exports = app;
