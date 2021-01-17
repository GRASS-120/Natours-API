const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express()
const URL = '/api/v1'

// MIDDLEWARE

app.use(morgan('dev'));
app.use(express.json());

// app.use((req, res, next) => {
//     console.log("hi from the mw!")
//     next()
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
});

// SERVER

// app.listen(port, () => {
//     console.log(`App running on port ${port}`)
// });

// ROUTERS

app.use(`${URL}/tours`, toursRouter);
app.use(`${URL}/users`, usersRouter);

module.exports = app;