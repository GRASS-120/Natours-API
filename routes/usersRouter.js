const express = require('express');
const { getAllUsers, addNewUser } = require('../controllers/usersController');
const { signup, login } = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.route('/').get(getAllUsers).post(addNewUser);
userRouter.route('/:id');

module.exports = userRouter;
