const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const URL = '/api/v1';

// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS
app.use(`${URL}/tours`, toursRouter);
app.use(`${URL}/users`, usersRouter);

module.exports = app;
