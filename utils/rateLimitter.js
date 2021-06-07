const rateLimit = require('express-rate-limit');

exports.rateLimitter = rateLimit({
  max: 200, // количество запросов
  windowMs: 60 * 60 * 1000, // время, через которое обновляется количество запросов
  message: 'Too many requests from this IP, please try again in an hour!',
});
