/* eslint-disable no-console */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log('Uncaught exception! Shutting down...');
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful 👍');
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
  console.log('Unhandled rejection! Shutting down...');
});
