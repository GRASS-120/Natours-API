const express = require('express');
const morgan = require('morgan');

const ApiError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const URL = '/api/v1';

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // ?
app.use(express.static('./public')); // ?

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS
app.use(`${URL}/tours`, toursRouter);
app.use(`${URL}/users`, usersRouter);

// MIDDLEWARE
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404)); // если что-то передается в next(), то mw распознается как обработчик ошибок и сразу его выполняет вне очереди*
});

app.use(globalErrorController);

module.exports = app;
