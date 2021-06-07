const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const ApiError = require('./utils/appError');
const { rateLimitter } = require('./utils/rateLimitter');

const globalErrorController = require('./controllers/errorController');

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const URL = '/api/v1';

// GLOBAL MIDDLEWARE

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set rate limit
app.use('/api', rateLimitter);

// set security HTTP headers
app.use(helmet());

// body parser, read data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

// data sanitization against NoSQL injection
app.use(mongoSanitize());

// data sanitization against XSS attacks
app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// serving static files
app.use(express.static('./public')); // ?

// test MW
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS
app.use(`${URL}/tours`, toursRouter);
app.use(`${URL}/users`, usersRouter);

// MIDDLEWARE
app.all('*', (req, res, next) => {
  // если что-то передается в next(), то mw распознается как обработчик ошибок и сразу его выполняет вне очереди*
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
